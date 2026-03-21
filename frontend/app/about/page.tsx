import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function AboutPage() {
  return (
    <Container sx={{ pt: { xs: '80px', md: '88px' }, pb: 6 }}>
      <Typography variant="h4" gutterBottom>
        서비스 소개
      </Typography>
      <Typography variant="body1" color="text.secondary">
        마라톤 분석 서비스에 대한 소개 페이지입니다.
      </Typography>
    </Container>
  )
}
