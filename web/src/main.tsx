import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { resolveRoute } from './routes.js'
import './styles.css'

const ResumeApp = lazy(() => import('./App'))
const StariftLandingPage = lazy(() => import('./ui/StariftLandingPage'))
const StariftUpdatesPage = lazy(() => import('./ui/StariftUpdatesPage'))
const SupportPage = lazy(() => import('./ui/SupportPage'))
const PrivacyPolicyPage = lazy(() => import('./ui/PrivacyPolicyPage'))

const { page, productPrefix } = resolveRoute(window.location.pathname)

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
      : page === 'updates' ? <StariftUpdatesPage />
        : page === 'support' ? <SupportPage productPrefix={productPrefix} />
        : page === 'privacy' ? <PrivacyPolicyPage productPrefix={productPrefix} />
          : <ResumeApp />}
  </Suspense>,
)
