const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearBalanceado,
    obtenerBalanceados,
    obtenerBalanceado,
    actualizarBalanceado,
    borrarBalanceado } = require('../controllers/balanceados');
const { existeBalanceadoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerBalanceados);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeBalanceadoPorId),
    validarCampos,
], obtenerBalanceado);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('referencia', 'El referencia es obligatorio').not().isEmpty(),
    validarCampos
], crearBalanceado);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('referencia', 'El referencia es obligatorio').not().isEmpty(),
    check('id').custom(existeBalanceadoPorId),
    validarCampos
], actualizarBalanceado);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeBalanceadoPorId),
    validarCampos,
], borrarBalanceado);



module.exports = router;