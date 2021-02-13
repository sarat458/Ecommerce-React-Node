const express = require('express')
const app = express()
const Joi = require('joi')
const { Profile, validate } = require('../Models/profile')

app.get('/', async (req, res) => {
  const profiles = await Profile.find().sort('name')
  res.send(profiles)
})

app.get('/:id', async (req, res) => {
  const profile = await Profile.findById(req.params.id)
  
  if (!profile)
    return res
      .status(404)
      .send(`PROFILE WITH THE GIVEN ID:${req.params.id} NOT FOUND`)

  res.send(profile)
})

app.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const profile = new Profile({
    name: req.body.name,
    job: req.body.job,
    organisation: req.body.organisation,
    phone: req.body.phone,
  })

  await profile.save()

  res.send(profile)
})

app.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const profile = await Profile.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    job: req.body.job,
    organisation: req.body.organisation,
    phone: req.body.phone,
  })
  if (!profile) return res.status(404).send('profile NOT AVAILABLE')
  await profile.save()
  res.send(profile)
})

app.delete('/:id', async(req, res) => {
  const profile = await Profile.findByIdAndRemove(req.params.id)
  
  if (!profile)
    return res
      .status(404)
      .send(`profile WITH GIVEN ID:${req.params.id} NOT AVAILABLE`)

  res.send(profile)
})

module.exports = app
