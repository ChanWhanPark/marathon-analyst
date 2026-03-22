import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PlaceIcon from '@mui/icons-material/Place'
import AssessmentIcon from '@mui/icons-material/Assessment'
import { raceReports, analysisLevelColor } from '@/data/analysisData'

export default function AnalysisPage() {
  return (
    <Box sx={{ pt: { xs: '56px', md: '64px' }, pb: 8, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Hero */}
      <Box sx={{ bgcolor: '#0d1b2a', color: '#fff', py: { xs: 5, md: 7 } }}>
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ color: '#90caf9', letterSpacing: 3 }}>
            RACE REPORT
          </Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5, mb: 1.5 }}>
            대회분석
          </Typography>
          <Typography variant="body1" sx={{ color: '#b0bec5', mb: 4 }}>
            마라톤·러닝 대회의 완주율, 기록 분포, 페이스 분석 등 심층 통계 리포트를 제공합니다.
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#90caf9' }}>
                {raceReports.length}
              </Typography>
              <Typography variant="caption" sx={{ color: '#78909c' }}>
                개 대회
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#90caf9' }}>
                {raceReports.length}
              </Typography>
              <Typography variant="caption" sx={{ color: '#78909c' }}>
                개 리포트
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Race list */}
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {raceReports.map((race) => (
            <Box
              key={race.id}
              sx={{
                bgcolor: '#fff',
                borderRadius: 2,
                boxShadow: '0 1px 8px rgba(0,0,0,0.08)',
                p: { xs: 2.5, md: 3.5 },
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.13)' },
              }}
            >
              {/* Name + scope */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 1,
                  flexWrap: 'wrap',
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  {race.name}
                </Typography>
                <Chip
                  label={race.scope}
                  size="small"
                  sx={{
                    bgcolor: race.scope === 'Full Scope' ? '#e8f5e9' : '#e3f2fd',
                    color: race.scope === 'Full Scope' ? '#2e7d32' : '#1565c0',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                />
              </Box>

              {/* Date + Location */}
              <Box sx={{ display: 'flex', gap: 2.5, mt: 1, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {race.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PlaceIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {race.location}
                  </Typography>
                </Box>
              </Box>

              {/* Description */}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7 }}>
                {race.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Footer: race types + level + published */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 1.5,
                }}
              >
                <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                  {race.raceTypes.map((type) => (
                    <Chip key={type} label={type} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AssessmentIcon sx={{ fontSize: 15, color: analysisLevelColor[race.analysisLevel] ?? '#555' }} />
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      sx={{ color: analysisLevelColor[race.analysisLevel] ?? '#555' }}
                    >
                      {race.analysisLevel}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.disabled">
                    분석 공개일 {race.publishedAt}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
