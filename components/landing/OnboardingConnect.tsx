"use client"

import React from "react"
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const SOURCES = [
  "OpenAI",
  "Anthropic",
  "Pinecone",
  "Firebase",
  "FMP",
  "Finnhub",
  "Benzinga",
  "SEC EDGAR",
]

export default function OnboardingConnect() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white">
      <HoleBackground className="absolute inset-0" />
      <div className="relative z-10 grid grid-cols-1 gap-6 p-5 md:grid-cols-3">
        <div className="space-y-2">
          <Badge variant="secondary" className="rounded-full">Step 1</Badge>
          <h3 className="text-lg font-serif">Onboard & connect</h3>
          <p className="text-sm text-black/70">
            Choose data sources, grant permissions, and connect SSO. We manage roles and access so your data
            stays controlled.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="rounded-md" variant="outline">SSO</Badge>
            <Badge className="rounded-md" variant="outline">Permissions</Badge>
            <Badge className="rounded-md" variant="outline">RBAC</Badge>
            <Badge className="rounded-md" variant="outline">Audit trail</Badge>
          </div>
        </div>

        <Separator orientation="vertical" className="hidden md:block" />

        <div className="col-span-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SOURCES.map((s) => (
            <Card key={s} className="flex h-10 items-center justify-center border-black/10 bg-white/90 text-xs text-black/70">
              {s}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


