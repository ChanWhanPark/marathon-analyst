import { ElevationPoint } from './parseGpxElevation'

export type SegmentType = 'flat' | 'easy-climb' | 'hard-climb' | 'easy-descent' | 'hard-descent'

export interface Segment {
  startKm: number
  endKm: number
  ascent: number
  descent: number
  gradient: number // %
  type: SegmentType
}

export interface StrategyResult {
  totalAscent: number
  totalDescent: number
  totalKm: number
  segments: Segment[] // 1km 단위
  hardestClimb: Segment | null
  difficultyLabel: '쉬움' | '보통' | '어려움' | '매우 어려움'
  pacingAdvice: string
  sectionAdvice: { km: string; advice: string; icon: string }[]
}

function classifyGradient(gradient: number): SegmentType {
  if (gradient > 3) return 'hard-climb'
  if (gradient > 0.8) return 'easy-climb'
  if (gradient < -3) return 'hard-descent'
  if (gradient < -0.8) return 'easy-descent'
  return 'flat'
}

export function analyzeStrategy(points: ElevationPoint[]): StrategyResult | null {
  if (points.length < 2) return null

  const totalKm = points[points.length - 1].distKm

  // 1km 단위 세그먼트 생성
  const segmentSize = 1 // km
  const segments: Segment[] = []

  let segStart = 0
  while (segStart < totalKm) {
    const segEnd = Math.min(segStart + segmentSize, totalKm)

    const startPt = points.reduce((best, p) =>
      Math.abs(p.distKm - segStart) < Math.abs(best.distKm - segStart) ? p : best
    )
    const endPt = points.reduce((best, p) => (Math.abs(p.distKm - segEnd) < Math.abs(best.distKm - segEnd) ? p : best))

    // 구간 내 포인트들로 누적 상승/하강 계산
    const inRange = points.filter((p) => p.distKm >= segStart && p.distKm <= segEnd)
    let ascent = 0
    let descent = 0
    for (let i = 1; i < inRange.length; i++) {
      const diff = inRange[i].ele - inRange[i - 1].ele
      if (diff > 0) ascent += diff
      else descent += Math.abs(diff)
    }

    const distM = (segEnd - segStart) * 1000
    const gradient = distM > 0 ? ((endPt.ele - startPt.ele) / distM) * 100 : 0

    segments.push({
      startKm: segStart,
      endKm: segEnd,
      ascent: Math.round(ascent),
      descent: Math.round(descent),
      gradient: Math.round(gradient * 10) / 10,
      type: classifyGradient(gradient),
    })

    segStart += segmentSize
  }

  // 전체 누적 상승/하강
  let totalAscent = 0
  let totalDescent = 0
  for (let i = 1; i < points.length; i++) {
    const diff = points[i].ele - points[i - 1].ele
    if (diff > 0) totalAscent += diff
    else totalDescent += Math.abs(diff)
  }
  totalAscent = Math.round(totalAscent)
  totalDescent = Math.round(totalDescent)

  // 가장 힘든 오르막 구간
  const climbSegments = segments.filter((s) => s.type === 'easy-climb' || s.type === 'hard-climb')
  const hardestClimb =
    climbSegments.length > 0 ? climbSegments.reduce((best, s) => (s.gradient > best.gradient ? s : best)) : null

  // 난이도 판정
  const ascentPer10km = (totalAscent / totalKm) * 10
  let difficultyLabel: StrategyResult['difficultyLabel']
  if (ascentPer10km < 30) difficultyLabel = '쉬움'
  else if (ascentPer10km < 80) difficultyLabel = '보통'
  else if (ascentPer10km < 150) difficultyLabel = '어려움'
  else difficultyLabel = '매우 어려움'

  // 페이싱 조언
  const hardClimbCount = segments.filter((s) => s.type === 'hard-climb').length
  let pacingAdvice = ''
  if (difficultyLabel === '쉬움') {
    pacingAdvice = '평탄한 코스입니다. 일정한 페이스로 달리고 후반 5km에서 스퍼트를 노려보세요.'
  } else if (difficultyLabel === '보통') {
    pacingAdvice = '완만한 오르막이 있습니다. 오르막에서 페이스를 5~10초/km 낮추고, 내리막에서 자연스럽게 회복하세요.'
  } else if (difficultyLabel === '어려움') {
    pacingAdvice = `오르막이 많습니다(10km당 ${Math.round(ascentPer10km)}m). 오르막 전 에너지 보존이 핵심입니다. 심박수 기준 페이싱을 추천합니다.`
  } else {
    pacingAdvice = `매우 험난한 코스입니다(10km당 ${Math.round(ascentPer10km)}m). 오르막에서는 걷기 전략을 적극 활용하세요.`
  }

  if (hardClimbCount >= 3) {
    pacingAdvice += ` 급경사 구간이 ${hardClimbCount}곳 있으니 미리 위치를 파악해 두세요.`
  }

  // 구간별 조언 (5km 단위)
  const sectionAdvice: StrategyResult['sectionAdvice'] = []
  const step = Math.max(1, Math.round(totalKm / 5))

  for (let km = 0; km < totalKm; km += step) {
    const end = Math.min(km + step, totalKm)
    const sectionSegs = segments.filter((s) => s.startKm >= km && s.startKm < end)
    if (sectionSegs.length === 0) continue

    const avgGradient = sectionSegs.reduce((s, g) => s + g.gradient, 0) / sectionSegs.length
    const sectionAscent = sectionSegs.reduce((s, g) => s + g.ascent, 0)
    const hasHardClimb = sectionSegs.some((s) => s.type === 'hard-climb')
    const hasHardDescent = sectionSegs.some((s) => s.type === 'hard-descent')

    let advice = ''
    let icon = '🏃'

    if (hasHardClimb) {
      icon = '⛰️'
      advice = `급경사 오르막 포함(+${sectionAscent}m). 숨 고르며 일정 심박 유지`
    } else if (avgGradient > 0.8) {
      icon = '📈'
      advice = `완만한 오르막(+${sectionAscent}m). 페이스 소폭 줄여 에너지 절약`
    } else if (hasHardDescent) {
      icon = '⚠️'
      advice = '급경사 내리막. 허벅지 근육 손상 주의, 보폭 줄이기'
    } else if (avgGradient < -0.8) {
      icon = '📉'
      advice = '내리막 구간. 페이스 자연 회복 가능, 과속 주의'
    } else {
      icon = '➡️'
      advice = '평탄 구간. 목표 페이스 유지, 에너지젤 보충 적기'
    }

    sectionAdvice.push({
      km: `${Math.round(km)}~${Math.round(end)}km`,
      advice,
      icon,
    })
  }

  return {
    totalAscent,
    totalDescent,
    totalKm: Math.round(totalKm * 10) / 10,
    segments,
    hardestClimb,
    difficultyLabel,
    pacingAdvice,
    sectionAdvice,
  }
}
