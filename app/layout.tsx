import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '走跑高雄2.0 - 規律運動就像一場人生馬拉松',
  description: '走跑高雄2.0是一個結合運動與觀光的活動，讓您透過跑步或健走探索高雄的美景，同時收集獨特的勳章。',
  keywords: ['高雄', '跑步', '健走', '運動', '觀光', '勳章', '景點'],
  openGraph: {
    title: '走跑高雄2.0 - 規律運動就像一場人生馬拉松',
    description: '走跑高雄2.0是一個結合運動與觀光的活動，讓您透過跑步或健走探索高雄的美景，同時收集獨特的勳章。',
    // url: 'https://kaohsiung-run.com',
    siteName: '走跑高雄2.0',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '走跑高雄2.0',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '走跑高雄2.0 - 規律運動就像一場人生馬拉松',
    description: '走跑高雄2.0是一個結合運動與觀光的活動，讓您透過跑步或健走探索高雄的美景，同時收集獨特的勳章。',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={inter.className + " bg-white"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
