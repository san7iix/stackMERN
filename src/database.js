const mongoose = require('mongoose')
const URI = 'mongodb://localhost/mern-tasks'
mongoose.connect(URI)
  .then(db => console.log('Se conecto a la base de datos'))
  .catch(err => console.log(err))


module.exports = mongoose
