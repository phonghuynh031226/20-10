import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Mail, Flower2, Sparkles } from 'lucide-react'

const MESSAGES = {
  default: `Nhân ngày 20/10, chúc bạn luôn xinh đẹp, rạng rỡ và ngập tràn niềm vui trong cuộc sống!\n\nMong bạn luôn giữ vững nụ cười tươi tắn, tự tin tỏa sáng theo cách riêng, công việc hay học tập đều vạn sự như ý và luôn gặp nhiều may mắn.\n\nChúc bạn có một ngày 20/10 thật tuyệt vời, nhận được thật nhiều hoa, ngập tràn quà tặng và luôn hạnh phúc nhé! 🌸💖`,
  named: (name) =>
    `Gửi đến ${name} nhân ngày 20/10,\n\nChúc ${name} luôn xinh đẹp, tươi vui và tràn đầy năng lượng tích cực! Mong rằng mọi ước mơ và dự định của ${name} đều sẽ sớm thành hiện thực.\n\nChúc ${name} có một ngày 20/10 thật rực rỡ, nhận mỏi tay hoa và quà, và tận hưởng ngày của riêng mình thật trọn vẹn nhé! 💕🌸`,
}

// Flying hearts animation — x drift pre-computed at creation time (stored in heart object)
function FlyingHearts({ hearts }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      <AnimatePresence>
        {hearts.map(h => (
          <motion.div
            key={h.id}
            className="absolute text-2xl select-none"
            style={{ left: h.x, top: h.y }}
            initial={{ y: 0, opacity: 1, scale: 0.5 }}
            animate={{ y: -(window.innerHeight * 0.7), opacity: 0, scale: 1.2, x: h.driftX }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          >
            {h.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default function GreetingCard({ recipientName, onNext, onPrev }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hearts, setHearts] = useState([])
  const [copied, setCopied] = useState(false)
  const btnRef = useRef(null)

  const message = recipientName ? MESSAGES.named(recipientName) : MESSAGES.default

  const handleHeartClick = () => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const emojis = ['❤️', '💕', '💖', '💗', '💝', '🌸', '✨']
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 80,
      y: rect.top,
      emoji: emojis[i % emojis.length],
      // Pre-compute drift so Math.random() never runs inside animate
      driftX: (Math.random() - 0.5) * 120,
    }))
    setHearts(prev => [...prev, ...newHearts])

    // Sau khi tim bay lên thì chuyển mượt mà qua Vườn hoa
    if (onNext) {
      setTimeout(() => {
        onNext()
      }, 800)
    }
  }

  const copyMessage = async () => {
    const text = recipientName
      ? `💌 Gửi đến ${recipientName} nhân ngày Phụ Nữ Việt Nam 20/10:\n\n${message}\n\n🌸 Từ: website chúc mừng 20/10`
      : `💌 Nhân ngày Phụ Nữ Việt Nam 20/10:\n\n${message}\n\n🌸`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <section
      id="greeting-card"
      className="relative py-20 px-4 flex flex-col items-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fce4ec 0%, #fff0f8 40%, #ffeef4 100%)',
      }}
    >
      {/* Section title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-script text-lg mb-1 flex items-center justify-center gap-1.5" style={{ color: '#d4a836' }}>
          <Sparkles size={16} className="text-amber-500" />
          <span>Dành Riêng Cho Bạn</span>
          <Sparkles size={16} className="text-amber-500" />
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: '#9b3a4d' }}>
          Thiệp Chúc Mừng
        </h2>
      </motion.div>

      {/* Card */}
      <div className="card-3d-container w-full max-w-md">
        <motion.div
          className="relative"
          initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
          whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          {/* Card outer */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Đóng thiệp' : 'Mở thiệp để xem lời chúc'}
          >
            {/* Card gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #fff0f8 0%, #fce4ec 40%, #fff8f0 70%, #ffeef4 100%)',
              }}
            />

            {/* Decorative border */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                border: '2px solid transparent',
                backgroundClip: 'padding-box',
                boxShadow: 'inset 0 0 0 1px rgba(201, 116, 122, 0.3)',
              }}
            />

            {/* Card content */}
            <div className="relative p-8 md:p-10">
              {/* Card front (closed) */}
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div
                    key="front"
                    className="text-center py-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center shadow-lg relative"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(252, 228, 236, 0.8))',
                        border: '1px solid rgba(201, 116, 122, 0.35)',
                      }}
                      animate={{ scale: [1, 1.06, 1], rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      aria-hidden="true"
                    >
                      <Mail size={44} strokeWidth={1.4} className="text-[#9b3a4d]" />
                      <Heart size={18} fill="#c9747a" className="text-[#c9747a] absolute -top-1 -right-1" />
                    </motion.div>
                    <h3 className="font-serif text-2xl font-bold mb-2" style={{ color: '#9b3a4d', fontFamily: "'Lora', 'Merriweather', serif" }}>
                      {recipientName ? `Gửi đến: ${recipientName}` : 'Một điều muốn nói...'}
                    </h3>
                    <p className="text-sm flex items-center justify-center gap-1.5" style={{ color: '#c9747a', fontFamily: 'Inter' }}>
                      <span>Nhấn vào thiệp để mở</span>
                      <Sparkles size={14} className="text-[#c9747a]" />
                    </p>

                    {/* Corner decorations */}
                    {['↖', '↗', '↙', '↘'].map((arrow, i) => (
                      <span
                        key={i}
                        className="absolute select-none"
                        style={{
                          top: i < 2 ? '16px' : 'auto',
                          bottom: i >= 2 ? '16px' : 'auto',
                          left: i % 2 === 0 ? '16px' : 'auto',
                          right: i % 2 === 1 ? '16px' : 'auto',
                        }}
                        aria-hidden="true"
                      >
                        <Flower2 size={16} className="text-[#c9747a]/40" />
                      </span>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="inner"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Inner card header */}
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center bg-rose-100/60 shadow-sm" aria-hidden="true">
                        <Flower2 size={28} className="text-[#9b3a4d] animate-pulse" />
                      </div>
                      <h3 className="font-script text-xl" style={{ color: '#9b3a4d' }}>
                        Nhân Ngày 20 Tháng 10
                      </h3>
                      {/* Gold divider */}
                      <div className="flex items-center gap-3 justify-center mt-3">
                        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #d4a836)' }} />
                        <Sparkles size={14} className="text-amber-500" aria-hidden="true" />
                        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #d4a836, transparent)' }} />
                      </div>
                    </div>

                    {/* Message */}
                    <div
                      className="rounded-2xl p-5 mb-6"
                      style={{ background: 'rgba(255,255,255,0.6)' }}
                    >
                      <p
                        className="font-script text-base leading-relaxed whitespace-pre-line"
                        style={{ color: '#7a3040', fontSize: '1.05rem', lineHeight: 1.8 }}
                      >
                        {message}
                      </p>
                    </div>

                    {/* Signature */}
                    <div className="text-center">
                      <p className="font-script text-lg flex items-center justify-center gap-1.5" style={{ color: '#d4a836' }}>
                        <span>Với yêu thương</span>
                        <Sparkles size={16} className="text-amber-500" />
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action buttons */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="flex gap-3 mt-5 flex-wrap justify-center items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Send heart button */}
                <button
                  ref={btnRef}
                  id="send-heart-btn"
                  onClick={handleHeartClick}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg text-sm transition-all active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #c9747a, #9b3a4d)',
                    fontFamily: 'Inter',
                  }}
                  aria-label="Gửi một trái tim"
                >
                  <Heart size={16} fill="white" />
                  <span>Gửi một trái tim</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <FlyingHearts hearts={hearts} />
    </section>
  )
}
