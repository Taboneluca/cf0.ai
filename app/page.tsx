"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import HeroLines from "../components/HeroLines"
import { Marquee } from "../components/Marquee"
import NetworkGlobe from "../components/NetworkGlobe"

export default function PreLaunchPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [scrollVelocity, setScrollVelocity] = useState(0)

  useEffect(() => {
    // Detect reduced motion preference
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  // Mark page as loaded after initial render
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const timer = setTimeout(() => setHasLoaded(true), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!hasLoaded) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            
            // Special handling for globe-enter to remove inline styles
            if (target.classList.contains("globe-enter")) {
              // Remove inline styles first
              target.style.opacity = ""
              target.style.transform = ""
              target.style.transition = ""
              
              // Force a reflow before adding the animate class
              void target.offsetHeight
            }
            
            target.classList.add("animate-in")

            // Trigger text reveal for elements with text-reveal class
            if (target.classList.contains("text-reveal")) {
              const el = target.querySelector('[data-reveal-text]') as HTMLElement | null
              if (el && !(el as HTMLElement).dataset.revealed) {
                const text = (el.textContent || "").trim()
                const words = text.split(/\s+/)
                el.innerHTML = words
                  .map((word, i) => `<span class="word" style="animation-delay: ${i * 0.05}s">${word}</span>`)
                  .join(" ")
                ;(el as HTMLElement).dataset.revealed = "true"
              }
            }
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -250px 0px" },
    )

    if (reducedMotion) {
      const elements = contentRef.current?.querySelectorAll(".fade-in-section")
      elements?.forEach((el) => el.classList.add("animate-in"))
      return
    }

    const elements = contentRef.current?.querySelectorAll(".fade-in-section")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [reducedMotion, hasLoaded])

  useEffect(() => {
    if (reducedMotion) return

    let ticking = false
    let rafId: number | null = null
    let lastScrollY = 0
    let lastScrollTime = Date.now()

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrolled = window.scrollY
        const currentTime = Date.now()
        const timeDelta = currentTime - lastScrollTime
        const scrollDelta = scrolled - lastScrollY
        
        // Calculate scroll velocity
        const velocity = timeDelta > 0 ? Math.abs(scrollDelta / timeDelta) : 0
        setScrollVelocity(velocity)
        
        lastScrollY = scrolled
        lastScrollTime = currentTime

        const parallax = document.querySelector(".parallax-bg") as HTMLElement
        if (parallax) {
          parallax.style.transform = `translateY(${scrolled * 0.3}px)`
        }

        // Parallax for hero elements
        const heroElements = document.querySelectorAll(".parallax-element")
        heroElements.forEach((el, index) => {
          const speed = 0.05 * (index + 1)
          ;(el as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`
        })

        // Scroll-triggered moving elements
        const floatingElements = document.querySelectorAll(".scroll-float")
        floatingElements.forEach((el, index) => {
          const speed = 0.15 + (index * 0.05)
          const direction = index % 2 === 0 ? 1 : -1
          const xOffset = scrolled * speed * direction * 0.3
          const yOffset = scrolled * speed
          ;(el as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`
        })

        const maxScrollable = Math.max(
          1,
          (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight,
        )
        setScrollProgress(Math.min(1, Math.max(0, scrolled / maxScrollable)))
        ticking = false
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId)
      const { clientX, clientY } = e
      rafId = requestAnimationFrame(() => setMousePosition({ x: clientX, y: clientY }))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    handleScroll() // Initial call
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [reducedMotion])

  return (
    <main className="min-h-screen bg-white text-black overflow-hidden">
      {/* Scroll reactive indicator (SSR safe) */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <div className="h-40 w-px bg-black/10 overflow-hidden">
          <div
            className="w-px bg-black/60 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateY(${(scrollProgress - 0.5) * 160}px)` }}
          />
        </div>
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.02), transparent 80%)`,
        }}
      />

      <div className="parallax-bg fixed inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative" ref={contentRef}>
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-black/5 backdrop-blur-sm bg-white/80">
          <div className="mx-auto max-w-5xl px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 parallax-element">
                <Image 
                  src="/inverted_logo.jpg" 
                  alt="cf0 logo" 
                  width={28} 
                  height={28} 
                  className="rounded-md"
                />
                <span className="font-mono text-xl font-medium tracking-tight">cf0</span>
              </div>
              <a
                href="mailto:hello@cf0.ai"
                className="font-mono text-sm text-black/50 transition-colors hover:text-black/90 parallax-element"
              >
                hello@cf0.ai
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mx-auto max-w-5xl px-8 pt-28 pb-8">
          <div className="initial-load-1 space-y-6 text-center">
            <div className="inline-block rounded-full border border-black/10 bg-black/[0.02] px-5 py-2 backdrop-blur-sm parallax-element animate-badge-float mx-auto">
              <span className="font-mono text-sm tracking-wide text-black/70">Introducing cf0</span>
            </div>
            <p className="font-mono text-xs tracking-wider opacity-100 text-black/50 parallax-element initial-load-2">
              OCTOBER 21, 2025
            </p>
          </div>
          {/* Optional slow marquee for rhythm */}
          <div className="mt-6 initial-load-3">
            <Marquee />
          </div>
        </section>

        {/* Main Headline */}
        <section className="relative mx-auto max-w-5xl px-8 py-16 min-h-[50vh] flex items-center justify-center">
          <HeroLines />
          
          {/* Gradient background behind headline */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <div className="w-[95%] h-[80%] bg-gradient-to-br from-black/[0.15] via-black/[0.08] to-transparent rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 text-center w-full">
            <div className="initial-load-4 text-reveal">
              <h1 data-reveal-text className="text-balance text-[clamp(28px,5.2vw,42px)] md:text-[clamp(34px,4.8vw,56px)] lg:text-[64px] font-light leading-[1.08] tracking-tight text-black font-serif">
                We are building an AI-native research environment that gives investors agency through clarity.
              </h1>
            </div>
          </div>
        </section>

        {/* Premium Network Globe Visualization */}
        <section className="mx-auto max-w-5xl px-8 pt-8 pb-20">
          <div 
            className="fade-in-section stagger-5 globe-enter"
            style={{ 
              opacity: 0, 
              transform: 'scale(0.8) translateY(60px)',
              transition: 'none'
            }}
          >
            <NetworkGlobe />
          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto max-w-5xl px-8 pb-40 relative">
          <div className="space-y-20 font-serif">

            <div className="fade-in-section stagger-3 slide-in-left text-box-reveal space-y-8 border-l-2 border-black/10 pl-8 font-serif relative max-w-[72ch] mx-auto group" data-follow data-label="Thesis-driven view">
              <div className="absolute left-0 top-0 h-0 w-0.5 bg-black/40 animate-border-grow" />
              <p className="text-pretty text-lg md:text-xl leading-[1.7] text-black/65 font-serif transition-colors duration-300 group-hover:text-black/80">
                What would the ideal experience for making an investment decision feel like?
              </p>
              <p className="text-pretty text-lg md:text-xl leading-[1.7] text-black/65 font-serif transition-colors duration-300 group-hover:text-black/80">
                You pose a thesis. In one place you see the exact facts that matter to you, organized the way you think.
                Filings, market data, news, and notes line up with provenance. The interface adapts to your logic, asks
                follow-ups, and generates the next view you need.
              </p>
              <p className="text-pretty text-lg md:text-xl leading-[1.7] text-black/65 transition-colors duration-300 group-hover:text-black/80">
                Today this is rare. Data is fragmented, tools are siloed, and time is scarce.
              </p>
            </div>

            <div className="fade-in-section stagger-4 text-box-reveal space-y-8 scale-in max-w-[72ch] mx-auto group" data-follow data-label="AI Research Partner">
              <p className="text-pretty text-lg md:text-xl leading-[1.7] text-black/65 transition-colors duration-300 group-hover:text-black/80">
                With recent progress in generative AI, this experience is now tractable. The investor sets the logic and
                the guardrails. An AI Research Partner unifies sources, normalizes context, tracks lineage, and
                assembles a personal interface on demand.
              </p>
              <p className="text-pretty text-lg md:text-xl leading-[1.7] text-black/65 transition-colors duration-300 group-hover:text-black/80">
                This Investor + AI symbiosis can power research across a firm's entire data estate while respecting
                compliance and workflow needs.
              </p>
            </div>

            <div className="fade-in-section stagger-5 text-box-reveal group rounded-3xl border border-black/10 bg-gradient-to-br from-black/[0.02] to-transparent p-10 backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-black/20 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] magnetic-card mx-auto">
              <p className="text-pretty text-xl leading-relaxed text-black/70 group-hover:text-black/85 transition-colors duration-300">
                Our first product is a research workbench that builds the UI you need in the moment and connects to the
                data you already trust. It supports real-time monitoring and alerts, deep filing analysis, and one-click
                analysis from the web—designed for all investors who want less noise and faster conviction.
              </p>
            </div>

            <div className="fade-in-section stagger-6 text-box-reveal space-y-10">
              <div className="space-y-6">
                <p className="text-pretty text-xl leading-relaxed text-black/60">
                  Today, we are heads down with design partners. We look toward a future where high-quality investment
                  research is accessible, auditable, and truly personal.
                </p>
                <p className="text-pretty text-2xl font-light leading-relaxed text-black/95 animate-pulse-subtle">
                  Ready to see the full picture?
                </p>
              </div>

              <div className="pt-4 relative">
                {/* Floating element near CTA - non-blocking */}
                <div className="scroll-float absolute -right-20 top-0 z-[2] opacity-60 hidden xl:block pointer-events-none">
                  <div className="floating-card px-3 py-2 rounded-lg border border-black/10 bg-white/90 backdrop-blur-sm shadow-sm">
                    <p className="font-mono text-[10px] text-black/50">Let's connect</p>
                  </div>
                </div>
                
                <a
                  href="mailto:hello@cf0.ai"
                  className="magnetic-button group relative inline-flex items-center gap-3 rounded-xl border border-black/20 bg-black/[0.03] px-8 py-4 font-mono text-sm tracking-wide overflow-hidden"
                >
                  <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                  <span className="absolute inset-0 bg-gradient-to-r from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                  <span className="relative font-medium transition-colors duration-400">Get in touch</span>
                  <svg
                    className="relative h-4 w-4 transition-transform duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-black/5">
          <div className="mx-auto max-w-5xl px-8 py-10">
            <div className="flex items-center justify-between text-sm text-black/40">
              <p className="font-mono tracking-wide">© 2025 cf0.ai</p>
              <p className="font-mono tracking-wide">Building the future of investment research</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: 
            opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-in-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Added slide-in from left animation */
        .slide-in-left {
          transform: translateX(-30px) translateY(30px);
        }

        .slide-in-left.animate-in {
          transform: translateX(0) translateY(0);
        }

        /* Added scale-in animation */
        .scale-in {
          transform: scale(0.95) translateY(30px);
        }

        .scale-in.animate-in {
          transform: scale(1) translateY(0);
        }

        /* Globe entrance animation */
        .globe-enter {
          opacity: 0;
          transform: scale(0.8) translateY(60px);
          transition: 
            opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .globe-enter.animate-in {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        /* Text reveal word animation */
        .text-reveal.animate-in .word {
          display: inline-block;
          opacity: 0;
          animation: wordReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes wordReveal {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Border growth animation */
        @keyframes borderGrow {
          from {
            height: 0;
          }
          to {
            height: 100%;
          }
        }

        .animate-border-grow {
          animation: borderGrow 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
        }

        /* Logo pulse animation */
        @keyframes logoPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.98);
          }
        }

        .animate-logo-pulse {
          animation: logoPulse 3s ease-in-out infinite;
        }

        /* Badge float animation */
        @keyframes badgeFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-badge-float {
          animation: badgeFloat 3s ease-in-out infinite;
        }

        /* Shimmer effect for CTA */
        @keyframes shimmer {
          100% {
            transform: translateX(200%);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        /* Subtle pulse for final question */
        @keyframes pulseSubtle {
          0%, 100% {
            opacity: 0.95;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-pulse-subtle {
          animation: pulseSubtle 4s ease-in-out infinite;
        }

        /* Magnetic card effect */
        .magnetic-card {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .magnetic-card:hover {
          transform: translateY(-6px);
        }

        .stagger-1 { transition-delay: 0s; }
        .stagger-2 { transition-delay: 0.15s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.45s; }
        .stagger-5 { transition-delay: 0.6s; }
        .stagger-6 { transition-delay: 0.75s; }

        /* Added text box reveal animation with border effect */
        .text-box-reveal {
          position: relative;
        }

        .text-box-reveal::before {
          content: '';
          position: absolute;
          inset: -8px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 12px;
          opacity: 0;
          transform: scale(0.95);
          transition: 
            opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .text-box-reveal.animate-in::before {
          opacity: 1;
          transform: scale(1);
        }

        .text-box-reveal.animate-in {
          animation: textBoxFloat 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes textBoxFloat {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        /* Hero headline pop-in */
        @keyframes heroPop {
          0% { opacity: 0; transform: translateY(12px) scale(0.985); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-hero-pop {
          animation: heroPop 900ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Graph animations on scroll */
        .sparkline-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
        }
        .animate-in .sparkline-path {
          animation: drawLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }

        .dot-appear {
          opacity: 0;
          transform: scale(0);
        }
        .animate-in .dot-appear {
          animation: popDot 0.4s cubic-bezier(0.16, 1, 0.3, 1) 1.3s forwards;
        }
        @keyframes popDot {
          to { opacity: 1; transform: scale(1); }
        }

        .bar-animate {
          /* Bar starts at full width, no animation needed - just show it */
        }
      `}</style>
    </main>
  )
}
