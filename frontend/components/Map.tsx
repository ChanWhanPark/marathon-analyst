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
import { gpxStyle, startStyle, endStyle, kmMarkerStyle } from '../data/mapStyles'

interface MapViewProps {
  gpxContent?: string | null
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

export default function MapView({ gpxContent }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<Map | null>(null)
  const gpxLayerRef = useRef<VectorLayer | null>(null)
  const markerLayerRef = useRef<VectorLayer | null>(null)

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
    if (markerLayerRef.current) {
      map.removeLayer(markerLayerRef.current)
      markerLayerRef.current = null
    }

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

    if (allCoords.length >= 2) {
      const markerSource = new VectorSource({ features: buildMarkerFeatures(allCoords) })
      const markerLayer = new VectorLayer({ source: markerSource })
      map.addLayer(markerLayer)
      markerLayerRef.current = markerLayer
    }
  }, [gpxContent])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
