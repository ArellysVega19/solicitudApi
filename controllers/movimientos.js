const { response } = require('express');
const Blockchain = require('../helpers/blockchain');
const { Movimiento, Block } = require('../models');

const blockchain = new Blockchain();

const obtenerMovimientos = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, Movimientos] = await Promise.all([
        Movimiento.countDocuments(query),
        Movimiento.find(query)
            .populate('usuario', 'nombre')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        Movimientos
    });
}



const crearMovimiento = async (req, res = response) => {

    const { nombre, credito } = req.body;

    const block = new Block({ data: nombre, credito: credito });
    const resp = await blockchain.addBlock(block);

    const hash = resp.hash;
    const heigth = resp.heigth;
    const body = resp.body;
    const time = resp.time;
    const previousBlockHash = resp.previousBlockHash;

    const data = {
        hash,
        heigth,
        body, time, previousBlockHash,
        usuario: req.usuario._id
    }

    const movimiento = new Movimiento(data);

    // Guardar DB
    await movimiento.save();

    await movimiento
        .populate('usuario', 'nombre')
        .execPopulate();

    res.status(201).json(movimiento);

}



const generarBlock = async (req, res = response) => {

    try {
        const { nombre, credito } = req.body;

        console.log(resp);
    } catch (error) {
        res.status(400).json(error);
    }

    res.status(201).json("OK-REGISTRO GENERADO");
}




module.exports = {
    obtenerMovimientos, crearMovimiento
}