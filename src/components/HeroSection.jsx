import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Gift, Sparkles, Heart, HeartHandshake } from 'lucide-react'

// Animated text that types character by character
function TypedText({ text, className, delay = 0, speed = 60 }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, ++i))
        } else {
          setDone(true)
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay, speed])

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="typing-cursor">|</span>}
    </span>
  )
}

// Floating decoration — absolute relative to SECTION, pointer-events-none, safely outside text flow
function FloatingDecoration() {
  const items = [
    { emoji: '🌹', x: '4%',  y: '12%', size: 44, delay: 0,   duration: 5   },
    { emoji: '🌷', x: '88%', y: '10%', size: 38, delay: 1,   duration: 6   },
    { emoji: '💐', x: '3%',  y: '70%', size: 40, delay: 2,   duration: 5.5 },
    { emoji: '🌸', x: '91%', y: '65%', size: 36, delay: 0.5, duration: 7   },
    { emoji: '🌺', x: '50%', y: '4%',  size: 32, delay: 1.5, duration: 4.5 },
    { emoji: '✨', x: '16%', y: '38%', size: 22, delay: 0.8, duration: 3   },
    { emoji: '✨', x: '80%', y: '32%', size: 20, delay: 2,   duration: 3.5 },
    { emoji: '💫', x: '33%', y: '6%',  size: 24, delay: 1.2, duration: 4   },
    { emoji: '💫', x: '67%', y: '78%', size: 22, delay: 0.3, duration: 5   },
    { emoji: '❤️', x: '11%', y: '52%', size: 26, delay: 1.8, duration: 4.5 },
    { emoji: '💕', x: '84%', y: '48%', size: 24, delay: 0.6, duration: 6   },
    { emoji: '🦋', x: '47%', y: '88%', size: 28, delay: 2.5, duration: 5   },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{ left: item.x, top: item.y, fontSize: item.size }}
          animate={{ y: [0, -18, 0], rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Sparkle dots */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            left: `${12 + i * 8}%`,
            top: `${25 + (i % 4) * 18}%`,
            background: i % 2 === 0 ? '#d4a836' : '#c9747a',
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 2 + (i % 3), delay: i * 0.35, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

// Gift box burst effect
function GiftBurst({ onClose }) {
  const [phase, setPhase] = useState('opening')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('burst'), 500)
    const t2 = setTimeout(() => { setPhase('done'); onClose() }, 2000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onClose])

  // Pre-compute burst offsets once — never inside render
  const burstOffsets = useRef(
    ['🌹', '💐', '🌸', '💕', '✨', '🌷', '💝', '🌺'].map((e, i) => ({
      emoji: e,
      x: Math.cos((i / 8) * Math.PI * 2) * 120,
      y: Math.sin((i / 8) * Math.PI * 2) * 100 - 40,
    }))
  ).current

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'rgba(252, 228, 236, 0.92)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        className="relative text-center"
        animate={
          phase === 'opening'
            ? { scale: [0.5, 1.2, 1], rotate: [0, -5, 5, 0] }
            : phase === 'burst'
            ? { scale: [1, 1.5, 0], opacity: [1, 1, 0] }
            : {}
        }
        transition={{ duration: 0.8 }}
      >
        <div className="relative inline-flex items-center justify-center p-6 rounded-3xl bg-gradient-to-tr from-pink-200/80 to-rose-100/90 shadow-2xl border border-rose-300/50">
          <Gift size={96} strokeWidth={1.5} className="text-[#9b3a4d] drop-shadow-md" />
          <Sparkles size={28} className="absolute -top-3 -right-3 text-amber-500 animate-pulse" />
        </div>
        {phase === 'burst' && burstOffsets.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl pointer-events-none select-none"
            style={{ left: '50%', top: '50%' }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{ x: item.x, y: item.y, opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.5, delay: 0.1 }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </motion.div>

      {phase === 'burst' && (
        <motion.p
          className="absolute bottom-1/3 font-script text-3xl flex items-center justify-center gap-2"
          style={{ color: '#9b3a4d' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span>Yêu thương gửi đến bạn!</span>
          <Heart size={24} fill="#c9747a" className="text-[#c9747a] animate-bounce" />
        </motion.p>
      )}
    </motion.div>
  )
}


export default function HeroSection({ recipientName, onNext }) {
  const [showGift, setShowGift] = useState(false)
  const [textPhase, setTextPhase] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setTextPhase(1), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden px-4"
      style={{
        minHeight: '100%',
        paddingTop: 'clamp(2rem, 6vh, 4rem)',
        paddingBottom: 'clamp(1.5rem, 5vh, 3rem)',
        background: 'linear-gradient(160deg, #fff0f8 0%, #fce4ec 30%, #fff8f0 60%, #fce4ec 100%)',
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212, 168, 54, 0.12) 0%, transparent 70%)',
        }}
      />

      {/* Decorations are absolute to section, no z-index that could overlap text */}
      <FloatingDecoration />

      {/* All text + CTA in a single normal-flow column — no absolute children here */}
      <div
        className="relative z-10 flex flex-col items-center text-center w-full max-w-3xl mx-auto px-4"
        style={{ gap: 0 }}
      >
        {/* Sub heading */}
        <motion.p
          className="font-script text-xl md:text-2xl tracking-wide mb-2 flex items-center justify-center gap-2"
          style={{ color: '#d4a836' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Sparkles size={16} className="text-amber-500" />
          <span>Ngày Đặc Biệt · 20 Tháng 10</span>
          <Sparkles size={16} className="text-amber-500" />
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="font-serif font-bold leading-tight mb-3"
          style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', color: '#9b3a4d' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <span className="shimmer-text">Happy Vietnamese</span>
          <br />
          <span className="shimmer-text">Women's Day</span>
        </motion.h1>

        {/* Vietnamese title */}
        <motion.h2
          className="font-script font-bold mb-4"
          style={{ fontSize: 'clamp(1.3rem, 3.8vw, 2.6rem)', color: '#c9747a' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          {textPhase >= 1 ? (
            <TypedText
              text="Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10 🌸"
              delay={200}
              speed={50}
            />
          ) : null}
        </motion.h2>

        {/* Recipient name — only renders when present */}
        {recipientName && (
          <motion.p
            className="font-script text-xl md:text-2xl mb-4 flex items-center justify-center gap-2"
            style={{ color: '#9b3a4d' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            <HeartHandshake size={20} className="text-[#9b3a4d]" />
            <span>Đặc biệt gửi đến: <strong>{recipientName}</strong></span>
          </motion.p>
        )}

        {/* CTA button */}
        <motion.div
          className="flex justify-center mt-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7, type: 'spring' }}
        >
          <motion.button
            id="open-gift-btn"
            onClick={() => setShowGift(true)}
            className="btn-romantic glow-effect text-white font-semibold px-9 py-4 rounded-full text-base sm:text-lg shadow-xl flex items-center gap-2.5"
            style={{ fontFamily: 'Inter, sans-serif' }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Mở món quà yêu thương"
          >
            <span>Mở món quà yêu thương</span>
            <Gift size={20} className="inline-block" />
          </motion.button>
        </motion.div>
      </div>

      {/* Gift burst overlay */}
      {showGift && (
        <GiftBurst onClose={() => {
          setShowGift(false)
          // Chuyển sang tab Thiệp chúc mừng
          if (onNext) onNext()
        }} />
      )}
    </section>
  )
}
