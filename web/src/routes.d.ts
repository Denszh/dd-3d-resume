export type AppPage = 'home' | 'starift' | 'updates' | 'support' | 'privacy'

export function resolveRoute(pathname: string): {
  page: AppPage
  productPrefix: '/starift' | ''
}
