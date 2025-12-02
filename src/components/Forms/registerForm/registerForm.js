import { register } from '../../../utils/functions/register'
import { button } from '../../UI/button/button'
import { fieldForm } from '../fieldForm/fieldForm'

export const registerForm = () => {
  const registerDiv = document.createElement('div')
  registerDiv.classList.add('formContainer')
  registerDiv.classList.add('signUpContainer')
  const registerForm = document.createElement('form')
  registerForm.className = 'loginForm'
  registerForm.innerHTML = `
  <h1>Create Account</h1>
  ${fieldForm({ placeholder: 'Username' })}
  ${fieldForm({ type: 'email', placeholder: 'Email' })}
  ${fieldForm({ type: 'password', placeholder: 'Password' })}
  
    <span class="formError" id="registerError"></span>
  `
  registerForm.addEventListener('submit', register)
  registerForm.append(button('Sign Up', 'signUpButton', 'signUpButton'))
  registerDiv.appendChild(registerForm)
  return registerDiv
}
