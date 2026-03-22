import { Style, Stroke, Circle, Fill, Text } from 'ol/style'

export const gpxStyle = new Style({
  stroke: new Stroke({ color: '#e53935', width: 3 }),
})

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
