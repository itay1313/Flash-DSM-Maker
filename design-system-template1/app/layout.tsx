import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/design-system'
import { SidebarWrapper } from '../components/sidebar-wrapper'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Design System | Modern Component Library',
  description: 'A beautiful, production-ready design system built for modern SaaS applications. Token-driven, accessible, and type-safe.',
  keywords: ['design system', 'component library', 'UI components', 'React', 'TypeScript', 'Tailwind CSS'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navbar />
        <div className="ds-flex ds-min-h-screen ds-pt-16">
          <SidebarWrapper />
          <main className="ds-flex-1 ds-ml-64 ds-min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
