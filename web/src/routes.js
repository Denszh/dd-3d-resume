const routes = {
  '/': 'home',
  '/starift/app': 'starift',
  '/starift/updates': 'updates',
  '/starift/support': 'support',
  '/starift/privacy': 'privacy',
  '/support': 'support',
  '/privacy': 'privacy',
}

/** @param {string} pathname */
export function resolveRoute(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return {
    page: routes[path] ?? 'home',
    productPrefix: path.startsWith('/starift/') ? '/starift' : '',
  }
}
