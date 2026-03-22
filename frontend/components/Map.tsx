'use client'

import { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OSM from 'ol/source/OSM'
import GPX from 'ol/format/GPX'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import LineString from 'ol/geom/LineString'
import MultiLineString from 'ol/geom/MultiLineString'
import { fromLonLat, toLonLat } from 'ol/proj'
import { getDistance } from 'ol/sphere'
import 'ol/ol.css'
import {
  gpxStyle,
  ascentStyle,
  descentStyle,
  startStyle,
  endStyle,
  kmMarkerStyle,
  directionArrowStyle,
} from '../data/mapStyles'

interface MapViewProps {
  gpxContent?: string | null
  colorByElevation?: boolean
}

/** 고도 변화에 따라 오르막(빨강)/내리막(파랑)으로 색칠된 LineString Feature 생성 */
function buildElevationColoredFeatures(coords: number[][]): Feature[] {
  if (coords.length < 2 || coords[0].length < 3) return []

  const features: Feature[] = []
  let segCoords: number[][] = [coords[0]]
  let ascending = coords[1][2] >= coords[0][2]

  for (let i = 1; i < coords.length; i++) {
    const currAscending = coords[i][2] >= coords[i - 1][2]

    if (currAscending !== ascending) {
      segCoords.push(coords[i])
      const f = new Feature({ geometry: new LineString(segCoords) })
      f.setStyle(ascending ? ascentStyle : descentStyle)
      features.push(f)
      segCoords = [coords[i]]
      ascending = currAscending
    } else {
      segCoords.push(coords[i])
    }
  }

  if (segCoords.length >= 2) {
    const f = new Feature({ geometry: new LineString(segCoords) })
    f.setStyle(ascending ? ascentStyle : descentStyle)
    features.push(f)
  }

  return features
}

/** LineString 좌표(EPSG:3857)에서 100m 간격 진행방향 화살표 Feature 생성 */
function buildDirectionFeatures(coords: number[][]): Feature[] {
  if (coords.length < 2) return []
  const features: Feature[] = []

  let accumulated = 0
  let nextMark = 100

  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1]
    const curr = coords[i]
    const segDist = getDistance(toLonLat(prev), toLonLat(curr))

    while (accumulated + segDist >= nextMark) {
      const t = (nextMark - accumulated) / segDist
      const x = prev[0] + t * (curr[0] - prev[0])
      const y = prev[1] + t * (curr[1] - prev[1])

      // 북쪽(+y) 기준 시계방향 각도
      const bearing = Math.atan2(curr[0] - prev[0], curr[1] - prev[1])

      const f = new Feature({ geometry: new Point([x, y]) })
      f.setStyle(directionArrowStyle(bearing))
      features.push(f)

      nextMark += 100
    }

    accumulated += segDist
  }

  return features
}

/** LineString 좌표(EPSG:3857)에서 1km 간격 마커 + 출발/도착 Feature 생성 */
function buildMarkerFeatures(coords: number[][]): Feature[] {
  if (coords.length < 2) return []
  const features: Feature[] = []

  // 출발지
  const startFeature = new Feature({ geometry: new Point(coords[0]) })
  startFeature.setStyle(startStyle)
  features.push(startFeature)

  // 1km 간격 마커
  let accumulated = 0
  let nextKm = 1000

  for (let i = 1; i < coords.length; i++) {
    const prev = coords[i - 1]
    const curr = coords[i]
    const segDist = getDistance(toLonLat(prev), toLonLat(curr))

    while (accumulated + segDist >= nextKm) {
      const t = (nextKm - accumulated) / segDist
      const x = prev[0] + t * (curr[0] - prev[0])
      const y = prev[1] + t * (curr[1] - prev[1])
      const km = nextKm / 1000

      const hasEle = prev.length >= 3 && curr.length >= 3
      const elevation = hasEle ? prev[2] + t * (curr[2] - prev[2]) : undefined

      const f = new Feature({ geometry: new Point([x, y]) })
      f.setStyle(kmMarkerStyle(km, elevation))
      features.push(f)

      nextKm += 1000
    }

    accumulated += segDist
  }

  // 도착지
  const endFeature = new Feature({ geometry: new Point(coords[coords.length - 1]) })
  endFeature.setStyle(endStyle)
  features.push(endFeature)

  return features
}

export default function MapView({ gpxContent, colorByElevation }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<Map | null>(null)
  const gpxLayerRef = useRef<VectorLayer | null>(null)
  const directionLayerRef = useRef<VectorLayer | null>(null)
  const markerLayerRef = useRef<VectorLayer | null>(null)
  const colorLayerRef = useRef<VectorLayer | null>(null)
  const allCoordsRef = useRef<number[][]>([])

  useEffect(() => {
    if (!mapRef.current) return

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([126.978, 37.5665]),
        zoom: 12,
      }),
    })

    mapInstance.current = map
    return () => {
      map.setTarget(undefined)
      mapInstance.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapInstance.current
    if (!map) return

    // 기존 레이어 제거
    if (gpxLayerRef.current) {
      map.removeLayer(gpxLayerRef.current)
      gpxLayerRef.current = null
    }
    if (colorLayerRef.current) {
      map.removeLayer(colorLayerRef.current)
      colorLayerRef.current = null
    }
    if (directionLayerRef.current) {
      map.removeLayer(directionLayerRef.current)
      directionLayerRef.current = null
    }
    if (markerLayerRef.current) {
      map.removeLayer(markerLayerRef.current)
      markerLayerRef.current = null
    }
    allCoordsRef.current = []

    if (!gpxContent) return

    // GPX 파싱 (동기)
    const parsedFeatures = new GPX().readFeatures(gpxContent, {
      featureProjection: map.getView().getProjection(),
    })

    // GPX 트랙 레이어
    const gpxSource = new VectorSource({ features: parsedFeatures })
    const gpxLayer = new VectorLayer({ source: gpxSource, style: gpxStyle })
    map.addLayer(gpxLayer)
    gpxLayerRef.current = gpxLayer

    // 뷰 조정
    const extent = gpxSource.getExtent()
    if (extent && extent.every(isFinite)) {
      map.getView().fit(extent as [number, number, number, number], {
        padding: [60, 60, 60, 60],
        duration: 600,
      })
    }

    // 좌표 추출 후 마커 레이어 생성 (동기)
    const allCoords: number[][] = []
    parsedFeatures.forEach((f) => {
      const geom = f.getGeometry()
      if (geom instanceof LineString) {
        allCoords.push(...geom.getCoordinates())
      } else if (geom instanceof MultiLineString) {
        geom.getLineStrings().forEach((ls) => allCoords.push(...ls.getCoordinates()))
      }
    })

    allCoordsRef.current = allCoords

    if (allCoords.length >= 2) {
      const directionSource = new VectorSource({ features: buildDirectionFeatures(allCoords) })
      const directionLayer = new VectorLayer({ source: directionSource })
      map.addLayer(directionLayer)
      directionLayerRef.current = directionLayer

      const markerSource = new VectorSource({ features: buildMarkerFeatures(allCoords) })
      const markerLayer = new VectorLayer({ source: markerSource })
      map.addLayer(markerLayer)
      markerLayerRef.current = markerLayer
    }
  }, [gpxContent])

  // 고도 색상 레이어: colorByElevation 또는 gpxContent 변경 시 갱신
  useEffect(() => {
    const map = mapInstance.current
    if (!map) return

    if (colorLayerRef.current) {
      map.removeLayer(colorLayerRef.current)
      colorLayerRef.current = null
    }

    if (!colorByElevation || allCoordsRef.current.length < 2) return

    const colorSource = new VectorSource({
      features: buildElevationColoredFeatures(allCoordsRef.current),
    })
    const colorLayer = new VectorLayer({ source: colorSource })
    // gpxLayer 바로 위, direction/marker 아래에 삽입
    const layers = map.getLayers()
    const gpxIdx = layers.getArray().indexOf(gpxLayerRef.current!)
    map.getLayers().insertAt(gpxIdx + 1, colorLayer)
    colorLayerRef.current = colorLayer
  }, [gpxContent, colorByElevation])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
