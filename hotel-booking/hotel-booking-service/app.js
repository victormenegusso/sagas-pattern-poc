const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

// Database
mongoose.Promise = global.Promise

// /db/ -> service in docker compose
mongoose.connect('mongodb://db/mydb')

// Middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

// ODM
const Client = restful.model('Room', {
    hotelName: { type: String, required: true },
    roomName: { type: String, required: true },
    description: { type: String, required: true },
    available: { type: Boolean, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/rooms')

server.post('/buy', function (req, res) {
    const roomModel = mongoose.model('Room')
    roomModel.findOne({_id: req.body.room_id}, (err,room) => {
        if(room == undefined) {
            res.send({'status':'error'})
            return
        }

        room.available = false
        room.save()
        res.send(room)
    })
})

server.post('/buy/undo', function (req, res) {
    const roomModel = mongoose.model('Room')
    roomModel.findOne({_id: req.body.room_id}, (err,room) => {
        if(room == undefined) {
            res.send({'status':'error'})
            return
        }

        room.available = true
        room.save()
        res.send(room)
    })
})

// Start Server
console.log('INIT 2')
server.listen(7171)