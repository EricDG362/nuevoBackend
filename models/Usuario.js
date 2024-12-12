const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true, // Corregido de "require" a "required"
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    registro: {
        type: Date,
        default: Date.now,
    },
});

// Crear el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportar el modelo
module.exports = Usuario;