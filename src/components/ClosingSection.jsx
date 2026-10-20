import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Sparkles, HeartHandshake, Heart } from 'lucide-react'

// Confetti heart / flower burst
function Confetti({ active }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!active) return
    const emojis = ['❤️', '💕', '🌸', '🌺', '✨', '💝', '🌹', '💗', '🌷', '⭐', '💫', '🎉']
    const newPieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 2,
      size: 16 + Math.random() * 24,
      rotate: (Math.random() - 0.5) * 720,
      tx: (Math.random() - 0.5) * 400,
    }))
    setPieces(newPieces)
    setTimeout(() => setPieces([]), 4000)
  }, [active])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
      <AnimatePresence>
        {pieces.map(p => (
          <motion.div
            key={p.id}
            className="absolute select-none"
            style={{
              left: `${p.x}%`,
              top: '-5%',
              fontSize: p.size,
            }}
            initial={{ y: 0, opacity: 1, rotate: 0, x: 0 }}
            animate={{
              y: '120vh',
              opacity: [1, 1, 0],
              rotate: p.rotate,
              x: p.tx,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeIn',
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default function ClosingSection({ onHome, onPrev }) {
  const [confettiActive, setConfettiActive] = useState(false)
  const [triggered, setTriggered] = useState(false)

  // Tự động bắn pháo hoa chúc mừng ngay khi chuyển tới màn hình kết thúc
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiActive(true)
      setTriggered(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const triggerConfetti = () => {
    setConfettiActive(false)
    setTimeout(() => setConfettiActive(true), 50)
    setTriggered(true)
  }

  const handleHome = () => {
    if (onHome) onHome()
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="closing"
      className="relative py-20 px-4 text-center overflow-hidden flex flex-col justify-center items-center"
      style={{
        minHeight: '100%',
        background: 'linear-gradient(160deg, #fce4ec 0%, #fff0f5 30%, #fff8f0 60%, #fce4ec 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              border: `1px solid rgba(201, 116, 122, ${0.1 - i * 0.015})`,
              left: '50%',
              top: '50%',
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.02, 1] }}
            transition={{
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' },
              scale: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Animated flower crown */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center bg-gradient-to-tr from-amber-100/80 to-rose-100/90 shadow-xl border border-amber-200/50"
          animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          aria-hidden="true"
        >
          <Crown size={46} strokeWidth={1.5} className="text-amber-500 drop-shadow-sm" />
        </motion.div>

        {/* Main closing text */}
        <motion.h2
          className="font-script leading-relaxed mb-6"
          style={{
            fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
            color: '#9b3a4d',
            lineHeight: 1.6,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          "Chúc bạn luôn xinh đẹp, hạnh phúc và được yêu thương mỗi ngày! 💖"
        </motion.h2>

        <motion.div
          className="flex items-center gap-3 justify-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #d4a836)' }} />
          <div className="flex items-center gap-1.5 text-amber-500">
            <Sparkles size={14} />
            <Sparkles size={16} />
            <Sparkles size={14} />
          </div>
          <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #d4a836, transparent)' }} />
        </motion.div>

        <motion.p
          className="text-base mb-10"
          style={{ color: '#c9747a', fontFamily: 'Inter', fontWeight: 300 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Hôm nay là ngày của bạn — hãy để bản thân được tận hưởng trọn vẹn nhé! 🌸
        </motion.p>

        {/* Post-confetti message */}
        <AnimatePresence>
          {triggered && (
            <motion.p
              className="mt-8 font-script text-xl flex items-center justify-center gap-2"
              style={{ color: '#9b3a4d' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <HeartHandshake size={22} className="text-[#9b3a4d]" />
              <span>Yêu thương đã được gửi đi!</span>
              <Sparkles size={18} className="text-amber-500" />
            </motion.p>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          className="mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(201, 116, 122, 0.2)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs flex items-center justify-center gap-1.5" style={{ color: '#c9747a', fontFamily: 'Inter' }}>
            <Heart size={13} fill="#c9747a" className="text-[#c9747a]" />
            <span>Làm với yêu thương · Ngày Phụ Nữ Việt Nam 20/10 · 2026</span>
            <Heart size={13} fill="#c9747a" className="text-[#c9747a]" />
          </p>
        </motion.div>
      </div>

      <Confetti active={confettiActive} />
    </section>
  )
}
