const { Schema, model } = require('mongoose');
// const { collection } = require('./usuario');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'hospitales' });

HospitalSchema.method('toJSON', function() {
    // Separa "__v" del objeto "hospital"
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model('Hospital', HospitalSchema);