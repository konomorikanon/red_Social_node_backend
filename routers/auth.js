const {Router} = require('express')
const {check } = require('express-validator')
const { postAuth, postRegister, postLoginAuth, postVerify, obtenerProfile, obtenerCover, obtenerProfileId, obtenerCoverId  } = require('../controllers/auth')
const { esEmailRepetido, verificarEmail, verificarMongoId } = require('../helpers/verificadores')
const { verificarJWT } = require('../middlewares/verificarToken')
const { verificarValues } = require('../middlewares/verificarValores')

const router = Router()

router.post('/login',[
    check('name', 'elnombre es obligatorio').notEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('email').custom(esEmailRepetido),
    check('password', 'el passowrd es de caracter obligatorio o es menor a 6').notEmpty().isLength({min: 6}),
    verificarValues


],postRegister)

router.get('/login',[
    verificarJWT,
    verificarValues
],postAuth)
router.post('/authLogin', [
    check('email', 'el email es obligatorio').isEmail(),
    check('email').custom(verificarEmail),
    check('password', 'el passowrd es de caracter obligatorio o es menor a 6').notEmpty().isLength({min: 6}),
    verificarValues
],postLoginAuth)


router.get('/loginStatus/:id', [
    check('id', 'no es id de mongo').isMongoId(),
    check('id').custom(verificarMongoId),
    verificarValues,
],postVerify)


router.get('/profile', [
    verificarJWT

], obtenerProfile )

router.get('/cover', [
    verificarJWT

], obtenerCover )

router.get('/profile/:id', [
    check('id', 'no es id de mongo').isMongoId(),
    check('id').custom(verificarMongoId),
    verificarJWT,
    verificarValues,
],obtenerProfileId)

router.get('/cover/:id', [
    check('id', 'no es id de mongo').isMongoId(),
    check('id').custom(verificarMongoId),
    verificarJWT,
    verificarValues

], obtenerCoverId )


module.exports = router