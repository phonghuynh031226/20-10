import React, { useEffect, useRef, useState } from 'react'

// Falling petals background effect
export default function FallingPetals({ enabled = true, count = 18 }) {
  const petals = useRef([])
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!enabled) { setItems([]); return }
    const shapes = ['🌸', '🌺', '🌹', '🌷', '💮', '✿', '❀']
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: shapes[i % shapes.length],
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 8 + Math.random() * 10,
      size: 14 + Math.random() * 16,
      opacity: 0.5 + Math.random() * 0.5,
    }))
    petals.current = generated
    setItems(generated)
  }, [enabled, count])

  if (!enabled) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {items.map((p) => (
        <div
          key={p.id}
          className="petal select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  )
}
