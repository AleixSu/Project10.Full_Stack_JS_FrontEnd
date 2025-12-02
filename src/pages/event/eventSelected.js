import { button } from '../../components/UI/button/button'
import { attendeeCard } from '../../components/UI/card/card'
import { locationsSrc } from '../../constants/locationConstants'
import { currentUser } from '../../state/userState'
import { create } from '../../utils/domCreators/createElement'
import { applyEvent } from '../../utils/functions/applyEvent'
import { createCanvas } from '../../utils/functions/createCanvas'
import './eventSelected.css'
export const eventSelected = (event) => {
  window.scrollTo(0, 0)

  const section = createCanvas('eventSelected')

  const backgroundImg = document.createElement('div')
  backgroundImg.id = 'backgroundImg'
  backgroundImg.classList.add('eventsBgImg')
  backgroundImg.style.background = `url('${event.eventBgImg}') center/cover no-repeat`

  const logoDiv = document.createElement('div')
  logoDiv.id = 'logoLocationDiv'
  logoDiv.innerHTML = `<img src=.${locationsSrc.logoBanner} />`
  section.appendChild(logoDiv)

  const articleEventSelected = document.createElement('article')
  articleEventSelected.id = 'articleEventSelected'
  articleEventSelected.innerHTML = `<h2>${event.eventName} - ${event.locationCity}, ${event.locationCountry.country}   </h2>`
  section.appendChild(backgroundImg)

  const assistNode = currentUser
    ? button("I'm Going!", 'assistButton', 'assistButton', (e) =>
        applyEvent(e, event)
      )
    : create('span', { textContent: '' })

  const infoDiv = create('div', { id: 'infoDiv' }, [
    create('img', { src: event.eventImg }),
    create('div', { id: 'eventDescriptionDiv' }, [
      create('p', { textContent: event.description }),
      assistNode
    ])
  ])

  const attendeesListDiv = create('div', { id: 'attendeesListDiv' }, [
    create('h2', { textContent: "Attendee's List" }),
    create('div', { id: 'attendeesList' })
  ])

  articleEventSelected.append(infoDiv)
  articleEventSelected.append(attendeesListDiv)
  section.appendChild(articleEventSelected)

  const attendeesList = document.getElementById('attendeesList')

  if (currentUser) {
    if (!event.attendees || event.attendees.length === 0) {
      const beTheFirst = document.createElement('h4')
      beTheFirst.id = 'beTheFirst'
      beTheFirst.textContent =
        '¡Come on, be the first to confirm your attendance to this event!'
      attendeesList.append(beTheFirst)
    } else {
      const ul = document.createElement('ul')
      ul.id = 'ul'
      let numeration = 1
      for (const attendee of event.attendees) {
        const li = document.createElement('li')
        li.appendChild(attendeeCard(attendee, numeration))
        numeration++
        ul.append(li)
      }
      attendeesList.append(ul)
    }
  } else {
    const needToRegister = document.createElement('h4')
    needToRegister.id = 'needToRegister'
    needToRegister.textContent =
      "You need to log in to see the attendee's list. ¡Thank you!"
    attendeesList.append(needToRegister)
  }
}
