import Link from 'next/link'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { 
  Sparkles, 
  Shield, 
  Code, 
  Zap, 
  Layers, 
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Palette,
  MousePointer,
  Layout,
  FormInput
} from 'lucide-react'

export default function Home() {
  return (
    <main className="ds-min-h-screen ds-bg-background">
      {/* Hero Section */}
      <section className="ds-relative ds-overflow-hidden ds-border-b ds-border-border">
        <div className="ds-absolute ds-inset-0 ds-bg-gradient-to-br ds-from-primary-50/50 ds-via-background ds-to-secondary-50/30" />
        <div className="ds-relative ds-max-w-7xl ds-mx-auto ds-px-6 ds-py-24 md:ds-py-32 lg:ds-py-40">
          <div className="ds-text-center ds-max-w-4xl ds-mx-auto">
            <div className="ds-inline-flex ds-items-center ds-gap-2 ds-px-4 ds-py-2 ds-rounded-full ds-bg-primary-100 ds-text-primary-700 ds-text-sm ds-font-medium ds-mb-8 ds-border ds-border-primary-200">
              <Sparkles className="ds-w-4 ds-h-4" />
              <span>Production-Ready Design System</span>
            </div>
            
            <h1 className="ds-text-5xl md:ds-text-6xl lg:ds-text-7xl ds-font-bold ds-mb-6 ds-text-text ds-leading-tight ds-tracking-tight">
              Build Beautiful,
              <span className="ds-block ds-mt-2 ds-bg-gradient-to-r ds-from-primary-600 ds-to-secondary-600 ds-bg-clip-text ds-text-transparent">
                Consistent UIs
              </span>
            </h1>
            
            <p className="ds-text-xl md:ds-text-2xl ds-text-text-secondary ds-mb-10 ds-leading-relaxed ds-max-w-2xl ds-mx-auto">
              A comprehensive, accessible design system built for modern SaaS applications. 
              Token-driven, type-safe, and ready to scale.
            </p>
            
            <div className="ds-flex ds-flex-col sm:ds-flex-row ds-gap-4 ds-justify-center ds-items-center">
              <Button size="lg" className="ds-group ds-text-base ds-px-8" asChild>
                <Link href="/design-system">
                  Explore Components
                  <ArrowRight className="ds-ml-2 ds-w-5 ds-h-5 ds-group-hover:ds-translate-x-1 ds-transition-transform" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" className="ds-text-base ds-px-8" asChild>
                <Link href="/design-system/tokens">
                  <Palette className="ds-mr-2 ds-w-5 ds-h-5" />
                  Design Tokens
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="ds-py-24 ds-bg-background">
        <div className="ds-max-w-7xl ds-mx-auto ds-px-6">
          <div className="ds-text-center ds-mb-16">
            <h2 className="ds-text-3xl md:ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">
              Everything You Need
            </h2>
            <p className="ds-text-lg ds-text-text-secondary ds-max-w-2xl ds-mx-auto">
              Built with modern best practices and production-ready patterns
            </p>
          </div>

          <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 lg:ds-grid-cols-3 ds-gap-6">
            {[
              {
                icon: Palette,
                title: 'Token-Driven',
                description: 'All design tokens defined as CSS variables for easy theming, dark mode support, and consistent design language.',
                color: 'primary'
              },
              {
                icon: Shield,
                title: 'Accessible',
                description: 'WCAG 2.1 AA compliant components built on Radix UI primitives with full keyboard navigation and screen reader support.',
                color: 'success'
              },
              {
                icon: Code,
                title: 'Type-Safe',
                description: 'Full TypeScript support with strongly typed component APIs, variant props, and IntelliSense for faster development.',
                color: 'info'
              },
              {
                icon: Zap,
                title: 'Production-Ready',
                description: 'Battle-tested components with loading states, error handling, and comprehensive edge cases covered.',
                color: 'warning'
              },
              {
                icon: Layers,
                title: 'Composable',
                description: 'Build complex UIs from simple primitives. Components work together seamlessly across your application.',
                color: 'secondary'
              },
              {
                icon: BookOpen,
                title: 'Well-Documented',
                description: 'Comprehensive documentation with live examples, API references, and usage guidelines.',
                color: 'error'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card 
                  key={index}
                  className="ds-group ds-transition-all ds-duration-300 hover:ds-shadow-lg hover:ds-border-primary-200 hover:ds--translate-y-1"
                >
                  <CardHeader>
                    <div className={`ds-w-12 ds-h-12 ds-rounded-xl ds-bg-${feature.color}-100 ds-flex ds-items-center ds-justify-center ds-mb-4 ds-group-hover:ds-scale-110 ds-transition-transform ds-duration-300`}>
                      <Icon className={`ds-w-6 ds-h-6 ds-text-${feature.color}-600`} />
                    </div>
                    <CardTitle className="ds-text-xl">{feature.title}</CardTitle>
                    <CardDescription className="ds-text-base ds-leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="ds-py-24 ds-bg-background-secondary">
        <div className="ds-max-w-6xl ds-mx-auto ds-px-6">
          <div className="ds-text-center ds-mb-16">
            <h2 className="ds-text-3xl md:ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">
              Get Started in Minutes
            </h2>
            <p className="ds-text-lg ds-text-text-secondary ds-max-w-2xl ds-mx-auto">
              Import components, customize tokens, and start building. It's that simple.
            </p>
          </div>
          
          <div className="ds-grid ds-grid-cols-1 lg:ds-grid-cols-2 ds-gap-8 ds-mb-12">
            <Card className="ds-border-2">
              <CardHeader>
                <div className="ds-flex ds-items-center ds-gap-2 ds-mb-2">
                  <div className="ds-w-8 ds-h-8 ds-rounded-lg ds-bg-primary ds-text-text-inverse ds-flex ds-items-center ds-justify-center ds-font-bold">
                    1
                  </div>
                  <CardTitle>Import Components</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="ds-p-4 ds-rounded-lg ds-bg-neutral-900 ds-text-neutral-100 ds-text-sm ds-font-mono ds-overflow-x-auto ds-border ds-border-neutral-800">
                  <code>{`import { 
  Button, 
  TextField, 
  Card 
} from '@/design-system'`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card className="ds-border-2">
              <CardHeader>
                <div className="ds-flex ds-items-center ds-gap-2 ds-mb-2">
                  <div className="ds-w-8 ds-h-8 ds-rounded-lg ds-bg-primary ds-text-text-inverse ds-flex ds-items-center ds-justify-center ds-font-bold">
                    2
                  </div>
                  <CardTitle>Use Components</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="ds-p-4 ds-rounded-lg ds-bg-neutral-900 ds-text-neutral-100 ds-text-sm ds-font-mono ds-overflow-x-auto ds-border ds-border-neutral-800">
                  <code>{`<Card className="ds-p-6">
  <TextField 
    label="Email" 
    placeholder="you@example.com" 
  />
  <Button>Submit</Button>
</Card>`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* CTA Card */}
          <Card className="ds-border-2 ds-border-primary-200 ds-bg-gradient-to-br ds-from-primary-50 ds-via-background ds-to-secondary-50">
            <CardContent className="ds-p-8">
              <div className="ds-flex ds-flex-col md:ds-flex-row ds-items-center ds-gap-6">
                <div className="ds-flex-shrink-0 ds-w-16 ds-h-16 ds-rounded-2xl ds-bg-primary ds-flex ds-items-center ds-justify-center ds-shadow-lg">
                  <Sparkles className="ds-w-8 ds-h-8 ds-text-text-inverse" />
                </div>
                <div className="ds-flex-1 ds-text-center md:ds-text-left">
                  <h3 className="ds-text-2xl ds-font-bold ds-mb-2 ds-text-text">
                    Ready to Build?
                  </h3>
                  <p className="ds-text-lg ds-text-text-secondary ds-mb-6">
                    Explore all components, see live examples, and copy code snippets. 
                    Everything you need to build beautiful, consistent UIs.
                  </p>
                  <Button size="lg" className="ds-group" asChild>
                    <Link href="/design-system">
                      Browse Component Library
                      <ArrowRight className="ds-ml-2 ds-w-5 ds-h-5 ds-group-hover:ds-translate-x-1 ds-transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Component Preview */}
      <section className="ds-py-24 ds-bg-background">
        <div className="ds-max-w-7xl ds-mx-auto ds-px-6">
          <div className="ds-text-center ds-mb-16">
            <h2 className="ds-text-3xl md:ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">
              Beautiful Components
            </h2>
            <p className="ds-text-lg ds-text-text-secondary ds-max-w-2xl ds-mx-auto">
              Explore our comprehensive component library
            </p>
          </div>

          <div className="ds-grid ds-grid-cols-1 md:ds-grid-cols-2 lg:ds-grid-cols-4 ds-gap-6">
            {[
              { icon: MousePointer, name: 'Buttons', href: '/design-system/primitives/button' },
              { icon: FormInput, name: 'Forms', href: '/design-system/forms' },
              { icon: Layout, name: 'Layout', href: '/design-system/layout' },
              { icon: Palette, name: 'Tokens', href: '/design-system/tokens' }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Link key={index} href={item.href}>
                  <Card className="ds-group ds-transition-all ds-duration-300 hover:ds-shadow-lg hover:ds-border-primary-200 hover:ds--translate-y-1 ds-cursor-pointer">
                    <CardContent className="ds-p-6">
                      <div className="ds-w-12 ds-h-12 ds-rounded-lg ds-bg-primary-100 ds-flex ds-items-center ds-justify-center ds-mb-4 ds-group-hover:ds-bg-primary-200 ds-transition-colors">
                        <Icon className="ds-w-6 ds-h-6 ds-text-primary-600" />
                      </div>
                      <h3 className="ds-text-lg ds-font-semibold ds-text-text">{item.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
