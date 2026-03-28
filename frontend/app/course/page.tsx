'use client'

import { useState } from 'react'
import { Alert, Box, IconButton, Snackbar, Tooltip, Typography } from '@mui/material'
import TerrainIcon from '@mui/icons-material/Terrain'
import { ELEVATION_BANDS } from '@/data/mapStyles'
import dynamic from 'next/dynamic'
import GpxUpload from '@/components/GpxUpload'
import ElevationChart from '@/components/ElevationChart'
import RaceStrategy from '@/components/RaceStrategy'

const MapView = dynamic(() => import('@/components/Map'), { ssr: false })

export default function CoursePage() {
  const [gpxContent, setGpxContent] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [toastOpen, setToastOpen] = useState(false)
  const [colorByElevation, setColorByElevation] = useState(false)

  const handleUpload = (content: string, name: string) => {
    setGpxContent(content)
    setFileName(name)
    setToastOpen(true)
  }

  const handleClear = () => {
    setGpxContent(null)
    setFileName(null)
    setColorByElevation(false)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        pt: { xs: '56px', md: '64px' },
        boxSizing: 'border-box',
      }}
    >
      <MapView gpxContent={gpxContent} colorByElevation={colorByElevation} />
      <GpxUpload fileName={fileName} onUpload={handleUpload} onClear={handleClear} />

      {/* 고도 색상 토글 버튼 */}
      {gpxContent && (
        <Box sx={{ position: 'absolute', top: 'calc(50% - 56px)', right: 16, zIndex: 11 }}>
          <Tooltip title="고도별 색상 표시" placement="left">
            <IconButton
              onClick={() => setColorByElevation((v) => !v)}
              sx={{
                bgcolor: colorByElevation ? '#1565c0' : 'rgba(255,255,255,0.95)',
                color: colorByElevation ? '#fff' : 'inherit',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                '&:hover': { bgcolor: colorByElevation ? '#1976d2' : '#fff' },
              }}
            >
              <TerrainIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* 고도 색상 범례 */}
      {gpxContent && colorByElevation && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 32,
            left: 16,
            zIndex: 10,
            bgcolor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: 2,
            px: 1.5,
            py: 1,
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          {ELEVATION_BANDS.map(({ color, label }) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 24, height: 4, bgcolor: color, borderRadius: 1 }} />
              <Typography variant="caption" fontWeight={600}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {gpxContent && <ElevationChart gpxContent={gpxContent} />}
      {gpxContent && <RaceStrategy gpxContent={gpxContent} />}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          GPX 파일 업로드 완료
        </Alert>
      </Snackbar>
    </Box>
  )
}
