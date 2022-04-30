const {Router} = require('express')
const { check } = require('express-validator')
const { solicitudPost, solicitudRemoveSol, solicitudSend, solicitudSendPost, solicitudSendPut, solicitudGetSolicitud, solicitudGetSolicitudId, solicitudupdatedAccept, obtenerUnaSolicitud, deleteSolicitud } = require('../controllers/solicitud')
const { verificarMongoId, verificarSolicitud } = require('../helpers/verificadores')
const { verificarJWT } = require('../middlewares/verificarToken')
const { verificarValues } = require('../middlewares/verificarValores')
const router = Router()

router.get('/:id', [
   check("id", "no es id de mongo").isMongoId(),
   check('id').custom(verificarMongoId),
   verificarJWT,
   verificarValues,
], solicitudPost)


router.get('/friend/:id', [
    check("id", "no es id de mongo").isMongoId(),
    check('id').custom(verificarMongoId),
    verificarJWT,
    verificarValues,
 ], solicitudGetSolicitud)
 
 router.get('/solicitud/:id', [
    check("id", "no es id de mongo").isMongoId(),
    check('id').custom(verificarSolicitud),
    verificarJWT,
    verificarValues,
 ], solicitudGetSolicitudId)

 

router.put('/removeSolicitud/:id', [
    check("id", "no es id de mongo").isMongoId(),
    check('id').custom(verificarSolicitud),
    verificarJWT,
    verificarValues,
 ], solicitudRemoveSol)

 router.post('/sendSolicitud', [
    check('uid', 'el id de tu amigo es obligatorio').isMongoId(),
    check('uid').custom(verificarMongoId),
    verificarJWT,
    verificarValues,
 ], solicitudSendPost)


 router.put('/sendSolicitud/:id', [
    check("id", "no es id de mongo").isMongoId(),
    check('id').custom(verificarSolicitud),
    check('uid', 'el id de tu amigo es obligatorio').isMongoId(),
    check('uid').custom(verificarMongoId),
    verificarJWT,
    verificarValues,
 ], solicitudSendPut)

// aceptar solicitud

router.put('/solicitud/:id', [
   check("id", "no es id de mongo").isMongoId(),
   check('id').custom(verificarSolicitud),
   verificarJWT,
   verificarValues,
], solicitudupdatedAccept)

router.get('/', [
   verificarJWT,

], obtenerUnaSolicitud)

router.delete('/:id', [
   check("id", "no es id de mongo").isMongoId(),
   check('id').custom(verificarSolicitud),
   verificarJWT,

], deleteSolicitud)


module.exports = router
