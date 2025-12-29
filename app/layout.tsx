import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Design System Flow Builder',
  description: 'Node-based builder for design system flows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

