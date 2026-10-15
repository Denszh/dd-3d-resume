import { useEffect, useState } from 'react'
import { getStariftAppStoreUrl, getStariftAsset, stariftSite } from '../content/stariftSite'
import { useStariftLanguage } from './starift/useStariftLanguage'
import './starift-landing.css'

const STARIFT_FEATURE_IDS = ['capture', 'ai-summary', 'progress', 'widgets']

export default function StariftLandingPage() {
  const { language, setLanguage } = useStariftLanguage()
  const copy = stariftSite[language]
  const isChinese = language === 'zh-Hans'
  const [activeSection, setActiveSection] = useState('capture')

  const featureLinks = [
    { id: 'capture', label: copy.nav.capture },
    { id: 'ai-summary', label: copy.nav.summary },
    { id: 'progress', label: copy.nav.progress },
    { id: 'widgets', label: copy.nav.widgets },
  ]

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
    const site = document.querySelector<HTMLElement>('.starift-site')
    if (!site) return

    const revealTargets = site.querySelectorAll<HTMLElement>(
      '.starift-hero-copy > *, .starift-hero-art, .starift-feature-copy, .starift-feature-art, .starift-close-inner',
    )
    const sections = STARIFT_FEATURE_IDS
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.dataset.revealed = 'true')
      return
    }

    site.classList.add('starift-motion-ready')

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        ;(entry.target as HTMLElement).dataset.revealed = 'true'
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })

    revealTargets.forEach((target) => revealObserver.observe(target))

    const sectionObserver = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      const mostVisible = visibleSections[0]
      if (mostVisible) setActiveSection((mostVisible.target as HTMLElement).id)
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] })

    sections.forEach((section) => sectionObserver.observe(section))

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
      site.classList.remove('starift-motion-ready')
    }
  }, [language])

  return (
    <div className="starift-site" lang={language}>
      <header className="starift-nav-shell">
        <nav className="starift-nav" aria-label={isChinese ? '主导航' : 'Main navigation'}>
          <a className="starift-brand" href="/starift/app" aria-label={`${isChinese ? '星拾' : 'Starift'} home`}>
            <img className="starift-brand-icon" src="/images/starift-logo.png" alt="" aria-hidden="true" />
            <span>{isChinese ? '星拾' : 'Starift'}</span>
          </a>

          <div className="starift-nav-links">
            {featureLinks.map(({ id, label }) => (
              <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>
                {label}
              </a>
            ))}
          </div>

          <div className="starift-nav-actions">
            <a className="starift-nav-support" href="/starift/updates">{copy.nav.updates}</a>
            <a className="starift-nav-support" href="/starift/support">{copy.nav.support}</a>
            <a className="starift-nav-support" href="/starift/privacy">{copy.nav.privacy}</a>
            <div className="starift-language" role="group" aria-label={isChinese ? '选择语言' : 'Choose language'}>
              <button type="button" aria-pressed={!isChinese} onClick={() => setLanguage('en')}>EN</button>
              <span aria-hidden="true">/</span>
              <button type="button" aria-pressed={isChinese} onClick={() => setLanguage('zh-Hans')}>中</button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="starift-hero" aria-labelledby="starift-hero-title">
          <div className="starift-hero-inner">
            <div className="starift-hero-copy">
              <p className="starift-eyebrow">{copy.hero.eyebrow}</p>
              <h1 id="starift-hero-title">{copy.hero.title}</h1>
              <p className="starift-lede">{copy.hero.body}</p>
              <a className="starift-button" href={getStariftAppStoreUrl(language)} target="_blank" rel="noreferrer">
                {copy.hero.cta}<span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="starift-hero-art starift-reveal" data-reveal-order="2">
              <img src={getStariftAsset(language, 'hero')} alt={copy.hero.imageAlt} />
            </div>
          </div>
          <a className="starift-scroll-cue" href="#capture" aria-label={isChinese ? '向下浏览产品功能' : 'Scroll to explore features'}>
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section id="capture" className="starift-feature starift-feature-capture" aria-labelledby="starift-capture-title">
          <div className="starift-feature-inner">
            <div className="starift-feature-copy starift-reveal" data-reveal-order="1">
              <p className="starift-eyebrow">{copy.capture.eyebrow}</p>
              <h2 id="starift-capture-title">{copy.capture.title}</h2>
              <p>{copy.capture.body}</p>
            </div>
            <div className="starift-feature-art starift-reveal" data-reveal-order="2">
              <img src={getStariftAsset(language, 'capture')} alt={copy.capture.imageAlt} loading="lazy" />
            </div>
          </div>
        </section>

        <section id="ai-summary" className="starift-feature starift-feature-summary" aria-labelledby="starift-summary-title">
          <div className="starift-feature-inner starift-feature-reverse">
            <div className="starift-feature-copy starift-reveal" data-reveal-order="1">
              <p className="starift-eyebrow">{copy.summary.eyebrow}</p>
              <h2 id="starift-summary-title">{copy.summary.title}</h2>
              <p>{copy.summary.body}</p>
            </div>
            <div className="starift-feature-art starift-reveal" data-reveal-order="2">
              <img src={getStariftAsset(language, 'summary')} alt={copy.summary.imageAlt} loading="lazy" />
            </div>
          </div>
        </section>

        <section id="progress" className="starift-feature starift-feature-progress" aria-labelledby="starift-progress-title">
          <div className="starift-feature-inner">
            <div className="starift-feature-copy starift-reveal" data-reveal-order="1">
              <p className="starift-eyebrow">{copy.progress.eyebrow}</p>
              <h2 id="starift-progress-title">{copy.progress.title}</h2>
              <p>{copy.progress.body}</p>
            </div>
            <div className="starift-feature-art starift-reveal" data-reveal-order="2">
              <img src={getStariftAsset(language, 'progress')} alt={copy.progress.imageAlt} loading="lazy" />
            </div>
          </div>
        </section>

        <section id="widgets" className="starift-feature starift-feature-widgets" aria-labelledby="starift-widgets-title">
          <div className="starift-feature-inner starift-feature-reverse">
            <div className="starift-feature-copy starift-reveal" data-reveal-order="1">
              <p className="starift-eyebrow">{copy.widgets.eyebrow}</p>
              <h2 id="starift-widgets-title">{copy.widgets.title}</h2>
              <p>{copy.widgets.body}</p>
            </div>
            <div className="starift-feature-art starift-reveal" data-reveal-order="2">
              <img src={getStariftAsset(language, 'widgets')} alt={copy.widgets.imageAlt} loading="lazy" />
            </div>
          </div>
        </section>

        <section className="starift-close" aria-labelledby="starift-close-title">
          <div className="starift-close-inner starift-reveal">
            <p className="starift-eyebrow">{copy.close.eyebrow}</p>
            <h2 id="starift-close-title">{copy.close.title}</h2>
            <p>{copy.close.body}</p>
            <a className="starift-button" href={getStariftAppStoreUrl(language)} target="_blank" rel="noreferrer">
              {copy.close.cta}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="starift-footer">
        <a className="starift-footer-brand" href="/starift/app">
          <img src="/images/starift-logo.png" alt="" aria-hidden="true" />
          {isChinese ? '星拾' : 'Starift'}
        </a>
        <div className="starift-footer-links">
          <a href="/starift/updates">{copy.footer.updates}</a>
          <a href="/starift/support">{copy.footer.support}</a>
          <a href="/starift/privacy">{copy.footer.privacy}</a>
          <a href="/">{copy.footer.portfolio}</a>
        </div>
        <p>{copy.footer.copyright}</p>
      </footer>
    </div>
  )
}
