export default function PublicHomePage() {
  return (
    <main className="public-home">
      <section className="public-home-card" aria-labelledby="public-home-title">
        <p className="public-home-kicker">DENGZH.SITE</p>
        <h1 id="public-home-title">服务页面</h1>
        <p className="public-home-copy">当前站点正在整理中，个人内容暂不公开。</p>
        <a className="public-home-link" href="/support">
          访问支持中心 <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  )
}
