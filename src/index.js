const express = require('express')
const morgan = require('morgan');
const app = express()

let PORT =3000

app.set('port',process.env.PORT || PORT)
app.use(morgan('dev'))
// Configuracion


// Middlewares

// Rutas

// Static files

// Server init
app.listen(app.get('port'),()=>{
  console.log(`Servidor en el puerto ${app.get('port')}`);
})
