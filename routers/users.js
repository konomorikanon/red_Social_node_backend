const {Router} = require('express');
const { check } = require('express-validator');
const {obtenerTodosLosUsuarios, obtenerUsuarioId} = require('../controllers/usuarios');
const { verificarMongoId } = require('../helpers/verificadores');
const { verificarJWT } = require('../middlewares/verificarToken');
const { verificarValues } = require('../middlewares/verificarValores');

const router = Router();

router.get('/', [
    verificarJWT

],obtenerTodosLosUsuarios )

router.get('/:id' ,[
    check('id').isMongoId(),
    check('id').custom(verificarMongoId),
    verificarValues,
    verificarJWT
], obtenerUsuarioId)



module.exports = router
