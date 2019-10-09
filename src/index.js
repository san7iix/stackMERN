const express = require('express')
const morgan = require('morgan')
const path = require('path')
const { mongoose } = require('./database')
const app = express()
var cors = require('cors')


let PORT =3000

// Configuracion
app.set('port',process.env.PORT || PORT)
app.use(cors())
// Middlewares
app.use(morgan('dev'))
app.use(express.json())
// Rutas
app.use('/api/tasks', require('./routes/task.routes'))

// Static files
app.use(express.static(path.join(__dirname,'app/build')))

// Server init
app.listen(app.get('port'),()=>{
  console.log(`Servidor en el puerto ${app.get('port')}`);
})
