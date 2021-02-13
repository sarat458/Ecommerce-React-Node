const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Joi = require('joi')
const profiles = require('./Routes/profiles')
const users = require('./Routes/users')
const connectMongo = require('./mongo')

//CONNECTING TO MONGODB
connectMongo()

//ROUTES
app.use(express.json())
app.use('/api/profiles', profiles)
app.use('/api/users', users)

// SETING PORT DETAILS
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port:${port}`)
})
