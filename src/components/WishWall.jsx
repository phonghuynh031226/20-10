import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Check, Sparkles, MessageSquareHeart, PartyPopper } from 'lucide-react'

// ─── Danh sách lời chúc phong phú ───────────────────────────────────────────
// Mỗi lượt truy cập, 8 lời chúc được chọn ngẫu nhiên từ pool 24 lời chúc này.
const WISH_POOL = [
  // Ngọt ngào, dễ thương
  {
    id: 1,
    text: 'Chúc bạn luôn tỏa sáng như bông hoa rực rỡ nhất trong vườn xuân — dịu dàng, kiên cường và đẹp đẽ theo cách riêng của mình.',
    emoji: '🌸',
    from: 'Từ trái tim',
    color: '#fce4ec',
    borderColor: '#f48fb1',
  },
  {
    id: 2,
    text: 'Bạn không cần phải hoàn hảo để xứng đáng được yêu. Bạn chỉ cần là chính mình — và điều đó đã đủ tuyệt vời rồi.',
    emoji: '💕',
    from: 'Lời nhắn nhủ',
    color: '#fdf0f8',
    borderColor: '#ce93d8',
  },
  {
    id: 3,
    text: 'Mỗi nụ cười của bạn là ánh sáng làm ấm lòng bao người. Chúc bạn mãi giữ được nụ cười ấy và nhận lại thật nhiều hạnh phúc.',
    emoji: '☀️💖',
    from: 'Cảm ơn bạn',
    color: '#fff8e1',
    borderColor: '#ffd54f',
  },
  {
    id: 4,
    text: 'Hành trình của bạn là bài thơ đẹp nhất — có lúc buồn, có lúc vui, nhưng mỗi trang đều có giá trị và xứng đáng được trân trọng.',
    emoji: '📖✨',
    from: 'Từ sâu tim',
    color: '#f3e5f5',
    borderColor: '#ba68c8',
  },
  // Ấm áp, chân thành
  {
    id: 5,
    text: 'Người phụ nữ mạnh mẽ không phải là người không khóc — mà là người biết đứng dậy dù đã ngã, và tiếp tục yêu thương.',
    emoji: '💪❤️',
    from: 'Kính trọng bạn',
    color: '#fff3e0',
    borderColor: '#ffb74d',
  },
  {
    id: 6,
    text: 'Người phụ nữ có thể vừa mềm mại như cánh hoa, vừa vững chắc như gốc cây. Bạn là sự kết hợp hoàn hảo của cả hai điều đó.',
    emoji: '🌺',
    from: 'Ngưỡng mộ bạn',
    color: '#fdf0f8',
    borderColor: '#e91e8c',
  },
  {
    id: 7,
    text: 'Bạn đã làm tốt hơn bạn nghĩ rất nhiều. Ngày hôm nay, hãy để bản thân được tận hưởng và đón nhận tình yêu thương nhé! 💝',
    emoji: '🌷',
    from: 'Nhắc nhở yêu',
    color: '#fce4ec',
    borderColor: '#f06292',
  },
  {
    id: 8,
    text: 'Cảm ơn bạn đã là người bạn ấy, người đồng hành ấy, người quan tâm đến mọi người xung quanh mà đôi khi quên mất bản thân mình.',
    emoji: '🤍',
    from: 'Chân thành nhất',
    color: '#f8f8ff',
    borderColor: '#b39ddb',
  },
  // Vui vẻ, hài hước nhẹ nhàng
  {
    id: 9,
    text: 'Chúc bạn ngày 20/10 đầy nụ cười, được yêu thương theo cách bạn xứng đáng nhận được, và tối nay được nghỉ ngơi thật sự! 🎉',
    emoji: '🎊',
    from: 'Vui lắm đấy',
    color: '#fce4ec',
    borderColor: '#ef9a9a',
  },
  {
    id: 10,
    text: 'Hôm nay là ngày của bạn — không nấu cơm, không lo việc nhà, không phải giải thích tại sao mình cần được nghỉ ngơi. Cứ tận hưởng! 😄',
    emoji: '🥳',
    from: 'Hài hước yêu',
    color: '#fff9c4',
    borderColor: '#f9a825',
  },
  {
    id: 11,
    text: 'Bạn đẹp nhất khi bạn là chính mình — kể cả lúc tóc rối, mắt mờ và đang cầm ly cà phê thứ ba của ngày. 😂☕',
    emoji: '☕✨',
    from: 'Thành thật nha',
    color: '#fdf6e3',
    borderColor: '#e6a817',
  },
  {
    id: 12,
    text: 'Chúc mừng ngày phụ nữ! Hôm nay bạn được phép đòi hỏi, được phép ăn nhiều, được phép làm điệu — và được phép không làm gì cả! 🌟',
    emoji: '👑',
    from: 'Vui vẻ nào',
    color: '#fce4ec',
    borderColor: '#f48fb1',
  },
  // Lãng mạn
  {
    id: 13,
    text: 'Nếu cuộc đời là một vườn hoa, thì bạn chính là bông hoa đẹp nhất — không phải vì bạn hoàn hảo, mà vì bạn có hương thơm riêng không ai có được.',
    emoji: '🌹',
    from: 'Lãng mạn lắm',
    color: '#fdf0f8',
    borderColor: '#c9747a',
  },
  {
    id: 14,
    text: 'Đôi mắt bạn chứa cả bầu trời — lúc bình yên như nắng sớm, lúc rực rỡ như hoàng hôn. Chúc ngày của bạn đẹp như chính bạn vậy.',
    emoji: '🌅',
    from: 'Ánh mắt yêu',
    color: '#fff8e1',
    borderColor: '#ffcc02',
  },
  {
    id: 15,
    text: 'Có những người chỉ cần xuất hiện là đủ làm cuộc sống đẹp hơn. Bạn là một trong số những người đặc biệt như vậy.',
    emoji: '💫',
    from: 'Trái tim nói',
    color: '#f3e5f5',
    borderColor: '#9c27b0',
  },
  {
    id: 16,
    text: 'Bạn là lý do khiến người ta tin vào điều tốt đẹp — nhẹ nhàng, chân thành và ấm áp như ánh sáng mùa xuân.',
    emoji: '🌼',
    from: 'Mãi yêu bạn',
    color: '#fdf6e3',
    borderColor: '#f4c430',
  },
  // Dành cho mẹ
  {
    id: 17,
    text: 'Mẹ ơi, đôi bàn tay mẹ đã dệt nên cả một thế giới cho con. Hôm nay con chỉ muốn nói: con yêu mẹ, và mẹ thật sự tuyệt vời! 💗',
    emoji: '💝',
    from: 'Gửi mẹ yêu',
    color: '#fce4ec',
    borderColor: '#e91e8c',
  },
  {
    id: 18,
    text: 'Mẹ không chỉ là người sinh ra con — mẹ là ngôi nhà ấm nhất, là bến bờ bình yên nhất mà con luôn muốn quay về.',
    emoji: '🏡',
    from: 'Cho mẹ thương',
    color: '#fdf0f8',
    borderColor: '#f06292',
  },
  // Dành cho cô giáo / đồng nghiệp / bạn bè
  {
    id: 19,
    text: 'Cô ơi, những bài học cô dạy không chỉ là kiến thức — đó là cách nhìn cuộc sống, cách trân trọng những điều nhỏ bé. Cảm ơn cô rất nhiều!',
    emoji: '📚',
    from: 'Học trò nhớ cô',
    color: '#e8f5e9',
    borderColor: '#66bb6a',
  },
  {
    id: 20,
    text: 'Cảm ơn bạn đã luôn ở đó — lúc vui chia niềm vui, lúc buồn có vai để dựa, lúc hoang mang có người lắng nghe. Bạn là món quà của cuộc sống!',
    emoji: '🤝',
    from: 'Bạn bè mãi nhớ',
    color: '#e3f2fd',
    borderColor: '#42a5f5',
  },
  // Tổng quát chân thành
  {
    id: 21,
    text: 'Ngày 20/10 nhắc ta nhớ rằng: những người phụ nữ xung quanh chúng ta — mạnh mẽ, dịu dàng, hy sinh — xứng đáng được trân trọng mỗi ngày.',
    emoji: '🌏',
    from: 'Ý nghĩa ngày này',
    color: '#fff3e0',
    borderColor: '#ff8f00',
  },
  {
    id: 22,
    text: 'Bạn đã vượt qua những ngày khó khăn, những khoảnh khắc muốn bỏ cuộc — nhưng bạn vẫn đứng vững. Điều đó nói lên tất cả về bạn.',
    emoji: '🦋',
    from: 'Kiên cường vậy',
    color: '#fdf0f8',
    borderColor: '#ab47bc',
  },
  {
    id: 23,
    text: 'Chúc bạn luôn có người quan tâm mình thật sự, luôn có góc nhỏ bình yên để nghỉ ngơi, và luôn biết rằng mình được yêu thương.',
    emoji: '🕊️',
    from: 'Bình yên nhé',
    color: '#f8f8ff',
    borderColor: '#7986cb',
  },
  {
    id: 24,
    text: 'Hôm nay là ngày của bạn, nhưng thật ra mỗi ngày đều nên là ngày của bạn — vì bạn xứng đáng được yêu thương và trân trọng không ngừng nghỉ.',
    emoji: '💖',
    from: 'Mỗi ngày đều đẹp',
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
      // Validate: đúng 8 phần tử, mỗi phần tử có id hợp lệ
      if (Array.isArray(parsed) && parsed.length === 8 && parsed[0]?.id) return parsed
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
