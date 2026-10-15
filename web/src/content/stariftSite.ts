import type { StariftLanguage } from '../ui/starift/useStariftLanguage'

export function getStariftAppStoreUrl(language: StariftLanguage) {
  return language === 'zh-Hans'
    ? 'https://apps.apple.com/cn/app/%E6%98%9F%E6%8B%BE/id6812587855'
    : 'https://apps.apple.com/us/app/starift/id6812587855'
}

export const STARIFT_ASSETS: Record<StariftLanguage, Record<string, string>> = {
  en: {
    hero: '01-hero.png',
    capture: '03-device-top.png',
    summary: '02-device-bottom.png',
    progress: '04-hero.png',
    widgets: '05-device-bottom.png',
  },
  'zh-Hans': {
    hero: '01-hero.png',
    capture: '03-device-top.png',
    summary: '02-device-bottom.png',
    progress: '05-device-bottom.png',
    widgets: '04-hero.png',
  },
}

export function getStariftAsset(language: StariftLanguage, asset: string) {
  return `${import.meta.env.BASE_URL}starift/${language}/${STARIFT_ASSETS[language][asset]}`
}

export const stariftSite = {
  en: {
    languageName: 'English',
    documentTitle: 'Starift — Capture the spark. Keep the idea.',
    description: 'Capture ideas with voice, text, and images. Keep them organized and find the next step with Starift.',
    nav: {
      capture: 'Capture',
      summary: 'AI summary',
      progress: 'Progress',
      widgets: 'Widgets',
      updates: 'Updates',
      support: 'Support',
      privacy: 'Privacy',
    },
    hero: {
      eyebrow: 'STARIFT · IDEAS, KEPT',
      title: 'Capture the spark. Keep the idea.',
      body: 'Voice, text, and images — all in one idea vault.',
      cta: 'Download on the App Store',
      imageAlt: 'Starift idea vault interface on iPhone',
    },
    capture: {
      eyebrow: '01 · CAPTURE & REVISIT',
      title: 'Catch an idea. Find it again.',
      body: 'Save a passing thought in the moment, then bring it back when you are ready to act.',
      imageAlt: 'Starift Today view with captured ideas',
    },
    summary: {
      eyebrow: '02 · AI SUMMARY',
      title: 'Speak it out. Get the key points.',
      body: 'Keep the original recording while AI helps surface the key points, tasks, and next step.',
      imageAlt: 'Starift AI summary on an idea detail screen',
    },
    progress: {
      eyebrow: '03 · VISIBLE PROGRESS',
      title: 'Small thoughts. Visible progress.',
      body: 'See what you have captured, how your ideas are moving forward, and the habits taking shape.',
      imageAlt: 'Starift progress and idea statistics',
    },
    widgets: {
      eyebrow: '04 · WIDGETS',
      title: 'Your ideas, at a glance.',
      body: 'Capture a thought from your Home Screen and check your progress without opening the app.',
      imageAlt: 'Starift Home Screen widgets for recording and idea progress',
    },
    close: {
      eyebrow: 'STARIFT · IDEAS, KEPT',
      title: 'Keep every spark worth returning to.',
      body: 'Give your ideas a place to land — and a way to move forward.',
      cta: 'Get Starift on the App Store',
    },
    footer: {
      support: 'Support',
      privacy: 'Privacy Policy',
      portfolio: 'About the developer',
      updates: 'Product updates',
      copyright: 'Made with care by DD.',
    },
  },
  'zh-Hans': {
    languageName: '简体中文',
    documentTitle: '星拾 Starift — 闪现灵感，随手记下来',
    description: '用语音、文字和图片记录灵感，轻松整理、回看，并找到下一步。',
    nav: {
      capture: '记录灵感',
      summary: 'AI 总结',
      progress: '灵感进度',
      widgets: '桌面小组件',
      updates: '更新日志',
      support: '支持',
      privacy: '隐私',
    },
    hero: {
      eyebrow: '星拾 STARIFT · 灵感笔记',
      title: '闪现灵感，随手记下来。',
      body: '语音、文字、图片，让每个想法都有去处。',
      cta: '在 App Store 下载',
      imageAlt: '星拾灵感库 iPhone 界面',
    },
    capture: {
      eyebrow: '01 · 随手记录与回看',
      title: '今天的灵感，一页看清。',
      body: '趁想法还新鲜时记下来，等准备好行动时，再轻松找回来。',
      imageAlt: '星拾「今天」页面，集中查看记录的灵感',
    },
    summary: {
      eyebrow: '02 · AI 摘要',
      title: '说出口的想法，整理成清晰重点。',
      body: '保留原始记录，让 AI 帮你提炼重点、待办和下一步。',
      imageAlt: '星拾灵感详情中的 AI 摘要界面',
    },
    progress: {
      eyebrow: '03 · 看见进展',
      title: '看见灵感的成长轨迹。',
      body: '从记录数量到连续天数，看看灵感如何积累、推进。',
      imageAlt: '星拾灵感统计与进展页面',
    },
    widgets: {
      eyebrow: '04 · 桌面小组件',
      title: '灵感随时记录，进度随时查看。',
      body: '无需打开 App，也能快速开始记录，随时查看进度。',
      imageAlt: '星拾桌面小组件，可快速录音并查看灵感进度',
    },
    close: {
      eyebrow: '星拾 STARIFT · 灵感笔记',
      title: '把闪现的想法，慢慢变成现实。',
      body: '让每个值得记下的念头，都有继续向前的机会。',
      cta: '前往 App Store 下载星拾',
    },
    footer: {
      support: '支持页面',
      privacy: '隐私政策',
      portfolio: '开发者主页',
      updates: '功能更新',
      copyright: '由 DD 用心制作。',
    },
  },
} satisfies Record<StariftLanguage, {
  languageName: string
  documentTitle: string
  description: string
  nav: Record<string, string>
  hero: { eyebrow: string; title: string; body: string; cta: string; imageAlt: string }
  capture: { eyebrow: string; title: string; body: string; imageAlt: string }
  summary: { eyebrow: string; title: string; body: string; imageAlt: string }
  progress: { eyebrow: string; title: string; body: string; imageAlt: string }
  widgets: { eyebrow: string; title: string; body: string; imageAlt: string }
  close: { eyebrow: string; title: string; body: string; cta: string }
  footer: Record<string, string>
}>
