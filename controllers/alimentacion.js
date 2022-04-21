const { response } = require('express');
const { Alimentacion } = require('../models');


const obtenerAlimentacions = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, alimentacions] = await Promise.all([
        Alimentacion.countDocuments(query),
        Alimentacion.find(query)
            .populate('usuario', 'nombre')
            .populate('piscina')
            .populate('larva')
            .populate('balanceado')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        alimentacions
    });
}

const obtenerAlimentacion = async (req, res = response) => {

    const { id } = req.params;
    const alimentacion = await Alimentacion.findById(id)
        .populate('usuario', 'nombre')
        .populate('piscina')
        .populate('larva')
        .populate('balanceado');

    res.json(alimentacion);

}

const obtenerAlimentacionPiscina = async (req, res = response) => {
    const total = 0;
    const { id } = req.params;
    const alimentacions = await Alimentacion.find({ piscina: id, estado: true }).sort({ registro: 1 })
        .populate('usuario', 'nombre')
        .populate('piscina')
        .populate('larva')
        .populate('balanceado');

    res.json({
        total,
        alimentacions
    });
}

const crearAlimentacion = async (req, res = response) => {

    const { registro, balanceado, piscina, frecuencia, hsembradas, inicio, hcosechadas,
        fin, larva, tipo, porcentaje, observacion } = req.body;

    // Generar la data a guardar
    const data = {
        registro,
        balanceado,
        piscina,
        frecuencia,
        hsembradas,
        inicio,
        hcosechadas,
        fin,
        larva,
        tipo,
        porcentaje,
        observacion,
        usuario: req.usuario._id
    }

    const alimentacion = new Alimentacion(data);

    // Guardar DB
    await alimentacion.save();

    await alimentacion
        .populate('usuario', 'nombre')
        .populate('piscina')
        .populate('larva')
        .populate('balanceado')
        .execPopulate();

    res.status(201).json(alimentacion);

}

const actualizarAlimentacion = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const alimentacion = await Alimentacion.findByIdAndUpdate(id, data, { new: true });

    res.json(alimentacion);

}

const borrarAlimentacion = async (req, res = response) => {

    const { id } = req.params;
    const alimentacionBorrada = await Alimentacion.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(alimentacionBorrada);
}




module.exports = {
    crearAlimentacion,
    obtenerAlimentacions,
    obtenerAlimentacion,
    actualizarAlimentacion,
    borrarAlimentacion,
    obtenerAlimentacionPiscina
}