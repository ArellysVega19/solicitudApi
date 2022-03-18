const { response } = require('express');
const { Piscina } = require('../models');


const obtenerPiscinas = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, piscinas] = await Promise.all([
        Piscina.countDocuments(query),
        Piscina.find(query)
            .populate('usuario', 'nombre')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        piscinas
    });
}

const obtenerPiscina = async (req, res = response) => {

    const { id } = req.params;
    const piscina = await Piscina.findById(id)
        .populate('usuario', 'nombre');

    res.json(piscina);

}

const crearPiscina = async (req, res = response) => {

    const { nombre, referencia } = req.body;

    const piscinaDB = await Piscina.findOne({ referencia });

    if (piscinaDB) {
        return res.status(400).json({
            msg: `La referenecia ${piscinaDB.referencia}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        referencia,
        usuario: req.usuario._id
    }

    const piscina = new Piscina(data);

    // Guardar DB
    await piscina.save();

    await piscina
        .populate('usuario', 'nombre')
        .execPopulate();

    res.status(201).json(piscina);

}

const actualizarPiscina = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const piscina = await Piscina.findByIdAndUpdate(id, data, { new: true });

    res.json(piscina);

}

const borrarPiscina = async (req, res = response) => {

    const { id } = req.params;
    const piscinaBorrada = await Piscina.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(piscinaBorrada);
}




module.exports = {
    crearPiscina,
    obtenerPiscinas,
    obtenerPiscina,
    actualizarPiscina,
    borrarPiscina
}