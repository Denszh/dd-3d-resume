import { useState } from 'react'

export default function PrivacyPolicyPage() {
  const [language, setLanguage] = useState<'zh' | 'en'>(() =>
    navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en',
  )
  const isChinese = language === 'zh'

  return (
    <main className="support-page" lang={isChinese ? 'zh-Hans' : 'en'}>
      <div className="support-shell">
        <div className="support-topbar">
          <a className="support-back" href="/support" aria-label={isChinese ? '返回支持页面' : 'Back to support'}>
            <span aria-hidden="true">‹</span>
          </a>
          <div className="support-language" aria-label={isChinese ? '选择语言' : 'Choose language'}>
            <button type="button" aria-pressed={isChinese} onClick={() => setLanguage('zh')}>中文</button>
            <span aria-hidden="true">/</span>
            <button type="button" aria-pressed={!isChinese} onClick={() => setLanguage('en')}>EN</button>
          </div>
        </div>

        <header className="support-header privacy-header">
          <p className="support-kicker">STARIFT / PRIVACY</p>
          <h1>{isChinese ? '隐私政策' : 'Privacy Policy'}</h1>
          <p>{isChinese ? '我们尽量让你的灵感留在你自己的设备和账户中。' : 'We designed Starift to keep your ideas on your own devices and accounts.'}</p>
        </header>

        {isChinese ? (
          <article className="support-card privacy-card">
            <p className="privacy-updated">更新日期：2026 年 9 月 28 日</p>
            <h2>适用范围</h2>
            <p>本政策适用于星拾（Starift）iOS 应用。星拾不要求你创建账号。应用开发者不会收集或接收你记录的灵感、录音、转写文本或图片，也不会将这些内容用于广告画像、出售或分享。</p>
            <h2>你保存在应用中的内容</h2>
            <p>灵感、录音、图片、标签和相关设置默认保存在你的设备上。星拾的本地 AI 摘要在设备上运行。你可以在应用中管理或删除记录。</p>
            <h2>语音识别</h2>
            <p>当你使用语音记录和转写时，星拾会调用 Apple 的语音识别服务将语音转换为文字。根据系统设置、语言和识别器能力，音频可能会发送给 Apple 处理；该处理由 Apple 提供，星拾开发者不会接收音频。Apple 对相关数据的处理受 Apple 自己的隐私政策和系统设置约束。</p>
            <h2>iCloud 同步</h2>
            <p>只有在你主动启用 iCloud 同步且设备 iCloud 设置允许时，记录才会通过 Apple CloudKit 同步到你的私人 iCloud 账户。开发者无法访问私人 iCloud 数据。你可以在应用和 Apple 系统设置中管理同步与 iCloud 数据。</p>
            <h2>系统权限</h2>
            <p>麦克风、语音识别、照片、相机、日历、提醒事项和通知权限仅在你使用相关功能时请求。你可以随时在 iOS“设置”中更改权限。</p>
            <h2>联系我们</h2>
            <p>如有隐私相关问题，请通过 <a href="mailto:support-starift@dengzh.site">support-starift@dengzh.site</a> 联系我们，也可以访问 <a href="/support">支持页面</a>。</p>
            <p className="privacy-updated">我们可能会在应用功能或适用要求变化时更新本政策，并在本页面公布更新版本。</p>
          </article>
        ) : (
          <article className="support-card privacy-card">
            <p className="privacy-updated">Last updated: September 28, 2026</p>
            <h2>Scope</h2>
            <p>This policy applies to the Starift iOS app. Starift does not require an account. The app developer does not collect or receive the ideas, recordings, transcripts, or images you create, and does not use this content for advertising profiles, sale, or sharing.</p>
            <h2>Content you keep in the app</h2>
            <p>Ideas, recordings, images, tags, and related settings are stored on your device by default. Starift’s on-device AI summaries run locally. You can manage or delete records in the app.</p>
            <h2>Speech recognition</h2>
            <p>When you use voice capture and transcription, Starift uses Apple’s Speech recognition service to convert speech to text. Depending on your system settings, language, and recognizer capabilities, audio may be sent to Apple for processing. This service is provided by Apple; the Starift developer does not receive the audio. Apple’s handling is subject to Apple’s own privacy policy and system settings.</p>
            <h2>iCloud sync</h2>
            <p>Only if you enable iCloud sync and your device’s iCloud settings allow it, records are synced through Apple CloudKit to your private iCloud account. The developer cannot access private iCloud data. You can manage sync and iCloud data in the app and Apple system settings.</p>
            <h2>System permissions</h2>
            <p>Microphone, Speech Recognition, Photos, Camera, Calendar, Reminders, and Notifications permissions are requested only when you use the related feature. You can change permissions at any time in iOS Settings.</p>
            <h2>Contact</h2>
            <p>For privacy questions, contact us at <a href="mailto:support-starift@dengzh.site">support-starift@dengzh.site</a> or visit the <a href="/support">support page</a>.</p>
            <p className="privacy-updated">We may update this policy as app features or applicable requirements change. Updates will be posted on this page.</p>
          </article>
        )}

        <footer className="support-footer">
          <a href="/support">{isChinese ? '联系支持' : 'Contact Support'}</a>
          <span>© {new Date().getFullYear()} Starift · dengzh.site</span>
        </footer>
      </div>
    </main>
  )
}
