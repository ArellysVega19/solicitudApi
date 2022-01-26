const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearMedida,
    obtenerMedidas,
    obtenerMedida,
    actualizarMedida,
    obtenerReferencia,
    borrarMedida } = require('../controllers/medidas');
const { existeMedidaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/medidas
 */

//  Obtener todas las medidas - publico
router.get('/', obtenerMedidas);

// Obtener una Medida por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeMedidaPorId),
    validarCampos,
], obtenerMedida);

// Crear Medida - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('referencia', 'El referencia es obligatorio').not().isEmpty(),
    validarCampos
], crearMedida);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('referencia', 'El referencia es obligatorio').not().isEmpty(),
    check('id').custom(existeMedidaPorId),
    validarCampos
], actualizarMedida);

// Borrar una Medida - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeMedidaPorId),
    validarCampos,
], borrarMedida);

// Obtener una Medida por referencia - publico
router.get('/find/:referencia', [
    validarCampos,
], obtenerReferencia);



module.exports = router;