const { Schema, model } = require('mongoose');

const MovimientoSchema = Schema({
    hash: {
        type: String
    },
    heigth: {
        type: String,
    },
    body: {
        type: String,
    },
    time: {
        type: String,
    },
    previousBlockHash: {
        type: String,
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


MovimientoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Movimiento', MovimientoSchema);
