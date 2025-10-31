"use client"

import React from "react"
import { DotPattern } from "@/components/ui/dot-pattern"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"

const Node = ({ label }: { label: string }) => (
  <div className="flex size-9 items-center justify-center rounded-full border border-black/20 bg-white text-[11px] text-black/70 shadow-sm">
    {label}
  </div>
)

export default function AgentBubbles() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white">
      <div className="absolute inset-0">
        <DotPattern className="text-black/5" />
      </div>
      <div className="relative z-10 grid place-items-center p-8">
        <div className="relative h-72 w-72">
          <div className="absolute inset-0 m-auto flex h-36 w-36 items-center justify-center rounded-full border border-black/20 bg-white text-[13px] font-medium text-black/70 shadow">
            Analysis Engine
          </div>
          <div className="absolute inset-0 m-auto h-56 w-56 rounded-full border border-black/10" />
          <OrbitingCircles radius={110} iconSize={36}>
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


