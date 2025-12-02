import { API } from '../api/api'

export const uploadNewEvent = async (e) => {
  e.preventDefault()

  const form = e.target
  const eventNameInput =
    form.elements['eventName'] || form.querySelector('[name="eventName"]')
  const dateInput = form.elements['date'] || form.querySelector('[name="date"]')
  const locationCountryInput =
    form.elements['locationCountry'] ||
    form.querySelector('[name="locationCountry"]')
  const locationCityInput =
    form.elements['locationCity'] || form.querySelector('[name="locationCity"]')
  const maxCapacityInput =
    form.elements['maxCapacity'] || form.querySelector('[name="maxCapacity"]')
  const eventImgInput =
    form.elements['eventImg'] || form.querySelector('[name="eventImg"]')
  const eventBgImgInput =
    form.elements['eventBgImg'] || form.querySelector('[name="eventBgImg"]')
  const descriptionInput =
    form.elements['description'] || form.querySelector('[name="description"]')

  const errorMessageEvent = document.getElementById('errorMessageEvent')
  const errorMessageEventDiv = document.getElementById('errorMessageEventDiv')

  errorMessageEventDiv.classList.add('visible')
  errorMessageEvent.textContent = 'Uploading Event. Please wait..'
  errorMessageEvent.style.color = 'black'

  if (!eventNameInput?.value.trim()) {
    errorMessageEvent.textContent = 'Event name is required.'
    errorMessageEvent.style.color = 'red'
    return
  }

  if (!dateInput?.value.trim()) {
    errorMessageEvent.textContent = 'Date is required.'
    errorMessageEvent.style.color = 'red'
    return
  }

  if (!locationCountryInput?.value.trim()) {
    errorMessageEvent.textContent = 'Location country is required.'
    errorMessageEvent.style.color = 'red'
    return
  }

  if (!locationCityInput?.value.trim()) {
    errorMessageEvent.textContent = 'Location city is required.'
    errorMessageEvent.style.color = 'red'
    return
  }

  if (!maxCapacityInput?.value.trim()) {
    errorMessageEvent.textContent = 'Max capacity is required.'
    errorMessageEvent.style.color = 'red'
    return
  }

  if (!eventImgInput?.files[0]) {
    errorMessageEvent.textContent = 'Event image is required.'
    errorMessageEvent.style.color = 'red'
    return
  }

  if (!eventBgImgInput?.files[0]) {
    errorMessageEvent.textContent = 'Event background image is required.'
    errorMessageEvent.style.color = 'red'
    return
  }

  if (!descriptionInput?.value.trim()) {
    errorMessageEvent.textContent = 'Description is required.'
    errorMessageEvent.style.color = 'red'
    return
  }

  const formData = new FormData()

  formData.append('eventName', eventNameInput.value)
  formData.append('date', dateInput.value)
  formData.append('locationCountry', locationCountryInput.value)
  formData.append('locationCity', locationCityInput.value)
  formData.append('maxCapacity', maxCapacityInput.value)
  formData.append('eventImg', eventImgInput.files[0])
  formData.append('eventBgImg', eventBgImgInput.files[0])
  formData.append('description', descriptionInput.value)

  try {
    const res = await API({
      endpoint: '/events/',
      body: formData,
      method: 'POST',
      isJSON: false,
      token: localStorage.getItem('token')
    })

    if (res.status === 201) {
      errorMessageEvent.textContent = 'Event uploaded successfully!'
      errorMessageEvent.style.color = 'green'

      form.reset()

      setTimeout(() => {
        errorMessageEventDiv.classList.remove('visible')
      }, 3000)
    } else {
      let message = ''

      if (typeof res.data === 'string') {
        message = res.data
      } else if (res.data?.error) {
        message = Array.isArray(res.data.error)
          ? res.data.error.join(', ')
          : res.data.error
      } else if (res.data?.message) {
        message = res.data.message
      } else {
        message = `Error ${res.status}: An unexpected error occurred.`
      }

      console.error('Error del servidor:', message)
      errorMessageEvent.textContent = message
      errorMessageEvent.style.color = 'red'
    }
  } catch (err) {
    console.error(' Error completo:', err)
    console.error(' Respuesta:', err.response)
    console.error(' Data:', err.response?.data)

    let errorMsg = 'Unexpected error occurred.'

    if (err.response?.data) {
      if (typeof err.response.data === 'string') {
        errorMsg = err.response.data
      } else if (err.response.data.message) {
        errorMsg = err.response.data.message
      } else if (err.response.data.error) {
        errorMsg = Array.isArray(err.response.data.error)
          ? err.response.data.error.join(', ')
          : err.response.data.error
      }
    }

    errorMessageEvent.textContent = errorMsg
    errorMessageEvent.style.color = 'red'
  }
}
