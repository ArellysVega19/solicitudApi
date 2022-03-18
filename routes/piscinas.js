const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearPiscina,
    obtenerPiscinas,
    obtenerPiscina,
    actualizarPiscina,
    borrarPiscina } = require('../controllers/piscinas');
const { existePiscinaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/piscinas
 */

//  Obtener todas las piscinas - publico
router.get('/', obtenerPiscinas);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existePiscinaPorId),
    validarCampos,
], obtenerPiscina);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearPiscina);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existePiscinaPorId),
    validarCampos
], actualizarPiscina);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existePiscinaPorId),
    validarCampos,
], borrarPiscina);



module.exports = router;