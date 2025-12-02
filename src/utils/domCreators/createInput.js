import { create } from './createElement'

export const createInput = (
  id,
  labelText,
  type = 'text',
  className = '',
  placeholder = '',
  value = ''
) => {
  const container = create('div', { className })
  const label = create('label', { for: id, textContent: labelText })
  const input = create('input', { type, className: id, id, placeholder, value })
  container.appendChild(label)
  container.appendChild(input)
  return container
}
