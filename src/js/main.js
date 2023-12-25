import * as htmlComponents from './htmlComponents.js'
import * as animationFunctions from './animationFunctions.js'
import * as apiFunctions from './apiFunctions.js'
import * as loginFunctions from './loginFunctions.js'

htmlComponents.signInLink.addEventListener('click', () => {
  htmlComponents.headerElements[0].click()
})

htmlComponents.signUpInputs[1].addEventListener('change', () => {
  const validationResult = loginFunctions.validateEmail(htmlComponents.signUpInputs[1])
  if (validationResult === false) {
    htmlComponents.signUpInputs[1].focus()
  }
})

htmlComponents.signInInputs[0].addEventListener('change', () => {
  const validationResult = loginFunctions.validateEmail(htmlComponents.signInInputs[0])
  if (validationResult === false) {
    htmlComponents.signInInputs[0].focus()
  }
})

htmlComponents.signUpInputs[3].addEventListener('change', () => {
  if (htmlComponents.signUpInputs[3].value === 'intern') {
    htmlComponents.signUpInputs[4].value = ''
    loginFunctions.displayDepartmentField(htmlComponents.departmentSelectFields)
  } else {
    htmlComponents.signUpInputs[4].innerHTML = 'nil'
    loginFunctions.hideDepartmentField(htmlComponents.departmentSelectFields)
  }
})

htmlComponents.signUpLink.addEventListener('click', () => {
  htmlComponents.headerElements[1].click()
})

htmlComponents.signInButton.addEventListener('click', async () => {
  const serverResponse = await loginFunctions.signInHandler(htmlComponents.signInInputs)
  handleServerResponse(serverResponse)
})

htmlComponents.signUpButton.addEventListener('click', async () => {
  const serverResponse = await loginFunctions.signUpHandler(htmlComponents.signUpInputs)
  handleServerResponse(serverResponse)
})

/**
 *
 * @param serverResponse
 */
function handleServerResponse (serverResponse) {
  switch (serverResponse) {
    case 'email-error':
      htmlComponents.errorColumns[0].classList.add('display-error')
      break
    case 'intern':
      htmlComponents.errorColumns[0].classList.remove('display-error')
      apiFunctions.redirectToInternPage()
      break
    case 'l&d':
      htmlComponents.errorColumns[0].classList.remove('display-error')
      apiFunctions.redirectToDashboardPage()
      break
  }
}
