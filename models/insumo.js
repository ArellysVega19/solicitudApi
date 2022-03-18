const { Schema, model } = require('mongoose');

const InsumoSchema = Schema({
    nombre: {
        type: String
    },
    referencia: {
        type: String,
        required: [true, 'Referencia es obligatorio'],
        unique: true
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


InsumoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Insumo', InsumoSchema);
