const { response } = require('express');
const { Permiso } = require('../models');


const obtenerPermisos = async (req, res = response) => {

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, permisos] = await Promise.all([
        Permiso.countDocuments(query),
        Permiso.find(query)
            .populate('usuario', 'nombre')
            .populate('codigo', 'nombre')
            .populate('modulo', 'nombre')
        // .skip( Number( desde ) )
        // .limit(Number( limite ))
    ]);

    res.json({
        total,
        permisos
    });
}


const obtenerPermisosUsuario = async (req, res = response) => {

    const { codigo } = req.params;

    // const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true, codigo: codigo };

    const [total, permisos] = await Promise.all([
        Permiso.countDocuments(query),
        Permiso.find(query)
            .populate('usuario', 'nombre')
            .populate('codigo', 'nombre')
            .populate('modulo')
        //.populate({ path: 'modulo', select: ['_id', 'nombre', "clase", "ruta", "indice", "observacion"] })
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
        .populate('codigo', 'nombre')
        .populate('modulo')
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


const crearPermisRol = async (req, res = response) => {

    const { codigo, rol } = req.body;

    let permisoBiologo = ["623863af7896622bbc26da7c", "623863d77896622bbc26da7d", "623863e87896622bbc26da7e", "623863f87896622bbc26da7f"]
    let permisoAdministrado = ["623863af7896622bbc26da7c", "6238640e7896622bbc26da80", "623864c87896622bbc26da81", "62412398069efc476c5bcb38", "624123b4069efc476c5bcb39",
        "624123e8069efc476c5bcb3b", "6244411a69d9345848a7eb08"];
    let permisoAgente = ["624123b4069efc476c5bcb39", "624123cb069efc476c5bcb3a"];

    console.log(rol);

    if (rol == "BIÓLOGO") {

        permisoBiologo.forEach(async function (elemento, indice, array) {
            // Generar la data a guardar
            var modulo = elemento;
            const data = {
                codigo,
                modulo,
                usuario: req.usuario._id
            }

            var permiso = new Permiso(data);
            // Guardar DB
            await permiso.save();
        })

    } else if (rol == "ADMINISTRADOR") {

        permisoAdministrado.forEach(async function (elemento, indice, array) {
            // Generar la data a guardar
            var modulo = elemento;
            const data = {
                codigo,
                modulo,
                usuario: req.usuario._id
            }

            var permiso = new Permiso(data);
            // Guardar DB
            await permiso.save();
        })


    } else if (rol == "AGENTE DE CONTROL") {

        permisoAgente.forEach(async function (elemento, indice, array) {
            // Generar la data a guardar
            var modulo = elemento;
            const data = {
                codigo,
                modulo,
                usuario: req.usuario._id
            }

            var permiso = new Permiso(data);
            // Guardar DB
            await permiso.save();
        })

    } else if (rol == "DIRECTOR") {

        permisoAdministrado.forEach(async function (elemento, indice, array) {
            // Generar la data a guardar
            var modulo = elemento;
            const data = {
                codigo,
                modulo,
                usuario: req.usuario._id
            }

            var permiso = new Permiso(data);
            // Guardar DB
            await permiso.save();
        })

    }





    /*     else if (rol == "director")
            permisoBilogo.forEach(function (elemento, indice, array) {
                // Generar la data a guardar
                const data = {
                    codigo,
                    elemento,
                    usuario: req.usuario._id
                }
    
                const permiso = new Permiso(data);
    
                // Guardar DB
                await permiso.save();
            })
        else
            return res.status(400).json({
                msg: `Ocurrio un error`
            }); */

    res.status(201).json(true);

}



module.exports = {
    crearPermiso,
    obtenerPermisos,
    obtenerPermiso,
    actualizarPermiso,
    borrarPermiso,
    obtenerPermisosUsuario,
    crearPermisRol
}