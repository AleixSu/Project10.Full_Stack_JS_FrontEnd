import { button } from '../../components/UI/button/button'
import { myProfileSrc } from '../../constants/myProfileConstants'
import { currentUser } from '../../state/userState'
import { create } from '../../utils/domCreators/createElement'
import { createInput } from '../../utils/domCreators/createInput'
import { createSelect } from '../../utils/domCreators/createSelect'
import { createCanvas } from '../../utils/functions/createCanvas'
import { updateInfo } from '../../utils/functions/updatePersonalInfo'
import './myProfile.css'

export const myProfilePage = () => {
  window.scrollTo(0, 0)
  const section = createCanvas('profile')

  const background = document.createElement('div')
  background.id = 'background'

  const logoDiv = document.createElement('div')
  logoDiv.id = 'logoProfileDiv'
  logoDiv.innerHTML = `<img src=${myProfileSrc.logoBanner} />`
  section.appendChild(logoDiv)

  const articleProfileInfo = document.createElement('article')
  articleProfileInfo.id = 'articleProfileInfo'

  const mainDiv = create('form', { id: 'updInfoForm' })

  const accountHeader = create('div', { id: 'accountHeader' }, [
    create('h3', { textContent: 'Personal information' })
  ])

  const accountInfo = create('div', { id: 'accountInfo' })

  const rowElement1 = create('div', { className: 'row_element' }, [
    createInput('name', 'Nombre', 'text', 'formName', 'Name', currentUser.name),
    createInput(
      'frstSurname',
      'First surname',
      'text',
      'formName',
      'First surname',
      currentUser.frstSurname
    ),
    createInput(
      'scndSurname',
      'Second surname',
      'text',
      'formName',
      'Second surname',
      currentUser.scndSurname
    )
  ])
  const rowElement2 = create('div', { className: 'row_element' }, [
    createInput(
      'nickName',
      'Username',
      'text',
      'formLocation',
      'User name',
      currentUser.nickName
    ),
    createInput(
      'inputLocation',
      'Address',
      'text',
      'formLocation',
      'Address',
      currentUser.location
    )
  ])

  const rowElement3 = create('div', { className: 'row_element' }, [
    createInput(
      'email',
      'E-Mail',
      'text',
      'formEmail',
      'email',
      currentUser.email
    )
  ])

  const value = currentUser.birthDate ? currentUser.birthDate.split('T')[0] : ''

  const rowElement4 = create('div', { className: 'row_element' }, [
    createInput('birthDate', 'Date of Birth', 'date', 'formBirth', '', value),
    createSelect(
      'gender',
      'Género',
      [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
        { value: "Don't want to say", text: "Don't want to say" }
      ],
      'formGender',
      currentUser.gender
    )
  ])

  accountInfo.appendChild(rowElement1)
  accountInfo.appendChild(rowElement2)
  accountInfo.appendChild(rowElement3)
  accountInfo.appendChild(rowElement4)

  const accountMain = create('div', { id: 'accountMain' }, [accountInfo])

  const profileImgDiv = create('div', { id: 'profileImgDiv' }, [
    create('img', {
      src: currentUser.profileImg || '/images/noProfileImgPage.png',
      alt: ''
    }),
    createInput('profileImgInput', 'Change profile picture', 'file')
  ])

  const saveButtonDiv = create('div', { id: 'saveButtonDiv' }, [
    button('Save Changes', 'saveChangesButton', 'saveChangesButton')
  ])

  mainDiv.appendChild(accountHeader)
  mainDiv.appendChild(accountMain)
  mainDiv.appendChild(profileImgDiv)

  articleProfileInfo.appendChild(mainDiv)

  section.append(background)
  section.append(articleProfileInfo)
  const updInfoForm = document.getElementById('updInfoForm')
  updInfoForm.addEventListener('submit', (e) => {
    updateInfo(e, currentUser)
  })
  updInfoForm.append(saveButtonDiv)
  return section
}
