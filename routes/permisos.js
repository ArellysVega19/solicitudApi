const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearPermiso,
    crearPermisRol,
    obtenerPermisos,
    obtenerPermisosUsuario,
    obtenerPermiso,
    actualizarPermiso,
    borrarPermiso } = require('../controllers/permisos');
const { existePermisoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/permiso
 */

//  Obtener todas las permisos - publico
router.get('/', obtenerPermisos);

// Obtener una permiso por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existePermisoPorId),
    validarCampos,
], obtenerPermiso);

// Obtener una permiso por usuario - publico
router.get('/getUsuario/:codigo', [
], obtenerPermisosUsuario);

// Crear permiso - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
], crearPermiso);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    validarCampos
], actualizarPermiso);

// Borrar una permiso - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existePermisoPorId),
    validarCampos,
], borrarPermiso);

// Crear permiso - privado - cualquier persona con un token válido
router.post('/roles', [
    validarJWT,
], crearPermisRol);




module.exports = router;