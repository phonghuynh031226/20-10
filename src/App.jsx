import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import HeartCursor from './components/HeartCursor'
import FallingPetals from './components/FallingPetals'
import HeroSection from './components/HeroSection'
import GreetingCard from './components/GreetingCard'
import FlowerGarden from './components/FlowerGarden'
import WishWall from './components/WishWall'
import ClosingSection from './components/ClosingSection'

// Đọc tên người nhận từ URL query param
function getRecipientFromURL() {
  try {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get('to') || ''
    return decodeURIComponent(raw).replace(/[<>"']/g, '').trim().slice(0, 50)
  } catch {
    return ''
  }
}

// ─── Các bước (screens) ────────────────────────────────────────────────────────
const STEPS = [
  { id: 'hero',    label: 'Trang chủ' },
  { id: 'card',    label: 'Thiệp chúc' },
  { id: 'garden',  label: 'Vườn hoa' },
  { id: 'wishes',  label: 'Lời chúc' },
  { id: 'closing', label: 'Kết thúc' },
]

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true)
  const [recipientName, setRecipientName] = useState(() => getRecipientFromURL())
  const [motionEnabled, setMotionEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState('hero')
  // Hướng chuyển trang: 1 = tiến, -1 = lùi
  const [direction, setDirection] = useState(1)

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) setMotionEnabled(false)
  }, [])

  // Sync URL khi tên thay đổi
  useEffect(() => {
    const url = new URL(window.location.href)
    if (recipientName) {
      url.searchParams.set('to', encodeURIComponent(recipientName))
    } else {
      url.searchParams.delete('to')
    }
    window.history.replaceState({}, '', url.toString())
  }, [recipientName])

  const handleLoadingDone = useCallback(() => setLoading(false), [])

  // Chuyển sang bước kế tiếp
  const goNext = useCallback(() => {
    const curIdx = STEPS.findIndex(t => t.id === activeTab)
    if (curIdx < STEPS.length - 1) {
      setDirection(1)
      setActiveTab(STEPS[curIdx + 1].id)
    }
  }, [activeTab])

  // Chuyển về bước trước
  const goPrev = useCallback(() => {
    const curIdx = STEPS.findIndex(t => t.id === activeTab)
    if (curIdx > 0) {
      setDirection(-1)
      setActiveTab(STEPS[curIdx - 1].id)
    }
  }, [activeTab])

  // Quay về trang đầu (Trang chủ)
  const goHome = useCallback(() => {
    setDirection(-1)
    setActiveTab('hero')
  }, [])

  // Animation variants khi chuyển màn hình
  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit:  (dir) => ({ opacity: 0, x: dir * -40 }),
  }

  // Toàn màn hình 100svh
  const contentStyle = {
    height: '100svh',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
  }

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onDone={handleLoadingDone} />}
      </AnimatePresence>

      {/* Main content */}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }} aria-hidden={loading}>
        {/* Custom cursor (desktop only) */}
        <HeartCursor />

        {/* Falling petals — fixed, always visible */}
        <FallingPetals enabled={motionEnabled} count={16} />

        {/* Màn hình hiển thị nội dung theo từng bước — không có tab bar phía trên */}
        <main
          id="main-content"
          style={{ height: '100svh', overflow: 'hidden' }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              style={contentStyle}
              role="region"
              id={`panel-${activeTab}`}
            >
              {activeTab === 'hero'    && <HeroSection recipientName={recipientName} onNext={goNext} />}
              {activeTab === 'card'    && <GreetingCard recipientName={recipientName} onNext={goNext} onPrev={goPrev} />}
              {activeTab === 'garden'  && <FlowerGarden onNext={goNext} onPrev={goPrev} />}
              {activeTab === 'wishes'  && <WishWall onNext={goNext} onPrev={goPrev} />}
              {activeTab === 'closing' && <ClosingSection onHome={goHome} onPrev={goPrev} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  )
}
