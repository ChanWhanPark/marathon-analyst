'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Link from 'next/link'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import MapIcon from '@mui/icons-material/Map'
import { stats, features, races, difficultyColor } from '@/data/homeData'

export default function HomePage() {
  return (
    <Box sx={{ background: '#08080f', minHeight: '100vh', color: '#fff' }}>
      {/* ── Hero Section ── */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #090912 0%, #0d1b2e 55%, #090912 100%)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '5%',
              right: '-8%',
              width: 650,
              height: 650,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,184,255,0.07) 0%, transparent 70%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '-10%',
              left: '-8%',
              width: 550,
              height: 550,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(116,7,255,0.06) 0%, transparent 70%)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(0,184,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,255,0.025) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: '22%',
              width: 1,
              height: '100%',
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(0,184,255,0.18) 40%, transparent 100%)',
              transform: 'rotate(12deg) scaleX(2)',
            }}
          />
        </Box>

        <Container
          maxWidth="lg"
          sx={{ position: 'relative', zIndex: 1, pt: { xs: 14, md: 10 }, pb: { xs: 10, md: 14 } }}
        >
          <Box sx={{ maxWidth: 700 }}>
            <Chip
              label="# 마라톤 데이터 분석 플랫폼"
              size="small"
              sx={{
                mb: 3,
                background: 'rgba(0,184,255,0.1)',
                color: '#00B8FF',
                border: '1px solid rgba(0,184,255,0.28)',
                fontFamily: '"Poppins", "Pretendard", sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.8px',
                fontWeight: 600,
              }}
            />
            <Typography
              component="h1"
              sx={{
                fontFamily: '"Poppins", "Pretendard", sans-serif',
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4rem', lg: '4.6rem' },
                lineHeight: 1.1,
                letterSpacing: '-1.5px',
                color: '#fff',
                mb: 2.5,
              }}
            >
              더 스마트하게
              <br />
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #00B8FF 0%, #508fca 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                달리는 방법
              </Box>
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Pretendard", "Noto Sans KR", sans-serif',
                fontSize: { xs: '0.98rem', md: '1.1rem' },
                color: 'rgba(255,255,255,0.55)',
                mb: 5,
                lineHeight: 1.85,
                maxWidth: 500,
              }}
            >
              코스 고도 분석부터 대회 통계까지,
              <br />
              데이터 기반의 마라톤 준비로 퍼스널 베스트를 달성하세요.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                component={Link}
                href="/analysis"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: 'linear-gradient(90deg, #007bbf, #00B8FF)',
                  color: '#fff',
                  fontFamily: '"Pretendard", sans-serif',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: '5px',
                  boxShadow: '0 0 22px rgba(0,184,255,0.28)',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #0090d6, #33c6ff)',
                    boxShadow: '0 0 36px rgba(0,184,255,0.48)',
                  },
                }}
              >
                대회 분석 시작
              </Button>
              <Button
                component={Link}
                href="/course"
                variant="outlined"
                startIcon={<MapIcon />}
                sx={{
                  color: 'rgba(255,255,255,0.82)',
                  borderColor: 'rgba(255,255,255,0.22)',
                  fontFamily: '"Pretendard", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: '5px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#00B8FF',
                    color: '#00B8FF',
                    background: 'rgba(0,184,255,0.06)',
                  },
                }}
              >
                코스 탐색
              </Button>
            </Box>
          </Box>

          {/* Stats row */}
          <Box sx={{ mt: { xs: 8, md: 11 }, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {stats.map((s) => (
              <Box
                key={s.label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '10px',
                  px: 3,
                  py: 2,
                  flex: '1 1 150px',
                  transition: 'border-color 0.3s',
                  '&:hover': { borderColor: 'rgba(0,184,255,0.28)' },
                }}
              >
                {s.icon}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 800,
                      fontSize: '1.45rem',
                      color: '#fff',
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Pretendard", sans-serif',
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.45)',
                      mt: 0.4,
                    }}
                  >
                    {s.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 28,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.28)',
              letterSpacing: '2.5px',
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            SCROLL
          </Typography>
          <Box
            sx={{
              width: 1,
              height: 44,
              background: 'linear-gradient(to bottom, rgba(0,184,255,0.45), transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite',
              '@keyframes scrollPulse': {
                '0%, 100%': { opacity: 0.4 },
                '50%': { opacity: 1 },
              },
            }}
          />
        </Box>
      </Box>

      {/* ── Features Section ── */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: '#0b0b18' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              sx={{
                fontFamily: '"Poppins", "Pretendard", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.8rem', md: '2.3rem' },
                color: '#fff',
                mb: 2,
              }}
            >
              무엇을 분석할 수 있나요?
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Pretendard", sans-serif',
                color: 'rgba(255,255,255,0.45)',
                fontSize: '1rem',
                maxWidth: 440,
                mx: 'auto',
              }}
            >
              마라톤 완주를 위한 모든 데이터를 한 곳에서
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {features.map((f) => (
              <Grid size={{ xs: 12, md: 4 }} key={f.title}>
                <Card
                  component={Link}
                  href={f.href}
                  sx={{
                    height: '100%',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.065)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(0,184,255,0.04)',
                      border: '1px solid rgba(0,184,255,0.22)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 18px 44px rgba(0,0,0,0.45)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 3,
                      }}
                    >
                      {f.icon}
                      {f.badge && (
                        <Chip
                          label={f.badge}
                          size="small"
                          sx={{
                            background: `${f.badgeColor}18`,
                            color: f.badgeColor,
                            border: `1px solid ${f.badgeColor}40`,
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            height: 22,
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: '"Pretendard", sans-serif',
                        fontWeight: 700,
                        fontSize: '1.15rem',
                        color: '#fff',
                        mb: 1.5,
                      }}
                    >
                      {f.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Pretendard", sans-serif',
                        color: 'rgba(255,255,255,0.48)',
                        fontSize: '0.88rem',
                        lineHeight: 1.75,
                      }}
                    >
                      {f.desc}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mt: 3.5,
                        color: '#00B8FF',
                        fontSize: '0.83rem',
                        fontFamily: '"Pretendard", sans-serif',
                        fontWeight: 600,
                      }}
                    >
                      자세히 보기 <ArrowForwardIcon sx={{ fontSize: 15 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Upcoming Races Section ── */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: '#08080f' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mb: { xs: 5, md: 7 },
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: '"Poppins", "Pretendard", sans-serif',
                  fontWeight: 700,
                  fontSize: { xs: '1.8rem', md: '2.3rem' },
                  color: '#fff',
                  mb: 0.8,
                }}
              >
                주요 마라톤 대회
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Pretendard", sans-serif',
                  color: 'rgba(255,255,255,0.42)',
                  fontSize: '0.92rem',
                }}
              >
                2026년 주요 국내 마라톤 일정
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/analysis"
              endIcon={<ArrowForwardIcon />}
              sx={{
                color: '#00B8FF',
                fontFamily: '"Pretendard", sans-serif',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': { background: 'rgba(0,184,255,0.07)' },
              }}
            >
              전체 보기
            </Button>
          </Box>
          <Grid container spacing={3}>
            {races.map((r) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={r.name}>
                <Card
                  sx={{
                    background: r.gradient,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-7px)',
                      boxShadow: '0 22px 52px rgba(0,0,0,0.55)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,0.55) 100%)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      p: '24px !important',
                      minHeight: 210,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <DirectionsRunIcon sx={{ color: 'rgba(255,255,255,0.65)', fontSize: 26 }} />
                      <Chip
                        label={r.difficulty}
                        size="small"
                        sx={{
                          background: 'rgba(0,0,0,0.32)',
                          color: difficultyColor[r.difficulty],
                          border: `1px solid ${difficultyColor[r.difficulty]}50`,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          height: 22,
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: '"Pretendard", sans-serif',
                          fontWeight: 800,
                          fontSize: '1.1rem',
                          color: '#fff',
                          mb: 0.5,
                        }}
                      >
                        {r.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Poppins", sans-serif',
                          fontSize: '0.78rem',
                          color: 'rgba(255,255,255,0.62)',
                          mb: 0.3,
                        }}
                      >
                        {r.date}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Pretendard", sans-serif',
                          fontSize: '0.78rem',
                          color: 'rgba(255,255,255,0.45)',
                        }}
                      >
                        {r.distance}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── CTA Banner ── */}
      <Box
        sx={{
          py: { xs: 9, md: 14 },
          background: 'linear-gradient(135deg, #001525 0%, #000810 50%, #0d0020 100%)',
          borderTop: '1px solid rgba(0,184,255,0.08)',
          borderBottom: '1px solid rgba(0,184,255,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,184,255,0.045) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="sm" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <EmojiEventsIcon sx={{ fontSize: 48, color: '#00B8FF', mb: 2.5, opacity: 0.75 }} />
          <Typography
            sx={{
              fontFamily: '"Poppins", "Pretendard", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1.9rem', md: '2.7rem' },
              color: '#fff',
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            지금 바로 시작하세요
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Pretendard", sans-serif',
              color: 'rgba(255,255,255,0.5)',
              fontSize: { xs: '0.93rem', md: '1rem' },
              mb: 5,
              lineHeight: 1.85,
            }}
          >
            데이터 기반으로 훈련 계획을 세우고,
            <br />
            목표 기록을 달성해보세요.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #007bbf, #00B8FF)',
                color: '#fff',
                fontFamily: '"Pretendard", sans-serif',
                fontWeight: 700,
                fontSize: '0.95rem',
                px: 5,
                py: 1.6,
                borderRadius: '5px',
                boxShadow: '0 0 26px rgba(0,184,255,0.32)',
                textTransform: 'none',
                '&:hover': {
                  boxShadow: '0 0 42px rgba(0,184,255,0.52)',
                  background: 'linear-gradient(90deg, #0090d6, #33c6ff)',
                },
              }}
            >
              무료로 시작하기
            </Button>
            <Button
              component={Link}
              href="/about"
              variant="outlined"
              sx={{
                color: 'rgba(255,255,255,0.72)',
                borderColor: 'rgba(255,255,255,0.18)',
                fontFamily: '"Pretendard", sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                px: 4,
                py: 1.6,
                borderRadius: '5px',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.4)',
                  color: '#fff',
                  background: 'rgba(255,255,255,0.04)',
                },
              }}
            >
              서비스 소개
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── Footer ── */}
      <Box sx={{ py: 4, background: '#05050c', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 800,
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.65)',
              }}
            >
              RUN<span style={{ color: '#00B8FF' }}>STAT</span>
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Pretendard", sans-serif',
                fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.28)',
              }}
            >
              © 2026 RunStat. 마라톤 데이터 분석 플랫폼
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
