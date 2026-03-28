'use client'

import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { parseGpxElevation } from '@/utils/parseGpxElevation'
import { analyzeStrategy } from '@/utils/analyzeStrategy'

interface Props {
  gpxContent: string
}

const DIFFICULTY_COLOR: Record<string, string> = {
  쉬움: '#43a047',
  보통: '#fb8c00',
  어려움: '#e53935',
  '매우 어려움': '#6a1a1a',
}

export default function RaceStrategy({ gpxContent }: Props) {
  const [open, setOpen] = useState(false)

  const result = useMemo(() => {
    const points = parseGpxElevation(gpxContent)
    return analyzeStrategy(points)
  }, [gpxContent])

  if (!result) return null

  const diffColor = DIFFICULTY_COLOR[result.difficultyLabel]

  return (
    <>
      {/* 토글 버튼 */}
      <Box sx={{ position: 'absolute', top: 'calc(50% + 56px)', right: 16, zIndex: 11 }}>
        <IconButton
          onClick={() => setOpen((o) => !o)}
          title="레이스 전략"
          sx={{
            bgcolor: open ? '#1565c0' : 'rgba(255,255,255,0.95)',
            color: open ? '#fff' : 'inherit',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            '&:hover': { bgcolor: open ? '#1976d2' : '#fff' },
          }}
        >
          <EmojiEventsIcon />
        </IconButton>
      </Box>

      {/* 전략 패널 */}
      {open && (
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '56px', md: '64px' },
            right: 0,
            bottom: 0,
            width: { xs: '100%', sm: 360 },
            zIndex: 10,
            bgcolor: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            borderLeft: '1px solid rgba(0,0,0,0.09)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 헤더 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              pt: 2,
              pb: 1.5,
              position: 'sticky',
              top: 0,
              bgcolor: 'rgba(255,255,255,0.97)',
              zIndex: 1,
              borderBottom: '1px solid rgba(0,0,0,0.07)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmojiEventsIcon sx={{ color: '#1565c0', fontSize: 20 }} />
              <Typography variant="subtitle2" fontWeight={700}>
                레이스 전략
              </Typography>
            </Box>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ px: 2, py: 1.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* 코스 요약 */}
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={700}
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                코스 요약
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 1,
                }}
              >
                {[
                  { label: '총 거리', value: `${result.totalKm} km` },
                  {
                    label: '난이도',
                    value: (
                      <Chip
                        label={result.difficultyLabel}
                        size="small"
                        sx={{
                          bgcolor: diffColor,
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          height: 20,
                        }}
                      />
                    ),
                  },
                  { label: '누적 상승', value: `+${result.totalAscent} m` },
                  { label: '누적 하강', value: `-${result.totalDescent} m` },
                ].map(({ label, value }) => (
                  <Box
                    key={label}
                    sx={{
                      bgcolor: '#f5f7fa',
                      borderRadius: 1.5,
                      px: 1.5,
                      py: 1,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" display="block">
                      {label}
                    </Typography>
                    {typeof value === 'string' ? (
                      <Typography variant="body2" fontWeight={700}>
                        {value}
                      </Typography>
                    ) : (
                      <Box sx={{ mt: 0.25 }}>{value}</Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider />

            {/* 페이싱 전략 */}
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={700}
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                페이싱 전략
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  bgcolor: '#e8f0fe',
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 1.2,
                  borderLeft: '3px solid #1565c0',
                }}
              >
                <Typography variant="body2" lineHeight={1.6}>
                  {result.pacingAdvice}
                </Typography>
              </Box>
            </Box>

            {/* 가장 힘든 구간 */}
            {result.hardestClimb && (
              <>
                <Divider />
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={700}
                    sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
                  >
                    주요 고비 구간
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      bgcolor: '#fff3e0',
                      borderRadius: 1.5,
                      px: 1.5,
                      py: 1.2,
                      borderLeft: '3px solid #fb8c00',
                    }}
                  >
                    <Typography variant="body2" fontWeight={700}>
                      {Math.round(result.hardestClimb.startKm)}~{Math.round(result.hardestClimb.endKm)} km 경사{' '}
                      {result.hardestClimb.gradient}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      이 구간 진입 전 에너지젤 보충 및 페이스 의식적으로 조절하세요.
                    </Typography>
                  </Box>
                </Box>
              </>
            )}

            <Divider />

            {/* 구간별 조언 */}
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={700}
                sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
              >
                구간별 조언
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                {result.sectionAdvice.map(({ km, advice, icon }) => (
                  <Box
                    key={km}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      bgcolor: '#f5f7fa',
                      borderRadius: 1.5,
                      px: 1.5,
                      py: 1,
                    }}
                  >
                    <Typography fontSize={18} lineHeight={1.4} sx={{ flexShrink: 0 }}>
                      {icon}
                    </Typography>
                    <Box>
                      <Typography variant="caption" fontWeight={700} color="primary">
                        {km}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary" lineHeight={1.5}>
                        {advice}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ pb: 1 }}>
              <Typography variant="caption" color="text.disabled" display="block" textAlign="center">
                * GPX 고도 데이터 기반 자동 분석 (프로토타입)
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}
