"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShineBorder } from "@/components/ui/shine-border"

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-white to-black/[0.02] p-8">
        <ShineBorder className="opacity-60" />
        <div className="relative z-10 grid grid-cols-1 items-center gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-2xl font-serif">Ready to see the full picture?</h3>
            <p className="text-sm text-black/70">
              Book a short walkthrough of cf0.ai—Build Mode, templates, and background monitoring tailored to your
              workflow.
            </p>
          </div>
          <div className="md:justify-self-end">
            <Link href="/login">
              <Button size="lg" className="magnetic-button">Book a demo</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


