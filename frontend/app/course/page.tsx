'use client'

import Box from '@mui/material/Box'
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('@/components/Map'), { ssr: false })

export default function CoursePage() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        pt: { xs: '56px', md: '64px' },
        boxSizing: 'border-box',
      }}
    >
      <MapView />
    </Box>
  )
}
