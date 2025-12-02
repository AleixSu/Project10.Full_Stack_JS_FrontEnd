import { log } from '../../../utils/functions/log'
import { button } from '../../UI/button/button'
import { fieldForm } from '../fieldForm/fieldForm'

export const loginForm = () => {
  const loginDiv = document.createElement('div')
  loginDiv.classList.add('formContainer')
  loginDiv.classList.add('signInContainer')
  const loginForm = document.createElement('form')
  loginForm.className = 'loginForm'
  loginForm.innerHTML = `
  <h1>Sign in</h1>
  ${fieldForm({ type: 'email', placeholder: 'Email' })}
  ${fieldForm({ type: 'password', placeholder: 'Password' })}
      <span class="formError" id="loginError"></span>
  `
  loginForm.addEventListener('submit', log)
  loginForm.append(button('Sign In', 'signInButton', 'signInButton'))
  loginDiv.appendChild(loginForm)
  return loginDiv
}
