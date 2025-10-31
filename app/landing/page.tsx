import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { LayoutTextFlip } from "@/components/ui/layout-text-flip"
import Globe from "@/components/ui/globe"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { WobbleCard } from "@/components/ui/wobble-card"
import { HowItWorks } from "@/components/landing/HowItWorks"
import HeroStats from "@/components/landing/HeroStats"
import OnboardingConnect from "@/components/landing/OnboardingConnect"
import AgentBubbles from "@/components/landing/AgentBubbles"
import Capabilities from "@/components/landing/Capabilities"
import FAQ from "@/components/landing/FAQ"
import CTA from "@/components/landing/CTA"

export const metadata: Metadata = {
  title: "cf0.ai — Landing",
}

 

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            <LayoutTextFlip
              text="AI-native research for"
              words={["Investors", "Analysts", "Fund Managers", "Research Teams"]}
              duration={2500}
            />
          </h1>
          <p className="text-muted-foreground max-w-prose">
            Build, query, and edit institutional‑grade stock analysis. Multi‑agent drafting, RAG search, and
            background monitoring—designed for faster conviction.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button className="magnetic-button" size="lg">Book a demo</Button>
            </Link>
          </div>
          <HeroStats />
        </div>

        {/* Globe on the right */}
        <div className="relative aspect-square w-full md:aspect-[4/3]">
          <div className="absolute inset-0">
            <Globe />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground">Powered by</h2>
        </div>
        <div className="relative mt-6 overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-row flex items-center gap-10 pr-10">
              {PLACEHOLDER_LOGOS.map((label, i) => (
                <div
                  key={`row1-${i}`}
                  className="flex h-10 items-center justify-center rounded-md border px-4 text-sm text-muted-foreground"
                >
                  {label}
                </div>
              ))}
              {/* duplicate for seamless loop */}
              {PLACEHOLDER_LOGOS.map((label, i) => (
                <div
                  key={`row1b-${i}`}
                  className="flex h-10 items-center justify-center rounded-md border px-4 text-sm text-muted-foreground"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="mx-auto max-w-6xl px-4 pb-28">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif tracking-tight">Benefits</h2>
        </div>
        <div className="mt-8">
          <BentoGrid className="md:auto-rows-[20rem]">
            {/* Build Mode (spotlight) */}
            <div className="md:col-span-3">
              <CardSpotlight className="bg-white border border-black/10 text-black">
                <div className="relative z-10 space-y-3">
                  <h3 className="text-xl font-serif">Build Mode</h3>
                  <p className="text-muted-foreground max-w-prose">
                    Ask, refine, and turn answers into charts instantly. Structure content with one prompt and keep
                    provenance for every number. When it feels right, save the flow as a reusable template.
                  </p>
                </div>
              </CardSpotlight>
            </div>

            {/* Adaptive UI (wobble) */}
            <div className="md:col-span-2">
              <WobbleCard containerClassName="bg-white border border-black/10">
                <div className="space-y-2">
                  <h3 className="text-lg font-serif">Adaptive UI</h3>
                  <p className="text-muted-foreground max-w-prose">
                    The interface reshapes to your questions and workflow—reducing clicks and surfacing the next best
                    action automatically.
                  </p>
                </div>
              </WobbleCard>
            </div>

            {/* Background Agents (wobble) */}
            <div className="md:col-span-1">
              <WobbleCard containerClassName="bg-white border border-black/10">
                <div className="space-y-2">
                  <h3 className="text-lg font-serif">Background Agents</h3>
                  <p className="text-muted-foreground">
                    Reports stay fresh. Agents watch news, filings, and prices—suggesting precise edits you can apply
                    in one click.
                  </p>
                </div>
              </WobbleCard>
            </div>

            {/* Brokerage Integration (bento item) */}
            <BentoGridItem
              className="md:col-span-1"
              title="Brokerage Integration"
              description={
                <span>
                  One login, unified oversight across custodians—SSO, permissions, and audit trails included.
                </span>
              }
            />

            {/* Template Saving (bento item) */}
            <BentoGridItem
              className="md:col-span-2"
              title="Template Saving"
              description={
                <span>
                  Save your Build Mode sessions as templates. Start new analyses with a proven structure and guardrails.
                </span>
              }
            />
          </BentoGrid>
        </div>
      </section>

      {/* Onboard & Connect (focused) */}
      <section className="mx-auto max-w-6xl px-4 pb-28">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-serif tracking-tight">Onboard & Connect</h2>
        </div>
        <OnboardingConnect />
      </section>

      {/* Agent Architecture */}
      <section className="mx-auto max-w-6xl px-4 pb-28">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-serif tracking-tight">Agent Architecture</h2>
        </div>
        <AgentBubbles />
      </section>

      {/* Capabilities grid (charts) */}
      <Capabilities />

      {/* How it works */}
      <HowItWorks />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <CTA />
    </div>
  )
}

const PLACEHOLDER_LOGOS = [
  "OpenAI",
  "Anthropic",
  "Pinecone",
  "Firebase",
  "FMP",
  "Finnhub",
  "Benzinga",
  "SEC EDGAR",
]


