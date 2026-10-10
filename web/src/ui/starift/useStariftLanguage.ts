import { useCallback, useState } from 'react'

export type StariftLanguage = 'en' | 'zh-Hans'

const STORAGE_KEY = 'starift-language'

function detectBrowserLanguage(): StariftLanguage {
  if (typeof navigator === 'undefined') return 'en'
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh-Hans' : 'en'
}

function getInitialLanguage(): StariftLanguage {
  if (typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'zh-Hans') return saved
    } catch {
      // Storage can be unavailable in private browsing or restricted contexts.
    }
  }

  return detectBrowserLanguage()
}

export function useStariftLanguage() {
  const [language, setLanguageState] = useState<StariftLanguage>(getInitialLanguage)

  const setLanguage = useCallback((nextLanguage: StariftLanguage) => {
    setLanguageState(nextLanguage)
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage)
    } catch {
      // Keep the current page usable even when the preference cannot be saved.
    }
  }, [])

  return { language, setLanguage }
}
