const mongoose = require('mongoose')

const ProcedimientosSchema = new mongoose.Schema({


    sumario: {
        type: String,
        required: true, //obligatorio
        trim: true, //sin espacios

    },

    proce: {
        type: String,
        required: true, //obligatorio


    },

    fecha:{
        type: Date,
        required: true
    },

    creador: {
        type: mongoose.Schema.Types.ObjectId,//esto va a venir de la base de dattos
        ref: 'Usuario'  //esta referencvia viene o tiene q tomarla de usuario.js del export module
    },

    creado: {
        type: Date,
        default: Date.now()
    }




})

const Procedimientos = mongoose.model('Procedimientos', ProcedimientosSchema)

module.exports = Procedimientos;