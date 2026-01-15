import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  metadataBase: new URL('https://www.saurity.com'),
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.saurity.com',
    siteName: 'Saurity',
    title: 'Saurity v1.0.0 - Enterprise WordPress Security Plugin',
    description: 'Zero false positives. Production-ready WordPress security with smart rate limiting, advanced firewall, honeypot detection, and 3-tier emergency recovery.',
    images: [
      {
        url: 'https://www.saurity.com/HomePage1200_600.webp',
        width: 1200,
        height: 600,
        alt: 'Saurity WordPress Security Dashboard',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saurity v1.0.0 - Enterprise WordPress Security Plugin',
    description: 'Zero false positives. Production-ready WordPress security with smart rate limiting, advanced firewall, and emergency recovery.',
    images: ['https://www.saurity.com/HomePage1200_600.webp'],
    creator: '@saurity',
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
      <head>
        {/* Preconnect to critical Firebase origins to reduce latency */}
        <link rel="preconnect" href="https://saurity-2185d.firebaseapp.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firebaseapp.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://saurity-2185d.firebaseapp.com" />
        <link rel="dns-prefetch" href="https://firebaseapp.com" />
        
        {/* Preconnect to Firebase Auth and API domains */}
        <link rel="preconnect" href="https://identitytoolkit.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://securetoken.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://identitytoolkit.googleapis.com" />
        <link rel="dns-prefetch" href="https://securetoken.googleapis.com" />
        
        {/* Preconnect to Firestore and Storage */}
        <link rel="preconnect" href="https://firestore.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" crossOrigin="anonymous" />
        
        {/* Preconnect to Cloudinary for image CDN */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
