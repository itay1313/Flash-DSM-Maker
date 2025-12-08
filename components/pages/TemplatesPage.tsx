'use client'

export default function TemplatesPage() {
  const templates = [
    {
      name: 'Dashboard Template',
      description: 'Complete dashboard design system with charts and data visualization components',
      category: 'Dashboard',
      preview: '🧭',
      tagColor: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30',
    },
    {
      name: 'Marketing Site',
      description: 'Modern marketing website template with hero sections and CTAs',
      category: 'Marketing',
      preview: '🎨',
      tagColor: 'bg-pink-500/15 text-pink-300 border border-pink-500/30',
    },
    {
      name: 'Design System Starter',
      description: 'Foundation design system with core components and tokens',
      category: 'Foundation',
      preview: '🎯',
      tagColor: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    },
    {
      name: 'E-commerce',
      description: 'E-commerce focused design system with product cards and checkout flows',
      category: 'E-commerce',
      preview: '🛒',
      tagColor: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
    },
  ]

  return (
    <div className="min-h-full flex flex-col bg-[#0b0d13]">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">Templates</h1>
          <p className="text-gray-400 text-sm">Browse and use pre-built design system templates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div
              key={template.name}
              className="group relative rounded-2xl border border-gray-800 bg-[#111624] p-6 md:p-7 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] hover:border-indigo-500/40 hover:shadow-[0_20px_50px_-22px_rgba(99,102,241,0.45)] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl md:text-4xl leading-none">{template.preview}</div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                    <p className="text-sm text-gray-400 max-w-xl">
                      {template.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:self-start">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-lg ${template.tagColor}`}
                  >
                    {template.category}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-end gap-3">
                <button className="md:w-40 w-full px-4 py-2.5 bg-[#5a4ff3] hover:bg-[#4e43e0] text-white rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/25">
                  Use Template
                </button>
                <button className="md:w-28 w-full px-4 py-2.5 bg-gray-800 hover:bg-gray-750 text-gray-100 rounded-lg text-sm font-medium border border-gray-700 transition-colors">
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

