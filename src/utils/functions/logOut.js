export const logOut = () => {
  console.log('Logged Out')
  localStorage.removeItem('token')
  window.location.reload()
}
