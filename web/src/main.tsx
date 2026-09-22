import { createRoot } from 'react-dom/client'
import App from './App'
import SupportPage from './ui/SupportPage'
import './styles.css'

const isSupportPage = window.location.pathname.replace(/\/+$/, '') === '/support'

if (isSupportPage) {
  document.title = '支持 · 星拾'
}

createRoot(document.getElementById('root')!).render(isSupportPage ? <SupportPage /> : <App />)
