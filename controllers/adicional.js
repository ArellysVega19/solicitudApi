const { response } = require('express');
const { Adicional } = require('../models');


const obtenerAdicionals = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, adicionales] = await Promise.all([
        Adicional.countDocuments(query),
        Adicional.find(query)
            .populate('usuario', 'nombre')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        adicionales
    });
}

const obtenerAdicional = async (req, res = response) => {

    const { id } = req.params;
    const adicional = await Adicional.findById(id)
        .populate('usuario', 'nombre');

    res.json(adicional);

}

const crearAdicional = async (req, res = response) => {

    const { apellido, profesion, sangre, telefono, edad, fecha, identificacion, genero, usuario } = req.body;

    // Generar la data a guardar
    const data = {
        apellido,
        profesion,
        sangre,
        telefono,
        edad,
        fecha,
        identificacion,
        genero,
        usuario
    }

    const adicional = new Adicional(data);

    // Guardar DB
    await adicional.save();

    await adicional
        .populate('usuario', 'nombre')
        .execPopulate();

    res.status(201).json(adicional);

}

const actualizarAdicional = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const adicional = await Adicional.findByIdAndUpdate(id, data, { new: true });

    res.json(adicional);

}

const borrarAdicional = async (req, res = response) => {

    const { id } = req.params;
    const adicionalBorrada = await Adicional.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(adicionalBorrada);
}




module.exports = {
    crearAdicional,
    obtenerAdicionals,
    obtenerAdicional,
    actualizarAdicional,
    borrarAdicional
}