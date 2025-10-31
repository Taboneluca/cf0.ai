"use client"

import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-28">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif tracking-tight">FAQs</h2>
      </div>
      <div className="mt-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="security">
            <AccordionTrigger>How do you handle security and compliance?</AccordionTrigger>
            <AccordionContent>
              We support SSO, role‑based access control, and audit trails. Data sources connect via your own
              credentials; we don’t resell or commingle data.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="templates">
            <AccordionTrigger>What are templates?</AccordionTrigger>
            <AccordionContent>
              Templates capture your report layout and chart rules from Build Mode. Apply them to new analyses to
              standardize structure across the team.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="versioning">
            <AccordionTrigger>Can I undo changes?</AccordionTrigger>
            <AccordionContent>
              Yes. We maintain a version history for each report, so you can preview edits and undo at any time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}


