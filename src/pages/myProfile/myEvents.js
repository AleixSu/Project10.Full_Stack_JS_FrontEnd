import { eventByLocationCard } from '../../components/UI/card/card'
import { myEventsSrc } from '../../constants/myEventsConstants'
import { currentUser } from '../../state/userState'
import { API } from '../../utils/api/api'
import { create } from '../../utils/domCreators/createElement'
import { createCanvas } from '../../utils/functions/createCanvas'
import './myEvents.css'

export const myEvents = async () => {
  const section = createCanvas('myEvents')
  const backgroundMyEvents = document.createElement('div')
  backgroundMyEvents.id = 'backgroundMyEvents'
  backgroundMyEvents.style.setProperty(
    '--bg-image',
    `url('${myEventsSrc.bgImage}')`
  )
  section.append(backgroundMyEvents)

  const logoDiv = document.createElement('div')
  logoDiv.id = 'logoMyEventsDiv'
  logoDiv.innerHTML = `<img src="${myEventsSrc.logoBanner}" />`
  section.appendChild(logoDiv)

  const articleMyEvents = document.createElement('article')
  articleMyEvents.id = 'articleMyEvents'

  const myEventsDiv = create('div', { id: 'myEventsDiv' }, [
    create('h2', { textContent: 'My Events' }),
    create('div', { id: 'myEventsList' })
  ])
  articleMyEvents.append(myEventsDiv)
  section.append(articleMyEvents)

  const myEventsList = document.getElementById('myEventsList')
  const ul = document.createElement('ul')

  for (const event of currentUser.attendingEvents) {
    const li = document.createElement('li')

    li.appendChild(eventByLocationCard(event))
    ul.append(li)
  }
  myEventsList.append(ul)
  return section
}
eventByLocationCard
