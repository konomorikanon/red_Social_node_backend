const Notification = require("../models/Notification")
const Publication = require("../models/Publication")
const Reaccion = require("../models/Reaccion")
const Solicitud = require("../models/Solicitud")
const User = require("../models/User")

const esEmailRepetido = async(email) => {

    const model = await  User.findOne({email})

    if (model) {
        throw new Error('el email no debe ser repetido')
        
    }


}


const verificarEmail = async(email) => {
    const model = await  User.findOne({email})
    if (!model) {
        throw new Error('el email es incorrecto')   
    }

}

const verificarMongoId = async(id) => {
    const model = await  User.findById(id)
    if (!model) {
        throw new Error('no existe el id del usuario')   
    }

}

const verificarpublicationId = async(id) => {
    const model = await  Publication.findById(id)
    if (!model) {
        throw new Error('no existe el id del usuario')   
    }


}

const verificarReact = async(id) => {
    const model = await  Reaccion.findById(id)
    if (!model) {
        throw new Error('no existe el id del usuario')   
    }


}

const verificarSolicitud = async(id) => {
    const model = await  Solicitud.findById(id)
    if (!model) {
        throw new Error('no existe el id del usuario')   
    }


}


const verificarNofications = async(id) => {
    const model = await  Notification.findById(id)
    if (!model) {
        throw new Error('no existe el id del usuario')   
    }


}


module.exports = {
    esEmailRepetido,
    verificarEmail,
    verificarMongoId,
    verificarNofications,
    verificarpublicationId,
    verificarSolicitud,
    verificarReact,
}