'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  return (
    <div className="h-full flex flex-col">
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your application preferences</p>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* General Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">General</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Auto-save</div>
                  <div className="text-sm text-gray-400">Automatically save your work</div>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    autoSave ? 'bg-indigo-500' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      autoSave ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Notifications</div>
                  <div className="text-sm text-gray-400">Receive notifications about updates</div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications ? 'bg-indigo-500' : 'bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Appearance</h2>
            <div className="space-y-3">
              <label className="block">
                <span className="text-gray-300 mb-2 block">Theme</span>
                <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                  <option>Dark</option>
                  <option>Light</option>
                  <option>System</option>
                </select>
              </label>
            </div>
          </div>

          {/* AI Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">AI Configuration</h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-300 mb-2 block">AI Model</span>
                <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
                  <option>GPT-4</option>
                  <option>Claude 3</option>
                  <option>Gemini Pro</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-300 mb-2 block">API Key</span>
                <input
                  type="password"
                  placeholder="Enter your API key"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500"
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              Save Changes
            </button>
            <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors">
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

