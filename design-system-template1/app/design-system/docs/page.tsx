import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { BookOpen, Code, Palette, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/design-system'

export default function DocsPage() {
  return (
    <div className="ds-min-h-screen ds-bg-background">
      <div className="ds-max-w-4xl ds-mx-auto ds-px-6 ds-py-12">
        {/* Header */}
        <div className="ds-mb-12">
          <div className="ds-inline-flex ds-items-center ds-gap-2 ds-px-4 ds-py-2 ds-rounded-full ds-bg-primary-100 ds-text-primary-700 ds-text-sm ds-font-medium ds-mb-6 ds-border ds-border-primary-200">
            <BookOpen className="ds-w-4 ds-h-4" />
            <span>Documentation</span>
          </div>
          <h1 className="ds-text-4xl md:ds-text-5xl ds-font-bold ds-mb-4 ds-text-text ds-leading-tight">
            Design System Documentation
          </h1>
          <p className="ds-text-xl ds-text-text-secondary ds-leading-relaxed ds-max-w-2xl">
            Learn how to use the design system, understand design tokens, and follow best practices for building consistent UIs.
          </p>
        </div>

        {/* Quick Links */}
        <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 ds-gap-6 ds-mb-12">
          <Link href="/design-system/docs/getting-started">
            <Card className="ds-h-full ds-group ds-transition-all ds-duration-300 hover:ds-shadow-lg hover:ds-border-primary-200 hover:ds--translate-y-1 ds-cursor-pointer">
              <CardHeader>
                <div className="ds-w-12 ds-h-12 ds-rounded-xl ds-bg-primary-100 ds-flex ds-items-center ds-justify-center ds-mb-4 ds-group-hover:ds-scale-110 ds-transition-transform ds-duration-300">
                  <Zap className="ds-w-6 ds-h-6 ds-text-primary-600" />
                </div>
                <CardTitle className="ds-text-xl">Getting Started</CardTitle>
                <CardDescription className="ds-text-base">
                  Quick start guide to begin using the design system in your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="ds-flex ds-items-center ds-gap-2 ds-text-primary-600 ds-font-medium ds-text-sm">
                  Read Guide
                  <ArrowRight className="ds-w-4 ds-h-4 ds-group-hover:ds-translate-x-1 ds-transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/design-system/docs/tokens">
            <Card className="ds-h-full ds-group ds-transition-all ds-duration-300 hover:ds-shadow-lg hover:ds-border-primary-200 hover:ds--translate-y-1 ds-cursor-pointer">
              <CardHeader>
                <div className="ds-w-12 ds-h-12 ds-rounded-xl ds-bg-secondary-100 ds-flex ds-items-center ds-justify-center ds-mb-4 ds-group-hover:ds-scale-110 ds-transition-transform ds-duration-300">
                  <Palette className="ds-w-6 ds-h-6 ds-text-secondary-600" />
                </div>
                <CardTitle className="ds-text-xl">Design Tokens</CardTitle>
                <CardDescription className="ds-text-base">
                  Understand colors, spacing, typography, and other design tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="ds-flex ds-items-center ds-gap-2 ds-text-secondary-600 ds-font-medium ds-text-sm">
                  View Tokens
                  <ArrowRight className="ds-w-4 ds-h-4 ds-group-hover:ds-translate-x-1 ds-transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/design-system/docs/guidelines">
            <Card className="ds-h-full ds-group ds-transition-all ds-duration-300 hover:ds-shadow-lg hover:ds-border-primary-200 hover:ds--translate-y-1 ds-cursor-pointer">
              <CardHeader>
                <div className="ds-w-12 ds-h-12 ds-rounded-xl ds-bg-info-100 ds-flex ds-items-center ds-justify-center ds-mb-4 ds-group-hover:ds-scale-110 ds-transition-transform ds-duration-300">
                  <Code className="ds-w-6 ds-h-6 ds-text-info-600" />
                </div>
                <CardTitle className="ds-text-xl">Component Guidelines</CardTitle>
                <CardDescription className="ds-text-base">
                  Best practices and patterns for using components effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="ds-flex ds-items-center ds-gap-2 ds-text-info-600 ds-font-medium ds-text-sm">
                  Read Guidelines
                  <ArrowRight className="ds-w-4 ds-h-4 ds-group-hover:ds-translate-x-1 ds-transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/design-system/docs/migration">
            <Card className="ds-h-full ds-group ds-transition-all ds-duration-300 hover:ds-shadow-lg hover:ds-border-primary-200 hover:ds--translate-y-1 ds-cursor-pointer">
              <CardHeader>
                <div className="ds-w-12 ds-h-12 ds-rounded-xl ds-bg-warning-100 ds-flex ds-items-center ds-justify-center ds-mb-4 ds-group-hover:ds-scale-110 ds-transition-transform ds-duration-300">
                  <ArrowRight className="ds-w-6 ds-h-6 ds-text-warning-600" />
                </div>
                <CardTitle className="ds-text-xl">Migration Guide</CardTitle>
                <CardDescription className="ds-text-base">
                  Step-by-step guide to migrate from legacy components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="ds-flex ds-items-center ds-gap-2 ds-text-warning-600 ds-font-medium ds-text-sm">
                  Start Migration
                  <ArrowRight className="ds-w-4 ds-h-4 ds-group-hover:ds-translate-x-1 ds-transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Features */}
        <Card className="ds-mb-12">
          <CardHeader>
            <CardTitle className="ds-text-2xl">What's Included</CardTitle>
            <CardDescription>
              Everything you need to build beautiful, consistent user interfaces
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 ds-gap-4">
              {[
                'Atomic Design Structure',
                'Type-Safe Components',
                'Accessible by Default',
                'Design Tokens System',
                'Comprehensive Documentation',
                'Migration Support',
              ].map((feature) => (
                <div key={feature} className="ds-flex ds-items-center ds-gap-3">
                  <CheckCircle2 className="ds-w-5 ds-h-5 ds-text-success-600 ds-flex-shrink-0" />
                  <span className="ds-text-text">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

