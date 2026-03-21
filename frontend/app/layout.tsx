import type { Metadata } from 'next'
import ThemeRegistry from '@/components/ThemeRegistry'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'RunStat - 마라톤 데이터 분석',
  description: '코스 고도 분석부터 대회 통계까지, 데이터 기반의 마라톤 분석 플랫폼',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ThemeRegistry>
          <Navbar />
          <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  )
}
