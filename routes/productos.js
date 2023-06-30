const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");
const { crearCategoria, obtenerCategorias, obtenerCategoria, borrarCategoria, actualizarCategoria } = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");


const router = Router();


//obtener todos los productos (publico)
/* router.get('/', obtenerCategorias)
 */
//obtener una categoría en particular
/* router.get('/:id', [
    check('id', 'No es un Id de mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria) */

//crear producto - privado - cualquier persona con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//actualizar categoría por id - privado con token valido
/* router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria) */

//delete categoria - solo Admin
/* router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria) */

module.exports = router;
