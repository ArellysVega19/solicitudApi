const { response } = require('express');
const Blockchain = require('../helpers/blockchain');
const { Solicitud, Block } = require('../models');



const obtenerSolicituds = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, solicituds] = await Promise.all([
        Solicitud.countDocuments(query),
        Solicitud.find(query)
            .populate('usuario', 'nombre')
            .populate('balanceado')
            .populate('insumo')
            .populate('proveedor')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        solicituds
    });
}

const obtenerSolicitudRango = async (req, res = response) => {

    const { fechaInicial, fechaFinal } = req.body;
    const query = { estado: true };


    const [total, solicituds] = await Promise.all([
        Solicitud.countDocuments(query),
        Solicitud.find({
            "observacion": {
                $eq: "P"
            },
            $and: [
                { fecha: { $gte: new Date(fechaInicial) } },
                { fecha: { $lte: new Date(fechaFinal) } }
            ]
        })
            .populate('usuario', 'nombre')
            .populate('balanceado')
            .populate('insumo')
            .populate('proveedor')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        solicituds
    });
}

const obtenerSolicitudRango1 = async (req, res = response) => {

    const { fechaInicial, fechaFinal } = req.body;
    const query = { estado: true };


    const [total, solicituds] = await Promise.all([
        Solicitud.countDocuments(query),
        Solicitud.find({
            "observacion": {
                $eq: "A"
            },
            $and: [
                { fecha: { $gte: new Date(fechaInicial) } },
                { fecha: { $lte: new Date(fechaFinal) } }
            ]
        })
            .populate('usuario', 'nombre')
            .populate('balanceado')
            .populate('insumo')
            .populate('proveedor')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        solicituds
    });
}

const obtenerSolicitud = async (req, res = response) => {

    const { id } = req.params;
    const solicitud = await Solicitud.findById(id)
        .populate('usuario', 'nombre');

    res.json(solicitud);

}

const crearSolicitud = async (req, res = response) => {

    const { fecha, balanceado, observacion, insumo, cantidad, proveedor } = req.body;

    // Generar la data a guardar
    const data = {
        fecha,
        balanceado,
        observacion,
        insumo,
        cantidad,
        proveedor,
        usuario: req.usuario._id
    }

    const solicitud = new Solicitud(data);

    // Guardar DB
    await solicitud.save();

    await solicitud
        .populate('usuario', 'nombre')
        .populate('balanceado')
        .populate('insumo')
        .populate('proveedor')
        .execPopulate();

    res.status(201).json(solicitud);

}

const actualizarSolicitud = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const solicitud = await Solicitud.findByIdAndUpdate(id, data, { new: true });

    res.json(solicitud);

}

const borrarSolicitud = async (req, res = response) => {

    const { id } = req.params;
    const solicitudBorrada = await Solicitud.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(solicitudBorrada);
}




module.exports = {
    crearSolicitud,
    obtenerSolicituds,
    obtenerSolicitud,
    actualizarSolicitud,
    borrarSolicitud,
    obtenerSolicitudRango,
    obtenerSolicitudRango1
}