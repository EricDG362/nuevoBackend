const mongoose = require ('mongoose')

require('dotenv').config({ path: 'variables.env'})


const conectarDB = async () => {

try {
await mongoose.connect(process.env.DB_MONGO) //si esto es correcto entonmnces se va a ejecutar lo de abajo

console.log('DB_conectada')

    
} catch (error) {
    console.log('hubo un eror en la conexion', error)
    process.exit(1) //detener la app
}


}

module.exports = conectarDB 