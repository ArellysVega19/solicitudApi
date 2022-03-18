const { Schema, model } = require('mongoose');

const LarvaSchema = Schema({
    nombre: {
        type: String
    },
    referencia: {
        type: String,
        required: [true, 'La referencia es obligatorio'],
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


LarvaSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}


module.exports = model('Larva', LarvaSchema);
