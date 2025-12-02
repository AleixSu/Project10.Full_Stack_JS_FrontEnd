import { headerRoutes } from '../routes/routes'

export const navConfig = (e, route) => {
  e.preventDefault()
  console.log('Navegando a:', route.path)
  window.history.pushState({}, '', route.path)
  console.log('URL actual:', window.location.pathname)
  route.page()

  for (const r of headerRoutes) r.active = false
  route.active = true
}
