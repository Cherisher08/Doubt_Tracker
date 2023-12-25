import * as htmlComponents from './htmlComponents.js'
import * as animationFunctions from './animationFunctions.js'
import * as apiFunctions from './apiFunctions.js'
import * as loginFunctions from './loginFunctions.js'

htmlComponents.profilePictureInps.addEventListener('input', () => {
  console.log('entered')
  console.log(htmlComponents.profilePictureInps.files)
})
