const { response } = require("express");
const notification = require("../models/Notification");
const User = require("../models/User");

const verificarRole = [
    "SOLICITUD",

]

const getNotificacionAll = async(req, res = response) => {
    const {_id}  = req.usuario;

    const [models, count ] = await Promise.all([
        notification.find({idUserNotification : _id}),
        notification.find({idUserNotification : _id, leido : false }).count()
    ])

    res.json({
        models, count
    })


}

const getNotificacion = async(req, res = response) => {
    const {id} = req.params

    const notificacion = await  notification.findById(id)
 

    res.json({
        notificacion
    })


} 
const postNotification = async(req, res = response) => {

    const {idUser, role} = req.body;
    const {_id} = req.usuario;
    if(!verificarRole.includes(role)){
        return res.status(401).json({
            msg : "el rol no es valido"
        })
        
    }
   const notificacion = new notification()
    // aqui vamos a verficar los casos para enviar la notificacion
    switch (role) {
        case "SOLICITUD":
            const model = await User.findById(idUser)
            if (!model.status) {
                return res.status(401).json({
                    msg : "el usuario no existe"
                })
                
            }
            notificacion.idUserNotification = _id;
            notificacion.notification = `la persona ${model.name} te a enviado una solicitud de amistad`
            notificacion.urlLink = "/friends"
            notificacion.idUser = idUser
            notificacion.date = new Date();
            notificacion.role = "SOLICITUD";
            
            break;
        
        default:
            break;
    }

    await notificacion.save();

    res.json({
        notificacion
    })

}
// vamos a remover la notificacion de un usuario
const notificacionRemove = async(req, res = response) => {
    const {_id} = req.usuario
    const {id} = req.params

    
    const model = await notification.findOneAndDelete({
        idUser : id,
        idUserNotification : _id
    });

    res.json({
        model
    })



}

const notificactionUpdatedAll = async(req, res) => {

    const {_id} = req.usuario;
    console.log(_id , 87);

    const updated = await notification.updateMany({
        idUserNotification : _id,

    }, {
        leido : true 
    })
    const models= await notification.find({
        idUserNotification : _id,
    })

    res.json({
        models
    })

}
const notificactionUpdated = async(req, res) => {

    const {id} = req.params;

    const model = await notification.findByIdAndUpdate(id, {
        NotificacionVista : true
    }, {new : true})

    res.json({
        model
    })

}
module.exports = {
    getNotificacion,
    getNotificacionAll,
    notificacionRemove,
    notificactionUpdated,
    notificactionUpdatedAll,
    postNotification,
}