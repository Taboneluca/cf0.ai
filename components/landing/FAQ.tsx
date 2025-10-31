"use client"

import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-28">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-serif tracking-tight">FAQ</h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do templates work?</AccordionTrigger>
          <AccordionContent>
            Save any Build Mode session as a template. We capture enabled sections, preferred charts, and
            analysis depth. Apply a template to start a new report with the same structure and guidance.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What about compliance and auditability?</AccordionTrigger>
          <AccordionContent>
            Every change has provenance and an audit trail. Roles control who can view, edit, or export. Version
            history preserves up to 10 prior states with one‑click undo.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Does my data leave my control?</AccordionTrigger>
          <AccordionContent>
            No. You choose data sources and permissions during onboarding. Background agents respect these
            controls and only act within your workspace.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}


