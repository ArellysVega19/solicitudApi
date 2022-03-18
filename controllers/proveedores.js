
const { response } = require('express');
const { Proveedor } = require('../models');


const obtenerProveedores = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, proveedores] = await Promise.all([
        Proveedor.countDocuments(query),
        Proveedor.find(query)
            .populate('usuario', 'nombre')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        proveedores
    });
}

const obtenerProveedor = async (req, res = response) => {

    const { id } = req.params;
    const proveedor = await Proveedor.findById(id)
        .populate('usuario', 'nombre');

    res.json(proveedor);

}

const crearProveedor = async (req, res = response) => {

    const { nombre, referencia } = req.body;

    const proveedorDB = await Proveedor.findOne({ nombre });

    if (proveedorDB) {
        return res.status(400).json({
            msg: `La proveedor ${proveedorDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        referencia,
        usuario: req.usuario._id
    }

    const proveedor = new Proveedor(data);

    // Guardar DB
    await proveedor.save();

    await proveedor
        .populate('usuario', 'nombre')
        .execPopulate();

    res.status(201).json(proveedor);

}

const actualizarProveedor = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const proveedor = await Proveedor.findByIdAndUpdate(id, data, { new: true });

    res.json(proveedor);

}

const borrarProveedor = async (req, res = response) => {

    const { id } = req.params;
    const proveedorBorrada = await Proveedor.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(proveedorBorrada);
}




module.exports = {
    crearProveedor,
    obtenerProveedores,
    obtenerProveedor,
    actualizarProveedor,
    borrarProveedor
}