import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  metadataBase: new URL('https://saurity.com'),
  title: {
    default: 'Saurity - WordPress Login Security Without Admin Lockouts',
    template: '%s | Saurity'
  },
  description: 'WordPress security plugin with progressive rate limiting, zero admin lockout guarantee, and fail-safe design. Protect wp-admin without breaking your site.',
  keywords: ['WordPress security', 'WordPress login security', 'brute force protection', 'WordPress rate limiting', 'wp-admin protection', 'WordPress firewall'],
  authors: [{ name: 'Saurity Team' }],
  creator: 'Saurity',
  publisher: 'Saurity',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/logo.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/logo.svg', sizes: '16x16', type: 'image/svg+xml' },
    ],
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://saurity.com',
    siteName: 'Saurity',
    title: 'Saurity - WordPress Login Security Without Admin Lockouts',
    description: 'WordPress security plugin with progressive rate limiting, zero admin lockout guarantee, and fail-safe design.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saurity WordPress Security',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saurity - WordPress Login Security Without Admin Lockouts',
    description: 'WordPress security plugin with progressive rate limiting and zero admin lockout guarantee.',
    images: ['/og-image.jpg'],
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
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}