const { response } = require('express');
const { Cosecha } = require('../models');


const obtenerCosechas = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, cosechas] = await Promise.all([
        Cosecha.countDocuments(query),
        Cosecha.find(query)
            .populate('usuario', 'nombre')
            .populate('piscina')
            .populate('larva')
            .populate('balanceado')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        cosechas
    });
}

const obtenerCosecha = async (req, res = response) => {

    const { id } = req.params;
    const cosecha = await Cosecha.findById(id)
        .populate('usuario', 'nombre')
        .populate('piscina', 'nombre')
        .populate('balanceado', 'nombre')
        .populate('larva', 'nombre');

    res.json(cosecha);

}

const crearCosecha = async (req, res = response) => {

    const { piscina, balanceado, lorica, peso, temperatura, larva, emision } = req.body;

    // Generar la data a guardar
    const data = {
        piscina,
        balanceado,
        lorica,
        peso,
        temperatura,
        larva,
        emision,
        usuario: req.usuario._id
    }

    const cosecha = new Cosecha(data);

    // Guardar DB
    await cosecha.save();

    await cosecha
        .populate('usuario', 'nombre')
        .execPopulate();

    res.status(201).json(cosecha);

}

const actualizarCosecha = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const cosecha = await Cosecha.findByIdAndUpdate(id, data, { new: true });

    res.json(cosecha);

}

const borrarCosecha = async (req, res = response) => {

    const { id } = req.params;
    const cosechaBorrada = await Cosecha.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(cosechaBorrada);
}




module.exports = {
    crearCosecha,
    obtenerCosechas,
    obtenerCosecha,
    actualizarCosecha,
    borrarCosecha
}