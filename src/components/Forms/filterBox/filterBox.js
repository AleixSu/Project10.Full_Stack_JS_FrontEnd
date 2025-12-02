import { API } from '../../../utils/api/api'
import { filterEngine, filtersChecked } from '../../../utils/functions/engines'
import { button } from '../../UI/button/button'

export const filterBox = (fatherElement, cardsDiv) => {
  const filterBox = document.createElement('div')
  filterBox.id = 'filterBox'
  filterBox.innerHTML = `
    <div>
        <h5>Filter by location:</h5>
    </div>
  `
  const locationDiv = document.createElement('div')
  locationDiv.id = 'filterLocationDiv'

  filterBox.append(locationDiv)
  fatherElement.append(filterBox)

  loadCountries(locationDiv, cardsDiv)
}

const loadCountries = async (locationDiv, cardsDiv) => {
  const res = await API({ endpoint: '/locations/countries' })

  if (res.status !== 200) return

  const countries = res.data

  for (const country of countries) {
    filtersChecked.push({ country: country.country, activated: false })

    locationDiv.append(
      button(
        country.country,
        'filterLocationButton',
        null,
        (e) => filterEngine(e, cardsDiv),
        filtersChecked
      )
    )
  }
}
