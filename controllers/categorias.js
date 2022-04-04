const { response } = require('express');
const Blockchain = require('../helpers/blockchain');
const { Categoria, Block } = require('../models');

const blockchain = new Blockchain();

const obtenerCategorias = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        categorias
    });
}

const obtenerCategoriasUsuario = async (req, res = response) => {

    const { id } = req.params;
    const query = { estado: true, nombre: id };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).sort({ $natural: -1 }).limit(1)
            .populate('usuario', 'nombre')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        categorias
    });
}

const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findOne({ estado: true, nombre: id }).sort({ $natural: -1 }).limit(1)
        .populate('usuario', 'nombre');

    res.json(categoria);

}

const crearCategoria = async (req, res = response) => {

    const { nombre, credito } = req.body;

    const data = {
        nombre,
        credito,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    // Guardar DB
    await categoria.save();

    await categoria
        .populate('usuario', 'nombre')
        .execPopulate();

    res.status(201).json(categoria);

}

const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);

}

const borrarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json(categoriaBorrada);
}


const generarBlock = async (req, res = response) => {

    try {
        const { nombre, credito } = req.body;
        const block = new Block({ data: nombre, credito: credito });
        const resp = await blockchain.addBlock(block);
        console.log(resp);
    } catch (error) {
        res.status(400).json(error);
    }

    res.status(201).json("OK-REGISTRO GENERADO");
}




module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
    generarBlock,
    obtenerCategoriasUsuario
}