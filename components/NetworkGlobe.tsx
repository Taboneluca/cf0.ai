"use client"

import { useEffect, useRef, useState } from "react"

export default function NetworkGlobe() {
  const [connections, setConnections] = useState<Array<{ x1: number; y1: number; x2: number; y2: number; delay: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Watch for parent animation class
    const checkVisibility = () => {
      const parent = containerRef.current?.closest('.globe-enter')
      if (parent && parent.classList.contains('animate-in')) {
        setIsVisible(true)
      }
    }

    // Check immediately and set up observer
    checkVisibility()
    
    const observer = new MutationObserver(checkVisibility)
    const parent = containerRef.current?.closest('.globe-enter')
    
    if (parent) {
      observer.observe(parent, { 
        attributes: true, 
        attributeFilter: ['class'] 
      })
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Generate random network connections
    const generateConnections = () => {
      const newConnections = []
      const centerX = 200
      const centerY = 200
      const radius = 150

      // Create orbital paths around the center
      for (let i = 0; i < 12; i++) {
        const angle1 = (Math.PI * 2 * i) / 12
        const angle2 = (Math.PI * 2 * (i + 3)) / 12
        
        const x1 = centerX + Math.cos(angle1) * radius
        const y1 = centerY + Math.sin(angle1) * radius
        const x2 = centerX + Math.cos(angle2) * radius
        const y2 = centerY + Math.sin(angle2) * radius

        newConnections.push({
          x1, y1, x2, y2,
          delay: i * 0.3
        })
      }

      setConnections(newConnections)
    }

    generateConnections()
  }, [])

  // Generate orbital rings
  const rings = [
    { radius: 60, opacity: 0.15, rotation: 0 },
    { radius: 100, opacity: 0.12, rotation: 45 },
    { radius: 150, opacity: 0.08, rotation: 90 },
  ]

  // Generate nodes around the sphere
  const nodes = Array.from({ length: 24 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 24
    const radius = 150
    return {
      x: 200 + Math.cos(angle) * radius,
      y: 200 + Math.sin(angle) * radius,
      delay: i * 0.15,
    }
  })

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-md mx-auto">
      {/* Main SVG Network */}
      <svg
        className={`w-full h-full ${isVisible ? 'globe-animate' : ''}`}
        viewBox="0 0 400 400"
        style={{ filter: "drop-shadow(0 0 1px rgba(0,0,0,0.1))" }}
      >
        <defs>
          {/* Gradient for connections */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
            <stop offset="50%" stopColor="rgba(0,0,0,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
          </linearGradient>

        </defs>

        {/* Orbital rings */}
        {rings.map((ring, index) => (
          <g key={`ring-${index}`}>
            <circle
              cx="200"
              cy="200"
              r={ring.radius}
              fill="none"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="0.5"
              className={`orbit-ring ${isVisible ? 'ring-enter' : ''}`}
              style={{
                transform: `rotate(${ring.rotation}deg)`,
                transformOrigin: "center",
                animationDelay: `${0.3 + index * 0.2}s, ${0.3 + index * 0.2 + 1}s`,
                animationDuration: `1s, ${30 + index * 10}s`
              }}
              suppressHydrationWarning
            />
            {/* Add dots on the ring */}
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (Math.PI * 2 * i) / 8
              return (
                <circle
                  key={`ring-dot-${index}-${i}`}
                  cx={200 + Math.cos(angle) * ring.radius}
                  cy={200 + Math.sin(angle) * ring.radius}
                  r="1.5"
                  fill="rgba(0,0,0,0.25)"
                  className={`pulse-node ${isVisible ? 'pulse-node-enter' : ''}`}
                  style={{ animationDelay: `${0.6 + index * 0.2 + i * 0.05}s, ${0.6 + index * 0.2 + i * 0.05 + 0.4}s` }}
                  suppressHydrationWarning
                />
              )
            })}
          </g>
        ))}

        {/* Connection lines */}
        {connections.map((conn, index) => (
          <g key={`connection-${index}`}>
            <line
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke="url(#connectionGradient)"
              strokeWidth="0.5"
              className={`connection-line ${isVisible ? 'line-enter' : ''}`}
              style={{ animationDelay: `${1 + index * 0.1}s` }}
              suppressHydrationWarning
            />
            {/* Animated data flow */}
            <circle
              r="2"
              fill="rgba(0,0,0,0.6)"
              className={`data-flow ${isVisible ? 'flow-enter' : ''}`}
              style={{ animationDelay: `${2 + index * 0.1}s` }}
              suppressHydrationWarning
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin={`${conn.delay}s`}
              >
                <mpath href={`#path-${index}`} />
              </animateMotion>
            </circle>
            <path
              id={`path-${index}`}
              d={`M ${conn.x1} ${conn.y1} L ${conn.x2} ${conn.y2}`}
              fill="none"
              stroke="none"
              suppressHydrationWarning
            />
          </g>
        ))}

        {/* Network nodes */}
        {nodes.map((node, index) => (
          <g key={`node-${index}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="rgba(0,0,0,0.3)"
              className={`network-node ${isVisible ? 'node-enter' : ''}`}
              style={{ animationDelay: `${1.5 + index * 0.05}s, ${1.5 + index * 0.05 + 0.4}s` }}
              suppressHydrationWarning
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="2"
              fill="white"
              className={`network-node-inner ${isVisible ? 'node-enter' : ''}`}
              style={{ animationDelay: `${1.5 + index * 0.05}s, ${1.5 + index * 0.05 + 0.4}s` }}
              suppressHydrationWarning
            />
          </g>
        ))}

        {/* Central node */}
        <g>
          <circle
            cx="200"
            cy="200"
            r="6"
            fill="rgba(0,0,0,0.2)"
            className={`central-node ${isVisible ? 'center-enter' : ''}`}
          />
          <circle
            cx="200"
            cy="200"
            r="3"
            fill="white"
            className={`central-node-core ${isVisible ? 'center-enter' : ''}`}
          />
        </g>
      </svg>

      {/* Overlay labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={`floating-label px-3 py-1 rounded-full border border-black/10 bg-white/90 backdrop-blur-sm ${isVisible ? 'label-enter' : ''}`}>
            <p className="font-mono text-[10px] text-black/50">Global network</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className={`floating-label px-3 py-1 rounded-full border border-black/10 bg-white/90 backdrop-blur-sm ${isVisible ? 'label-enter' : ''}`}>
            <p className="font-mono text-[10px] text-black/50">Real-time sync</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .orbit-ring {
          transform-origin: 200px 200px;
          opacity: 0;
        }
        
        .globe-animate .orbit-ring:not(.ring-enter) {
          opacity: 1;
        }

        .connection-line {
          opacity: 0;
        }
        
        @keyframes fadeInLine {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes pulseNode {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.9); }
        }

        @keyframes pulseNodeInner {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        @keyframes pulseCentral {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }

        @keyframes pulseCentralCore {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes pulseSmall {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.6; }
        }

        .pulse-node-enter {
          opacity: 0;
          transform: scale(0);
          animation: 
            nodePop 0.4s ease-out forwards,
            pulseSmall 2s ease-in-out infinite 0.4s;
        }

        @keyframes floatLabel {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes flowPulse {
          0%, 100% { opacity: 0; }
          20%, 80% { opacity: 1; }
        }

        /* Entrance animations */
        .center-enter {
          opacity: 0;
          transform: scale(0);
          animation: centerGrow 0.6s ease-out forwards, pulseCentral 4s ease-in-out infinite 0.6s;
        }
        
        .central-node.center-enter {
          animation: centerGrowNode 0.6s ease-out forwards, pulseCentral 4s ease-in-out infinite 0.6s;
        }
        
        .central-node-core.center-enter {
          animation: centerGrowCore 0.6s ease-out forwards, pulseCentralCore 4s ease-in-out infinite 0.6s;
        }

        @keyframes centerGrow {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes centerGrowNode {
          to {
            opacity: 0.2;
            transform: scale(1);
          }
        }
        
        @keyframes centerGrowCore {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .ring-enter {
          opacity: 0;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: 
            ringDraw 1s ease-out forwards,
            rotateRing 30s linear infinite 1s;
        }

        @keyframes ringDraw {
          to {
            opacity: 1;
            stroke-dashoffset: 0;
          }
        }

        .line-enter {
          opacity: 0;
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: 
            lineDraw 0.8s ease-out forwards,
            fadeInLine 2s ease-in-out infinite 0.8s;
        }

        @keyframes lineDraw {
          to {
            opacity: 1;
            stroke-dashoffset: 0;
          }
        }

        .node-enter {
          opacity: 0;
          transform: scale(0);
          animation: 
            nodePop 0.4s ease-out forwards,
            pulseNode 3s ease-in-out infinite 0.4s;
        }
        
        .network-node-inner.node-enter {
          animation: 
            nodePop 0.4s ease-out forwards,
            pulseNodeInner 3s ease-in-out infinite 0.4s;
        }

        @keyframes nodePop {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .flow-enter {
          opacity: 0;
          animation: 
            flowEnter 0.6s ease-out forwards,
            flowPulse 4s ease-in-out infinite 0.6s;
        }

        @keyframes flowEnter {
          to {
            opacity: 1;
          }
        }

        .label-enter {
          opacity: 0;
          transform: translateY(10px);
          animation: 
            labelFade 0.8s ease-out 2.5s forwards,
            floatLabel 4s ease-in-out infinite 3.3s;
        }

        @keyframes labelFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

