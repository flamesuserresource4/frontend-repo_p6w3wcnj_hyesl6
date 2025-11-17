import React from 'react'

export default function ProgressBar({ value }) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#FFA500] to-[#FFD54F] rounded-full transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
