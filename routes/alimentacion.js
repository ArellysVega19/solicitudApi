const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearAlimentacion,
    obtenerAlimentacions,
    obtenerAlimentacion,
    actualizarAlimentacion,
    obtenerAlimentacionPiscina,
    borrarAlimentacion } = require('../controllers/alimentacion');
const { existeAlimentacionPorId, existePiscinaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerAlimentacions);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeAlimentacionPorId),
    validarCampos,
], obtenerAlimentacion);

// Obtener una categoria por id - publico
router.get('/piscina/:id', obtenerAlimentacionPiscina);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
], crearAlimentacion);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeAlimentacionPorId),
    validarCampos
], actualizarAlimentacion);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeAlimentacionPorId),
    validarCampos,
], borrarAlimentacion);



module.exports = router;