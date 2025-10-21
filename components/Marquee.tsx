export function Marquee() {
  const chains = [
    "Research  •  Clarity  •  Provenance",
    "Assets  •  Wealth  •  Insight",
    "Integrate  •  Optimize  •  Execute"
  ]
  
  return (
    <div className="w-full overflow-hidden select-none relative">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white via-transparent to-white z-10" />
      <div className="marquee-container flex">
        <div className="marquee-row flex gap-12" aria-hidden>
          {[...Array(3)].map((_, i) => [
            <span key={`a-${i}`} className="whitespace-nowrap">{chains[0]}</span>,
            <span key={`b-${i}`} className="whitespace-nowrap">{chains[1]}</span>,
            <span key={`c-${i}`} className="whitespace-nowrap">{chains[2]}</span>
          ]).flat()}
        </div>
        <div className="marquee-row flex gap-12" aria-hidden>
          {[...Array(3)].map((_, i) => [
            <span key={`d-${i}`} className="whitespace-nowrap">{chains[0]}</span>,
            <span key={`e-${i}`} className="whitespace-nowrap">{chains[1]}</span>,
            <span key={`f-${i}`} className="whitespace-nowrap">{chains[2]}</span>
          ]).flat()}
        </div>
      </div>
    </div>
  )
}


