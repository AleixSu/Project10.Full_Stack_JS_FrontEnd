import { attendeeCard } from '../../components/UI/card/card'
import { currentUser } from '../../state/userState'
import { API } from '../api/api'

export const applyEvent = async (e, event) => {
  const res = await API({
    endpoint: `/events/${event._id}/sign_up`,
    method: 'PATCH',
    token: localStorage.getItem('token')
  })

  if (res.status !== 200) {
    console.error('Error applying to event', res.data)
    return
  }

  const { event: updatedEvent, user } = res.data

  const updated = updatedEvent.attendees

  const ul = document.getElementById('ul')
  if (!ul) return

  ul.innerHTML = ''

  let n = 1
  for (const attendee of updated) {
    const li = document.createElement('li')
    li.appendChild(attendeeCard(attendee, n))
    n++
    ul.append(li)
  }

  currentUser.attendingEvents = user.attendingEvents

  if (window.location.pathname === '/my-events') {
    mount(myEvents())
  }
}
