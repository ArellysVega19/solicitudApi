const Role = require('../models/role');
const { Usuario, Categoria, Producto, Medida, Larva, Balanceado,
    Cosecha, Piscina, Insumo, Proveedor, Alimentacion, Permiso, Modulo } = require('../models');

const esRoleValido = async (rol = 'USER_ROLE') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
}

const existeUsuarioPorId = async (id) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

/**
 * Categorias
 */
const existeCategoriaPorId = async (id) => {

    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
}

/**
 * Productos
 */
const existeProductoPorId = async (id) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * Medidas
 */
const existeMedidaPorId = async (id) => {

    // Verificar si el correo existe
    const existeMedida = await Medida.findById(id);
    if (!existeMedida) {
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * Larva
 */
const existeLarvaPorId = async (id) => {

    // Verificar si el correo existe
    const exiteLarva = await Larva.findById(id);
    if (!exiteLarva) {
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * Balanceado
 */
const existeBalanceadoPorId = async (id) => {

    // Verificar si el correo existe
    const exiteBalanceado = await Balanceado.findById(id);
    if (!exiteBalanceado) {
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * Cosecha
 */
const existeCosechaPorId = async (id) => {

    // Verificar si el correo existe
    const existeCosecha = await Cosecha.findById(id);
    if (!existeCosecha) {
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * Cosecha
 */
const existePiscinaPorId = async (id) => {

    // Verificar si el correo existe
    const existePiscina = await Piscina.findById(id);
    if (!existePiscina) {
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * PROVEEDOR
 */
const existeProveedorPorId = async (id) => {

    // Verificar si el correo existe
    const existeProveedor = await Proveedor.findById(id);
    if (!existeProveedor) {
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * Cosecha
 */
const existeSolicitudPorId = async (id) => {

    // Verificar si el correo existe
    const existeSolicitud = await Solicitud.findById(id);
    if (!existeSolicitud) {
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * Cosecha
 */
const existeInsumoPorId = async (id) => {

    // Verificar si el correo existe
    const existeInsumo = await Insumo.findById(id);
    if (!existeInsumo) {
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * Permiso
 */
const existePermisoPorId = async (id) => {

    // Verificar si el correo existe
    const exitePermiso = await Permiso.findById(id);
    if (!exitePermiso) {
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * Permiso
 */
const existeModuloPorId = async (id) => {

    // Verificar si el correo existe
    const exiteModulo = await Modulo.findById(id);
    if (!exiteModulo) {
        throw new Error(`El id no existe ${id}`);
    }
}
/**
 * Cosecha
 */
const existeAlimentacionPorId = async (id) => {

    // Verificar si el correo existe
    const exiteAlimentacion = await Alimentacion.findById(id);
    if (!exiteAlimentacion) {
        throw new Error(`El id no existe ${id}`);
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas,
    existeMedidaPorId,
    existeLarvaPorId,
    existeBalanceadoPorId,
    existeCosechaPorId,
    existePiscinaPorId,
    existeInsumoPorId,
    existeSolicitudPorId,
    existeAlimentacionPorId,
    existePermisoPorId,
    existeModuloPorId

}

