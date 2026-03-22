export interface RaceReport {
  id: string
  name: string
  date: string
  location: string
  description: string
  raceTypes: string[]
  analysisLevel: string
  scope: 'Full Scope' | 'Limited Scope'
  publishedAt: string
}

export const raceReports: RaceReport[] = [
  {
    id: 'seoul-2026',
    name: '2026 서울마라톤',
    date: '2026-03-22',
    location: '잠실올림픽주경기장',
    description:
      '세계육상연맹 플래티넘 라벨 인증 대회. 풀마라톤, 10K 부문으로 구성되며 국내외 엘리트 선수 및 일반 참가자 3만여 명이 함께하는 국내 최대 규모의 봄 마라톤 대회입니다.',
    raceTypes: ['풀', '10K'],
    analysisLevel: 'Level 5',
    scope: 'Full Scope',
    publishedAt: '2026-03-25',
  },
  {
    id: 'goyang-half-2026',
    name: '2026 고양특례시 하프마라톤',
    date: '2026-03-08',
    location: '고양종합운동장',
    description:
      '고양종합운동장을 출발·도착점으로 일산 주요 도로를 달리는 수도권 대표 하프마라톤. 하프, 10K, 5K 부문에 약 15,000명이 참가하는 대규모 도심 러닝 이벤트입니다.',
    raceTypes: ['하프', '10K', '5K'],
    analysisLevel: 'Level 2',
    scope: 'Limited Scope',
    publishedAt: '2026-03-10',
  },
  {
    id: 'run-your-way-2026',
    name: '2026 Run Your Way HALF RACE SEOUL',
    date: '2026-03-02',
    location: '광화문광장',
    description:
      '뉴발란스 러닝 이벤트. 서울 도심을 가로지르는 하프 코스로, 각자의 페이스로 즐기는 러닝 페스티벌로 진행됩니다.',
    raceTypes: ['하프'],
    analysisLevel: 'Level 2',
    scope: 'Limited Scope',
    publishedAt: '2026-03-05',
  },
  {
    id: 'daegu-2026',
    name: '2026 대구마라톤',
    date: '2026-02-22',
    location: '대구스타디움',
    description:
      '세계육상연맹 골드라벨 인증 국내 대표 도심 마라톤. 풀마라톤, 10K, 건강달리기 부문으로 구성되며 국내외 선수들이 활발히 참가하는 대규모 대회입니다.',
    raceTypes: ['풀', '10K', '건강달리기'],
    analysisLevel: 'Level 5',
    scope: 'Full Scope',
    publishedAt: '2026-02-27',
  },
]

export const analysisLevelColor: Record<string, string> = {
  'Level 5': '#c62828',
  'Level 4': '#e65100',
  'Level 3': '#f9a825',
  'Level 2': '#1565c0',
  'Level 1': '#2e7d32',
}
