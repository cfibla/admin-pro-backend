const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }

});

UsuarioSchema.method('toJSON', function() {
    // Separa "__v", "_id" y "password" del objeto de usuario
    const { __v, _id, password, ...object } = this.toObject();

    // Cambia el nombre de la propiedad "_id" por "uid"
    // No afecta a la DB. Es solo visual
    object.uid = _id;

    return object;
});

module.exports = model('Usuario', UsuarioSchema);