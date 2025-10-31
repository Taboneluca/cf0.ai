"use client"

import React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <Card className="border-black/10 bg-white p-8 text-center">
        <h3 className="text-2xl font-serif tracking-tight">
          Ready to see the full picture?
        </h3>
        <p className="mx-auto mt-2 max-w-prose text-sm text-muted-foreground">
          Book a 20‑minute walkthrough. We’ll connect your data sources, build a first
          analysis together, and share a private demo workspace.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Link href="/login">
            <Button size="lg" className="magnetic-button">Book a demo</Button>
          </Link>
          <a className="font-mono text-xs text-black/60 hover:text-black" href="mailto:hello@cf0.ai">
            hello@cf0.ai
          </a>
        </div>
      </Card>
    </section>
  )
}


