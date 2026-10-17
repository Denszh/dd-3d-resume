import type { StariftLanguage } from '../ui/starift/useStariftLanguage'

export function getStariftAppStoreUrl(_language: StariftLanguage) {
  // The US storefront redirects this app to the Today page; the CN product URL is verified.
  return 'https://apps.apple.com/cn/app/%E6%98%9F%E6%8B%BE/id6812587855'
}

const promoAssets = {
  en: {
    recording: 'recording.png',
    vault: 'vault.png',
    ideas: 'statistics.png',
    summary: 'detail.png',
  },
  'zh-Hans': {
    recording: 'recording.png',
    vault: 'vault.png',
    ideas: 'statistics.png',
    summary: 'detail.png',
  },
} as const

export function getStariftAsset(language: StariftLanguage, asset: keyof typeof promoAssets.en) {
  return `${import.meta.env.BASE_URL}starift/promo/${language}/${promoAssets[language][asset]}`
}

export const stariftSite = {
  en: {
    languageName: 'English',
    documentTitle: 'Starift — Catch the thought before it drifts away.',
    description: 'Capture passing ideas with your voice, organize them on device, and come back when the time is right.',
    nav: {
      capture: 'Capture',
      revisit: 'Revisit',
      pricing: 'Pricing',
      updates: 'Updates',
      support: 'Support',
      privacy: 'Privacy',
      download: 'Get Starift ↗',
    },
    hero: {
      eyebrow: 'A LITTLE THOUGHT, KEPT',
      title: 'Catch the thought',
      emphasis: 'before it drifts away.',
      body: 'Say it as it comes. Starift helps you keep the words that matter, organize them with on-device AI, and find your way back when the time is right.',
      cta: 'Download on the App Store',
      monthly: 'monthly',
      lifetime: 'one-time purchase',
      imageAlt: 'Starift recording screen with an animated voice waveform',
      assuranceCapture: 'Capture first',
      assuranceCaptureBody: 'Use Siri for a quick spoken note, or tap the widget to keep the original recording.',
      assuranceCenter: 'Your everyday life is worth remembering.',
      assurancePrivacy: 'Organized on device',
      assurancePrivacyBody: 'On-device AI helps find the key points. Your notes stay yours.',
      scroll: 'Keep going through a day',
    },
    capture: {
      eyebrow: '01 / CAPTURE',
      title: 'When a thought appears, catch it.',
      body: 'A sentence on your commute, an idea between classes, the evening sky on your way home. No need to stop and write it all down. Just save the moment.',
      subhead: 'Save a thought without searching for an app.',
      detail: 'Ask Siri to save a quick spoken note. When you want to keep your voice, tap the widget to open Starift and start recording. Speak naturally; sorting can wait.',
      steps: ['Siri: say it and save a quick thought.', 'Widget: open straight into an audio recording.', 'Back to life: organize it whenever you have time.'],
      imageAlt: 'Starift recording experience, with voice capture and a live waveform',
    },
    vault: {
      eyebrow: 'YOUR INSPIRATION VAULT',
      title: 'You don’t have to sort it now. Give every thought a place to land.',
      body: 'Your ideas are saved in the order they happened, ready to find by search or category. Capture first; decide where it belongs when you have a moment.',
      note: 'Search titles, tags, and notes · Browse by date',
      imageAlt: 'Starift inspiration vault for browsing and finding saved ideas',
    },
    story: {
      eyebrow: '02 / MAKE IT A MEMORY',
      title: 'Saving a thought is just the beginning. Some ideas deserve another look.',
      body: 'Choose a day to return to it. When the reminder comes around, you may see what mattered then — or be ready to take the next step.',
      steps: [
        { title: 'Capture', body: 'A photo, a passing idea, or a sentence that isn’t finished yet.' },
        { title: 'Find the thread', body: 'On-device AI can surface the key points while the original stays close.' },
        { title: 'Come back', body: 'Set a time to revisit it, and meet the thought again in Today.' },
      ],
    },
    summary: {
      eyebrow: 'ON-DEVICE AI',
      title: 'Say it as it comes. Keep the important part.',
      body: 'A spoken thought becomes an easy-to-scan summary. You can regenerate it or return to the original recording and hear the whole moment again.',
      note: 'Summaries made on device · Original recordings stay with the note',
      imageAlt: 'A Starift idea detail with its original voice note and organized takeaways',
    },
    ideas: {
      eyebrow: 'A LIFE, IN LITTLE MOMENTS',
      title: 'See the shape of the days you’ve kept.',
      body: 'Look back at your notes and the rhythm of your recording habit. A small thought saved today can become a useful thread later.',
      imageAlt: 'Starift activity overview for reflecting on saved ideas',
    },
    privacy: {
      eyebrow: 'PRIVATE BY DESIGN',
      title: 'Your ideas stay on your device.',
      body: 'Voice and text notes are stored locally. AI summaries are created on device, so private thoughts don’t need to be sent to a cloud service. No account is required, and iCloud sync is up to you.',
      points: [
        { title: 'On-device AI', body: 'Organize notes on your phone' },
        { title: 'No account', body: 'Open Starift and start collecting' },
        { title: 'Original audio', body: 'Return to the voice behind the idea' },
        { title: 'Optional sync', body: 'You decide whether to use iCloud' },
      ],
    },
    pricing: {
      eyebrow: '03 / SIMPLE PRICING',
      title: 'Subscribe or buy once. Choose what works for you.',
      body: 'Start with a low monthly plan, or make a one-time purchase and keep Starift for the long run.',
      cards: [
        { name: 'Monthly', price: '¥6', unit: '/ month', note: 'A simple way to make capturing a daily habit.' },
        { name: 'Annual', price: '¥38', unit: '/ year', note: 'About ¥3.17 per month for the long run.', featured: true, badge: 'BEST FOR THE LONG RUN' },
        { name: 'Lifetime', price: '¥88', unit: '', note: 'One purchase. Keep Starift for good.' },
      ],
      note: 'Final prices and subscription details are shown in the App Store.',
    },
    faq: {
      eyebrow: 'GOOD TO KNOW',
      title: 'A few things you may be wondering.',
      items: [
        { question: 'Can I capture an idea without opening the app?', answer: 'Use Siri to save a quick spoken thought as text. To keep the original audio, tap the widget to open Starift and start recording.' },
        { question: 'Does AI upload my notes?', answer: 'Starift uses an on-device model for summaries. Your notes and AI processing stay on your device. iCloud sync is optional.' },
        { question: 'What can I do with an idea after saving it?', answer: 'Review its summary, keep the original recording, add images, and set a time to revisit it. When it comes back, continue adding to the thought.' },
      ],
    },
    close: {
      eyebrow: 'START WITH ONE THOUGHT',
      title: 'Your next idea starts right here.',
      body: 'Leave a little something for your future self.',
      cta: 'Get Starift on the App Store',
    },
    footer: {
      support: 'Support',
      privacy: 'Privacy Policy',
      portfolio: 'About the developer',
      updates: 'Product updates',
      copyright: '© 2026 Starift · Keep a thought for your future self',
      pricing: 'Pricing',
      top: 'Back to top ↑',
    },
  },
  'zh-Hans': {
    languageName: '简体中文',
    documentTitle: '星拾 — 把一闪而过的灵感，留给未来的自己。',
    description: '用声音留住一闪而过的灵感，在设备上整理，并在合适的时候重新遇见。',
    nav: {
      capture: '捕捉',
      revisit: '回访',
      pricing: '价格',
      updates: '更新日志',
      support: '支持',
      privacy: '隐私',
      download: '开始拾起 ↗',
    },
    hero: {
      eyebrow: 'A LITTLE THOUGHT, KEPT',
      title: '把一闪而过的灵感，',
      emphasis: '留给未来的自己。',
      body: '想到就说。星拾帮你在日常里留住那句话，用设备端 AI 整理好，再在合适的时候带你回来看看。',
      cta: '在 App Store 下载星拾',
      monthly: '每月订阅',
      lifetime: '一次买断',
      imageAlt: '星拾录音界面与动态声波，展示如何随口记录灵感',
      assuranceCapture: '灵感先留下',
      assuranceCaptureBody: '用 Siri 快速存成文字；需要原声时，轻点小组件开始录音。',
      assuranceCenter: '你的日常，值得被记住。',
      assurancePrivacy: '整理留在设备',
      assurancePrivacyBody: '本地 AI 帮你提炼重点，记录无需上传云端处理。',
      scroll: '沿着一天继续看',
    },
    capture: {
      eyebrow: '01 / CAPTURE',
      title: '念头出现时，先把它接住。',
      body: '通勤路上的一句话、课间突然想到的事、回家路上看见的晚霞。不用停下来写长篇，先把此刻留下。',
      subhead: '不用找 App，也能先存下一句话。',
      detail: 'Siri 可以直接把你说的话存进星拾；需要保留原声时，轻点小组件打开星拾，立刻开始录音。随口说，不必组织好，也不用现在就分类。',
      steps: ['Siri：开口就存，适合一句话灵感。', '小组件：打开即录，保留语气和原声。', '回到生活：整理和归类可以晚一点。'],
      imageAlt: '星拾录音界面：随口记录灵感并显示声音波形',
    },
    vault: {
      eyebrow: 'YOUR INSPIRATION VAULT',
      title: '不必当下整理好，先让念头有个去处。',
      body: '灵感库按时间收好每一条记录，也可以通过搜索和分类慢慢找回。你可以先把想法说出来，等有空时再决定它属于哪里。',
      note: '搜索标题、标签和内容 · 按日期回看',
      imageAlt: '星拾灵感库页面：按时间整理、搜索并找回记录',
    },
    story: {
      eyebrow: '02 / MAKE IT A MEMORY',
      title: '记下不是结束。有些灵感，值得再回来。',
      body: '给它一个回访的时间。某一天再看见时，你会发现当时的自己在想什么，也可能已经准备好往下走一步。',
      steps: [
        { title: '随手记下', body: '一张照片、一个念头、一句没说完的话，都可以先收好。' },
        { title: '理出线索', body: '本地 AI 帮你从口述中提炼重点，原始内容仍留在身边。' },
        { title: '找一天再看', body: '设定回访时间，让灵感重新出现在今天，不再沉进列表。' },
      ],
    },
    summary: {
      eyebrow: 'ON-DEVICE AI',
      title: '先把话说出来，重点留给星拾整理。',
      body: '一段不必提前打草稿的口述，整理成更容易回看的摘要。你可以重新生成，也能回到原始录音，听见当时完整的表达。',
      note: '本地模型生成摘要 · 原始记录仍在设备中',
      imageAlt: '星拾灵感详情：原始语音与 AI 摘要整理在同一条记录中',
    },
    ideas: {
      eyebrow: 'A LIFE, IN LITTLE MOMENTS',
      title: '回头看看，那些被你留下的日常。',
      body: '回顾记录和逐渐形成的习惯。一颗今天收下的小小念头，也许会在未来成为有用的线索。',
      imageAlt: '星拾灵感记录概览，帮助回顾自己的记录轨迹',
    },
    privacy: {
      eyebrow: 'PRIVATE BY DESIGN',
      title: '你的灵感，先留在你的设备。',
      body: '语音和文字记录保存在本地；AI 摘要由设备端模型完成，不需要把私人想法交给云端处理。不必创建账号，iCloud 同步也由你决定是否开启。',
      points: [
        { title: '本地模型', body: '在设备上整理记录' },
        { title: '无需账号', body: '打开星拾就开始收集' },
        { title: '保留原声', body: '想听时再回到那一刻' },
        { title: '同步自选', body: 'iCloud 开关由你决定' },
      ],
    },
    pricing: {
      eyebrow: '03 / SIMPLE PRICING',
      title: '买断或订阅，按自己的节奏来。',
      body: '先用轻量的月付开始，也可以一次买断，长期把生活灵感留在星拾。',
      cards: [
        { name: '月度订阅', price: '¥6', unit: '/ 月', note: '适合先体验，把记录变成日常。' },
        { name: '年度订阅', price: '¥38', unit: '/ 年', note: '折合约 ¥3.17 / 月，持续整理和回访。', featured: true, badge: '更适合长期使用' },
        { name: '一次买断', price: '¥88', unit: '', note: '一次购买，长期使用星拾。' },
      ],
      note: '最终价格与订阅权益以 App Store 页面显示为准。',
    },
    faq: {
      eyebrow: 'GOOD TO KNOW',
      title: '关于星拾，你可能还想知道。',
      items: [
        { question: '不打开 App，也可以记录吗？', answer: '可以通过 Siri 快速把口述内容存成文字。如果想留下原始录音，轻点小组件会打开星拾并开始录音。' },
        { question: 'AI 会把我的记录上传吗？', answer: '星拾使用设备端模型整理摘要，记录和 AI 处理都保留在设备上。iCloud 同步可以由你选择是否开启。' },
        { question: '灵感记录之后还能做什么？', answer: '你可以查看 AI 摘要、保留原始内容、添加图片，并为重要灵感设置回访时间。回访时继续补充，让它成为一段不断延伸的生活记录。' },
      ],
    },
    close: {
      eyebrow: 'START WITH ONE THOUGHT',
      title: '下一颗灵感，从现在开始拾起。',
      body: '给未来的自己，留下一点今天。',
      cta: '前往 App Store 下载星拾',
    },
    footer: {
      support: '支持页面',
      privacy: '隐私政策',
      portfolio: '开发者主页',
      updates: '功能更新',
      copyright: '© 2026 星拾 · 把灵感留给未来',
      pricing: '价格',
      top: '回到顶部 ↑',
    },
  },
} satisfies Record<StariftLanguage, {
  languageName: string
  documentTitle: string
  description: string
  nav: Record<string, string>
  hero: Record<string, string>
  capture: { eyebrow: string; title: string; body: string; subhead: string; detail: string; steps: string[]; imageAlt: string }
  vault: { eyebrow: string; title: string; body: string; note: string; imageAlt: string }
  story: { eyebrow: string; title: string; body: string; steps: { title: string; body: string }[] }
  summary: { eyebrow: string; title: string; body: string; note: string; imageAlt: string }
  ideas: { eyebrow: string; title: string; body: string; imageAlt: string }
  privacy: { eyebrow: string; title: string; body: string; points: { title: string; body: string }[] }
  pricing: { eyebrow: string; title: string; body: string; cards: { name: string; price: string; unit: string; note: string; featured?: boolean; badge?: string }[]; note: string }
  faq: { eyebrow: string; title: string; items: { question: string; answer: string }[] }
  close: { eyebrow: string; title: string; body: string; cta: string }
  footer: Record<string, string>
}>
