"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart } from "recharts"

type Stat = {
  label: string
  value: string
  hint?: string
}

const stats: Stat[] = [
  { label: "Data coverage", value: "29+ endpoints", hint: "FMP, Finnhub, Benzinga, SEC" },
  { label: "Freshness", value: "Realtime", hint: "Background agents keep reports current" },
  { label: "Latency", value: "~2–3s", hint: "Fast mode answers via RAG" },
]

const sparkData = [
  { x: 0, y: 14 },
  { x: 1, y: 18 },
  { x: 2, y: 12 },
  { x: 3, y: 22 },
  { x: 4, y: 19 },
  { x: 5, y: 25 },
]

const sparkConfig = {
  y: { label: "Trend", color: "var(--chart-1)" },
} satisfies ChartConfig

export default function HeroStats() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((s, i) => (
        <Card
          key={s.label}
          className="group relative overflow-hidden border-black/10 bg-white/70 p-3 backdrop-blur supports-[backdrop-filter]:bg-white/60"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] text-black/50">{s.label}</div>
              <div className="mt-1 text-sm font-medium text-black/80">{s.value}</div>
            </div>
            <div className="hidden sm:block w-24">
              <ChartContainer config={sparkConfig} className="aspect-[9/3]">
                <LineChart
                  data={sparkData.map((d) => ({ ...d, x: d.x + i }))}
                  margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} horizontal={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Line dataKey="y" stroke="var(--color-y)" strokeWidth={2} dot={false} type="monotone" />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
          {s.hint ? (
            <div className="mt-2 flex flex-wrap items-center gap-1">
              {s.hint.split(", ").map((token) => (
                <Badge key={token} variant="secondary" className="h-5 rounded-full px-2 text-[10px]">
                  {token}
                </Badge>
              ))}
            </div>
          ) : null}
        </Card>
      ))}
    </div>
  )
}


