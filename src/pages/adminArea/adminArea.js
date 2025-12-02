import { createEventForm } from '../../components/Forms/adminForms/createEventForm'
import { createLocationForm } from '../../components/Forms/adminForms/createLocationForm'
import { adminAreaSrc } from '../../constants/adminAreaConstants'
import { create } from '../../utils/domCreators/createElement'
import { createCanvas } from '../../utils/functions/createCanvas'
import './adminArea.css'

export const adminArea = async () => {
  const section = createCanvas('adminArea')

  const backgroundAdmin = document.createElement('div')
  backgroundAdmin.id = 'backgroundAdminArea'
  backgroundAdmin.style.setProperty(
    '--bg-imageAdmin',
    `url('${adminAreaSrc.bgImage}')`
  )

  const logoDiv = document.createElement('div')
  logoDiv.id = 'logoAdminDiv'
  logoDiv.innerHTML = `<img src="${adminAreaSrc.logoBanner}" />`

  section.append(backgroundAdmin)
  section.append(logoDiv)

  const articleAdminArea = document.createElement('article')
  articleAdminArea.id = 'articleAdminArea'

  const adminAreaDiv = create('div', { id: 'adminAreaDiv' }, [
    create('h2', { textContent: 'Admin Area' })
  ])
  const formsDiv = create('div', { id: 'formsDiv' })

  adminAreaDiv.append(formsDiv)
  createLocationForm(formsDiv)
  await createEventForm(formsDiv)
  articleAdminArea.append(adminAreaDiv)
  section.append(articleAdminArea)

  return section
}
