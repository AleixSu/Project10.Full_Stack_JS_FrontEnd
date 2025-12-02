export const loadingLocations = (citiesDiv) => {
  citiesDiv.innerHTML = ''

  for (let i = 0; i < 10; i++) {
    citiesDiv.innerHTML += `
            <div class="skeleton">

            </div>
        `
  }
}
export const loadingEvents = (eventsDiv) => {
  eventsDiv.innerHTML = ''

  for (let i = 0; i < 10; i++) {
    eventsDiv.innerHTML += `
            <div class="skeleton">

            </div>
        `
  }
}
