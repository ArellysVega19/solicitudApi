const { response } = require('express');
const { Medida } = require('../models');


const obtenerMedidas = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, medidas] = await Promise.all([
        Medida.countDocuments(query),
        Medida.find(query)
            .populate('usuario', 'referencia')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        medidas
    });
}

const obtenerMedida = async (req, res = response) => {

    const { id } = req.params;
    const medida = await Medida.findById(id)
        .populate('usuario', 'referencia');

    res.json(medida);

}

const crearMedida = async (req, res = response) => {

    const { referencia, descripcion } = req.body;

    const medidaDB = await Medida.findOne({ referencia });

    if (medidaDB) {
        return res.status(400).json({
            msg: `La referencia ${medidaDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        referencia,
        descripcion,
        usuario: req.usuario._id
    }

    const medida = new Medida(data);

    // Guardar DB
    await medida.save();

    await medida
        .populate('usuario', 'referencia')
        .execPopulate();

    res.status(201).json(medida);

}

const obtenerReferencia = async (req, res = response) => {
    const { referencia } = req.params;
    const medida = await Medida.findOne({ referencia });

    if (medida) {
        return res.status(200).json({
            medida
        });

    } else {
        return res.status(400).json({
            msg: `La referencia ${medida.nombre}, ya existe`
        });
    }

}


const actualizarMedida = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const medida = await Medida.findByIdAndUpdate(id, data, { new: true });

    res.json(medida);

}

const borrarMedida = async (req, res = response) => {

    const { id } = req.params;
    const medidaBorrada = await Medida.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(medidaBorrada);
}




module.exports = {
    crearMedida,
    obtenerMedidas,
    obtenerMedida,
    actualizarMedida,
    borrarMedida,
    obtenerReferencia
}