import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const ResumeApp = lazy(() => import('./App'))
const StariftLandingPage = lazy(() => import('./ui/StariftLandingPage'))
const SupportPage = lazy(() => import('./ui/SupportPage'))
const PrivacyPolicyPage = lazy(() => import('./ui/PrivacyPolicyPage'))

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const routes: Record<string, 'home' | 'starift' | 'support' | 'privacy'> = {
  '/': 'home',
  '/starift/app': 'starift',
  '/starift/support': 'support',
  '/starift/privacy': 'privacy',
  '/support': 'support',
  '/privacy': 'privacy',
}
const page = routes[path] ?? 'home'
const productPrefix: '/starift' | '' = path.startsWith('/starift/') ? '/starift' : ''

if (productPrefix) {
  const favicon = document.createElement('link')
  favicon.rel = 'icon'
  favicon.type = 'image/png'
  favicon.href = `${import.meta.env.BASE_URL}images/starift-logo.png`
  document.head.append(favicon)
}

if (page === 'home') document.title = 'About DD'

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div className="route-loading" aria-label="Loading" />}>
    {page === 'starift' ? <StariftLandingPage />
      : page === 'support' ? <SupportPage productPrefix={productPrefix} />
        : page === 'privacy' ? <PrivacyPolicyPage productPrefix={productPrefix} />
          : <ResumeApp />}
  </Suspense>,
)
