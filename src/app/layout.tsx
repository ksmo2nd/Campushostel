import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CampusHostel - Nigerian Student Hostel Booking Platform',
  description: 'Find and book student hostels near Nigerian universities. Modern, secure, and easy to use platform for students, agents, and administrators.',
  keywords: 'student hostel, Nigeria, university accommodation, hostel booking, student housing',
  authors: [{ name: 'CampusHostel Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}