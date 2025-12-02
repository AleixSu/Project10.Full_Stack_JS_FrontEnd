import { API } from '../api/api'

export const log = async (e) => {
  e.preventDefault()

  const [emailInput, passwordInput] = e.target
  const errorSpan = document.getElementById('loginError')

  errorSpan.textContent = ''

  if (!emailInput.value.trim()) {
    errorSpan.textContent = 'Email is required'
    return
  }

  if (!passwordInput.value.trim()) {
    errorSpan.textContent = 'Password is required'
    return
  }

  errorSpan.textContent = 'Logging in...'
  errorSpan.style.color = 'grey'

  const body = {
    email: emailInput.value,
    password: passwordInput.value
  }

  try {
    const res = await API({
      endpoint: '/users/login',
      body,
      method: 'POST'
    })

    if (res.status !== 200) {
      const d = res.data
      errorSpan.textContent =
        typeof d === 'string'
          ? d
          : d?.error
          ? Array.isArray(d.error)
            ? d.error.join(', ')
            : d.error
          : d?.message || 'Login failed'
      errorSpan.style.color = 'red'
      return
    }

    localStorage.setItem('token', res.data.token)

    errorSpan.textContent = 'Login successful! Redirecting...'
    errorSpan.style.color = 'green'

    setTimeout(() => {
      window.location.reload()
    }, 500)
  } catch (err) {
    let errorMsg = 'Connection error. Please try again.'

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
    } else if (err.message) {
      if (err.message.includes('fetch')) {
        errorMsg =
          'Cannot connect to server. Please check your internet connection.'
      } else {
        errorMsg = err.message
      }
    }

    errorSpan.textContent = errorMsg
    errorSpan.style.color = 'red'
  }
}
