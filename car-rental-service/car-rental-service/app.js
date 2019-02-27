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
const Client = restful.model('Car', {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    qttTotal: { type: Number, required: true },
    qttRented: { type: Number, required: true },
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/cars')

server.post('/rent', function (req, res) {
    const carModel = mongoose.model('Car')
    carModel.findOne({_id: req.body.car_id}, (err, car) => {
        if (!car) {
            res.send({'status':'error'})
            return
        }
        
        if (car.qttRented > 0) car.qttRented -= 1
        car.save()
        res.send(car)
    })
})

server.post('/rent/undo', function (req, res) {
  const carModel = mongoose.model('Car')
  carModel.findOne({_id: req.body.car_id}, (err, car) => {
      if (!car) {
          res.send({'status':'error'})
          return
      }
      
      if (car.qttRented > car.qttTotal) car.qttTotal += 1
      car.save()
      res.send(car)
  })
})

// Start Server
const port = 7171
console.log(`INITIALIZING CAR SERVICE ON PORT ${port}`)
server.listen(port)