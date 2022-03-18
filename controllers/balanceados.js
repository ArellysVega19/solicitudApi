const { response } = require('express');
const { Balanceado } = require('../models');


const obtenerBalanceados = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, balanceados] = await Promise.all([
        Balanceado.countDocuments(query),
        Balanceado.find(query)
            .populate('usuario', 'nombre')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        balanceados
    });
}

const obtenerBalanceado = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Balanceado.findById(id)
        .populate('usuario', 'nombre');

    res.json(categoria);

}

const crearBalanceado = async (req, res = response) => {

    const { nombre, referencia } = req.body;

    const balanceadoDB = await Balanceado.findOne({ referencia });

    if (balanceadoDB) {
        return res.status(400).json({
            msg: `La Balanceado con la referencia ${balanceadoDB.referencia}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        referencia,
        usuario: req.usuario._id
    }

    const balanceado = new Balanceado(data);

    // Guardar DB
    await balanceado.save();

    await balanceado
        .populate('usuario', 'nombre')
        .execPopulate();

    res.status(201).json(balanceado);

}

const actualizarBalanceado = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const balanceado = await Balanceado.findByIdAndUpdate(id, data, { new: true });

    res.json(balanceado);

}

const borrarBalanceado = async (req, res = response) => {

    const { id } = req.params;
    const balanceadoBorrada = await Balanceado.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(balanceadoBorrada);
}




module.exports = {
    crearBalanceado,
    obtenerBalanceados,
    obtenerBalanceado,
    actualizarBalanceado,
    borrarBalanceado
}