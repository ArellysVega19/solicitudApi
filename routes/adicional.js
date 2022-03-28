const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearAdicional,
    obtenerAdicionals,
    obtenerAdicional,
    actualizarAdicional,
    borrarAdicional } = require('../controllers/adicional');
const { existeAdicionalPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/adicional
 */

//  Obtener todas las adicionales - publico
router.get('/', obtenerAdicionals);

// Obtener una adicional por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeAdicionalPorId),
    validarCampos,
], obtenerAdicional);

// Crear adicional - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
], crearAdicional);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeAdicionalPorId),
], actualizarAdicional);

// Borrar una adicional - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeAdicionalPorId),
    validarCampos,
], borrarAdicional);



module.exports = router;