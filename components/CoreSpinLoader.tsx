'use client'

import React, { useState, useEffect } from 'react'

export function CoreSpinLoader() {
  const [loadingText, setLoadingText] = useState('Initializing')

  useEffect(() => {
    const states = ['Loading...', 'Fetching Data..', 'Syncing...', 'Processing..', 'Optimizing...']
    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % states.length
      setLoadingText(states[i])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f5f1e8] dark:bg-[#0c0c0c] transition-colors duration-500">
      <div className="flex flex-col items-center justify-center gap-12">
        <div className="relative w-32 h-32 flex items-center justify-center">

          {/* Base Glow */}
          <div className="
            absolute inset-0 rounded-full blur-2xl animate-pulse
            bg-orange-400/20
            dark:bg-orange-500/15
          " />

          {/* Outer Dashed Ring */}
          <div className="
            absolute inset-0 rounded-full border border-dashed
            border-[#c2410c]/40
            dark:border-orange-500/20
            animate-[spin_10s_linear_infinite]
          " />

          {/* Main Arc */}
          <div className="
            absolute inset-2 rounded-full border-2 border-transparent
            border-t-[#c2410c]
            dark:border-t-orange-400
            shadow-[0_0_12px_rgba(194,65,12,0.5)]
            dark:shadow-[0_0_15px_rgba(249,115,22,0.4)]
            animate-[spin_2s_linear_infinite]
          " />

          {/* Reverse Arc */}
          <div className="
            absolute inset-6 rounded-full border-2 border-transparent
            border-b-orange-600
            dark:border-b-amber-500
            shadow-[0_0_8px_rgba(234,88,12,0.4)]
            dark:shadow-[0_0_12px_rgba(245,158,11,0.4)]
            animate-[spin_3s_linear_infinite_reverse]
          " />

          {/* Inner Fast Ring */}
          <div className="
            absolute inset-10 rounded-full border border-transparent
            border-l-orange-700/60
            dark:border-l-[#f5f1e8]/50
            animate-[spin_1s_ease-in-out_infinite]
          " />

          {/* Orbital Dot */}
          <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
            <div className="
              absolute top-0 left-1/2 -translate-x-1/2
              w-2 h-2 rounded-full
              bg-orange-600
              dark:bg-orange-400
              shadow-[0_0_6px_rgba(234,88,12,0.9)]
              dark:shadow-[0_0_10px_rgba(249,115,22,0.8)]
            " />
          </div>

          {/* Center Core */}
          <div className="
            absolute w-4 h-4 rounded-full animate-pulse
            bg-[#c2410c]
            dark:bg-[#f5f1e8]
            shadow-[0_0_10px_rgba(194,65,12,0.6)]
            dark:shadow-[0_0_15px_rgba(245,241,232,0.8)]
          " />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-4 justify-center">
          <span className="text-[10px] font-black tracking-[0.5em] uppercase text-zinc-400 dark:text-zinc-600">System Ready</span>
          <div className="h-8 overflow-hidden flex items-center justify-center">
            <span
              key={loadingText}
              className="
                text-xs font-black tracking-[0.3em] uppercase
                text-[#c2410c]
                dark:text-orange-200/70
                animate-[fade-in-up_0.5s_ease-out]
              "
            >
              {loadingText}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
