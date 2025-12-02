import { eventSelected } from '../../../pages/event/eventSelected'
import { locationSelected } from '../../../pages/location/locationSelected'
import './card.css'

export const card = (text, src, fnc) => {
  const card = document.createElement('div')
  card.addEventListener('click', fnc)
  const cardText = document.createElement('h3')

  card.classList.add('card')
  card.style.backgroundImage = src
  cardText.textContent = text

  card.appendChild(cardText)

  return card
}

export const cityCard = (text, src, id) => {
  const card = document.createElement('div')
  card.addEventListener('click', () => locationSelected(id))
  const cardText = document.createElement('h3')
  card.classList.add('cityCard')
  card.style.backgroundImage = `url(${src})`
  cardText.textContent = text

  card.appendChild(cardText)

  return card
}

export const eventCard = (eventName, eventCity, src, id) => {
  const card = document.createElement('div')
  card.addEventListener('click', () => eventSelected(id))
  const infoCard = document.createElement('div')
  const cardName = document.createElement('h3')
  const cardCity = document.createElement('h4')
  card.classList.add('eventCard')
  card.style.backgroundImage = `url(${src})`
  const overlay = document.createElement('div')
  overlay.id = 'overlayBlurCard'
  cardName.textContent = eventName
  cardCity.textContent = eventCity
  infoCard.append(cardName, cardCity)

  card.append(overlay, infoCard)

  return card
}

export const eventByLocationCard = (event) => {
  const card = document.createElement('div')
  card.addEventListener('click', () => eventSelected(event))
  card.classList.add('eventByLocationCard')
  card.style.background = `
  linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)),
  url('${event.eventBgImg}')
  center/cover no-repeat
`
  const imgDiv = document.createElement('div')
  imgDiv.id = 'imgDiv'
  imgDiv.innerHTML = `
    <img src="${event.eventImg}">
  `

  const infoCard = document.createElement('div')
  infoCard.id = 'infoCard'
  const city = document.createElement('h3')
  const date = document.createElement('h5')
  const dateObj = new Date(event.date)
  date.textContent = dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  city.textContent = event.locationCity

  infoCard.append(city, date)

  card.append(imgDiv, infoCard)

  return card
}

export const attendeeCard = (attendee, numeration) => {
  const card = document.createElement('div')
  card.classList.add('attendeeCard')
  card.style.setProperty(
    '--bg-image',
    `url('${attendee.profileImg || '/images/noProfileImg.png'}')`
  )

  const imgDiv = document.createElement('div')
  imgDiv.id = 'profileImgDivCard'
  imgDiv.innerHTML = `
    <img src="${attendee.profileImg || '/images/noProfileImg.png'}">
  `
  const infoCard = document.createElement('div')
  infoCard.id = 'infoProfileCard'
  const nickName = document.createElement('h3')
  nickName.textContent = attendee.nickName

  const number = document.createElement('p')
  number.textContent = `${numeration}. `

  infoCard.append(number, nickName)

  card.append(infoCard, imgDiv)

  return card
}
