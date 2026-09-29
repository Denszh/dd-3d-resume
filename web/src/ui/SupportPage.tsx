import type { SVGProps } from 'react'
import { useState } from 'react'

function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M40.8 9.7A35.7 35.7 0 0 0 32 7l-1.1 2.2a33.3 33.3 0 0 0-13.8 0L16 7a35.8 35.8 0 0 0-8.8 2.7C1.7 17.9.2 25.9.9 33.8a35.4 35.4 0 0 0 10.8 5.5l2.7-3.7c-1.5-.6-2.9-1.3-4.2-2.2l1-0.8c8.1 3.8 16.8 3.8 24.8 0l1 .8c-1.3.9-2.7 1.6-4.2 2.2l2.7 3.7a35.3 35.3 0 0 0 10.8-5.5c.8-9.2-1.6-17.1-5.5-24.1ZM16.5 29.1c-2.4 0-4.4-2.2-4.4-4.9s2-4.9 4.4-4.9 4.4 2.2 4.4 4.9-2 4.9-4.4 4.9Zm15 0c-2.4 0-4.4-2.2-4.4-4.9s2-4.9 4.4-4.9 4.4 2.2 4.4 4.9-2 4.9-4.4 4.9Z"
      />
    </svg>
  )
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M3.5 5.5h17v13h-17z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m4.2 6.3 7.8 6 7.8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function SupportPage() {
  const [language, setLanguage] = useState<'zh' | 'en'>(() =>
    navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en',
  )
  const copy = language === 'zh'

  return (
    <main className="support-page" lang={copy ? 'zh-Hans' : 'en'}>
      <div className="support-shell">
        <div className="support-topbar">
          <a className="support-back" href="/" aria-label={copy ? '返回主页' : 'Back to home'}>
          <span aria-hidden="true">‹</span>
          </a>
          <div className="support-language" aria-label={copy ? '选择语言' : 'Choose language'}>
            <button type="button" aria-pressed={copy} onClick={() => setLanguage('zh')}>中文</button>
            <span aria-hidden="true">/</span>
            <button type="button" aria-pressed={!copy} onClick={() => setLanguage('en')}>EN</button>
          </div>
        </div>

        <header className="support-header">
          <p className="support-kicker">DENGZH.SITE / SUPPORT</p>
          <h1>{copy ? '联系我们' : 'Contact us'}</h1>
          <p>{copy ? '遇到问题，或想分享你的想法？我们很乐意听到你的声音。' : 'Need help or want to share an idea? We’d love to hear from you.'}</p>
        </header>

        <section className="support-card support-community" aria-labelledby="community-title">
          <div className="support-card-copy">
            <p className="support-eyebrow">{copy ? '社区支持' : 'COMMUNITY'}</p>
            <h2 id="community-title">{copy ? '加入 Discord 社区' : 'Join the Discord community'}</h2>
            <p>{copy ? '获取使用帮助、产品更新和创作技巧，也可以和其他用户交流。' : 'Get help, product updates, and creative tips — and meet other users.'}</p>
          </div>
          <a
            className="support-discord-link"
            href="https://discord.gg/UbsaR5YytN"
            target="_blank"
            rel="noreferrer"
          >
            <DiscordIcon className="support-discord-icon" />
            <span>{copy ? '加入 Discord' : 'Join Discord'}</span>
            <span className="support-link-arrow" aria-hidden="true">↗</span>
          </a>
        </section>

        <section className="support-card support-wechat" aria-labelledby="wechat-title">
          <div className="support-card-copy">
            <p className="support-eyebrow">{copy ? '微信交流群' : 'WECHAT COMMUNITY'}</p>
            <h2 id="wechat-title">{copy ? '加入星拾会员群' : 'Join the Starift WeChat group'}</h2>
            <p>{copy ? '使用微信扫描二维码加入正式群聊。二维码有效期有限，失效后请回到此页面获取最新二维码。' : 'Scan the QR code with WeChat to join the community. The code expires; return here for an updated one if needed.'}</p>
          </div>
          <div className="support-qr-wrap">
            <img src="/support/wechat-group.png" alt="星拾会员群微信二维码" className="support-qr" />
            <p>{copy ? '星拾会员群 · 正式群聊' : 'Starift community · Official group'}</p>
          </div>
        </section>

        <section className="support-card support-email" aria-labelledby="email-title">
          <div className="support-card-copy">
            <p className="support-eyebrow">{copy ? '邮件联系' : 'EMAIL SUPPORT'}</p>
            <h2 id="email-title">{copy ? '需要进一步帮助？' : 'Need more help?'}</h2>
            <p>{copy ? '如果你遇到账号、订阅或使用问题，可以直接发邮件给我们。' : 'For help with subscriptions or using the app, email our support team.'}</p>
          </div>
          <a className="support-email-link" href="mailto:starift-support@dengzh.site">
            <MailIcon className="support-mail-icon" />
            <span>starift-support@dengzh.site</span>
            <span className="support-link-arrow" aria-hidden="true">↗</span>
          </a>
        </section>

        <footer className="support-footer">
          <a href="/privacy">{copy ? '隐私政策' : 'Privacy Policy'}</a>
          <span>© {new Date().getFullYear()} Starift · dengzh.site</span>
        </footer>
      </div>
    </main>
  )
}
