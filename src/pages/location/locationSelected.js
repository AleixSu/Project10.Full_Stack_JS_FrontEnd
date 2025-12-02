import { eventByLocationCard } from '../../components/UI/card/card'
import { locationsSrc } from '../../constants/locationConstants'
import { API } from '../../utils/api/api'
import { createCanvas } from '../../utils/functions/createCanvas'
import './locationSelected.css'

export const locationSelected = async (location) => {
  window.scrollTo(0, 0)

  const section = createCanvas('locationSelected')

  const backgroundImg = document.createElement('div')
  backgroundImg.id = 'backgroundImg'
  backgroundImg.classList.add('locationImg')
  backgroundImg.style.background = `url('${location.locationImg}') center/cover no-repeat`

  const logoDiv = document.createElement('div')
  logoDiv.id = 'logoLocationDiv'
  logoDiv.innerHTML = `<img src=.${locationsSrc.logoBanner} />`
  section.appendChild(logoDiv)

  const articleLocationSelected = document.createElement('article')
  articleLocationSelected.id = 'articleLocationSelected'
  articleLocationSelected.innerHTML = `<h2>${location.country} </h2>`
  section.appendChild(backgroundImg)

  const eventsHappeningDiv = document.createElement('div')
  eventsHappeningDiv.id = 'eventsHappeningDiv'
  const response = await API({ endpoint: `/events/location/${location._id}` })
  for (const event of response.data) {
    eventsHappeningDiv.append(eventByLocationCard(event))
  }
  articleLocationSelected.append(eventsHappeningDiv)
  section.appendChild(articleLocationSelected)

  section.appendChild(articleLocationSelected)
}
