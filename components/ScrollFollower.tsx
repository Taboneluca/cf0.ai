"use client"
import { useEffect, useRef } from "react"
import MiniGlobe from "./MiniGlobe"

export default function ScrollFollower() {
  const ref = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        // Find the narrative paragraph closest to viewport center
        const blocks = Array.from(document.querySelectorAll('[data-follow]')) as HTMLElement[]
        const center = window.innerHeight / 2
        let closest: { el: HTMLElement; dist: number } | null = null
        blocks.forEach((el) => {
          const r = el.getBoundingClientRect()
          const mid = r.top + r.height / 2
          const dist = Math.abs(mid - center)
          if (!closest || dist < closest.dist) closest = { el, dist }
        })

        const baseOffset = 120
        if (closest && ref.current) {
          const r = closest!.el.getBoundingClientRect()
          const mid = r.top + r.height / 2
          const targetY = window.scrollY + mid - baseOffset
          ref.current.style.transform = `translateY(${targetY}px)`
          const label = closest!.el.getAttribute('data-label') || 'Context'
          if (labelRef.current) labelRef.current.textContent = label
        } else if (ref.current) {
          // Reset position when no element is found
          ref.current.style.transform = `translateY(0px)`
          if (labelRef.current) labelRef.current.textContent = 'Context'
        }
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className="fixed right-8 top-24 z-30 hidden lg:flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <MiniGlobe size={48} />
      <div ref={labelRef} className="rounded-xl border border-black/10 bg-white/80 backdrop-blur-sm px-3 py-2 text-xs font-mono text-black/70 shadow-lg">
        Context
      </div>
    </div>
  )
}


