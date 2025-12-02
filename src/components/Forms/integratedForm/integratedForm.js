import { button } from '../../UI/button/button'
import { loginForm } from '../loginForm/loginForm'
import { registerForm } from '../registerForm/registerForm'
import './integratedForm.css'

export const loginRegisterForm = (fatherElement) => {
  const loginRegisterArticle = document.createElement('article')
  loginRegisterArticle.id = 'loginRegisterArticle'
  loginRegisterArticle.classList.add('loginRegisterArticle')

  //------Register-----
  const registerBlock = registerForm()
  //------Login-------
  const loginBlock = loginForm()
  //-------Overlay-------
  const overlayDiv = document.createElement('div')
  overlayDiv.classList.add('overlayContainer')

  //todo LeftOverlay
  const overlay = document.createElement('div')
  overlay.classList.add('overlay')
  const leftOverley = document.createElement('div')
  leftOverley.classList.add('overlayPanel')
  leftOverley.classList.add('overlayLeft')
  leftOverley.innerHTML = `
    <h1>Welcome Back!</h1>
    <p>To keep connected with us please login with your personal info</p>
  `
  leftOverley.append(button('Sign In', 'ghost', 'signIn'))

  //todo RightOverlay
  const rightOverley = document.createElement('div')
  rightOverley.classList.add('overlayPanel')
  rightOverley.classList.add('overlayRight')
  rightOverley.innerHTML = `
    <h1>Hello, Friend!</h1>
    <p>Enter your personal details and start journey with us</p>

  `
  rightOverley.append(button('Sign Up', 'ghost', 'signUp'))

  //!----AppendSection---
  overlay.append(leftOverley, rightOverley)
  overlayDiv.append(overlay)
  loginRegisterArticle.append(registerBlock, loginBlock, overlayDiv)
  fatherElement.append(loginRegisterArticle)

  const signUp = document.getElementById('signUp')
  signUp.addEventListener('click', () => {
    loginRegisterArticle.classList.add('rightPanelActive')
  })
  const signIn = document.getElementById('signIn')
  signIn.addEventListener('click', () => {
    loginRegisterArticle.classList.remove('rightPanelActive')
  })
}

//---------------------------------
