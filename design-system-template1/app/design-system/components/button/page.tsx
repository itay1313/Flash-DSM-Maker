'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/design-system'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/design-system'
import { Copy, Check, Download, Trash2, Settings, Plus } from 'lucide-react'

export default function ButtonPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const examples = [
    {
      id: 'variants',
      title: 'Variants',
      description: 'Button variants for different use cases',
      code: `import { Button } from '@/design-system'

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`,
      component: (
        <div className="ds-flex ds-gap-3 ds-flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      )
    },
    {
      id: 'sizes',
      title: 'Sizes',
      description: 'Different button sizes for various contexts',
      code: `import { Button } from '@/design-system'

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
      component: (
        <div className="ds-flex ds-gap-3 ds-items-center ds-flex-wrap">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      )
    },
    {
      id: 'icon-buttons',
      title: 'Icon Buttons',
      description: 'Buttons with icons and icon-only buttons',
      code: `import { Button } from '@/design-system'
import { Plus, Settings } from 'lucide-react'

<Button>
  <Plus className="ds-mr-2 ds-h-4 ds-w-4" />
  Add Item
</Button>
<Button size="icon">
  <Settings className="ds-h-4 ds-w-4" />
</Button>`,
      component: (
        <div className="ds-flex ds-gap-3 ds-flex-wrap">
          <Button>
            <Plus className="ds-mr-2 ds-h-4 ds-w-4" />
            Add Item
          </Button>
          <Button size="icon">
            <Settings className="ds-h-4 ds-w-4" />
          </Button>
          <Button size="icon-sm">
            <Plus className="ds-h-3 ds-w-3" />
          </Button>
          <Button size="icon-lg">
            <Settings className="ds-h-5 ds-w-5" />
          </Button>
        </div>
      )
    },
    {
      id: 'states',
      title: 'States',
      description: 'Loading, disabled, and interactive states',
      code: `import { Button } from '@/design-system'

<Button loading>Loading</Button>
<Button disabled>Disabled</Button>
<Button>Normal</Button>`,
      component: (
        <div className="ds-flex ds-gap-3 ds-flex-wrap">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button>Normal</Button>
        </div>
      )
    }
  ]

  return (
    <main className="min-h-screen ds-bg-background">
      <div className="ds-max-w-7xl ds-mx-auto ds-px-4 ds-py-12">
        <div className="ds-mb-8">
          <Link href="/design-system/components" className="ds-text-text-secondary hover:ds-text-text ds-transition-colors">
            ← Back to Components
          </Link>
        </div>

        <div className="ds-mb-12">
          <h1 className="ds-text-4xl ds-font-bold ds-mb-4 ds-text-text">Button</h1>
          <p className="ds-text-lg ds-text-text-secondary ds-max-w-3xl">
            A versatile button component with multiple variants, sizes, and states. 
            Built for accessibility and consistent styling across your application.
          </p>
        </div>

        <div className="ds-space-y-8">
          {examples.map((example) => (
            <Card key={example.id}>
              <CardHeader>
                <div className="ds-flex ds-items-start ds-justify-between">
                  <div>
                    <CardTitle>{example.title}</CardTitle>
                    <CardDescription>{example.description}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyCode(example.code, example.id)}
                  >
                    {copied === example.id ? (
                      <Check className="ds-h-4 ds-w-4" />
                    ) : (
                      <Copy className="ds-h-4 ds-w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="ds-space-y-4">
                  <div className="ds-p-6 ds-rounded-lg ds-bg-background-secondary ds-border ds-border-border">
                    {example.component}
                  </div>
                  <details className="ds-group">
                    <summary className="ds-cursor-pointer ds-text-sm ds-font-medium ds-text-text-secondary hover:ds-text-text ds-transition-colors">
                      View Code
                    </summary>
                    <pre className="ds-mt-2 ds-p-4 ds-rounded-lg ds-bg-background ds-border ds-border-border ds-text-sm ds-font-mono ds-overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </details>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Reference */}
        <Card className="ds-mt-12">
          <CardHeader>
            <CardTitle>API Reference</CardTitle>
            <CardDescription>Button component props and types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="ds-overflow-x-auto">
              <table className="ds-w-full ds-text-sm">
                <thead>
                  <tr className="ds-border-b ds-border-border">
                    <th className="ds-text-left ds-py-2 ds-px-4 ds-font-semibold">Prop</th>
                    <th className="ds-text-left ds-py-2 ds-px-4 ds-font-semibold">Type</th>
                    <th className="ds-text-left ds-py-2 ds-px-4 ds-font-semibold">Default</th>
                    <th className="ds-text-left ds-py-2 ds-px-4 ds-font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="ds-divide-y ds-divide-border">
                  <tr>
                    <td className="ds-py-2 ds-px-4 ds-font-mono ds-text-xs">variant</td>
                    <td className="ds-py-2 ds-px-4">'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'</td>
                    <td className="ds-py-2 ds-px-4">'primary'</td>
                    <td className="ds-py-2 ds-px-4">Visual style variant</td>
                  </tr>
                  <tr>
                    <td className="ds-py-2 ds-px-4 ds-font-mono ds-text-xs">size</td>
                    <td className="ds-py-2 ds-px-4">'sm' | 'md' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'</td>
                    <td className="ds-py-2 ds-px-4">'md'</td>
                    <td className="ds-py-2 ds-px-4">Button size</td>
                  </tr>
                  <tr>
                    <td className="ds-py-2 ds-px-4 ds-font-mono ds-text-xs">loading</td>
                    <td className="ds-py-2 ds-px-4">boolean</td>
                    <td className="ds-py-2 ds-px-4">false</td>
                    <td className="ds-py-2 ds-px-4">Show loading spinner</td>
                  </tr>
                  <tr>
                    <td className="ds-py-2 ds-px-4 ds-font-mono ds-text-xs">asChild</td>
                    <td className="ds-py-2 ds-px-4">boolean</td>
                    <td className="ds-py-2 ds-px-4">false</td>
                    <td className="ds-py-2 ds-px-4">Render as child component (Radix Slot)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

