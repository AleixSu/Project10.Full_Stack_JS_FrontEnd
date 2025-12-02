export const createCanvas = (id) => {
  const main = document.querySelector('main')
  const section = document.createElement('section')

  main.innerHTML = ''
  section.id = id

  main.appendChild(section)
  return section
}

export const overlayCanvas = (id) => {
  const main = document.querySelector('main')
  const section = document.createElement('section')
  section.id = id
  main.append(section)
  return section
}
