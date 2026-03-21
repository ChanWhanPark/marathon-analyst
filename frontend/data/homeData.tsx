import MapIcon from '@mui/icons-material/Map'
import BarChartIcon from '@mui/icons-material/BarChart'
import SpeedIcon from '@mui/icons-material/Speed'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import GroupIcon from '@mui/icons-material/Group'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

export const stats = [
  {
    value: '0',
    label: '등록된 대회',
    icon: <EmojiEventsIcon sx={{ fontSize: 30, color: '#00B8FF' }} />,
  },
  {
    value: '0',
    label: '분석된 코스',
    icon: <MapIcon sx={{ fontSize: 30, color: '#00B8FF' }} />,
  },
  {
    value: '0',
    label: '누적 사용자',
    icon: <GroupIcon sx={{ fontSize: 30, color: '#00B8FF' }} />,
  },
  {
    value: '0',
    label: '데이터 정확도',
    icon: <TrendingUpIcon sx={{ fontSize: 30, color: '#00B8FF' }} />,
  },
]

export const features = [
  {
    icon: <BarChartIcon sx={{ fontSize: 38, color: '#508fca' }} />,
    title: '대회 분석',
    desc: '역대 완주율, 기록 분포, 날씨 조건 등 마라톤 대회별 심층 통계를 분석합니다.',
    href: '/analysis',
    badge: null,
    badgeColor: '',
  },
  {
    icon: <MapIcon sx={{ fontSize: 38, color: '#00B8FF' }} />,
    title: '코스 분석',
    desc: '경사도, 고도 변화, 포장 상태 등 상세한 코스 데이터를 지도 위에서 시각적으로 확인하세요.',
    href: '/course',
    badge: '인기',
    badgeColor: '#00B8FF',
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 38, color: '#9c4dff' }} />,
    title: '페이스 예측',
    desc: '내 훈련 데이터와 코스 난이도를 기반으로 목표 완주 시간과 최적 페이스를 계산합니다.',
    href: '/analysis',
    badge: 'NEW',
    badgeColor: '#9c4dff',
  },
]

export const races = [
  {
    name: '서울 마라톤',
    date: '2026.03.22',
    distance: '42.195km',
    difficulty: '보통',
    gradient: 'linear-gradient(145deg, #1565c0 0%, #0d47a1 100%)',
  },
  {
    name: '경주 마라톤',
    date: '2026.04.05',
    distance: '42.195km',
    difficulty: '어려움',
    gradient: 'linear-gradient(145deg, #6a1b9a 0%, #4a148c 100%)',
  },
  {
    name: '춘천 마라톤',
    date: '2026.10.18',
    distance: '42.195km',
    difficulty: '쉬움',
    gradient: 'linear-gradient(145deg, #00695c 0%, #004d40 100%)',
  },
  {
    name: '동아 마라톤',
    date: '2026.03.15',
    distance: '10km / 하프 / 풀',
    difficulty: '다양',
    gradient: 'linear-gradient(145deg, #bf360c 0%, #7f2000 100%)',
  },
]

export const difficultyColor: Record<string, string> = {
  쉬움: '#4caf50',
  보통: '#ff9800',
  어려움: '#f44336',
  다양: '#2196f3',
}
