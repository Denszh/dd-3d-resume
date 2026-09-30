import { createRoot } from 'react-dom/client'
import App from './App'
import SupportPage from './ui/SupportPage'
import PrivacyPolicyPage from './ui/PrivacyPolicyPage'
import './styles.css'

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const page = path === '/support' ? 'support' : path === '/privacy' ? 'privacy' : 'home'

document.title = page === 'support' ? '支持 · 星拾' : page === 'privacy' ? '隐私政策 · 星拾' : 'About DD'

createRoot(document.getElementById('root')!).render(
  page === 'support' ? <SupportPage /> : page === 'privacy' ? <PrivacyPolicyPage /> : <App />,
)
