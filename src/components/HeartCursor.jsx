import React, { useEffect, useState, useRef } from 'react'

// Custom heart cursor
export default function HeartCursor() {
  const cursorRef = useRef(null)
  const [clicks, setClicks] = useState([])
  const [visible, setVisible] = useState(false)
  const posRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    let rafId
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
    }

    const update = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - 12}px, ${posRef.current.y - 12}px)`
      }
      rafId = requestAnimationFrame(update)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onClick = (e) => {
      const id = Date.now() + Math.random()
      const shapes = ['❤️', '💕', '🌸', '✨', '💝', '🌺']
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      const item = {
        id,
        x: e.clientX,
        y: e.clientY,
        shape,
        angle: (Math.random() - 0.5) * 60,
        offsetX: (Math.random() - 0.5) * 80,
      }
      setClicks(prev => [...prev, item])
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== id))
      }, 1000)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('click', onClick)
    rafId = requestAnimationFrame(update)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
        aria-hidden="true"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#c9747a"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Click sparkles */}
      {clicks.map(c => (
        <div
          key={c.id}
          aria-hidden="true"
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: c.x,
            top: c.y,
            animation: `clickFloat 1s ease-out forwards`,
          }}
        >
          <style>{`
            @keyframes clickFloat {
              0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
              100% { transform: translate(calc(-50% + ${c.offsetX}px), calc(-50% - 80px)) scale(1.2); opacity: 0; }
            }
          `}</style>
          <span style={{ fontSize: '20px' }}>{c.shape}</span>
        </div>
      ))}
    </>
  )
}
