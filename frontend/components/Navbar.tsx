'use client'

import { useState, useEffect } from 'react'
import {
  AppBar,
  Button,
  Box,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoginDialog from './LoginDialog'

const navLinks = [
  { label: '대회분석', href: '/analysis' },
  { label: '코스분석', href: '/course' },
  { label: '서비스 소개', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const transparent = isHome && !scrolled

  return (
    <>
      <AppBar
        position="fixed"
        elevation={transparent ? 0 : 4}
        sx={{
          background: transparent
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)'
            : 'rgba(8,8,15,0.96)',
          backdropFilter: transparent ? 'none' : 'blur(10px)',
          transition: 'background 0.35s ease, box-shadow 0.35s ease',
          borderBottom: transparent ? 'none' : '1px solid rgba(80,143,202,0.12)',
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1280,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 4 },
            minHeight: '64px !important',
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              textDecoration: 'none',
              color: '#fff',
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              letterSpacing: '-0.5px',
              flexShrink: 0,
              '& span': { color: '#00B8FF' },
            }}
          >
            RUN<span>STAT</span>
          </Typography>

          {/* Desktop nav */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  color: pathname === link.href ? '#00B8FF' : 'rgba(255,255,255,0.82)',
                  fontFamily: '"Pretendard", "Noto Sans KR", sans-serif',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  px: 2.5,
                  py: 1,
                  borderRadius: 0,
                  borderBottom:
                    pathname === link.href ? '2px solid #00B8FF' : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                  '&:hover': {
                    color: '#00B8FF',
                    background: 'transparent',
                    borderBottomColor: 'rgba(0,184,255,0.4)',
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <Button
            onClick={() => setLoginOpen(true)}
            variant="outlined"
            sx={{
              display: { xs: 'none', md: 'flex' },
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.4)',
              fontFamily: '"Pretendard", "Noto Sans KR", sans-serif',
              fontSize: '0.85rem',
              px: 2.5,
              py: 0.75,
              borderRadius: '4px',
              '&:hover': {
                borderColor: '#00B8FF',
                color: '#00B8FF',
                background: 'rgba(0,184,255,0.07)',
              },
            }}
          >
            로그인
          </Button>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#fff' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, background: '#0d0d1a', color: '#fff' } }}
      >
        <Box sx={{ px: 3, py: 2.5 }}>
          <Typography
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 800,
              fontSize: '1.2rem',
              color: '#fff',
            }}
          >
            RUN<span style={{ color: '#00B8FF' }}>STAT</span>
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        <List sx={{ pt: 1 }}>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.href}
              component={Link}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              sx={{ '&:hover': { background: 'rgba(0,184,255,0.08)' } }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontFamily: '"Pretendard", sans-serif',
                  color: pathname === link.href ? '#00B8FF' : '#fff',
                  fontSize: '0.95rem',
                }}
              />
            </ListItemButton>
          ))}
          <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.08)' }} />
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false)
              setLoginOpen(true)
            }}
            sx={{ '&:hover': { background: 'rgba(0,184,255,0.08)' } }}
          >
            <ListItemText
              primary="로그인"
              primaryTypographyProps={{
                fontFamily: '"Pretendard", sans-serif',
                color: '#00B8FF',
                fontSize: '0.95rem',
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        </List>
      </Drawer>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
