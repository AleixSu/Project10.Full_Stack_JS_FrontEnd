import { create } from '../../../utils/domCreators/createElement'
import { createInput } from '../../../utils/domCreators/createInput'
import { uploadNewLocation } from '../../../utils/functions/uploadNewLocation'
import { button } from '../../UI/button/button'
import './createLocationForm.css'

export const createLocationForm = (fatherElement) => {
  const createLocationH3 = create('h3', {
    id: 'createLocationH3',
    textContent: 'Create New Location'
  })

  const locationInputsDiv = create('div', { id: 'locationInputDiv' }, [
    createLocationH3
  ])

  const createLocationForm = create('form', {
    id: 'createLocationForm',
    className: 'createLocationForm'
  })

  const rowLocationElement1 = create(
    'div',
    { className: 'row_element_admin' },
    [createInput('country', 'Country', 'text', 'formCountry', '', null)]
  )

  const rowLocationElement2 = create(
    'div',
    { className: 'row_element_admin' },
    [
      createInput(
        'locationImg',
        'Choose an image for the location',
        'file',
        'locationImgForm'
      )
    ]
  )

  const errorMessageDiv = create('div', {
    id: 'errorMessageDiv',
    className: 'errorMessageDiv'
  })

  const buttonDiv = create('div', { id: 'buttonDiv' }, [
    button('X', 'closeErrorWindow', 'closeErrorWindow')
  ])
  const h6Error = create('h6', { id: 'errorMessage' })

  errorMessageDiv.append(buttonDiv, h6Error)

  const closeBtn = buttonDiv.querySelector('#closeErrorWindow')
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault() // Evitamos que se envíe el submit
    errorMessageDiv.classList.remove('visible')
  })

  const createLocationButtonDiv = create(
    'div',
    { id: 'createLocationButtonDiv' },
    [button('Create Location', 'createLocationButton', 'createLocationButton')]
  )

  createLocationForm.append(
    rowLocationElement1,
    rowLocationElement2,
    createLocationButtonDiv,
    errorMessageDiv
  )

  createLocationForm.addEventListener('submit', (e) => {
    uploadNewLocation(e)
  })

  locationInputsDiv.append(createLocationForm)
  fatherElement.append(locationInputsDiv)

  createLocationH3.addEventListener('click', () => {
    createLocationForm.classList.toggle('hiddenForm')
  })
}

//Conseguido a través de claude. Con un e.preventDefault evitamos que se active el submit. Ocurria que al estar dentro del form entendia el botón como si tuviera que hacer submit y volvia a darse el error porque country sigue vacío. U
