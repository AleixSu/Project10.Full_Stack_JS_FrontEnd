import { loginRegisterForm } from '../../components/Forms/integratedForm/integratedForm'
import { button } from '../../components/UI/button/button'
import { overlayCanvas } from '../../utils/functions/createCanvas'
import { headerRoutes } from '../../utils/routes/routes'
import './loginRegister.css'

let overlay
export const loginRegister = () => {
  if (!headerRoutes[3].active) {
    if (!overlay) {
      overlay = document.createElement('div')
      overlay.id = 'overlayBlur'
      document.body.append(overlay)
    }

    overlay.classList.add('active')

    const section = overlayCanvas('login')
    section.classList.add('login')
    loginRegisterForm(section)
    section.append(button('X', 'x'))
    const closeLRForm = document.querySelector('.x')
    closeLRForm.addEventListener('click', () => {
      section.classList.toggle('login')
      section.classList.toggle('closeLogin')
      overlay.classList.remove('active')
      setTimeout(() => {
        section.remove()
        headerRoutes[3].active = false
      }, 1000)
    })
  }
}
