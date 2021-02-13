const mongoose = require('mongoose')

module.exports = async () => {
  await mongoose
    .connect('mongodb://localhost/ECommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log('Connected to MongoDb....'))
    .catch(() => console.log('Could not connect to Database...'))
}
