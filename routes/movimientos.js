const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearMovimiento, obtenerMovimientos } = require('../controllers/movimientos');

const router = Router();

/**
 * {{url}}/api/movimiento
 */

//  Obtener todas las movimiento - publico
router.get('/', obtenerMovimientos);

// Crear movimiento - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT
], crearMovimiento);


module.exports = router;