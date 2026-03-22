'use client'

import { useState } from 'react'
import { Alert, Box, Snackbar } from '@mui/material'
import dynamic from 'next/dynamic'
import GpxUpload from '@/components/GpxUpload'

const MapView = dynamic(() => import('@/components/Map'), { ssr: false })

export default function CoursePage() {
  const [gpxContent, setGpxContent] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [toastOpen, setToastOpen] = useState(false)

  const handleUpload = (content: string, name: string) => {
    setGpxContent(content)
    setFileName(name)
    setToastOpen(true)
  }

  const handleClear = () => {
    setGpxContent(null)
    setFileName(null)
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
      <MapView gpxContent={gpxContent} />
      <GpxUpload fileName={fileName} onUpload={handleUpload} onClear={handleClear} />
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
