const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearProveedor,
    obtenerProveedores,
    obtenerProveedor,
    actualizarProveedor,
    borrarProveedor } = require('../controllers/proveedores');
const { existeProveedorPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/Proveedors
 */

//  Obtener todas las Proveedors - publico

router.get('/', obtenerProveedores);

//¿ Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProveedorPorId),
    validarCampos,
], obtenerProveedor);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearProveedor);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProveedorPorId),
    validarCampos
], actualizarProveedor);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProveedorPorId),
    validarCampos,
], borrarProveedor);



module.exports = router;