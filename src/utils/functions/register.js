import { API } from '../api/api'

export const register = async (e) => {
  e.preventDefault()

  const [userNameInput, emailInput, passwordInput] = e.target
  const errorSpan = document.getElementById('registerError')

  // Limpia el error anterior
  errorSpan.textContent = ''

  // Validaciones básicas en el frontend
  if (!userNameInput.value.trim()) {
    errorSpan.textContent = 'Username is required'
    return
  }

  if (!emailInput.value.trim()) {
    errorSpan.textContent = 'Email is required'
    return
  }

  if (!passwordInput.value.trim()) {
    errorSpan.textContent = 'Password is required'
    return
  }

  // Muestra un mensaje de "cargando"
  errorSpan.textContent = 'Creating account...'
  errorSpan.style.color = 'blue'

  const body = {
    nickName: userNameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  }

  try {
    const res = await API({
      endpoint: '/users/register',
      body,
      method: 'POST'
    })

    if (res.status !== 201) {
      const d = res.data
      errorSpan.textContent =
        typeof d === 'string'
          ? d
          : d?.error
          ? Array.isArray(d.error)
            ? d.error.join(', ')
            : d.error
          : d?.message || 'Registration failed'
      errorSpan.style.color = 'red'
      return
    }

    // Registro exitoso - ahora hacer login automático
    errorSpan.textContent = 'Account created! Logging in...'
    errorSpan.style.color = 'blue'

    try {
      const loginRes = await API({
        endpoint: '/users/login',
        body: {
          email: emailInput.value,
          password: passwordInput.value
        },
        method: 'POST'
      })

      if (loginRes.status !== 200) {
        const d = loginRes.data
        errorSpan.textContent =
          typeof d === 'string'
            ? d
            : d?.error
            ? Array.isArray(d.error)
              ? d.error.join(', ')
              : d.error
            : d?.message || 'Auto-login failed. Please login manually.'
        errorSpan.style.color = 'red'
        return
      }

      // Login exitoso
      localStorage.setItem('token', loginRes.data.token)

      // Muestra mensaje de éxito antes de recargar
      errorSpan.textContent = 'Welcome! Redirecting...'
      errorSpan.style.color = 'green'

      // Pequeño delay para que el usuario vea el mensaje
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (loginErr) {
      // Error en el auto-login después del registro
      console.error('❌ Auto-login error:', loginErr)

      let errorMsg =
        'Account created but could not login automatically. Please login manually.'

      if (loginErr.response?.data) {
        if (typeof loginErr.response.data === 'string') {
          errorMsg = loginErr.response.data
        } else if (loginErr.response.data.message) {
          errorMsg = loginErr.response.data.message
        } else if (loginErr.response.data.error) {
          errorMsg = Array.isArray(loginErr.response.data.error)
            ? loginErr.response.data.error.join(', ')
            : loginErr.response.data.error
        }
      } else if (loginErr.message) {
        if (loginErr.message.includes('fetch')) {
          errorMsg =
            'Account created but connection lost. Please login manually.'
        } else {
          errorMsg = loginErr.message
        }
      }

      errorSpan.textContent = errorMsg
      errorSpan.style.color = 'orange'
    }
  } catch (err) {
    // Error en el registro
    console.error('❌ Registration error:', err)

    let errorMsg = 'Connection error. Please try again.'

    // Si hay respuesta del servidor pero con error
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
    // Si no hay respuesta (servidor caído, sin internet, etc.)
    else if (err.message) {
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
