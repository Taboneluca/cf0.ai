"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartLineDefault } from "@/components/chart-line-default"
import { ChartBarDefault } from "@/components/chart-bar-default"
import { ChartPieSimple } from "@/components/chart-pie-simple"
import { ChartRadialSimple } from "@/components/chart-radial-simple"

export default function Capabilities() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-28">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-serif tracking-tight">Capabilities</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-black/10">
          <CardHeader>
            <CardTitle className="text-base">Historical Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">Prices and key metrics over time. Add any series with a prompt.</p>
            <ChartLineDefault />
          </CardContent>
        </Card>

        <Card className="border-black/10">
          <CardHeader>
            <CardTitle className="text-base">Earnings vs Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">Track beats/misses, consensus drift, and guidance adjustments.</p>
            <ChartBarDefault />
          </CardContent>
        </Card>

        <Card className="border-black/10">
          <CardHeader>
            <CardTitle className="text-base">News & Sentiment Mix</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">Benzinga feed summarized with provenance for each headline.</p>
            <ChartPieSimple />
          </CardContent>
        </Card>

        <Card className="border-black/10">
          <CardHeader>
            <CardTitle className="text-base">Allocation Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">Customize buckets to your firm’s framework and export instantly.</p>
            <ChartRadialSimple />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}


