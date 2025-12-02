import { setCurrentUser } from '../../state/userState'
import { API } from '../api/api'

export const restoreSession = async () => {
  const token = localStorage.getItem('token')
  if (!token) return console.log('no token')

  try {
    const { status, data } = await API({
      endpoint: '/users/profile',
      token
    })

    if (status !== 200) {
      console.log('Invalid token, clearing...')
      localStorage.removeItem('token')
      return
    }

    setCurrentUser(data)
  } catch (e) {
    console.log('Invalid token, clearing...')
    localStorage.removeItem('token')
  }
}
