import { filterBox } from '../../components/Forms/filterBox/filterBox'
import { searchBox } from '../../components/Forms/searchBox/searchBox'
import { locationsSrc } from '../../constants/locationConstants'
import { createCanvas } from '../../utils/functions/createCanvas'
import { loadEvents } from '../../utils/functions/loadEvents'
import './event.css'

export const event = () => {
  window.scrollTo(0, 0)

  const section = createCanvas('event')

  const backgroundImg = document.createElement('div')
  backgroundImg.id = 'backgroundImg'
  backgroundImg.classList.add('eventsBgImg')

  const logoDiv = document.createElement('div')
  logoDiv.id = 'logoLocationDiv'
  logoDiv.innerHTML = `<img src=${locationsSrc.logoBanner} />`
  section.appendChild(logoDiv)

  const articleEvents = document.createElement('article')
  articleEvents.id = 'articleEvents'
  articleEvents.innerHTML = `<h2>EVENTS</h2>`
  const search = searchBox()

  articleEvents.appendChild(search)

  const eventsDiv = document.createElement('div')
  eventsDiv.id = 'eventsDiv'
  filterBox(articleEvents, eventsDiv)
  articleEvents.append(eventsDiv)

  loadEvents(eventsDiv, search)

  section.append(backgroundImg)
  section.append(articleEvents)
  return section
}
