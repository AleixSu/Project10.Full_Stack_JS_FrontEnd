import { renderEvents } from './renderEvents'
import { searchEngine } from './engines'
import { API } from '../api/api'
import { loadingEvents } from './loadingCards'

export const loadEvents = async (eventsDiv, searchBox) => {
  let events = []

  loadingEvents(eventsDiv)

  try {
    const res = await API({ endpoint: '/events/' })

    if (res.status !== 200) {
      eventsDiv.innerHTML = `<p class="error">Sorry, we couldn't load the events.</p>`
      return
    }

    events = res.data
  } catch (err) {
    eventsDiv.innerHTML = `<p class="error">Sorry, we couldn't load the events.</p>`
    return
  }

  renderEvents(eventsDiv, events)
  searchEngine(searchBox, eventsDiv, events)
}
