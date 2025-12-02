import { API } from '../api/api'

export const uploadNewLocation = async (e) => {
  e.preventDefault()
  const [countryInput, locationImg] = e.target

  const errorMessage = document.getElementById('errorMessage')
  const errorMessageDiv = document.getElementById('errorMessageDiv')

  errorMessageDiv.classList.add('visible')
  errorMessage.textContent = 'Uploading location. Please wait..'

  if (!countryInput.value.trim()) {
    errorMessage.textContent = 'Country is required.'
    errorMessageDiv.classList.add('visible')
    return
  }

  if (!locationImg.files[0]) {
    errorMessage.textContent = 'Location image is required.'
    errorMessageDiv.classList.add('visible')
    return
  }

  const formData = new FormData()
  formData.append('country', countryInput.value)
  formData.append('locationImg', locationImg.files[0])

  try {
    const res = await API({
      endpoint: '/locations/',
      body: formData,
      method: 'POST',
      isJSON: false,
      token: localStorage.getItem('token')
    })

    if (res.status === 201) {
      errorMessage.textContent = 'Location uploaded successfully!'
      errorMessage.style.color = 'green'
      errorMessageDiv.classList.add('visible')
    } else {
      let message = ''
      if (res.data?.error) {
        message = Array.isArray(res.data.error)
          ? res.data.error.join(', ')
          : res.data.error
      } else if (res.data?.message) {
        message = res.data.message
      } else {
        message = 'An unexpected error occurred.'
      }
      errorMessage.textContent = message
      errorMessage.style.color = 'red'
      errorMessageDiv.classList.add('visible')
    }
  } catch (err) {
    errorMessage.textContent = 'Unexpected error occurred.'
    errorMessage.style.color = 'red'
    errorMessageDiv.classList.add('visible')
    console.error(err)
  }
}
