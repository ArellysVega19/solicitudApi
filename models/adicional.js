const { Schema, model } = require('mongoose');

const AdicionalSchema = Schema({
    apellido: {
        type: String
    },
    profesion: {
        type: String
    },
    sangre: {
        type: String
    },
    telefono: {
        type: String
    },
    edad: {
        type: String
    },
    fecha: {
        type: String
    },
    identificacion: {
        type: String
    },
    genero: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


AdicionalSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Adicional', AdicionalSchema);
