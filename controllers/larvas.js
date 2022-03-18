const { response } = require('express');
const { Larva } = require('../models');


const obtenerLarvas = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, larvas] = await Promise.all([
        Larva.countDocuments(query),
        Larva.find(query)
            .populate('usuario', 'nombre')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        larvas
    });
}

const obtenerLarva = async (req, res = response) => {

    const { id } = req.params;
    const larva = await Larva.findById(id)
        .populate('usuario', 'nombre');

    res.json(larva);

}

const crearLarva = async (req, res = response) => {

    const { nombre, referencia } = req.body;

    const larvaDB = await Larva.findOne({ referencia });

    if (larvaDB) {
        return res.status(400).json({
            msg: `La categoria ${larvaDB.referencia}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        referencia,
        usuario: req.usuario._id
    }

    const larva = new Larva(data);

    // Guardar DB
    await larva.save();

    await larva
        .populate('usuario', 'nombre')
        .execPopulate();

    res.status(201).json(larva);

}

const actualizarLarva = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const larva = await Larva.findByIdAndUpdate(id, data, { new: true });

    res.json(larva);

}

const borrarLarva = async (req, res = response) => {

    const { id } = req.params;
    const larvaBorrada = await Larva.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(larvaBorrada);
}




module.exports = {
    crearLarva,
    obtenerLarvas,
    obtenerLarva,
    actualizarLarva,
    borrarLarva
}