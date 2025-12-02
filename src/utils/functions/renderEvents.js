import { eventCard } from '../../components/UI/card/card'

export const renderEvents = (container, events) => {
  container.innerHTML = ''
  for (const event of events) {
    container.append(
      eventCard(event.eventName, event.locationCity, event.eventImg, event)
    )
  }
}
