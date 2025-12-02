import { API } from '../../../utils/api/api'
import { create } from '../../../utils/domCreators/createElement'
import { createInput } from '../../../utils/domCreators/createInput'
import { locationsSelect } from '../../../utils/domCreators/createSelect'
import { uploadNewEvent } from '../../../utils/functions/uploadNewEvent'
import { button } from '../../UI/button/button'
import './createEventForm.css'

export const createEventForm = async (fatherElement) => {
  const createEventH3 = create('h3', {
    id: 'createEventH3',
    textContent: 'Create New Event'
  })
  const eventInputsDiv = create('div', { id: 'eventInputDiv' }, [createEventH3])
  const createEventForm = create('form', {
    id: 'createEventForm',
    className: 'createEventForm'
  })
  const rowEventElement1 = create('div', { className: 'row_element_admin' }, [
    createInput(
      'eventName',
      'Event Name',
      'text',
      'formEventName',
      'eventName',
      null
    ),
    createInput('date', 'Event Date', 'date', 'formDate', '')
  ])

  const locationSelect = await locationsSelect()
  const rowEventElement2 = create('div', { className: 'row_element_admin' }, [
    locationSelect,
    createInput(
      'locationCity',
      'City',
      'text',
      'formCityLocation',
      'City',
      null
    ),
    createInput(
      'maxCapacity',
      'Capacity',
      'number',
      'formCapacity',
      'Capacity',
      null
    )
  ])

  const rowEventElement3 = create(
    'div',
    { id: 'imagesDivCreateEvent', className: 'row_element_admin' },
    [
      createInput('eventImg', 'Choose an image for the event', 'file'),
      createInput('eventBgImg', 'Chose an image for the background', 'file')
    ]
  )

  const rowEventElement4 = create('div', { className: 'row_element_admin' }, [
    create('textarea', {
      name: 'description',
      id: 'formDescription',
      placeholder: 'Description',
      rows: 8
    })
  ])

  // Contenedor de error
  const errorMessageEventDiv = create('div', {
    id: 'errorMessageEventDiv',
    className: 'errorMessageEventDiv'
  })

  // Botón de cerrar
  const buttonDiv = create('div', { id: 'buttonDiv' }, [
    button('X', 'closeErrorWindow', 'closeErrorWindow')
  ])
  const h6Error = create('h6', { id: 'errorMessageEvent' })

  errorMessageEventDiv.append(buttonDiv, h6Error)

  // Listener del botón cerrar
  const closeBtn = buttonDiv.querySelector('#closeErrorWindow')
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault() // Evitamos que se envíe el submit
    errorMessageEventDiv.classList.remove('visible')
  })

  const createEventButtonDiv = create('div', { id: 'createEventButtonDiv' }, [
    button('Create Event', 'createEventButton', 'createEventButton')
  ])

  createEventForm.append(
    rowEventElement1,
    rowEventElement2,
    rowEventElement3,
    rowEventElement4,
    createEventButtonDiv,
    errorMessageEventDiv
  )

  createEventForm.addEventListener('submit', (e) => {
    uploadNewEvent(e)
  })
  eventInputsDiv.append(createEventForm)

  fatherElement.append(eventInputsDiv)

  createEventH3.addEventListener('click', () => {
    createEventForm.classList.toggle('hiddenForm')
  })
}
