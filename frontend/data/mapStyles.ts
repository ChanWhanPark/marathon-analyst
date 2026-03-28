import { Style, Stroke, Circle, Fill, Text, RegularShape } from 'ol/style'

export const gpxStyle = [
  new Style({ stroke: new Stroke({ color: '#000000', width: 6 }) }),
  new Style({ stroke: new Stroke({ color: '#00ff00', width: 3 }) }),
]

export const startStyle = new Style({
  image: new Circle({
    radius: 8,
    fill: new Fill({ color: '#43a047' }),
    stroke: new Stroke({ color: '#fff', width: 2 }),
  }),
})

export const endStyle = new Style({
  image: new Circle({
    radius: 8,
    fill: new Fill({ color: '#e53935' }),
    stroke: new Stroke({ color: '#fff', width: 2 }),
  }),
})

/** 고도 500m 단위 밴드 색상 */
export const ELEVATION_BANDS = [
  { max: 500,  color: '#43a047', label: '~500m' },
  { max: 1000, color: '#f9a825', label: '500~1000m' },
  { max: 1500, color: '#ef6c00', label: '1000~1500m' },
  { max: 2000, color: '#e53935', label: '1500~2000m' },
  { max: Infinity, color: '#7b1fa2', label: '2000m~' },
] as const

export function elevationBandStyle(ele: number) {
  const band = ELEVATION_BANDS.find((b) => ele < b.max) ?? ELEVATION_BANDS[ELEVATION_BANDS.length - 1]
  return [
    new Style({ stroke: new Stroke({ color: '#000000', width: 7 }) }),
    new Style({ stroke: new Stroke({ color: band.color, width: 4 }) }),
  ]
}

/** 진행방향 화살표: rotation은 북쪽 기준 시계방향 라디안 */
export function directionArrowStyle(rotation: number) {
  return new Style({
    image: new RegularShape({
      points: 3,
      radius: 6,
      rotation,
      angle: 0,
      fill: new Fill({ color: '#000000' }),
      stroke: new Stroke({ color: '#fff', width: 1 }),
    }),
  })
}

export function kmMarkerStyle(km: number, elevation?: number) {
  const label = elevation != null ? `${km}km\n${Math.round(elevation)}m` : `${km}km`

  return new Style({
    image: new Circle({
      radius: 5,
      fill: new Fill({ color: '#1565c0' }),
      stroke: new Stroke({ color: '#fff', width: 1.5 }),
    }),
    text: new Text({
      text: label,
      offsetY: -14,
      font: 'bold 11px sans-serif',
      fill: new Fill({ color: '#1565c0' }),
      stroke: new Stroke({ color: '#fff', width: 3 }),
    }),
  })
}
