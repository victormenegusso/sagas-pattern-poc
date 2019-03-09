const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

// Database
mongoose.Promise = global.Promise

// /db/ -> service in docker compose
mongoose.connect('mongodb://credit-db/mydb')

// Middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

// ODM
const Client = restful.model('Account', {
    clientName: { type: String, required: true },
    maxCreditAllowed: { type: Number, required: true },
    creditUsed: { type: Number, required: true },
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

// Routes
Client.register(server, '/credit')

server.post('/charge', function (req, res) {
    const clientAccount = mongoose.model('Account')
    clientAccount.findOne({_id: req.body.acc_id}, (err, account) => {
        if (!account) {
          res.status(404).send({'status':'error'})
          return
        }

        const totalCreditToBeUsed = req.chargeAmount + account.creditUsed
        if (totalCreditToBeUsed > account.maxCreditAllowed) {
          res.status(403).send({'status':'error', 'message': `Total credit to be used: ${totalCreditToBeUsed}; Total limit: ${account.maxCreditAllowed}`})
          return
        }

        account.creditUsed = totalCreditToBeUsed
        account.save()
        res.status(202).send(car)
    })
})

// Start Server
const port = 7178
console.log(`INITIALIZING CREDIT-SERVICE ON PORT ${port}`)
server.listen(port)