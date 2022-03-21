const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearModulo,
    obtenerModulos,
    obtenerModulo,
    actualizarModulo,
    borrarModulo } = require('../controllers/modulos');
const { existeModuloPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/modulo
 */

//  Obtener todas las modulos - publico
router.get('/', obtenerModulos);

// Obtener una modulo por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeModuloPorId),
    validarCampos,
], obtenerModulo);

// Crear modulo - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
], crearModulo);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    validarCampos
], actualizarModulo);

// Borrar una modulo - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeModuloPorId),
    validarCampos,
], borrarModulo);



module.exports = router;