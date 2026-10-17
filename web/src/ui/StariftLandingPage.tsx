import { useEffect, useState, type CSSProperties } from 'react'
import { getStariftAppStoreUrl, getStariftAsset, stariftSite } from '../content/stariftSite'
import { useStariftLanguage } from './starift/useStariftLanguage'
import { StariftHeroMotion } from './starift/StariftHeroMotion'
import './starift-landing.css'

const SECTIONS = ['capture', 'revisit', 'pricing'] as const

function AppStoreMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.8c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.3-4.4-2.4-1.9-.2-3.7 1.1-4.7 1.1s-2.4-1.1-4-1.1c-2.1 0-4 1.2-5.1 3.1-2.2 3.8-.6 9.4 1.5 12.5 1 1.5 2.2 3.1 3.9 3.1 1.6-.1 2.1-1 4-1s2.4 1 4 1c1.7 0 2.7-1.5 3.8-3 1.2-1.7 1.6-3.4 1.7-3.5-.1 0-3.2-1.2-3.3-5.2ZM13.3 3.8c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.8.9-1.4 2.3-1.2 3.7 1.3.1 2.7-.7 3.5-1.7Z" transform="translate(1 0) scale(.9)" />
    </svg>
  )
}

function DownloadButton({ label, language }: { label: string; language: 'en' | 'zh-Hans' }) {
  return (
    <a className="starift-button" href={getStariftAppStoreUrl(language)} target="_blank" rel="noreferrer">
      <span className="starift-apple-mark"><AppStoreMark /></span>
      {label}
      <span className="starift-button-arrow" aria-hidden="true">↗</span>
    </a>
  )
}

function PromoImage({ asset, alt, language, className = '' }: { asset: Parameters<typeof getStariftAsset>[1]; alt: string; language: 'en' | 'zh-Hans'; className?: string }) {
  return <img className={`starift-promo-art ${className}`} src={getStariftAsset(language, asset)} alt={alt} loading="lazy" />
}

export default function StariftLandingPage() {
  const { language, setLanguage } = useStariftLanguage()
  const copy = stariftSite[language]
  const isChinese = language === 'zh-Hans'
  const [activeSection, setActiveSection] = useState<(typeof SECTIONS)[number]>('capture')

  useEffect(() => {
    document.title = copy.documentTitle
    document.documentElement.lang = language

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.append(description)
    }
    description.content = copy.description
  }, [copy.description, copy.documentTitle, language])

  useEffect(() => {
    const page = document.querySelector<HTMLElement>('.starift-site')
    if (!page || !('IntersectionObserver' in window)) return

    const targets = page.querySelectorAll<HTMLElement>('.starift-reveal')
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        ;(entry.target as HTMLElement).dataset.revealed = 'true'
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
    targets.forEach((target) => revealObserver.observe(target))

    const sections = SECTIONS.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => node !== null)
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection((visible.target as HTMLElement).id as (typeof SECTIONS)[number])
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] })
    sections.forEach((section) => sectionObserver.observe(section))
    page.classList.add('starift-motion-ready')

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
      page.classList.remove('starift-motion-ready')
    }
  }, [language])

  const bars = Array.from({ length: 73 }, (_, index) => {
    const x = index / 72
    const envelope = 0.18 + 0.82 * Math.pow(Math.sin(Math.PI * x), 0.64)
    const rhythm = 0.25 + 0.75 * Math.abs(Math.sin(index * 0.39) * Math.cos(index * 0.14))
    return { height: 8 + envelope * rhythm * 76, opacity: 0.28 + envelope * 0.66, delay: (index % 17) * -0.08 }
  })

  return (
    <div className="starift-site" lang={language} id="top">
      <header className="starift-nav-shell">
        <nav className="starift-nav" aria-label={isChinese ? '主导航' : 'Main navigation'}>
          <a className="starift-brand" href="/starift/app" aria-label={`${isChinese ? '星拾' : 'Starift'} home`}>
            <img className="starift-brand-icon" src="/images/starift-logo.png" alt="" aria-hidden="true" />
            <span>{isChinese ? '星拾' : 'Starift'}</span>
          </a>
          <div className="starift-nav-links">
            <a href="#capture" aria-current={activeSection === 'capture' ? 'location' : undefined}>{copy.nav.capture}</a>
            <a href="#revisit" aria-current={activeSection === 'revisit' ? 'location' : undefined}>{copy.nav.revisit}</a>
            <a href="#pricing" aria-current={activeSection === 'pricing' ? 'location' : undefined}>{copy.nav.pricing}</a>
          </div>
          <div className="starift-nav-actions">
            <a className="starift-nav-link starift-nav-updates" href="/starift/updates">{copy.nav.updates}</a>
            <a className="starift-nav-link" href="/starift/support">{copy.nav.support}</a>
            <a className="starift-nav-link starift-nav-privacy" href="/starift/privacy">{copy.nav.privacy}</a>
            <div className="starift-language" role="group" aria-label={isChinese ? '选择语言' : 'Choose language'}>
              <button type="button" aria-pressed={!isChinese} onClick={() => setLanguage('en')}>EN</button>
              <span aria-hidden="true">/</span>
              <button type="button" aria-pressed={isChinese} onClick={() => setLanguage('zh-Hans')}>中</button>
            </div>
            <a className="starift-nav-cta" href="#download">{copy.nav.download}</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="starift-hero" aria-labelledby="starift-hero-title">
          <div className="starift-hero-backdrop" aria-hidden="true" />
          <div className="starift-hero-inner">
            <div className="starift-hero-copy starift-reveal" data-revealed="true">
              <img className="starift-hero-icon" src="/images/starift-logo.png" alt="" aria-hidden="true" />
              <p className="starift-eyebrow">{copy.hero.eyebrow}</p>
              <h1 id="starift-hero-title">{copy.hero.title}<br /><em>{copy.hero.emphasis}</em></h1>
              <p className="starift-lede">{copy.hero.body}</p>
              <div className="starift-hero-actions">
                <DownloadButton label={copy.hero.cta} language={language} />
                <a className="starift-price-chip" href="#pricing"><strong>¥6</strong><span>{copy.hero.monthly}</span><small>¥88 · {copy.hero.lifetime}</small></a>
              </div>
            </div>

            <div className="starift-hero-sound starift-reveal" aria-label={copy.hero.imageAlt}>
              <StariftHeroMotion />
              <div className="starift-waveform" aria-hidden="true">
                {bars.map((bar, index) => <i key={index} style={{ '--bar-height': `${bar.height}px`, '--bar-opacity': bar.opacity, '--bar-delay': `${bar.delay}s` } as CSSProperties} />)}
              </div>
              <div className="starift-voice-title"><span className="starift-record-dot" />{isChinese ? '原声记录' : 'VOICE NOTE'}<small>{isChinese ? '留住当时的语气' : 'Keep the way it sounded'}</small></div>
              <span className="starift-voice-bottom">{isChinese ? '一段原声，之后还可以重新听' : 'The original voice, ready to hear again'}</span>
              <span className="starift-voice-duration">00:18</span>
            </div>

            <div className="starift-assurances starift-reveal">
              <div><b>{copy.hero.assuranceCapture}</b><p>{copy.hero.assuranceCaptureBody}</p></div>
              <p className="starift-assurance-center">{copy.hero.assuranceCenter}</p>
              <div><b>{copy.hero.assurancePrivacy}</b><p>{copy.hero.assurancePrivacyBody}</p></div>
            </div>
          </div>
          <div className="starift-hero-bottom"><span>{isChinese ? '星拾 · 生活灵感记录' : 'STARIFT · EVERYDAY IDEAS, KEPT'}</span><a href="#capture">{copy.hero.scroll}<i /> ↓</a></div>
        </section>

        <section id="capture" className="starift-story-section starift-capture" aria-labelledby="starift-capture-title">
          <div className="starift-section-inner">
            <div className="starift-section-heading starift-reveal">
              <div><p className="starift-eyebrow">{copy.capture.eyebrow}</p><h2 id="starift-capture-title">{copy.capture.title}</h2></div>
              <p>{copy.capture.body}</p>
            </div>
            <div className="starift-capture-grid">
              <div className="starift-capture-copy starift-reveal">
                <h3>{copy.capture.subhead}</h3><p>{copy.capture.detail}</p>
                <ol>{copy.capture.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
              </div>
              <div className="starift-art-stage starift-reveal"><PromoImage asset="recording" alt={copy.capture.imageAlt} language={language} /></div>
            </div>
          </div>
        </section>

        <section className="starift-vault-section" aria-labelledby="starift-vault-title">
          <div className="starift-split-inner">
            <div className="starift-section-copy starift-reveal">
              <p className="starift-eyebrow">{copy.vault.eyebrow}</p><h2 id="starift-vault-title">{copy.vault.title}</h2><p>{copy.vault.body}</p>
              <div className="starift-feature-note"><span aria-hidden="true">✳</span>{copy.vault.note}</div>
            </div>
            <div className="starift-art-stage starift-reveal"><PromoImage asset="vault" alt={copy.vault.imageAlt} language={language} /></div>
          </div>
        </section>

        <section id="revisit" className="starift-return-section" aria-labelledby="starift-return-title">
          <div className="starift-section-inner">
            <div className="starift-return-heading starift-reveal">
              <p className="starift-eyebrow">{copy.story.eyebrow}</p><h2 id="starift-return-title">{copy.story.title}</h2><p>{copy.story.body}</p>
            </div>
            <div className="starift-story-rail starift-reveal">
              {copy.story.steps.map((step, index) => <article key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}
            </div>
            <div className="starift-summary-grid">
              <div className="starift-section-copy starift-reveal">
                <p className="starift-eyebrow">{copy.summary.eyebrow}</p><h3>{copy.summary.title}</h3><p>{copy.summary.body}</p><div className="starift-feature-note"><span aria-hidden="true">✳</span>{copy.summary.note}</div>
              </div>
              <div className="starift-art-stage starift-reveal"><PromoImage asset="summary" alt={copy.summary.imageAlt} language={language} /></div>
            </div>
          </div>
        </section>

        <section className="starift-moments-section" aria-labelledby="starift-moments-title">
          <div className="starift-split-inner starift-split-reverse">
            <div className="starift-art-stage starift-reveal"><PromoImage asset="ideas" alt={copy.ideas.imageAlt} language={language} /></div>
            <div className="starift-section-copy starift-reveal"><p className="starift-eyebrow">{copy.ideas.eyebrow}</p><h2 id="starift-moments-title">{copy.ideas.title}</h2><p>{copy.ideas.body}</p></div>
          </div>
        </section>

        <section className="starift-privacy-section" aria-labelledby="starift-privacy-title">
          <div className="starift-privacy-inner">
            <div className="starift-section-copy starift-reveal"><p className="starift-eyebrow">{copy.privacy.eyebrow}</p><h2 id="starift-privacy-title">{copy.privacy.title}</h2><p>{copy.privacy.body}</p></div>
            <div className="starift-privacy-points starift-reveal">
              {copy.privacy.points.map((point, index) => <div key={point.title}><span>{['◌', '○', '⌁', '↗'][index]}</span><b>{point.title}</b><small>{point.body}</small></div>)}
            </div>
          </div>
        </section>

        <section id="pricing" className="starift-pricing-section" aria-labelledby="starift-pricing-title">
          <div className="starift-section-inner">
            <div className="starift-section-heading starift-reveal"><div><p className="starift-eyebrow">{copy.pricing.eyebrow}</p><h2 id="starift-pricing-title">{copy.pricing.title}</h2></div><p>{copy.pricing.body}</p></div>
            <div className="starift-pricing-cards starift-reveal">
              {copy.pricing.cards.map((card) => <article key={card.name} className={card.featured ? 'is-featured' : undefined}>
                {card.badge && <span className="starift-price-badge">{card.badge}</span>}<small>{card.name}</small><h3>{card.price}<span>{card.unit}</span></h3><p>{card.note}</p>
              </article>)}
            </div>
            <p className="starift-pricing-note">{copy.pricing.note}</p>
          </div>
        </section>

        <section className="starift-faq-section" aria-labelledby="starift-faq-title">
          <div className="starift-section-inner starift-faq-inner">
            <div className="starift-section-heading starift-reveal"><div><p className="starift-eyebrow">{copy.faq.eyebrow}</p><h2 id="starift-faq-title">{copy.faq.title}</h2></div></div>
            <div className="starift-faq-list starift-reveal">{copy.faq.items.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
          </div>
        </section>

        <section className="starift-close" id="download" aria-labelledby="starift-close-title">
          <div className="starift-close-inner starift-reveal"><p className="starift-eyebrow">{copy.close.eyebrow}</p><h2 id="starift-close-title">{copy.close.title}</h2><p>{copy.close.body}</p><DownloadButton label={copy.close.cta} language={language} /></div>
        </section>
      </main>

      <footer className="starift-footer">
        <a className="starift-footer-brand" href="/starift/app"><img src="/images/starift-logo.png" alt="" aria-hidden="true" />{isChinese ? '星拾' : 'Starift'}</a>
        <div className="starift-footer-links"><a href="/starift/updates">{copy.footer.updates}</a><a href="/starift/support">{copy.footer.support}</a><a href="/starift/privacy">{copy.footer.privacy}</a><a href="#pricing">{copy.footer.pricing}</a><a href="#top">{copy.footer.top}</a></div>
        <p>{copy.footer.copyright}</p>
      </footer>
    </div>
  )
}
