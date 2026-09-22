import type { SVGProps } from 'react'

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
  return (
    <main className="support-page">
      <div className="support-shell">
        <a className="support-back" href="/" aria-label="返回主页">
          <span aria-hidden="true">‹</span>
        </a>

        <header className="support-header">
          <p className="support-kicker">DENGZH.SITE / SUPPORT</p>
          <h1>联系我们</h1>
          <p>遇到问题，或想分享你的想法？我们很乐意听到你的声音。</p>
        </header>

        <section className="support-card support-community" aria-labelledby="community-title">
          <div className="support-card-copy">
            <p className="support-eyebrow">社区支持</p>
            <h2 id="community-title">加入 Discord 社区</h2>
            <p>获取使用帮助、产品更新和创作技巧，也可以和其他用户交流。</p>
          </div>
          <a
            className="support-discord-link"
            href="https://discord.gg/UbsaR5YytN"
            target="_blank"
            rel="noreferrer"
          >
            <DiscordIcon className="support-discord-icon" />
            <span>加入 Discord</span>
            <span className="support-link-arrow" aria-hidden="true">↗</span>
          </a>
        </section>

        <section className="support-card support-wechat" aria-labelledby="wechat-title">
          <div className="support-card-copy">
            <p className="support-eyebrow">微信交流群</p>
            <h2 id="wechat-title">加入星拾会员群</h2>
            <p>使用微信扫描二维码加入正式群聊。二维码有效期有限，失效后请回到此页面获取最新二维码。</p>
          </div>
          <div className="support-qr-wrap">
            <img src="/support/wechat-group.png" alt="星拾会员群微信二维码" className="support-qr" />
            <p>星拾会员群 · 正式群聊</p>
          </div>
        </section>

        <section className="support-card support-email" aria-labelledby="email-title">
          <div className="support-card-copy">
            <p className="support-eyebrow">邮件联系</p>
            <h2 id="email-title">需要进一步帮助？</h2>
            <p>如果你遇到账号、订阅或使用问题，可以直接发邮件给我们。</p>
          </div>
          <a className="support-email-link" href="mailto:support@easyai-picture.com">
            <MailIcon className="support-mail-icon" />
            <span>support@easyai-picture.com</span>
            <span className="support-link-arrow" aria-hidden="true">↗</span>
          </a>
        </section>

        <footer className="support-footer">© {new Date().getFullYear()} 星拾 · dengzh.site</footer>
      </div>
    </main>
  )
}
