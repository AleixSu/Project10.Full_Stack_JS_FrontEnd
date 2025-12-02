import { headerSrc } from '../../../constants/headerConstants'
import { currentUser } from '../../../state/userState'
import { navConfig } from '../../../utils/functions/navConfig'
import { headerRoutes } from '../../../utils/routes/routes'
import './header.css'
import { profileMenu } from './profileMenu'

export const header = () => {
  const header = document.createElement('header')
  const nav = document.createElement('nav')
  const ul = document.createElement('ul')
  const logoImg = document.createElement('img')
  ul.id = 'headerUl'
  logoImg.src = '/images/lightLogo.png'

  header.appendChild(logoImg)

  for (const route of headerRoutes) {
    if (currentUser && route.text === 'LOGIN/REGISTER') continue
    if (!currentUser && route.text === 'PROFILE') continue

    const li = document.createElement('li')
    const a = document.createElement('a')

    if (currentUser && route.text === 'PROFILE') {
      const imgDiv = document.createElement('div')
      const img = document.createElement('img')
      img.src = currentUser.profileImg || '/images/noProfileImg.png'
      img.classList.add('avatarHeader')

      imgDiv.append(img)
      a.appendChild(imgDiv)
      const fullName =
        currentUser.name && currentUser.frstSurname
          ? `${currentUser.name} ${currentUser.frstSurname} ${currentUser.scndSurname}`
          : currentUser.nickName

      a.append(fullName)

      profileMenu(header)
      a.addEventListener('click', (e) => {
        e.preventDefault()
        profileMenuDiv.classList.toggle('hidden')
      })
      document.addEventListener('click', (e) => {
        if (
          !profileMenuDiv.classList.contains('hidden') &&
          !profileMenuDiv.contains(e.target) &&
          !a.contains(e.target)
        ) {
          profileMenuDiv.classList.add('hidden')
        }
      })

      li.classList.add('profile')
    } else {
      a.textContent = route.text
      a.addEventListener('click', (e) => navConfig(e, route))
    }

    a.href = route.path

    li.appendChild(a)
    ul.appendChild(li)
  }

  const burgerMenu = document.createElement('div')
  burgerMenu.id = 'burgerMenu'
  burgerMenu.innerHTML = `
  <img src="${headerSrc.burgerMenuImg}">
  `

  burgerMenu.addEventListener('click', () => {
    ul.classList.toggle('active')
  })
  header.append(burgerMenu)

  header.appendChild(nav)
  nav.appendChild(ul)
  document.body.appendChild(header)
  const profileMenuDiv = document.getElementById('profileMenuDiv')
}
