const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearLarva,
    obtenerLarvas,
    obtenerLarva,
    actualizarLarva,
    borrarLarva } = require('../controllers/larvas');
const { existeLarvaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/larvas
 */

//  Obtener todas las larvas - publico
router.get('/', obtenerLarvas);

// Obtener una larva por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeLarvaPorId),
    validarCampos,
], obtenerLarva);

// Crear larva - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('referencia', 'El referencia es obligatorio').not().isEmpty(),
    validarCampos
], crearLarva);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('referencia', 'El referencia es obligatorio').not().isEmpty(),
    check('id').custom(existeLarvaPorId),
    validarCampos
], actualizarLarva);

// Borrar una larva - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeLarvaPorId),
    validarCampos,
], borrarLarva);



module.exports = router;