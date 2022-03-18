const { response } = require('express');
const { Insumo } = require('../models');


const obtenerInsumos = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, insumos] = await Promise.all([
        Insumo.countDocuments(query),
        Insumo.find(query)
            .populate('usuario', 'nombre')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        insumos
    });
}

const obtenerInsumo = async (req, res = response) => {

    const { id } = req.params;
    const insumo = await Insumo.findById(id)
        .populate('usuario', 'nombre');

    res.json(insumo);

}

const crearInsumo = async (req, res = response) => {

    const { nombre, referencia } = req.body;

    const insumoDB = await Insumo.findOne({ nombre });

    if (insumoDB) {
        return res.status(400).json({
            msg: `La insumo ${insumoDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        referencia,
        usuario: req.usuario._id
    }

    const insumo = new Insumo(data);

    // Guardar DB
    await insumo.save();

    await insumo
        .populate('usuario', 'nombre')
        .execPopulate();

    res.status(201).json(insumo);

}

const actualizarInsumo = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const insumo = await Insumo.findByIdAndUpdate(id, data, { new: true });

    res.json(insumo);

}

const borrarInsumo = async (req, res = response) => {

    const { id } = req.params;
    const insumoBorrada = await Insumo.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(insumoBorrada);
}




module.exports = {
    crearInsumo,
    obtenerInsumos,
    obtenerInsumo,
    actualizarInsumo,
    borrarInsumo
}