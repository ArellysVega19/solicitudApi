const { Schema, model } = require('mongoose');

const PermisoSchema = Schema({
    codigo: {
        type: String,
        required: [true, 'El codigo es obligatorio']
    },
    modulo: {
        type: Schema.Types.ObjectId,
        ref: 'Modulo',
        required: true
    },
    insertar: {
        type: String
    },
    consultar: {
        type: String
    },
    anular: {
        type: String
    },
    actualizar: {
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


PermisoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Permiso', PermisoSchema);
