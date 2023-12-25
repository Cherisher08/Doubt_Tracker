const express = require('express')
const path = require('path')
const { writeFile, readFileSync } = require('fs')
const defaultPath = './src/db/index.json'
const app = express()
const router = express.Router()

app.use(express.static(path.join(__dirname, '/src')))
app.use(express.static(__dirname))
app.use(express.json())

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/login.html'))
})

router.get('/intern', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/intern.html'))
})

router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/dashboard.html'))
})

// app.get('/load-initial-data', (req, res) => {
//   let parsedData = {}
//   const fileData = readFileSync(defaultPath, 'utf-8')
//   parsedData = JSON.parse(fileData)
//   console.log(fileData, parsedData)
//   res.json(parsedData)
// })

app.post('/user-register', (req, res) => {
  const postData = req.body
  let responseResult = false
  const data = readFileSync(defaultPath, { encoding: 'utf8', flag: 'r' })
  let parsedData
  try {
    parsedData = JSON.parse(data)
  } catch (err) {
    parsedData = {}
  } finally {
    for (const i in parsedData) {
      if (i === postData.userEmail) {
        responseResult = 'email-error'
      }
    }
    if (responseResult !== 'email-error') {
      parsedData[postData.userEmail] = postData
      if (postData.accountType === 'intern') { responseResult = 'intern' } else {
        responseResult = 'l&d'
      }
    }
    writeFile(defaultPath, JSON.stringify(parsedData, null, 2), (error) => {
      if (error) {
        console.log('An error has occurred ', error)
        return
      }
      console.log('Data written successfully to disk')
    })
  }
  res.json(responseResult)
})

app.post('/user-login', (req, res) => {
  const postData = req.body
  let responseResult = false
  const data = readFileSync(defaultPath, { encoding: 'utf8', flag: 'r' })
  let parsedData = {}
  try {
    parsedData = JSON.parse(data)
    if (parsedData[postData.userEmail] !== undefined) {
      if (parsedData[postData.userEmail].password === postData.password) {
        responseResult = parsedData[postData.userEmail].accountType
      }
    }
  } catch (err) {
    parsedData = {}
  }
  console.log(responseResult)
  res.json(responseResult)
})

app.use('/', router)

const port = 5002
app.listen(port, function (err) {
  if (err) console.log(err)
  console.log(`Server listening on PORT http://localhost:${port}`)
})
