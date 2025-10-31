"use client"

import React from "react"
import { DotPattern } from "@/components/ui/dot-pattern"
import { TypingAnimation } from "@/components/ui/typing-animation"

type Props = {
  compact?: boolean
  className?: string
}

export default function BuildTemplatesVisual({ compact, className }: Props) {
  const orbSize = compact ? "size-8" : "size-10"
  const caretH = compact ? "h-8" : "h-10"
  const textSize = compact ? "text-[13px]" : "text-[15px]"

  return (
    <div className={`relative w-full overflow-hidden rounded-md bg-neutral-900 ${className ?? ""}`}>
      <div className="absolute inset-0">
        <DotPattern className="text-white/10" glow />
      </div>
      <div className="relative z-10 flex items-center gap-3 px-3 py-3">
        <div
          className={`relative ${orbSize} shrink-0 rounded-full shadow-[0_0_25px_#22d3ee80]`}
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #67e8f9 0%, #06b6d4 45%, #0e7490 70%, transparent 75%)",
          }}
        />
        <div className={`${caretH} w-[3px] shrink-0 rounded bg-gradient-to-r from-cyan-400/80 to-transparent`} />
        <TypingAnimation
          words={["Let’s do some magic…"]}
          className={`${textSize} leading-tight text-white/85 font-medium`}
          showCursor
          blinkCursor
          cursorStyle="line"
          duration={55}
          pauseDelay={800}
          loop={false}
        />
      </div>
      <div className="absolute bottom-2 right-2 z-10 rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px] font-mono text-white/75">
        Save as template
      </div>
    </div>
  )
}


