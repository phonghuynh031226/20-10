import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flower2 } from 'lucide-react'

// Animated loading screen
export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer)
          setTimeout(onDone, 400)
          return 100
        }
        return p + 4
      })
    }, 60)
    return () => clearInterval(timer)
  }, [onDone])

  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #fce4ec 0%, #fff0f5 40%, #ffeef4 70%, #fff8f0 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${80 + i * 60}px`,
                height: `${80 + i * 60}px`,
                border: `2px solid rgba(201, 116, 122, ${0.15 - i * 0.02})`,
                left: '50%',
                top: '50%',
                translateX: '-50%',
                translateY: '-50%',
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        {/* Center content */}
        <motion.div
          className="relative z-10 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center bg-gradient-to-tr from-pink-200/70 to-rose-100/90 shadow-xl border border-rose-300/40 select-none"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            aria-hidden="true"
          >
            <Flower2 size={46} strokeWidth={1.5} className="text-[#9b3a4d]" />
          </motion.div>

          <h1 className="font-script text-3xl md:text-4xl mb-1" style={{ color: '#9b3a4d' }}>
            Chúc Mừng
          </h1>
          <p className="font-serif text-lg md:text-xl font-semibold" style={{ color: '#c9747a' }}>
            Ngày Phụ Nữ Việt Nam 20/10
          </p>

          {/* Progress bar */}
          <div className="mt-8 w-48 mx-auto">
            <div className="h-1.5 rounded-full bg-pink-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #c9747a, #d4a836)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: '#c9747a', fontFamily: 'Inter, sans-serif' }}>
              Đang chuẩn bị yêu thương... {progress}%
            </p>
          </div>

          {/* Floating hearts */}
          {['❤️', '💕', '💝', '💖'].map((h, i) => (
            <motion.span
              key={i}
              className="absolute text-xl pointer-events-none select-none"
              style={{ left: `${20 + i * 20}%`, top: `${-20 + (i % 2) * 10}px` }}
              animate={{ y: [-10, 10, -10], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
              aria-hidden="true"
            >
              {h}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
