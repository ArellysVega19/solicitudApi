const { Schema, model } = require('mongoose');

const MedidadSchema = Schema({
    referencia: {
        type: String,
        required: [true, 'El referencia es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String,
        required: [true, 'El descripcion es obligatorio'],
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
    },

});


MedidadSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Medida', MedidadSchema);
