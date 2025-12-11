'use client'

interface SystemComponentsProps {
  designSystemName: string
  availableSystems: { id: string; projectName: string }[]
  onSwitchSystem: (id: string) => void
}

const COMPONENT_CARDS = [
  'Button',
  'Input',
  'Card',
  'Modal',
  'Dropdown',
  'Checkbox',
  'Radio',
  'Switch',
  'Badge',
  'Table',
  'Tabs',
  'Tooltip',
  'Avatar',
  'Breadcrumb',
  'Tag',
]

export default function SystemComponents({ designSystemName, availableSystems, onSwitchSystem }: SystemComponentsProps) {
  return (
    <div className="relative min-h-full bg-gray-950 text-white">
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Design System Components</h1>
          <p className="text-gray-400">Viewing: {designSystemName}</p>
        </div>
      </div>

      <div className="px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPONENT_CARDS.map((name) => (
            <div key={name} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-500/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{name}</h3>
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
              </div>
              <p className="text-sm text-gray-400 mb-4">Component description and usage</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded">Preview</button>
                <button className="px-3 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 rounded">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {availableSystems.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-gray-900 border border-gray-800 rounded-lg p-3 shadow-xl">
          <label className="block text-xs text-gray-400 mb-1">Switch design system</label>
          <select
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => onSwitchSystem(e.target.value)}
            value={availableSystems.find((s) => s.projectName === designSystemName)?.id || ''}
          >
            {availableSystems.map((s) => (
              <option key={s.id} value={s.id}>
                {s.projectName}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}




