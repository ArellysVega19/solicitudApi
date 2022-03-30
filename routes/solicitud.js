const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearSolicitud,
    obtenerSolicituds,
    obtenerSolicitud,
    actualizarSolicitud,
    obtenerSolicitudRango,
    obtenerSolicitudRango1,
    borrarSolicitud } = require('../controllers/solicitud');
const { existeSolicitudPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerSolicituds);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeSolicitudPorId),
    validarCampos,
], obtenerSolicitud);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
], crearSolicitud);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeSolicitudPorId),
], actualizarSolicitud);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeSolicitudPorId),
    validarCampos,
], borrarSolicitud);


router.post('/rangofecha/filtro', obtenerSolicitudRango);
router.post('/rangofecha/aprovaal', obtenerSolicitudRango1);


module.exports = router;