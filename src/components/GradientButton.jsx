import React from 'react'

export default function GradientButton({ children, ...props }) {
  return (
    <button
      {...props}
      className={[
        'inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium',
        'bg-[linear-gradient(90deg,#FFA500_0%,#FFD54F_100%)] text-black',
        'shadow-sm hover:shadow transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-black/20'
      ].join(' ')}
    >
      {children}
    </button>
  )
}
