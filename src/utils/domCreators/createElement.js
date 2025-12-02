export const create = (tag, attrs = {}, children = []) => {
  const el = document.createElement(tag)
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'className') el.className = value
    else if (key === 'textContent') el.textContent = value
    else if (key === 'value') el.value = value
    else if (key === 'selected') el.selected = value
    else el.setAttribute(key, value)
  })
  children.forEach((child) => {
    el.appendChild(
      typeof child === 'string' ? document.createTextNode(child) : child
    )
  })
  return el
}
