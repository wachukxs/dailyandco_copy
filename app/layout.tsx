import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: 'DAilY & Co. - Modern E-Commerce',
  description: 'Discover beautiful products at DAilY & Co.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}

