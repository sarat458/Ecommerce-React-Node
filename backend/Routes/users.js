const express = require('express')
const app = express()
const Joi = require('joi')
const { User, validate } = require('../Models/user')

app.get('/', async (req, res) => {
  const users = await User.find().sort('name')
  res.send(users)
})

app.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).send('USER NOT FOUND')

  res.send(user)
})

app.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  })

  await user.save()
  res.send(user)
})

module.exports = app
