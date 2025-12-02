import { API } from '../api/api'

export const updateInfo = async (e, currentUser) => {
  e.preventDefault()
  const [
    nameInput,
    firstSurnameInput,
    secondSurnameInput,
    nickNameInput,
    locationInput,
    emailInput,
    birthDateInput,
    genderInput,
    profileImgInput
  ] = e.target

  const formData = new FormData()

  formData.append('name', nameInput.value)
  formData.append('frstSurname', firstSurnameInput.value)
  formData.append('scndSurname', secondSurnameInput.value)
  formData.append('nickName', nickNameInput.value)
  formData.append('location', locationInput.value)
  formData.append('email', emailInput.value)
  formData.append('birthDate', birthDateInput.value)
  formData.append('gender', genderInput.value)
  formData.append('profileImg', profileImgInput.files[0])

  const res = await API({
    endpoint: `/users/${currentUser._id}`,
    body: formData,
    method: 'PATCH',
    isJSON: false,
    token: localStorage.getItem('token')
  })
}
