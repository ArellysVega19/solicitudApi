const { Schema, model } = require('mongoose');

const AlimentacionSchema = Schema({
    registro: {
        type: String
    },
    balanceado: {
        type: Schema.Types.ObjectId,
        ref: 'Balanceado',
        required: true
    },
    piscina: {
        type: Schema.Types.ObjectId,
        ref: 'Piscina',
        required: true
    },
    frecuencia: {
        type: String
    },
    hsembradas: {
        type: String
    },
    inicio: {
        type: String
    },
    hcosechadas: {
        type: String
    },
    fin: {
        type: String
    },
    larva: {
        type: Schema.Types.ObjectId,
        ref: 'Larva',
        required: true
    },
    tipo: {
        type: String
    },
    porcentaje: {
        type: String
    },
    observacion: {
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


AlimentacionSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Alimentacion', AlimentacionSchema);
