import { headerElements } from './htmlComponents.js'

headerElements.forEach((element, index) => {
  element.addEventListener('click', () => {
    const isActive = element.classList.contains('active')
    const otherElementIndex = parseInt(index) === 0 ? 1 : 0
    if (!isActive) {
      element.classList.add('active')
      headerElements[parseInt(otherElementIndex)].classList.remove('active')
    }
  })
})
