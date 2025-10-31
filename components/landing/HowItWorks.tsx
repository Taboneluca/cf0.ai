"use client"

import React from "react"
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole"
import { Cover } from "@/components/ui/cover"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { TypingAnimation } from "@/components/ui/typing-animation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DotPattern } from "@/components/ui/dot-pattern"
import { Button } from "@/components/ui/button"
import { LightRays } from "@/components/ui/light-rays"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { ShineBorder } from "@/components/ui/shine-border"

function OnboardScene() {
  const LOGOS = [
    "OpenAI",
    "Anthropic",
    "Pinecone",
    "Firebase",
    "FMP",
    "Finnhub",
    "Benzinga",
    "SEC EDGAR",
  ]

  return (
    <div className="relative size-full rounded-md overflow-hidden">
      <HoleBackground className="absolute inset-0 rounded-md" />
      <div className="relative z-10 h-full w-full p-4 flex flex-col items-start justify-end gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[10px] font-mono text-black/70">
          Connected data sources
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          {LOGOS.map((label) => (
            <div
              key={label}
              className="flex h-7 items-center justify-center rounded-md border border-black/10 bg-white/90 text-[10px] text-black/70"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function KickoffScene() {
  return (
    <div className="relative size-full rounded-md overflow-hidden bg-white">
      <div className="absolute inset-0">
        <DotPattern className="text-black/10" glow={false} />
      </div>
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <Cover className="text-sm font-mono">
          <div className="rounded-lg border border-black/10 bg-white/90 p-3 text-black shadow-sm">
            <div className="text-xs uppercase tracking-wide text-black/50">Client via IPS</div>
            <div className="mt-1 text-sm font-medium">Secure client setup</div>
            <div className="mt-3 flex items-center gap-2">
              <Button size="sm" className="h-7 px-3">Start analysis</Button>
              <span className="text-[10px] text-black/50">SSO, permissions, data access</span>
            </div>
          </div>
        </Cover>
      </div>
    </div>
  )
}

function InputsScene() {
  return (
    <div className="relative size-full rounded-md overflow-hidden bg-white">
      <DotPattern className="text-black/10" />
      <div className="relative z-10 p-3">
        <Tabs defaultValue="discovery" className="w-full">
          <TabsList className="h-8">
            <TabsTrigger value="discovery">Discovery mode</TabsTrigger>
            <TabsTrigger value="quick">Quick form</TabsTrigger>
          </TabsList>
          <TabsContent value="discovery" className="mt-3">
            <div className="rounded-md border border-black/10 bg-white/90 p-3 text-sm text-black/70">
              Ask questions to surface the right context. Source alternative data and notes.
            </div>
          </TabsContent>
          <TabsContent value="quick" className="mt-3">
            <div className="rounded-md border border-black/10 bg-white/90 p-3 text-sm text-black/70">
              Fill a 30-second form: ticker, investor type, risk, timeframe, objectives.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AgentsScene() {
  const Node = ({ label }: { label: string }) => (
    <div className="flex size-8 items-center justify-center rounded-full border border-black/20 bg-white text-[10px] text-black/70 shadow-sm">
      {label}
    </div>
  )
  return (
    <div className="relative size-full rounded-md bg-white">
      <div className="absolute inset-0">
        <DotPattern className="text-black/5" />
      </div>
      <div className="relative z-10 flex size-full items-center justify-center">
        <div className="relative h-44 w-44">
          <div className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full border border-black/15 bg-white text-[11px] font-medium text-black/70 shadow">
            Analysis Engine
          </div>
          <OrbitingCircles radius={85} iconSize={28}>
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

function BuildScene() {
  return (
    <div className="relative size-full overflow-hidden rounded-md bg-neutral-900">
      <div className="absolute inset-0">
        <DotPattern className="text-white/10" glow />
      </div>
      <div className="relative z-10 flex h-full items-center gap-3 px-4">
        <div className="relative size-10 shrink-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffb360_0%,#a05b2b_45%,#3b2a1a_70%,transparent_75%)] shadow-[0_0_25px_#ffb36080]" />
        <div className="h-10 w-[3px] shrink-0 rounded bg-gradient-to-r from-amber-400/70 to-transparent" />
        <TypingAnimation
          words={["Let’s do some magic…"]}
          className="text-[15px] leading-tight text-white/80 font-medium"
          showCursor
          blinkCursor
          cursorStyle="line"
          duration={55}
          pauseDelay={800}
          loop={false}
        />
      </div>
      <div className="absolute bottom-2 right-2 z-10 rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px] font-mono text-white/70">
        Save as template
      </div>
    </div>
  )
}

function MonitorScene() {
  const Node = ({ label }: { label: string }) => (
    <div className="flex size-8 items-center justify-center rounded-full border border-black/20 bg-white text-[10px] text-black/70 shadow-sm">
      {label}
    </div>
  )
  return (
    <div className="relative size-full rounded-md bg-white">
      <div className="absolute inset-0">
        <DotPattern className="text-black/5" />
      </div>
      <div className="relative z-10 flex size-full items-center justify-center">
        <div className="relative h-44 w-44">
          <div className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full border border-black/15 bg-white text-[11px] font-medium text-black/70 shadow">
            Background Agents
          </div>
          <OrbitingCircles radius={85} iconSize={28} reverse>
            <Node label="News" />
            <Node label="Filings" />
            <Node label="Prices" />
            <Node label="Alerts" />
          </OrbitingCircles>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 z-10 flex items-center gap-2">
        <Button size="sm" variant="secondary" className="h-7 px-3">Export PDF</Button>
        <Button size="sm" className="h-7 px-3">Export DOCX</Button>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const steps = [
    { id: "01", title: "Onboard & Connect", anchor: "hiw-01" },
    { id: "02", title: "Client Setup & Kickoff", anchor: "hiw-02" },
    { id: "03", title: "Gather Inputs", anchor: "hiw-03" },
    { id: "04", title: "Multi‑Agent Draft", anchor: "hiw-04" },
    { id: "05", title: "Build Mode + Templates", anchor: "hiw-05" },
    { id: "06", title: "Monitor & Export", anchor: "hiw-06" },
  ]

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 pb-28">
      <ScrollProgress />
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-serif tracking-tight">How it works</h2>
        <nav className="no-scrollbar overflow-x-auto">
          <ol className="flex items-center gap-2">
            {steps.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.anchor}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-mono text-black/70 hover:bg-black hover:text-white transition-colors"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-black/20 bg-black/5 text-[10px]">{s.id}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* 01 */}
      <div id="hiw-01" className="grid grid-cols-1 items-center gap-8 py-20 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-xl font-serif">Onboard & Connect</h3>
          <p className="text-sm text-black/70 max-w-prose">
            Connect SSO, set roles and permissions, then toggle the data sources you already trust—all during sign up.
          </p>
        </div>
        <div className="relative h-80">
          <ShineBorder shineColor={["#A97CF8","#F38CB8","#FDCC92"]} className="opacity-50" />
          <OnboardScene />
        </div>
      </div>

      {/* 02 */}
      <div id="hiw-02" className="grid grid-cols-1 items-center gap-8 py-20 md:grid-cols-2">
        <div className="space-y-3 order-2 md:order-1">
          <h3 className="text-xl font-serif">Client Setup & Kickoff</h3>
          <p className="text-sm text-black/70 max-w-prose">
            Set up clients via IPS and kick off a new analysis when you’re ready.
          </p>
        </div>
        <div className="relative h-80 order-1 md:order-2">
          <ShineBorder shineColor={["#A97CF8","#F38CB8","#FDCC92"]} className="opacity-50" />
          <KickoffScene />
        </div>
      </div>

      {/* 03 */}
      <div id="hiw-03" className="grid grid-cols-1 items-center gap-8 py-20 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-xl font-serif">Gather Inputs</h3>
          <p className="text-sm text-black/70 max-w-prose">
            Use Discovery Mode for guided questioning or fill a quick form to begin.
          </p>
        </div>
        <div className="relative h-80">
          <ShineBorder shineColor={["#A97CF8","#F38CB8","#FDCC92"]} className="opacity-50" />
          <InputsScene />
        </div>
      </div>

      {/* 04 */}
      <div id="hiw-04" className="grid grid-cols-1 items-center gap-8 py-20 md:grid-cols-2">
        <div className="space-y-3 order-2 md:order-1">
          <h3 className="text-xl font-serif">Multi‑Agent Draft</h3>
          <p className="text-sm text-black/70 max-w-prose">
            Parallel agents gather and validate data across market, filings, and news.
          </p>
        </div>
        <div className="relative h-80 order-1 md:order-2">
          <AgentsScene />
        </div>
      </div>

      {/* 05 */}
      <div id="hiw-05" className="grid grid-cols-1 items-center gap-8 py-20 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-xl font-serif">Build Mode + Templates</h3>
          <p className="text-sm text-black/70 max-w-prose">
            Prompt the UI to add, change, or restructure—then save the flow as a template.
          </p>
        </div>
        <div className="relative h-80 rounded-md overflow-hidden">
          <LightRays className="opacity-70" />
          <BuildScene />
        </div>
      </div>

      {/* 06 */}
      <div id="hiw-06" className="grid grid-cols-1 items-center gap-8 py-20 md:grid-cols-2">
        <div className="space-y-3 order-2 md:order-1">
          <h3 className="text-xl font-serif">Monitor & Export</h3>
          <p className="text-sm text-black/70 max-w-prose">
            Background agents listen for changes and suggest updates. Export in one click.
          </p>
        </div>
        <div className="relative h-80 order-1 md:order-2">
          <MonitorScene />
        </div>
      </div>
    </section>
  )
}

export default HowItWorks


