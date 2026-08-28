import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import { AppProvider } from '../context/AppContext'

const inter = Inter({ subsets: ['latin'] })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })

export const metadata: Metadata = {
  title: 'TEWEDAJ - Ethiopian Micro & Small Business Platform',
  description: 'Connecting merchants, wholesalers, delivery partners, and customers across Ethiopia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${fraunces.variable}`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
