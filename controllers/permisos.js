const { response } = require('express');
const { Permiso } = require('../models');


const obtenerPermisos = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, permisos] = await Promise.all([
        Permiso.countDocuments(query),
        Permiso.find(query)
            .populate('usuario', 'nombre')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        permisos
    });
}

const obtenerPermiso = async (req, res = response) => {

    const { id } = req.params;
    const permiso = await Permiso.findById(id)
        .populate('usuario', 'nombre');

    res.json(permiso);

}

const crearPermiso = async (req, res = response) => {

    const { codigo, modulo, insertar, consultar, actualizar, anular } = req.body;

    const permisoDB = await Permiso.findOne({ codigo, modulo });

    if (permisoDB) {
        return res.status(400).json({
            msg: `Permiso repetido ${permisoDB.modulo}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        codigo,
        modulo,
        insertar,
        consultar,
        actualizar,
        anular,
        usuario: req.usuario._id
    }

    const permiso = new Permiso(data);

    // Guardar DB
    await permiso.save();

    await permiso
        .populate('usuario', 'nombre')
        .execPopulate();

    res.status(201).json(permiso);

}

const actualizarPermiso = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const permiso = await Permiso.findByIdAndUpdate(id, data, { new: true });

    res.json(permiso);

}

const borrarPermiso = async (req, res = response) => {

    const { id } = req.params;
    const permisoBorrado = await Permiso.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(permisoBorrado);
}




module.exports = {
    crearPermiso,
    obtenerPermisos,
    obtenerPermiso,
    actualizarPermiso,
    borrarPermiso
}