import React from 'react'

export function HoloToothHero() {
  const d = 'M188 285 L242 248 L300 262 L358 248 L410 285 L362 458 L300 290 L236 458 Z M264 385 L336 385'
  const n = 9
  const slices = Array.from({ length: n }, (_, i) => {
    const c = (n - 1) / 2
    const z = (i - c) * 7
    const o = (1 - (Math.abs(i - c) / n) * 1.1).toFixed(2)
    return { z, o }
  })

  return (
    <div className="hero-holo">
      <div aria-hidden="true" className="holo-stage">
        <div className="holo-beam" />
        <div className="holo-tooth">
          {slices.map((s, idx) => (
            <svg
              key={idx}
              className="mk"
              viewBox="180 235 240 230"
              aria-hidden="true"
              style={{ '--z': `${s.z}px`, '--o': s.o }}
            >
              <path d={d} />
            </svg>
          ))}
          <svg className="wm" viewBox="0 0 300 74" aria-hidden="true">
            <text x="150" y="28" textAnchor="middle" fontFamily="Cinzel,Georgia,serif" fontSize="28" fontWeight="600" letterSpacing="3">
              ARMAMENTO
            </text>
            <rect x="14" y="38" width="272" height="1.6" />
            <text x="150" y="62" textAnchor="middle" fontFamily="Cinzel,Georgia,serif" fontSize="14" letterSpacing="6">
              DENTAL STUDIO
            </text>
          </svg>
        </div>
        <div className="holo-scan" />
        <div className="holo-base" />
      </div>
      <p className="holo-caption">PRECISION DENTISTRY. PERSONALIZED CARE.</p>
    </div>
  )
}
