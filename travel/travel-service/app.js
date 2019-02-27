const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

// APIs
const airline_base = 'http://localhost:7070/tickets'
const hotel_base = 'http://localhost:7171/rooms'
const car_base = 'http://localhost:7272/'

// Middlewares
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())

server.get('/', async function (req, res) {
    console.log('TESTE ORQUESTRACAO')

    // air line
    const r = await axios.get(airline_base)
        .then(response => {
            console.log(response.data)
            return true
        })
        .catch(error => {
            console.log(error)
            return false
        })
    console.log('ae')
    console.log(r)

    // air line
    const r2 = await axios.get(hotel_base)
        .then(response => {
            console.log(response.data)
            return true
        })
        .catch(error => {
            console.log(error)
            return false
        })
    console.log(r2)
})

// Start Server
server.listen(8080)