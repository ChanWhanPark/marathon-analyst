'use client'

import { useRef } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close'

interface GpxUploadProps {
  fileName: string | null
  onUpload: (content: string, fileName: string) => void
  onClear: () => void
}

export default function GpxUpload({ fileName, onUpload, onClear }: GpxUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onUpload(reader.result as string, file.name)
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 32,
        right: 16,
        zIndex: 10,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        borderRadius: 2,
        px: 2,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
        minWidth: 200,
      }}
    >
      <input ref={inputRef} type="file" accept=".gpx" hidden onChange={handleChange} />

      {fileName ? (
        <>
          <UploadFileIcon sx={{ fontSize: 20, color: 'primary.main', flexShrink: 0 }} />
          <Typography
            variant="caption"
            sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {fileName}
          </Typography>
          <IconButton size="small" onClick={onClear} sx={{ ml: 0.5 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      ) : (
        <Button
          startIcon={<UploadFileIcon />}
          size="small"
          onClick={() => inputRef.current?.click()}
          sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
        >
          GPX 파일 업로드
        </Button>
      )}
    </Box>
  )
}
