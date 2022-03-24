const { Schema, model } = require('mongoose');

const PermisoSchema = Schema({
    codigo: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    modulo: {
        type: Schema.Types.ObjectId,
        ref: 'Modulo',
        required: true
    },
    insertar: {
        type: Boolean,
        default: false,
    },
    consultar: {
        type: Boolean,
        default: false,
    },
    anular: {
        type: Boolean,
        default: false,
    },
    actualizar: {
        type: Boolean,
        default: false,
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


PermisoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Permiso', PermisoSchema);
