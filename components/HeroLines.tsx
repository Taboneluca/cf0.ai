"use client"

import React, { useEffect, useRef } from "react"

export default function HeroLines() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const scrolled = window.scrollY
        const progress = Math.min(scrolled / 500, 1)
        
        // Morph the paths slightly based on scroll
        const paths = svgRef.current?.querySelectorAll('.hero-stroke')
        paths?.forEach((path, index) => {
          const baseOffset = index * 10
          const waveAmplitude = 20 * (1 - progress)
          ;(path as SVGPathElement).style.opacity = `${0.12 - progress * 0.06}`
        })
        
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 parallax-element">
      <svg ref={svgRef} className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path 
          className="hero-stroke transition-opacity duration-500" 
          d="M0,300 C300,280 450,340 600,300 750,260 900,320 1200,300" 
          fill="none" 
        />
        <path 
          className="hero-stroke delay transition-opacity duration-500" 
          d="M0,260 C300,240 450,300 600,260 750,220 900,280 1200,260" 
          fill="none" 
        />
        <path 
          className="hero-stroke delay-2 transition-opacity duration-500" 
          d="M0,340 C300,320 450,380 600,340 750,300 900,360 1200,340" 
          fill="none" 
        />
      </svg>
    </div>
  )
}


