'use client'

export default function ComponentsPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Design System Components</h1>
          <p className="text-gray-400">Manage and preview your design system components</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Button', 'Input', 'Card', 'Modal', 'Dropdown', 'Checkbox', 'Radio', 'Switch', 'Badge'].map((component) => (
            <div
              key={component}
              className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-indigo-500/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{component}</h3>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-500">Component description and usage</p>
              <div className="mt-4 flex space-x-2">
                <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs transition-colors">
                  Preview
                </button>
                <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

