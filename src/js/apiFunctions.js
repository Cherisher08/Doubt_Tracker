/**
 *
 * @param inputFieldValues
 */
export async function postSignInData (inputFieldValues) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const fetchBody = {
    userEmail: inputFieldValues[0],
    password: inputFieldValues[1]
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(fetchBody),
    redirect: 'follow'
  }

  const fetchData = await fetch('/user-login', requestOptions)
    .then((response) => { return response.json() })
    .catch(error => console.log('error', error))
  return (fetchData)
}

/**
 *
 * @param inputFieldValues
 */
export async function postSignUpData (inputFieldValues) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const fetchBody = {
    name: inputFieldValues[0],
    userEmail: inputFieldValues[1],
    password: inputFieldValues[2],
    accountType: inputFieldValues[3],
    department: inputFieldValues[4]
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(fetchBody),
    redirect: 'follow'
  }

  const fetchData = await fetch('/user-register', requestOptions)
    .then((response) => { return response.json() })
    .catch(error => console.log('error', error))
  return (fetchData)
}

/**
 *
 */
export function redirectToInternPage () {
  window.location.assign('http://localhost:5002/intern')
}

/**
 *
 */
export function redirectToDashboardPage () {
  window.location.assign('http://localhost:5002/dashboard')
}
