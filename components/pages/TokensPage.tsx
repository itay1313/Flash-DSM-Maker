'use client'

export default function TokensPage() {
  const tokenCategories = [
    {
      name: 'Colors',
      tokens: [
        { name: 'primary', value: '#6366f1', type: 'color' },
        { name: 'secondary', value: '#8b5cf6', type: 'color' },
        { name: 'success', value: '#10b981', type: 'color' },
        { name: 'error', value: '#ef4444', type: 'color' },
      ],
    },
    {
      name: 'Typography',
      tokens: [
        { name: 'font-family', value: 'Inter, sans-serif', type: 'font' },
        { name: 'font-size-sm', value: '0.875rem', type: 'size' },
        { name: 'font-size-base', value: '1rem', type: 'size' },
        { name: 'font-size-lg', value: '1.125rem', type: 'size' },
      ],
    },
    {
      name: 'Spacing',
      tokens: [
        { name: 'spacing-xs', value: '0.25rem', type: 'size' },
        { name: 'spacing-sm', value: '0.5rem', type: 'size' },
        { name: 'spacing-md', value: '1rem', type: 'size' },
        { name: 'spacing-lg', value: '1.5rem', type: 'size' },
      ],
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Design Tokens</h1>
          <p className="text-gray-400">Manage colors, typography, spacing, and other design tokens</p>
        </div>

        <div className="space-y-6">
          {tokenCategories.map((category) => (
            <div key={category.name} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.tokens.map((token) => (
                  <div
                    key={token.name}
                    className="flex items-center justify-between p-4 bg-gray-950 border border-gray-800 rounded-lg hover:border-indigo-500/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {token.type === 'color' && (
                        <div
                          className="w-8 h-8 rounded border border-gray-700"
                          style={{ backgroundColor: token.value }}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-white">{token.name}</div>
                        <div className="text-xs text-gray-500 font-mono">{token.value}</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs transition-colors">
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

