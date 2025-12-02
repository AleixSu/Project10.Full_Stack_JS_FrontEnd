import { button } from '../../components/UI/button/button'
import { card } from '../../components/UI/card/card'
import { homeSrc, homeText } from '../../constants/homeConstants'
import { createCanvas } from '../../utils/functions/createCanvas'
import { navConfig } from '../../utils/functions/navConfig'
import { headerRoutes } from '../../utils/routes/routes'
import { event } from '../event/event'
import { location } from '../location/location'
import { loginRegister } from '../loginRegister/loginRegister'
import './home.css'

export const home = () => {
  window.scrollTo(0, 0)

  const section = createCanvas('home')

  const videoContainer = document.createElement('div')
  videoContainer.classList.add('video-container')

  const iframe = document.createElement('iframe')
  iframe.src = homeSrc.bgVideo

  iframe.allow = 'autoplay; encrypted-media; picture-in-picture'
  iframe.allowFullscreen = true
  iframe.title = 'home-video'

  videoContainer.appendChild(iframe)
  section.appendChild(videoContainer)

  const logoDiv = document.createElement('div')
  logoDiv.id = 'logoDiv'
  logoDiv.innerHTML = `
    <img id="logoImg" src=${homeSrc.frontPageLogo} />
    <h4>${homeText.sloganBlack}<h4  class='keyWord'>${homeText.sloganColour}</h4></h4>
  `

  const startBtn = button("Let's begin", 'startButton', 'startButton')
  startBtn.addEventListener('click', () => {
    document.getElementById('articleIntro').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
  logoDiv.append(startBtn)

  section.appendChild(logoDiv)

  const articleIntro = document.createElement('article')
  articleIntro.id = 'articleIntro'

  const title = document.createElement('h3')
  title.textContent = homeText.introTitle
  articleIntro.appendChild(title)

  const cardDiv = document.createElement('div')
  cardDiv.id = 'cardDiv'
  cardDiv.appendChild(card('Places', homeSrc.cardPlacesUrl, location))
  cardDiv.appendChild(card('Events', homeSrc.cardEventsUrl, event))
  cardDiv.appendChild(card('People', homeSrc.cardPeopleUrl))
  articleIntro.appendChild(cardDiv)

  const textDiv = document.createElement('div')
  textDiv.id = 'eventiaText'

  const p = document.createElement('p')
  p.textContent = homeText.introText
  textDiv.appendChild(p)

  articleIntro.appendChild(textDiv)

  const joinUsDiv = document.createElement('div')
  joinUsDiv.id = 'joinUs'
  joinUsDiv.innerHTML = `
    <h5>${homeText.joinUsTextBlack1}<p class='keyWord'>${homeText.joinUsTextColour}</p>${homeText.joinUsTextBlack2}</h5>
`
  articleIntro.appendChild(joinUsDiv)
  const memberDiv = document.createElement('div')
  const benefitsDiv = document.createElement('div')
  const benefitsTitle = document.createElement('h6')
  const ulBenefits = document.createElement('ul')
  const logoImgMember = document.createElement('img')

  memberDiv.id = 'memberDiv'
  benefitsDiv.id = 'benefitsDiv'
  benefitsTitle.textContent = homeText.benefitsTitle
  logoImgMember.src = homeSrc.logoImgMember

  for (const benefit of homeText.userBenefits) {
    const li = document.createElement('li')
    const p = document.createElement('p')
    p.textContent = benefit
    li.appendChild(p)
    ulBenefits.appendChild(li)
  }

  benefitsDiv.appendChild(benefitsTitle)
  benefitsDiv.appendChild(ulBenefits)
  memberDiv.appendChild(benefitsDiv)
  memberDiv.appendChild(logoImgMember)
  articleIntro.appendChild(memberDiv)
  articleIntro.appendChild(
    button('Register Now', 'registerButton', 'registerButton', (e) =>
      navConfig(e, headerRoutes[3])
    )
  )
  section.appendChild(articleIntro)

  return section
}
