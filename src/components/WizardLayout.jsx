import React from 'react'
import ProgressBar from './ProgressBar'

export default function WizardLayout({ step, total, title, subtitle, children }) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <div className="p-4 border-b border-black/10">
        <div className="max-w-xl mx-auto">
          <ProgressBar value={pct} />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xl">
          <div className="space-y-3 mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            {subtitle && (<p className="text-black/60">{subtitle}</p>)}
          </div>
          <div className="rounded-2xl border border-black/10 p-6 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
