const {Router } = require('express');
const { check } = require('express-validator');
const { postNotification, notificacionRemove, getNotificacionAll, notificactionUpdatedAll, notificactionUpdated, getNotificacion } = require('../controllers/notificaciones');
const { verificarMongoId, verificarNofications } = require('../helpers/verificadores');
const { verificarJWT } = require('../middlewares/verificarToken');
const { verificarValues } = require('../middlewares/verificarValores');
const router = Router();



// vamos a separar las peticiones este es de

// colocamos al usuario que necesitamos 
// generales
router.post('/', [
    check('idUser', 'se necesita un id de usuario').isMongoId(),
    check('idUser').custom(verificarMongoId),
    check('role').notEmpty(), 
    verificarValues,
    verificarJWT,
], postNotification)


// solicitud
// verificamos el id del usuario
router.delete('/solicitud/:id', [
    check('id', 'se necesita un id de usuario').isMongoId(),
    check('id').custom(verificarMongoId),
    verificarValues,
    verificarJWT,
], notificacionRemove)

router.get('/', [
    verificarJWT,
], getNotificacionAll )

router.get('/:id', [
    check('id', 'no es id de mongo').isMongoId(),
    check('id').custom(verificarNofications),
    verificarJWT,
], getNotificacion )

// actualizar las notificaciones de la vista
router.put('/',[
    verificarJWT
], notificactionUpdatedAll)

// actualizar si entró y vió la notificación 
router.put('/:id', [
    check('id', 'no es mongodb').isMongoId(),
    check('id').custom(verificarNofications),
    verificarValues,
    verificarJWT
], notificactionUpdated )



module.exports = router;