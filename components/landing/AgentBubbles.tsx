"use client"

import React from "react"
import { DotPattern } from "@/components/ui/dot-pattern"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"

export default function AgentBubbles() {
  const Node = ({ label }: { label: string }) => (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 bg-white text-[11px] text-black/70 shadow-sm">
      {label}
    </div>
  )

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6">
      <div className="absolute inset-0">
        <DotPattern className="text-black/10" />
      </div>
      <div className="relative z-10 flex items-center justify-center py-6">
        <div className="relative h-72 w-72">
          {/* Outer subtle ring */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10" style={{ width: 280, height: 280 }} />
          {/* Inner ring */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/15" style={{ width: 200, height: 200 }} />

          {/* Center */}
          <div className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white text-sm font-medium text-black/70 shadow">
            Analysis Engine
          </div>

          <OrbitingCircles radius={100} iconSize={40} className="[--duration:18s]">
            <Node label="Historical" />
            <Node label="Earnings" />
            <Node label="Macro" />
            <Node label="News" />
            <Node label="Filings" />
            <Node label="Validate" />
          </OrbitingCircles>
        </div>
      </div>
    </div>
  )
}


