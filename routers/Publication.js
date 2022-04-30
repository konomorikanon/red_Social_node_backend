const {Router} = require('express');
const { check } = require('express-validator');
const { verificarJWT } = require('../middlewares/verificarToken');
const { verificarValues } = require('../middlewares/verificarValores');
const { postPublication, obtenerPublicacionProfile, actualizarPublicacion, postTextPublication, actualizarPublicacionText, deletePublicacion, obtenerPaginationProfile, obtenerPublicacionID } = require('../controllers/publication');
const { verificarpublicationId, verificarReact, verificarMongoId } = require('../helpers/verificadores');
const { reaction, reactionPut, reactionAll } = require('../controllers/reaction');
const { obtenerProfileId } = require('../controllers/auth');

const router = Router();


router.post('/', [

    verificarJWT,
    verificarValues,
],postPublication)

router.post('/pubText', [
    check('description', 'la descripcion es de caracter obligatorio').notEmpty(),
    verificarJWT,
    verificarValues,
],postTextPublication)

router.get('/profile', [
    verificarJWT,
    verificarValues,
],obtenerPublicacionProfile)

router.get('/profile/:id', [
    check('id', 'no es id de mongo').isMongoId(),
    check('id').custom(verificarMongoId),
    verificarJWT,
    verificarValues,
],obtenerPublicacionID)

router.put('/:id', [
    check('id', 'no es id de mongo').isMongoId(),
    check('id').custom(verificarpublicationId),
    verificarJWT,
    verificarValues,
],actualizarPublicacion)

router.put('/pubText/:id', [
    check('description', 'la descripcion es de caracter obligatorio').notEmpty(),
    check('id', 'no es id de mongo').isMongoId(),
    check('id').custom(verificarpublicationId),
    verificarJWT,
    verificarValues,
],actualizarPublicacionText)

router.delete('/:id', [
    check('id', 'no es id de mongo').isMongoId(),
    check('id').custom(verificarpublicationId),
    verificarJWT,
    verificarValues,
],deletePublicacion)

router.get("/react/:id", [
    check('id', 'no es id de mongo').isMongoId(),
    check('id').custom(verificarpublicationId),
    verificarJWT,
    verificarValues
], reaction)


router.get("/reaction/:id", [
    check('id', 'no es id de mongo').isMongoId(),
    check('id').custom(verificarReact),
    verificarJWT,
    verificarValues
], reactionPut)

router.get('/paginationProfile', [

    verificarJWT,
],obtenerPaginationProfile)


router.get('/reactPub/:id', [
    check('id', 'no es id de mongo').isMongoId(),
    check('id').custom(verificarReact),
    verificarJWT,
],reactionAll)






 
module.exports = router;