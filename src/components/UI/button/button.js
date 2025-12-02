import './button.css'

export const button = (text, className, id, fnc) => {
  const button = document.createElement('button')
  button.classList.add('mainButton')
  button.classList.add(className)
  button.textContent = text
  button.id = id
  button.addEventListener('click', fnc)
  return button
}
