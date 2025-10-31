"use client"

import React from "react"
import { ChartLineDefault } from "@/components/chart-line-default"
import { ChartBarDefault } from "@/components/chart-bar-default"
import { ChartPieSimple } from "@/components/chart-pie-simple"
import { ChartRadialSimple } from "@/components/chart-radial-simple"

export default function Capabilities() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-28">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif tracking-tight">Capabilities</h2>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <div className="text-sm font-medium">Historical trend</div>
          <div className="text-[12px] text-black/60">Normalized price/metric context</div>
          <ChartLineDefault />
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Earnings vs estimates</div>
          <div className="text-[12px] text-black/60">Consensus and surprises</div>
          <ChartBarDefault />
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">News sentiment mix</div>
          <div className="text-[12px] text-black/60">Benzinga + filings signals</div>
          <ChartPieSimple />
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">Allocation snapshot</div>
          <div className="text-[12px] text-black/60">Template‑guided constraints</div>
          <ChartRadialSimple />
        </div>
      </div>
    </section>
  )
}


