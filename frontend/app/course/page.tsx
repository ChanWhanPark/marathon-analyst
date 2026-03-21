'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import dynamic from 'next/dynamic'
import GpxUpload from '@/components/GpxUpload'

const MapView = dynamic(() => import('@/components/Map'), { ssr: false })

export default function CoursePage() {
  const [gpxContent, setGpxContent] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleUpload = (content: string, name: string) => {
    setGpxContent(content)
    setFileName(name)
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
    </Box>
  )
}
