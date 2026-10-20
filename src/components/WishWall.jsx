import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Check, Sparkles, MessageSquareHeart, PartyPopper } from 'lucide-react'

// ─── Danh sách lời chúc phong phú ───────────────────────────────────────────
// Mỗi lượt truy cập, 8 lời chúc được chọn ngẫu nhiên từ pool lời chúc này.
const WISH_POOL = [
  {
    id: 1,
    text: 'Chúc bạn ngày 20/10 luôn xinh đẹp, rạng rỡ và ngập tràn niềm vui. Mong bạn mỗi ngày thức dậy đều có thêm thật nhiều lý do để mỉm cười!',
    emoji: '🌸',
    from: '20/10 vui vẻ',
    color: '#fce4ec',
    borderColor: '#f48fb1',
  },
  {
    id: 2,
    text: 'Chúc bạn một ngày 20/10 nhận được thật nhiều hoa, ngập tràn quà tặng và luôn được mọi người yêu quý, trân trọng nhé!',
    emoji: '💐',
    from: 'Hoa & quà ngập tràn',
    color: '#fdf0f8',
    borderColor: '#ce93d8',
  },
  {
    id: 3,
    text: 'Chúc bạn luôn tự tin, yêu đời, công việc thuận lợi, học tập hanh thông và ngày càng tỏa sáng theo cách riêng của mình!',
    emoji: '✨',
    from: 'Tự tin tỏa sáng',
    color: '#fff8e1',
    borderColor: '#ffd54f',
  },
  {
    id: 4,
    text: 'Hôm nay là 20/10, chúc bạn luôn xinh tươi, ăn ngon không lo béo, lúc nào cũng vui vẻ và tràn đầy năng lượng tích cực!',
    emoji: '🥳',
    from: 'Luôn tươi vui',
    color: '#f3e5f5',
    borderColor: '#ba68c8',
  },
  {
    id: 5,
    text: 'Chúc bạn một ngày 20/10 thật tuyệt vời: cười nhiều hơn, bớt âu lo, ví tiền luôn rủng rỉnh và hạnh phúc ngập tràn mỗi ngày!',
    emoji: '🎉',
    from: 'Nụ cười rạng rỡ',
    color: '#fff3e0',
    borderColor: '#ffb74d',
  },
  {
    id: 6,
    text: 'Chúc bạn luôn giữ được nét tươi tắn, nụ cười rạng rỡ và sự lạc quan yêu đời. Mong mọi điều may mắn nhất sẽ luôn mỉm cười với bạn!',
    emoji: '☀️',
    from: 'May mắn ngập tràn',
    color: '#fdf0f8',
    borderColor: '#e91e8c',
  },
  {
    id: 7,
    text: 'Ngày 20/10 chúc bạn được thỏa sức thư giãn, tự thưởng cho mình những món quà yêu thích và tận hưởng ngày của riêng mình!',
    emoji: '🌷',
    from: 'Tận hưởng ngày này',
    color: '#fce4ec',
    borderColor: '#f06292',
  },
  {
    id: 8,
    text: 'Chúc bạn ngày 20/10 thật rực rỡ, luôn kiên cường, bản lĩnh và gặt hái được thật nhiều thành công trong mọi mục tiêu đặt ra!',
    emoji: '🌺',
    from: 'Rực rỡ mỗi ngày',
    color: '#f8f8ff',
    borderColor: '#b39ddb',
  },
  {
    id: 9,
    text: 'Hôm nay là ngày 20/10 — không lo bài vở, không bận việc nhà, cứ tha hồ đi chơi và làm những gì mình thích nhất nhé! 😄',
    emoji: '🎊',
    from: 'Nghỉ ngơi xả láng',
    color: '#fce4ec',
    borderColor: '#ef9a9a',
  },
  {
    id: 10,
    text: 'Chúc mừng ngày phụ nữ! Hôm nay bạn được phép xúng xính váy hoa, làm điệu, ăn ngon — và được nuông chiều hết mực! 🌟',
    emoji: '👑',
    from: 'Xinh đẹp tỏa sáng',
    color: '#fff9c4',
    borderColor: '#f9a825',
  },
  {
    id: 11,
    text: 'Bạn đẹp nhất khi bạn là chính mình và luôn nở nụ cười rạng rỡ. Chúc bạn một ngày 20/10 cực kỳ đáng yêu và vui vẻ!',
    emoji: '☕✨',
    from: 'Luôn là chính mình',
    color: '#fdf6e3',
    borderColor: '#e6a817',
  },
  {
    id: 12,
    text: 'Chúc bạn ngày 20/10 ngập tràn may mắn, sự nghiệp và học tập vạn sự như ý, tương lai luôn chào đón những cơ hội tuyệt vời!',
    emoji: '🍀',
    from: 'Vạn sự hanh thông',
    color: '#e8f5e9',
    borderColor: '#66bb6a',
  },
  {
    id: 13,
    text: 'Chúc bạn 20/10 vui tươi phơi phới, nhan sắc ngày càng thăng hạng và lúc nào cũng có những người bạn tốt xung quanh!',
    emoji: '🌟',
    from: 'Năng lượng tích cực',
    color: '#e3f2fd',
    borderColor: '#42a5f5',
  },
  {
    id: 14,
    text: 'Chúc bạn một ngày 20/10 ngập tràn niềm vui, cuộc sống bình yên, không chút muộn phiền và luôn tràn trề sức sống!',
    emoji: '🕊️',
    from: 'Bình yên & vui tươi',
    color: '#fff8e1',
    borderColor: '#ffcc02',
  },
  {
    id: 15,
    text: 'Chúc bạn luôn giữ được năng lượng tươi mới, luôn yêu thương chăm sóc bản thân thật tốt và gặp thật nhiều điều ngọt ngào!',
    emoji: '🌼',
    from: 'Yêu thương bản thân',
    color: '#fdf6e3',
    borderColor: '#f4c430',
  },
  {
    id: 16,
    text: 'Chúc bạn ngày 20/10 nhận quà mỏi tay, chụp được thật nhiều ảnh xinh lung linh và có một buổi tối đi chơi thật vui vẻ!',
    emoji: '📸',
    from: 'Xinh tươi rạng ngời',
    color: '#f3e5f5',
    borderColor: '#9c27b0',
  },
  {
    id: 17,
    text: '20/10 chúc bạn mỗi ngày đều đáng nhớ, tự tin vững bước trên con đường mình chọn và sống một tuổi trẻ thật rực rỡ!',
    emoji: '💫',
    from: 'Tỏa sáng nha',
    color: '#fdf0f8',
    borderColor: '#ab47bc',
  },
  {
    id: 18,
    text: 'Chúc bạn luôn rạng ngời như đóa hoa hướng dương đón nắng, may mắn ngập tràn và mọi dự định ấp ủ đều sớm thành công!',
    emoji: '🌻',
    from: 'Hướng về ánh nắng',
    color: '#fff8e1',
    borderColor: '#ffd54f',
  },
  {
    id: 19,
    text: '20/10 vui vẻ nha! Chúc bạn túi rủng rỉnh tiền, miệng luôn tươi cười và mọi điều ước hôm nay đều trở thành hiện thực!',
    emoji: '🥳',
    from: 'Mọi điều như ý',
    color: '#fff3e0',
    borderColor: '#ff8f00',
  },
  {
    id: 20,
    text: 'Hôm nay là ngày của phái đẹp, nhưng chúc bạn cả 365 ngày trong năm đều luôn vui vẻ, rạng rỡ và hạnh phúc ngập tràn nhé!',
    emoji: '💖',
    from: '365 ngày hạnh phúc',
    color: '#fce4ec',
    borderColor: '#ef9a9a',
  },
]

// ─── Hàm chọn ngẫu nhiên n phần tử, chạy 1 lần khi khởi tạo ────────────────
function pickRandomWishes(count = 8) {
  const shuffled = [...WISH_POOL].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// ─── Lấy/lưu lời chúc vào sessionStorage để ổn định trong phiên ─────────────
function getSessionWishes() {
  try {
    const cached = sessionStorage.getItem('wishes_2010')
    if (cached) {
      const parsed = JSON.parse(cached)
      const validIds = new Set(WISH_POOL.map(w => w.id))
      // Validate: đúng 8 phần tử và tất cả id đều nằm trong WISH_POOL hiện tại
      if (Array.isArray(parsed) && parsed.length === 8 && parsed.every(w => validIds.has(w.id))) {
        return parsed
      }
    }
  } catch {}
  const wishes = pickRandomWishes(8)
  try { sessionStorage.setItem('wishes_2010', JSON.stringify(wishes)) } catch {}
  return wishes
}

// ─── Card lời chúc ───────────────────────────────────────────────────────────
function WishCard({ wish, index, onSelect }) {
  const [shared, setShared] = useState(false)

  const shareWish = async (e) => {
    e.stopPropagation()
    const text = `${wish.emoji} ${wish.text}\n\n— Ngày Phụ Nữ Việt Nam 20/10 🌸`
    if (navigator.share) {
      try { await navigator.share({ text }) } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(text)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch {}
    }
  }

  return (
    <motion.article
      onClick={() => {
        if (onSelect) {
          setTimeout(() => onSelect(), 180)
        }
      }}
      className="relative rounded-2xl p-6 flex flex-col gap-3 shadow-lg hover:shadow-2xl transition-all group cursor-pointer select-none"
      style={{ background: wish.color, border: `1px solid ${wish.borderColor}` }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.07, duration: 0.5, type: 'spring', stiffness: 120 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
    >
      {/* Emoji */}
      <motion.div
        className="text-3xl"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3 + index * 0.5, repeat: Infinity }}
        aria-hidden="true"
      >
        {wish.emoji}
      </motion.div>

      {/* Text */}
      <p
        className="font-script flex-1"
        style={{ color: '#7a3040', fontSize: '1.05rem', lineHeight: 1.75 }}
      >
        "{wish.text}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-semibold flex items-center gap-1" style={{ color: wish.borderColor, fontFamily: 'Inter' }}>
          <Sparkles size={11} className="text-amber-500" />
          <span>{wish.from}</span>
        </span>
        <button
          onClick={shareWish}
          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs px-3 py-1 rounded-full"
          style={{
            background: wish.borderColor + '20',
            color: wish.borderColor,
            border: `1px solid ${wish.borderColor}40`,
            fontFamily: 'Inter',
          }}
          aria-label={shared ? 'Đã sao chép' : 'Chia sẻ lời chúc'}
        >
          {shared ? <Check size={12} className="text-emerald-500" /> : <Share2 size={12} />}
          <span>{shared ? 'Đã chép!' : 'Chia sẻ'}</span>
        </button>
      </div>
    </motion.article>
  )
}

// ─── WishWall ─────────────────────────────────────────────────────────────────
// Lời chúc được chọn 1 lần khi khởi tạo state (lazy initializer),
// ổn định trong suốt phiên dùng sessionStorage.
export default function WishWall({ onNext, onPrev }) {
  // useState lazy initializer: chạy đúng 1 lần, không re-run khi render
  const [wishes] = useState(() => getSessionWishes())

  return (
    <section
      id="wish-wall"
      className="relative py-16 px-4"
      style={{
        minHeight: '100%',
        background: 'linear-gradient(180deg, #fff0f8 0%, #fce4ec 50%, #fff0f8 100%)',
      }}
    >
      {/* Title */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="font-script text-lg mb-1 flex items-center justify-center gap-1.5" style={{ color: '#d4a836' }}>
          <Sparkles size={16} className="text-amber-500" />
          <span>Những Điều Từ Trái Tim</span>
          <Sparkles size={16} className="text-amber-500" />
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-2" style={{ color: '#9b3a4d' }}>
          <span>Bức Tường Lời Chúc</span>
          <MessageSquareHeart size={32} className="text-[#9b3a4d]" />
        </h2>
        <p className="text-sm flex items-center justify-center gap-1.5" style={{ color: '#c9747a', fontFamily: 'Inter' }}>
          <span>Nhấn vào lời chúc bất kỳ để xem lời chúc kết & bắn pháo hoa</span>
          <PartyPopper size={16} className="text-pink-500" />
        </p>
      </motion.div>

      {/* Grid — key ổn định, không thay đổi khi scroll hay re-render */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto pb-12">
        {wishes.map((wish, i) => (
          <WishCard key={wish.id} wish={wish} index={i} onSelect={onNext} />
        ))}
      </div>
    </section>
  )
}
