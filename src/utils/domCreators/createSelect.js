import { API } from '../api/api'
import { create } from './createElement'

export const createSelect = (
  id,
  labelText,
  options,
  className = '',
  selectedValue = ''
) => {
  const container = create('div', { className })
  const label = create('label', { for: id, textContent: labelText })
  const select = create('select', { id, className: id, name: id })

  options.forEach((opt) => {
    const option = create('option', {
      value: opt.value,
      textContent: opt.text
    })

    if (opt.value === selectedValue) {
      option.selected = true
    }

    select.appendChild(option)
  })

  container.appendChild(label)
  container.appendChild(select)
  return container
}
export const locationsSelect = async () => {
  const { status, data } = await API({ endpoint: '/locations/countries' })

  if (status !== 200) return

  const locationSelect = create('select', {
    id: 'locationCountry',
    name: 'locationCountry'
  })

  const defaultOption = create('option', {
    value: '',
    textContent: 'Select a country',
    disabled: true,
    selected: true
  })
  locationSelect.append(defaultOption)

  data.forEach((location) => {
    const option = create('option', {
      value: location._id,
      textContent: location.country
    })
    locationSelect.append(option)
  })

  return locationSelect
}
