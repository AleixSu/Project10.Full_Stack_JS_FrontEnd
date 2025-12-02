import './searchBox.css'

export const searchBox = () => {
  const searchBox = document.createElement('div')
  searchBox.innerHTML = `
  <div class="searchBar">
      <input class="searchInput"type="text" name="" placeholder="Search">
      <button class="searchButton" href="#">
          <img class="searchIcon" src="./images/searchIcon.png">
      </button>
        </div>
  `

  return searchBox
}
