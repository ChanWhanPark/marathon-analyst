import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function AnalysisPage() {
  return (
    <Container sx={{ pt: { xs: '80px', md: '88px' }, pb: 6 }}>
      <Typography variant="h4" gutterBottom>
        대회분석
      </Typography>
      <Typography variant="body1" color="text.secondary">
        마라톤 대회 데이터를 분석하는 페이지입니다.
      </Typography>
    </Container>
  )
}
