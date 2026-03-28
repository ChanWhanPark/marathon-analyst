'use client'

import { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import CloseIcon from '@mui/icons-material/Close'
import { parseGpxElevation } from '@/utils/parseGpxElevation'

interface Props {
  gpxContent: string
}

type SizeKey = 'S' | 'M' | 'L'

const SIZE_CONFIG: Record<SizeKey, { vh: number; pad: { top: number; right: number; bottom: number; left: number } }> =
  {
    S: { vh: 100, pad: { top: 12, right: 20, bottom: 28, left: 44 } },
    M: { vh: 150, pad: { top: 16, right: 20, bottom: 30, left: 48 } },
    L: { vh: 220, pad: { top: 20, right: 20, bottom: 32, left: 52 } },
  }

const VW = 600

export default function ElevationChart({ gpxContent }: Props) {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<SizeKey>('M')

  const points = useMemo(() => parseGpxElevation(gpxContent), [gpxContent])

  if (points.length < 2) return null

  const { vh: VH, pad: PAD } = SIZE_CONFIG[size]
  const CW = VW - PAD.left - PAD.right
  const CH = VH - PAD.top - PAD.bottom

  const maxDist = points[points.length - 1].distKm
  const elevations = points.map((p) => p.ele)
  const minEle = Math.min(...elevations)
  const maxEle = Math.max(...elevations)
  const eleRange = maxEle - minEle || 1

  const sx = (d: number) => PAD.left + (d / maxDist) * CW
  const sy = (e: number) => PAD.top + CH - ((e - minEle) / eleRange) * CH
  const bottomY = PAD.top + CH

  const linePoints = points.map((p) => `${sx(p.distKm)},${sy(p.ele)}`).join(' ')
  const areaPath =
    `M ${sx(0)},${bottomY} L ${sx(0)},${sy(points[0].ele)} ` +
    points
      .slice(1)
      .map((p) => `L ${sx(p.distKm)},${sy(p.ele)}`)
      .join(' ') +
    ` L ${sx(maxDist)},${bottomY} Z`

  const kmStep = maxDist > 35 ? 5 : maxDist > 15 ? 3 : 1
  const kmTicks: number[] = []
  for (let k = 0; k <= maxDist; k += kmStep) kmTicks.push(Math.round(k * 10) / 10)

  const rawStep = eleRange / 3
  const eleStep = Math.ceil(rawStep / 10) * 10 || 10
  const eleTicks: number[] = []
  for (let e = Math.ceil(minEle / 10) * 10; e <= maxEle + eleStep; e += eleStep) {
    if (e <= maxEle + 1) eleTicks.push(e)
  }

  const totalAscent = Math.round(
    points.reduce((acc, p, i) => {
      if (i === 0) return acc
      const diff = p.ele - points[i - 1].ele
      return acc + (diff > 0 ? diff : 0)
    }, 0)
  )

  return (
    <>
      {/* 토글 버튼 */}
      <Box sx={{ position: 'absolute', top: '50%', right: 16, zIndex: 11 }}>
        <IconButton
          onClick={() => setOpen((o) => !o)}
          title="고도 차트"
          sx={{
            bgcolor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            '&:hover': { bgcolor: '#fff' },
          }}
        >
          <ShowChartIcon color={open ? 'primary' : 'inherit'} />
        </IconButton>
      </Box>

      {/* 차트 패널 */}
      {open && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9,
            bgcolor: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(0,0,0,0.09)',
            px: { xs: 2, md: 3 },
            pt: 1.5,
            pb: 1,
          }}
        >
          {/* 헤더 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary">
              고도 프로파일 &nbsp;·&nbsp; {maxDist.toFixed(1)} km &nbsp;·&nbsp; 최저 {Math.round(minEle)} m
              &nbsp;·&nbsp; 최고 {Math.round(maxEle)} m &nbsp;·&nbsp; 누적 상승 {totalAscent} m
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* 크기 선택 */}
              <ToggleButtonGroup
                value={size}
                exclusive
                onChange={(_, v) => v && setSize(v)}
                size="small"
                sx={{ height: 24 }}
              >
                {(['S', 'M', 'L'] as SizeKey[]).map((s) => (
                  <ToggleButton
                    key={s}
                    value={s}
                    sx={{ px: 1, py: 0, fontSize: '0.65rem', fontWeight: 700, lineHeight: 1 }}
                  >
                    {s}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              <IconButton size="small" onClick={() => setOpen(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* SVG 차트 */}
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            aria-label="고도 프로파일 차트"
          >
            <defs>
              <linearGradient id="eleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1565c0" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#1565c0" stopOpacity="0.03" />
              </linearGradient>
            </defs>

            {eleTicks.map((e) => (
              <line
                key={e}
                x1={PAD.left}
                y1={sy(e)}
                x2={VW - PAD.right}
                y2={sy(e)}
                stroke="#e0e0e0"
                strokeWidth="0.8"
              />
            ))}

            <path d={areaPath} fill="url(#eleGrad)" />
            <polyline points={linePoints} fill="none" stroke="#1565c0" strokeWidth="1.8" strokeLinejoin="round" />

            <line x1={PAD.left} y1={bottomY} x2={VW - PAD.right} y2={bottomY} stroke="#bdbdbd" strokeWidth="1" />

            {kmTicks.map((k) => (
              <g key={k}>
                <line x1={sx(k)} y1={bottomY} x2={sx(k)} y2={bottomY + 4} stroke="#bdbdbd" strokeWidth="1" />
                <text x={sx(k)} y={VH - 4} textAnchor="middle" fontSize="9" fill="#757575">
                  {k}km
                </text>
              </g>
            ))}

            {eleTicks.map((e) => (
              <text key={e} x={PAD.left - 5} y={sy(e) + 3.5} textAnchor="end" fontSize="9" fill="#757575">
                {Math.round(e)}m
              </text>
            ))}
          </svg>
        </Box>
      )}
    </>
  )
}
