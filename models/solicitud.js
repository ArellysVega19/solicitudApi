const { Schema, model } = require('mongoose');

const SolicitudSchema = Schema({
    fecha: {
        type: Date,
        default: new Date()
    },
    balanceado: {
        type: Schema.Types.ObjectId,
        ref: 'Balanceado',
        required: true
    },
    observacion: {
        type: String,
    },
    insumo: {
        type: Schema.Types.ObjectId,
        ref: 'Insumo',
        required: true
    },
    cantidad: {
        type: String,
    },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: true
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


SolicitudSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Solicitud', SolicitudSchema);
