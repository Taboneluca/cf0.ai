"use client"

import React from "react"
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const DATA_SOURCES = [
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
      <HoleBackground className="absolute inset-0 opacity-80" />

      <div className="relative z-10 grid gap-6 p-5 md:grid-cols-3">
        {/* SSO */}
        <Card className="border-black/10 bg-white/90 p-4">
          <div className="text-xs font-medium text-black/60">Step 1</div>
          <h4 className="mt-1 text-sm font-semibold text-black">Single Sign‑On</h4>
          <p className="mt-2 text-[12px] leading-relaxed text-black/60">
            Connect with Okta, Azure AD, Google, or email. We enforce roles and
            least‑privilege access per workspace.
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {[
              "Okta",
              "Azure AD",
              "Google",
              "Email",
            ].map((t) => (
              <Badge key={t} variant="secondary" className="h-5 rounded-full px-2 text-[10px]">
                {t}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Permissions */}
        <Card className="border-black/10 bg-white/90 p-4">
          <div className="text-xs font-medium text-black/60">Step 2</div>
          <h4 className="mt-1 text-sm font-semibold text-black">Permissions</h4>
          <p className="mt-2 text-[12px] leading-relaxed text-black/60">
            Choose who can view, edit, export, or manage templates. Audit trail
            and version history are enabled by default.
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {["Viewer", "Editor", "Admin", "Auditor"].map((t) => (
              <Badge key={t} variant="secondary" className="h-5 rounded-full px-2 text-[10px]">
                {t}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Data sources */}
        <Card className="border-black/10 bg-white/90 p-4">
          <div className="text-xs font-medium text-black/60">Step 3</div>
          <h4 className="mt-1 text-sm font-semibold text-black">Connect data</h4>
          <p className="mt-2 text-[12px] leading-relaxed text-black/60">
            Toggle the sources you already trust. We normalize schemas and keep
            lineage for every number and sentence.
          </p>
          <Separator className="my-3" />
          <div className="grid grid-cols-2 gap-1">
            {DATA_SOURCES.map((t) => (
              <div
                key={t}
                className="flex h-7 items-center justify-center rounded-md border border-black/10 bg-white/90 text-[10px] text-black/70"
              >
                {t}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}


