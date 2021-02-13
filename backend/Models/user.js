const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

const User = new mongoose.model('User', userSchema)

//Input validation using JOI
function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    isAdmin: Joi.boolean().default(false),
  })
  return schema.validate(user)
}

exports.User = User
exports.validate = validate
