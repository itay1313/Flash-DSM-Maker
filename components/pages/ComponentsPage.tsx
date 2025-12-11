'use client'

export default function ComponentsPage() {
  const components = ['Button', 'Input', 'Card', 'Modal', 'Dropdown', 'Checkbox', 'Radio', 'Switch', 'Badge']

  return (
    <div className="min-h-full flex flex-col bg-gray-950">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Design System Components</h1>
          <p className="text-gray-400">Manage and preview your design system components</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <div
              key={component}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all cursor-pointer relative group"
            >
              {/* Green status dot */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full"></div>
              
              {/* Content */}
              <div className="pr-6">
                <h3 className="text-lg font-semibold text-white mb-2">{component}</h3>
                <p className="text-sm text-gray-400 mb-6">Component description and usage</p>
                
                {/* Action buttons */}
                <div className="flex gap-2">
                  <button 
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs font-medium transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      // TODO: Open preview modal
                    }}
                  >
                    Preview
                  </button>
                  <button 
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      // TODO: Open edit modal
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

