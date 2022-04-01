const { response } = require('express');
const Blockchain = require('../helpers/blockchain');
const { Categoria, Block } = require('../models');
const { where } = require('../models/categoria');


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


const presentarModulo = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.find({ nombre: id });

    console.log(categoria.length);
    const blockchain = new Blockchain();

    categoria.forEach(async (e) => {
        const block = new Block({ data: e.nombre, credito: e.credito });
        await blockchain.addBlock(block);
        console.log(block.toString());
    });

    //await blockchain.addBlock(block);

    res.status(201).json("Ok Cadena creada");
}




module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
    presentarModulo,
    obtenerCategoriasUsuario
}