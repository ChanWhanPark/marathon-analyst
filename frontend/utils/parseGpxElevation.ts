export interface ElevationPoint {
  distKm: number
  ele: number
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/** GPX XML 문자열에서 거리(km) + 고도(m) 포인트 배열을 반환합니다. */
export function parseGpxElevation(gpxContent: string): ElevationPoint[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(gpxContent, 'application/xml')
  const trkpts = Array.from(doc.querySelectorAll('trkpt'))

  if (trkpts.length === 0) return []

  const points: ElevationPoint[] = []
  let accumulated = 0
  let prevLat: number | null = null
  let prevLon: number | null = null

  for (const pt of trkpts) {
    const lat = parseFloat(pt.getAttribute('lat') ?? '')
    const lon = parseFloat(pt.getAttribute('lon') ?? '')
    const ele = parseFloat(pt.querySelector('ele')?.textContent ?? '')

    if (isNaN(lat) || isNaN(lon) || isNaN(ele)) continue

    if (prevLat !== null && prevLon !== null) {
      accumulated += haversine(prevLat, prevLon, lat, lon)
    }

    points.push({ distKm: accumulated / 1000, ele })
    prevLat = lat
    prevLon = lon
  }

  return points
}
