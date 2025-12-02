import { adminArea } from '../../../pages/adminArea/adminArea'
import { myEvents } from '../../../pages/myProfile/myEvents'
import { currentUser } from '../../../state/userState'
import { logOut } from '../../../utils/functions/logOut'
import { navConfig } from '../../../utils/functions/navConfig'
import { headerRoutes } from '../../../utils/routes/routes'
import './profileMenu.css'
export const profileMenu = (fatherElement) => {
  const profileMenuDiv = document.createElement('div')
  profileMenuDiv.id = 'profileMenuDiv'
  profileMenuDiv.classList.add('hidden')

  const ul = document.createElement('ul')
  ul.id = 'profileMenuUl'
  const li = document.createElement('li')

  const profileLink = document.createElement('a')
  profileLink.textContent = 'My profile'
  profileLink.href = headerRoutes[4].path
  profileLink.addEventListener('click', (e) => {
    navConfig(e, headerRoutes[4])
    profileMenuDiv.classList.toggle('hidden')
  })
  li.append(profileLink)

  const myEventsLink = document.createElement('a')
  myEventsLink.textContent = 'My events'
  myEventsLink.href = '/my_events'
  myEventsLink.addEventListener('click', (e) => {
    e.preventDefault()
    myEvents()
  })
  li.append(myEventsLink)

  if (currentUser.role === 'admin') {
    const adminPageLink = document.createElement('a')
    adminPageLink.href = '/admin_area'
    adminPageLink.textContent = 'Admin area'
    adminPageLink.addEventListener('click', (e) => {
      e.preventDefault()
      adminArea()
    })
    li.append(adminPageLink)
  }

  const logOutOption = document.createElement('h5')
  logOutOption.id = 'logOutOption'
  logOutOption.textContent = 'Log Out'
  logOutOption.addEventListener('click', logOut)
  li.append(logOutOption)
  ul.append(li)
  profileMenuDiv.append(ul)
  fatherElement.append(profileMenuDiv)
}
