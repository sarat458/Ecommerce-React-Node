const mongoose = require('mongoose')
const Joi = require('joi')

const profileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  job: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  organisation: {
    type: String,
    min: 3,
    max: 20,
  },
  phone: Number,
})

const Profile = new mongoose.model('Profile', profileSchema)

//Input validation using JOI
function validate(profile) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    job: Joi.string().min(3).max(50).required(),
    organisation: Joi.string().min(3).max(20),
    phone: Joi.number(),
  })
  return schema.validate(profile)
}

exports.Profile = Profile
exports.validate = validate
