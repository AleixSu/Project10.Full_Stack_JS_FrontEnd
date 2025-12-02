import { cityCard } from '../../components/UI/card/card'
import { locationsSrc } from '../../constants/locationConstants'
import { API } from '../../utils/api/api'
import { createCanvas } from '../../utils/functions/createCanvas'
import { loadingLocations } from '../../utils/functions/loadingCards'
import './location.css'

export const location = async () => {
  window.scrollTo(0, 0)
  const section = createCanvas('location')
  const backgroundImg = document.createElement('div')
  backgroundImg.id = 'backgroundImg'
  backgroundImg.classList.add('locationsBgImg')
  const logoDiv = document.createElement('div')
  logoDiv.id = 'logoLocationDiv'
  logoDiv.innerHTML = `
        <img  src=${locationsSrc.logoBanner} />
      `
  section.appendChild(logoDiv)

  const articleLocations = document.createElement('article')
  articleLocations.id = 'articleLocations'
  articleLocations.innerHTML = `
    <h2>COUNTRIES</h2>
    `

  const citiesDiv = document.createElement('div')
  citiesDiv.id = 'citiesDiv'
  articleLocations.append(citiesDiv)

  loadingLocations(citiesDiv)

  const getLocations = async () => {
    try {
      const res = await API({
        endpoint: '/locations/'
      })

      if (res.status !== 200) {
        citiesDiv.innerHTML = `<p class="error">Sorry, we couldn't load the locations.</p>`
        return
      }

      citiesDiv.innerHTML = ''
      for (const location of res.data) {
        citiesDiv.append(
          cityCard(location.country, location.locationImg, location)
        )
      }
    } catch (error) {
      citiesDiv.innerHTML = `<p class="error">Sorry, we couldn't load the locations.</p>`
      return
    }
  }
  getLocations()
  section.append(backgroundImg)

  section.append(articleLocations)
  return section
}
