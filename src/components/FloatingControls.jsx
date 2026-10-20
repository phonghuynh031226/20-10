import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, VolumeX, Zap, ZapOff, Share2, Check, Heart, HeartHandshake, X } from 'lucide-react'

// Personalization modal
function PersonalizationModal({ isOpen, onClose, onConfirm, currentName }) {
  const [name, setName] = useState(currentName || '')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const sanitized = name.replace(/[<>'"]/g, '').trim().slice(0, 50)
    onConfirm(sanitized || '')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(155, 58, 77, 0.3)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative glass rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#9b3a4d] hover:bg-[#c9747a]/15 transition-colors"
              aria-label="Đóng"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center shadow-inner" style={{ background: 'rgba(201, 116, 122, 0.15)', border: '1px solid rgba(201, 116, 122, 0.3)' }}>
                <HeartHandshake size={30} className="text-[#9b3a4d]" />
              </div>
              <h3 className="font-serif text-xl font-bold" style={{ color: '#9b3a4d' }}>
                Gửi đến ai?
              </h3>
              <p className="text-sm mt-1" style={{ color: '#c9747a', fontFamily: 'Inter' }}>
                Nhập tên người nhận để cá nhân hóa lời chúc
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  ref={inputRef}
                  id="recipient-name-input"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ví dụ: Lan, Hoa, Mai..."
                  maxLength={50}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(201, 116, 122, 0.4)',
                    color: '#7a3040',
                    fontFamily: 'Inter',
                  }}
                  onFocus={e => e.target.style.border = '1px solid #c9747a'}
                  onBlur={e => e.target.style.border = '1px solid rgba(201, 116, 122, 0.4)'}
                  aria-label="Tên người nhận"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(201, 116, 122, 0.3)',
                    color: '#9b3a4d',
                    fontFamily: 'Inter',
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  id="confirm-name-btn"
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition-all flex items-center justify-center gap-1.5"
                  style={{
                    background: 'linear-gradient(135deg, #c9747a, #9b3a4d)',
                    fontFamily: 'Inter',
                  }}
                >
                  <span>Xác nhận</span>
                  <Heart size={15} fill="white" />
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function FloatingControls({
  recipientName,
  onNameChange,
  motionEnabled,
  onToggleMotion,
}) {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [showNameModal, setShowNameModal] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [showShareTooltip, setShowShareTooltip] = useState(false)

  // Generate share link with name param
  const generateShareLink = () => {
    const url = new URL(window.location.href)
    url.search = ''
    if (recipientName) {
      url.searchParams.set('to', encodeURIComponent(recipientName))
    }
    return url.toString()
  }

  const handleShare = async () => {
    const link = generateShareLink()
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10 🌸',
          text: recipientName
            ? `Gửi đến ${recipientName}: Nhân ngày 20/10, mình muốn gửi đến bạn điều này 💌`
            : 'Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10 🌸',
          url: link,
        })
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(link)
        setCopied(true)
        setShowShareTooltip(true)
        setTimeout(() => { setCopied(false); setShowShareTooltip(false) }, 2500)
      } catch {}
    }
  }

  return (
    <>
      {/* Floating button panel */}
      <div
        className="fixed bottom-6 right-4 z-[100] flex flex-col gap-3"
        role="toolbar"
        aria-label="Điều khiển"
      >
        {/* Music toggle */}
        <motion.button
          id="music-toggle-btn"
          onClick={() => setMusicPlaying(p => !p)}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg glass"
          style={{
            border: '1px solid rgba(201, 116, 122, 0.4)',
            color: '#9b3a4d',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={musicPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
          title={musicPlaying ? 'Tắt nhạc' : 'Bật nhạc (mô phỏng)'}
        >
          {musicPlaying ? (
            <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
              <span className="music-bar" style={{ color: '#9b3a4d', background: '#9b3a4d' }} />
              <span className="music-bar" style={{ color: '#9b3a4d', background: '#9b3a4d' }} />
              <span className="music-bar" style={{ color: '#9b3a4d', background: '#9b3a4d' }} />
            </div>
          ) : (
            <Music size={18} />
          )}
        </motion.button>

        {/* Motion toggle */}
        <motion.button
          id="motion-toggle-btn"
          onClick={onToggleMotion}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg glass"
          style={{
            border: '1px solid rgba(201, 116, 122, 0.4)',
            color: '#9b3a4d',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={motionEnabled ? 'Tắt hiệu ứng chuyển động' : 'Bật hiệu ứng chuyển động'}
          title={motionEnabled ? 'Tắt hiệu ứng' : 'Bật hiệu ứng'}
        >
          {motionEnabled ? <Zap size={18} /> : <ZapOff size={18} />}
        </motion.button>

        {/* Personalize button */}
        <motion.button
          id="personalize-btn"
          onClick={() => setShowNameModal(true)}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #c9747a, #9b3a4d)',
            color: 'white',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Cá nhân hóa lời chúc"
          title="Nhập tên người nhận"
        >
          <HeartHandshake size={20} />
        </motion.button>

        {/* Share button */}
        <div className="relative">
          <motion.button
            id="share-btn"
            onClick={handleShare}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg glass"
            style={{
              border: '1px solid rgba(201, 116, 122, 0.4)',
              color: '#9b3a4d',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Chia sẻ website"
            title="Chia sẻ link"
          >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
          </motion.button>

          <AnimatePresence>
            {showShareTooltip && (
              <motion.div
                className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5"
                style={{
                  background: 'white',
                  color: '#9b3a4d',
                  border: '1px solid rgba(201, 116, 122, 0.3)',
                  fontFamily: 'Inter',
                }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <Check size={14} className="text-emerald-500" />
                <span>Đã sao chép link!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Music indicator */}
      <AnimatePresence>
        {musicPlaying && (
          <motion.div
            className="fixed bottom-6 left-4 z-[100] flex items-center gap-2 px-4 py-2 rounded-full glass shadow-md text-sm"
            style={{ color: '#9b3a4d', fontFamily: 'Inter', border: '1px solid rgba(201, 116, 122, 0.3)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            aria-live="polite"
          >
            <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
              <span className="music-bar" style={{ background: '#c9747a' }} />
              <span className="music-bar" style={{ background: '#c9747a' }} />
              <span className="music-bar" style={{ background: '#c9747a' }} />
            </div>
            <Music size={14} className="animate-pulse" />
            <span>Nhạc đang phát</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personalization modal */}
      <PersonalizationModal
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onConfirm={onNameChange}
        currentName={recipientName}
      />
    </>
  )
}
