import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Flower2, Sparkles } from 'lucide-react'

// SVG Flower components
function RoseSVG({ color = '#c9747a', size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx="18"
          ry="10"
          fill={color}
          opacity={0.7 + (i % 3) * 0.1}
          transform={`rotate(${angle} 50 50) translate(0 -16)`}
          style={{ transformOrigin: '50px 50px' }}
        />
      ))}
      {/* Center */}
      <circle cx="50" cy="50" r="14" fill={color} />
      <circle cx="50" cy="50" r="8" fill="white" opacity="0.3" />
      {/* Stem */}
      <rect x="48" y="62" width="4" height="28" rx="2" fill="#4a7c59" />
      {/* Leaves */}
      <ellipse cx="35" cy="78" rx="10" ry="5" fill="#5a8c6a" transform="rotate(-30 35 78)" />
      <ellipse cx="65" cy="82" rx="10" ry="5" fill="#5a8c6a" transform="rotate(30 65 82)" />
    </svg>
  )
}

function TulipSVG({ color = '#e91e8c', size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Petals */}
      <ellipse cx="50" cy="38" rx="12" ry="22" fill={color} opacity="0.9" />
      <ellipse cx="38" cy="42" rx="12" ry="20" fill={color} opacity="0.75" transform="rotate(-20 38 42)" />
      <ellipse cx="62" cy="42" rx="12" ry="20" fill={color} opacity="0.75" transform="rotate(20 62 42)" />
      {/* Inner */}
      <ellipse cx="50" cy="40" rx="7" ry="14" fill="white" opacity="0.3" />
      {/* Stem */}
      <path d="M50 60 Q45 72 50 90" stroke="#4a7c59" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Leaf */}
      <path d="M50 74 Q35 68 32 78 Q42 80 50 74Z" fill="#5a8c6a" />
    </svg>
  )
}

function SunflowerSVG({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Petals */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx="8"
          ry="18"
          fill="#f4c430"
          opacity="0.9"
          transform={`rotate(${angle} 50 50) translate(0 -20)`}
          style={{ transformOrigin: '50px 50px' }}
        />
      ))}
      {/* Center dark */}
      <circle cx="50" cy="50" r="16" fill="#5d3a1a" />
      <circle cx="50" cy="50" r="12" fill="#7a4a2a" />
      {/* Seeds pattern */}
      {[...Array(8)].map((_, i) => (
        <circle
          key={i}
          cx={50 + Math.cos((i / 8) * Math.PI * 2) * 7}
          cy={50 + Math.sin((i / 8) * Math.PI * 2) * 7}
          r="2"
          fill="#3d2010"
        />
      ))}
      {/* Stem */}
      <rect x="48" y="64" width="4" height="26" rx="2" fill="#4a7c59" />
    </svg>
  )
}

// Individual flower with bloom animation and parallax
function Flower({ type, x, y, size, delay, bloomOnHover, parallaxFactor, onClick }) {
  const [bloomed, setBloomed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const motionX = useMotionValue(0)
  const motionY = useMotionValue(0)
  const translateX = useTransform(motionX, v => v * parallaxFactor)
  const translateY = useTransform(motionY, v => v * parallaxFactor)

  useEffect(() => {
    const t = setTimeout(() => setBloomed(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  const FlowerComponent = type === 'rose' ? RoseSVG : type === 'tulip' ? TulipSVG : SunflowerSVG
  const colors = {
    rose: ['#c9747a', '#e91e8c', '#9b3a4d', '#f48fb1'],
    tulip: ['#e91e8c', '#ce93d8', '#f06292', '#ba68c8'],
    sunflower: null,
  }
  const colorArr = colors[type]
  const color = colorArr ? colorArr[Math.floor(Math.random() * colorArr.length)] : undefined

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        x: translateX,
        y: translateY,
        zIndex: Math.floor(y),
      }}
      initial={{ scale: 0, opacity: 0, rotate: -20 }}
      animate={bloomed ? {
        scale: 1,
        opacity: 1,
        rotate: 0,
        y: [0, -6, 0],
      } : {}}
      transition={{
        scale: { duration: 0.8, type: 'spring', stiffness: 200 },
        opacity: { duration: 0.6 },
        rotate: { duration: 0.8 },
        y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
      }}
      whileHover={{ scale: 1.25, rotate: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => {
        setBloomed(false)
        setTimeout(() => setBloomed(true), 80)
        if (onClick) onClick()
      }}
      aria-label="Bông hoa yêu thương - Nhấn để chuyển đến Bức tường lời chúc"
    >
      {color !== undefined ? (
        <FlowerComponent color={color} size={size} />
      ) : (
        <FlowerComponent size={size} />
      )}

      {/* Bloom sparkle */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <Sparkles size={22} className="absolute -top-4 -right-2 text-amber-400 drop-shadow" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FlowerGarden({ onNext, onPrev }) {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const flowers = [
    { type: 'rose', x: 10, y: 45, size: 72, delay: 300, parallaxFactor: 0.03 },
    { type: 'rose', x: 20, y: 60, size: 60, delay: 600, parallaxFactor: 0.05 },
    { type: 'tulip', x: 30, y: 40, size: 66, delay: 900, parallaxFactor: 0.04 },
    { type: 'sunflower', x: 42, y: 50, size: 78, delay: 500, parallaxFactor: 0.02 },
    { type: 'rose', x: 55, y: 42, size: 64, delay: 800, parallaxFactor: 0.06 },
    { type: 'tulip', x: 66, y: 55, size: 70, delay: 400, parallaxFactor: 0.03 },
    { type: 'sunflower', x: 78, y: 45, size: 74, delay: 700, parallaxFactor: 0.05 },
    { type: 'rose', x: 88, y: 58, size: 62, delay: 1000, parallaxFactor: 0.04 },
    { type: 'tulip', x: 5, y: 65, size: 56, delay: 1200, parallaxFactor: 0.06 },
    { type: 'rose', x: 94, y: 40, size: 58, delay: 1100, parallaxFactor: 0.03 },
    { type: 'tulip', x: 50, y: 68, size: 52, delay: 1300, parallaxFactor: 0.05 },
    { type: 'rose', x: 35, y: 70, size: 50, delay: 1400, parallaxFactor: 0.04 },
  ]

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleFlowerClick = () => {
    if (onNext) {
      setTimeout(() => {
        onNext()
      }, 350)
    }
  }

  return (
    <section
      id="flower-garden"
      className="relative overflow-hidden py-12 flex flex-col justify-between"
      style={{
        minHeight: '100%',
        background: 'linear-gradient(180deg, #fff0f8 0%, #e8f5e9 50%, #fff0f8 100%)',
      }}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Title */}
      <motion.div
        className="text-center relative z-20 pt-2 pb-6 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-script text-lg mb-1 flex items-center justify-center gap-1.5" style={{ color: '#d4a836' }}>
          <Sparkles size={16} className="text-amber-500" />
          <span>Dành Cho Bạn</span>
          <Sparkles size={16} className="text-amber-500" />
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold flex items-center justify-center gap-2" style={{ color: '#9b3a4d' }}>
          <span>Vườn Hoa Yêu Thương</span>
          <Flower2 size={32} className="text-[#9b3a4d]" />
        </h2>
        <p className="text-sm mt-2 flex items-center justify-center gap-1.5" style={{ color: '#c9747a', fontFamily: 'Inter' }}>
          <span>Nhấn vào bông hoa bất kỳ để chuyển tới Bức tường lời chúc</span>
          <Sparkles size={14} className="text-[#c9747a]" />
        </p>
      </motion.div>

      {/* Ground */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(74, 124, 89, 0.2) 60%, rgba(74, 124, 89, 0.4) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Grass detail */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden"
        aria-hidden="true"
        style={{
          background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 8px, rgba(90,140,106,0.15) 8px, rgba(90,140,106,0.15) 12px)',
        }}
      />

      {/* Flowers */}
      <div className="absolute inset-0" style={{ top: '90px', bottom: '80px' }}>
        {flowers.map((f, i) => (
          <Flower key={i} {...f} onClick={handleFlowerClick} />
        ))}
      </div>

      {/* Butterfly */}
      <motion.div
        className="absolute text-3xl pointer-events-none select-none z-30"
        style={{ top: '20%' }}
        animate={{
          x: ['5%', '80%', '40%', '90%', '20%', '5%'],
          y: [0, -30, 20, -20, 10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        🦋
      </motion.div>
    </section>
  )
}
