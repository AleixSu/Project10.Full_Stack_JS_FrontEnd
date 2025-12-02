import { event } from '../../pages/event/event'
import { home } from '../../pages/home/home'
import { location } from '../../pages/location/location'
import { loginRegister } from '../../pages/loginRegister/loginRegister'
import { myProfilePage } from '../../pages/myProfile/myProfile'

export const headerRoutes = [
  {
    path: '/',
    text: 'HOME',
    page: home,
    active: false
  },
  {
    path: '/',
    text: 'EVENTS',
    page: event,
    active: false
  },
  {
    path: '/',
    text: 'LOCATIONS',
    page: location,
    active: false
  },
  {
    path: '/',
    text: 'LOGIN/REGISTER',
    page: loginRegister,
    active: false
  },
  {
    path: '/user/profile',
    text: 'PROFILE',
    page: myProfilePage,
    active: false
  }
]
