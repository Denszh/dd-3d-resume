import { useEffect } from 'react'
import { useStariftLanguage } from './starift/useStariftLanguage'

const updates = {
  en: {
    title: 'Product updates',
    description: 'A timeline of the features and improvements in Starift.',
    intro: 'A record of how Starift helps every idea find its next step.',
    entryType: 'FIRST RELEASE',
    releaseName: 'A home for every spark.',
    releaseSummary: 'Starift is now available on the App Store.',
    date: 'October 6, 2026',
    version: 'Version 0.1.0',
    features: [
      'Capture ideas by voice and keep the transcription with the original recording.',
      'Turn long or scattered thoughts into clear AI summaries.',
      'Organize ideas with categories and tags.',
      'Search, revisit, and track the progress of your ideas.',
      'Review idea activity and trends over time.',
      'Keep ideas available offline, with optional iCloud sync.',
    ],
    back: 'Back to Starift',
    support: 'Support',
    privacy: 'Privacy',
    home: 'Starift home',
    copyright: 'Made with care by DD.',
  },
  'zh-Hans': {
    title: '功能更新',
    description: '星拾功能与体验更新记录。',
    intro: '记录星拾如何陪你捕捉、整理，并找回每一个想法。',
    entryType: '首发版本',
    releaseName: '为每个灵感，留一个位置。',
    releaseSummary: '星拾现已在 App Store 上线。',
    date: '2026 年 10 月 6 日',
    version: '版本 0.1.0',
    features: [
      '支持语音记录，并保留原始录音和转写内容。',
      '使用 AI 将较长、零散的想法整理成清晰摘要。',
      '通过分类和标签整理灵感。',
      '搜索、回访灵感，并追踪它们的进展。',
      '回顾灵感记录和变化趋势。',
      '支持离线查看，并可选择使用 iCloud 同步。',
    ],
    back: '返回星拾官网',
    support: '支持',
    privacy: '隐私',
    home: '星拾官网',
    copyright: '由 DD 用心制作。',
  },
} as const

export default function StariftUpdatesPage() {
  const { language, setLanguage } = useStariftLanguage()
  const isChinese = language === 'zh-Hans'
  const copy = updates[language]

  useEffect(() => {
    document.title = `${copy.title} · ${isChinese ? '星拾' : 'Starift'}`
    document.documentElement.lang = language

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.append(description)
    }
    description.content = copy.description
  }, [copy.description, copy.title, isChinese, language])

  return (
    <main className="support-page updates-page" lang={language}>
      <div className="support-shell updates-shell">
        <div className="support-topbar">
          <a className="support-back" href="/starift/app" aria-label={copy.back}>
            <span aria-hidden="true">‹</span>
          </a>
          <div className="support-language" role="group" aria-label={isChinese ? '选择语言' : 'Choose language'}>
            <button type="button" aria-pressed={isChinese} onClick={() => setLanguage('zh-Hans')}>中文</button>
            <span aria-hidden="true">/</span>
            <button type="button" aria-pressed={!isChinese} onClick={() => setLanguage('en')}>EN</button>
          </div>
        </div>

        <header className="support-header updates-header">
          <p className="support-kicker">STARIFT / WHAT’S NEW</p>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </header>

        <ol className="updates-timeline" aria-label={copy.title}>
          <li className="updates-entry">
            <div className="updates-entry-meta">
              <time dateTime="2026-10-06">{copy.date}</time>
              <span>{copy.version}</span>
            </div>
            <article className="support-card updates-card">
              <p className="support-eyebrow">{copy.entryType}</p>
              <h2>{copy.releaseName}</h2>
              <p className="updates-summary">{copy.releaseSummary}</p>
              <ul>
                {copy.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </article>
          </li>
        </ol>

        <footer className="support-footer updates-footer">
          <a href="/starift/support">{copy.support}</a>
          <a href="/starift/privacy">{copy.privacy}</a>
          <a href="/starift/app">{copy.home}</a>
          <span>{copy.copyright}</span>
        </footer>
      </div>
    </main>
  )
}
