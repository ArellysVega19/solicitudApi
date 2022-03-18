const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearCosecha,
    obtenerCosechas,
    obtenerCosecha,
    actualizarCosecha,
    borrarCosecha } = require('../controllers/cosechas');
const { existeCosechaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerCosechas);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCosechaPorId),
    validarCampos,
], obtenerCosecha);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT
], crearCosecha);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeCosechaPorId),
    validarCampos
], actualizarCosecha);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCosechaPorId),
    validarCampos,
], borrarCosecha);



module.exports = router;