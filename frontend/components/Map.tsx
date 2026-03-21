'use client'

import { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import 'ol/ol.css'

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([126.978, 37.5665]), // 서울 기본값
        zoom: 12,
      }),
    })

    return () => map.setTarget(undefined)
  }, [])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
