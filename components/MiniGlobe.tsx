"use client"
export default function MiniGlobe({ size = 40 }: { size?: number }) {
  return (
    <div className="mini-globe" style={{ width: size, height: size }} aria-hidden>
      <style jsx>{`
        .mini-globe {
          position: relative;
          border-radius: 50%;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.12);
          background:
            radial-gradient(circle at 30% 30%, rgba(0,0,0,0.14), rgba(0,0,0,0.06) 60%, transparent 61%),
            radial-gradient(circle at 70% 70%, rgba(0,0,0,0.05) 0 60%, transparent 61%);
          overflow: hidden;
        }
        .mini-globe::before, .mini-globe::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          -webkit-mask-image: radial-gradient(circle, transparent 40%, #000 41%);
          mask-image: radial-gradient(circle, transparent 40%, #000 41%);
        }
        .mini-globe::before {
          background: repeating-conic-gradient(rgba(0,0,0,0.18) 0 1deg, transparent 1deg 6deg);
          animation: spin 18s linear infinite;
        }
        .mini-globe::after {
          background: repeating-linear-gradient(rgba(0,0,0,0.12) 0 2px, transparent 2px 10px);
          transform: rotate(20deg);
          animation: spin 28s linear infinite reverse;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}


