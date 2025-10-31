"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { LineChart, CartesianGrid, Line, XAxis } from "recharts"

type Stat = {
  label: string
  value: string
  hint?: string
}

const trendData = [
  { m: "Jan", v: 12 },
  { m: "Feb", v: 18 },
  { m: "Mar", v: 16 },
  { m: "Apr", v: 22 },
  { m: "May", v: 27 },
  { m: "Jun", v: 31 },
]

const chartConfig: ChartConfig = {
  v: { label: "Score", color: "var(--chart-1)" },
}

const STATS: Stat[] = [
  { label: "Avg. report time", value: "2m 45s", hint: "from inputs to draft" },
  { label: "RAG recall", value: "96%", hint: "section‑aware prompts" },
  { label: "Charts per report", value: "10+", hint: "Vega/Recharts mix" },
]

export default function HeroStats() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Compact sparkline card */}
      <Card className="relative overflow-hidden border-black/10 bg-white p-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-xs text-black/60">Confidence trend</div>
            <div className="text-sm font-medium text-black">Validator score</div>
          </div>
          <Badge variant="secondary" className="rounded-full">+4.2%</Badge>
        </div>
        <div className="mt-2">
          <ChartContainer config={chartConfig} className="h-20 w-full">
            <LineChart accessibilityLayer data={trendData} margin={{ left: 6, right: 6, top: 6, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="m" tickLine={false} axisLine={false} tickMargin={4} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line dataKey="v" type="monotone" stroke="var(--color-v)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </div>
      </Card>

      {/* KPI badges */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-lg border border-black/10 bg-white p-3">
            <div className="text-[11px] text-black/50">{s.label}</div>
            <div className="mt-1 text-base font-medium text-black">{s.value}</div>
            {s.hint && <div className="text-[10px] text-black/50">{s.hint}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}


