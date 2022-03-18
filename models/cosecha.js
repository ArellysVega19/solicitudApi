const { Schema, model } = require('mongoose');

const CosechaSchema = Schema({
    piscina: {
        type: Schema.Types.ObjectId,
        ref: 'Piscina',
        required: true
    },
    balanceado: {
        type: Schema.Types.ObjectId,
        ref: 'Balanceado',
        required: true
    },
    lorica: {
        type: String
    },
    peso: {
        type: String
    },
    temperatura: {
        type: String
    },
    larva: {
        type: Schema.Types.ObjectId,
        ref: 'Larva',
        required: true
    },
    emision: {
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


CosechaSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Cosecha', CosechaSchema);
