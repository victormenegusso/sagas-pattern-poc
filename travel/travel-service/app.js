const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

// APIs
const airline_base = 'http://airline-app:7070/'
const hotel_base = 'http://hotel-booking-app:7171/'
const car_base = 'http://car-rental-app:7272/'
const credit_base = 'http://credit-app-app:7178/'

// Middlewares
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())

server.post('/travel', async function (req, res) {
    
    const idTicket = req.body.idTicket
    const idRoom = req.body.idRoom
    const idCar = req.body.idCar
    const idAccount = req.body.idAccount

    console.log(`${idRoom} -- ${idTicket} -- ${idCar} -- ${idAccount}`)

    // air line
    const r = await axios.post(`${airline_base}buy`, {'ticket_id':idTicket})
        .then(response => {
            console.log(response.data)
            return true
        })
        .catch(error => {
            console.log(error)
            return false
        })
    
    if(!r) {
        res.status(400).send('falha ao reservar o ticket')
        return
    }

    // room
    const r2 = await axios.post(`${hotel_base}buy`, {'room_id':idRoom})
    .then(response => {
        console.log(response.data)
        return true
    })
    .catch(error => {
        console.log(error)
        // cancela o air line
        axios.post(`${airline_base}buy/undo`, {'ticket_id':idTicket})
        return false
    })
    
    if(!r2) {
        res.status(400).send('falha ao reservar o hotel')
        return
    }

    res.status(200).send({idRoom, idTicket, idCar, idAccount})
})

// Start Server
server.listen(8080)