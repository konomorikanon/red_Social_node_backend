const Notification = require("../models/Notification");
const User = require("../models/User");

const verificarRole = [
    "SOLICITUD",

]


class Notificacion{

    async postNotificationServer(values){

        console.log( values);

        const notificacion = new Notification()

        const model = await User.findById(values.id)
        if (!model.status) {
            return false;
            
        }
        notificacion.idUserNotification = values.solicitudID;
        notificacion.notification = `la persona ${model.name} te a enviado una solicitud de amistad`
        notificacion.urlLink = "/friends"
        notificacion.idUser = values.id
        notificacion.date = new Date();
        notificacion.role = "SOLICITUD";

        await notificacion.save();

        console.log(notificacion, 32);

        return {uid :  notificacion._id, idUserNotification :  values.solicitudID };
        // console.log();
        
    }
    async deleteNotification(values){

        const model = await Notification.findOneAndDelete({
            idUser : values.id,
            idUserNotification : values.solicitudID
        });
    
        return {uid :  model._id, idUserNotification :  values.solicitudID };

    }
}
module.exports = Notificacion;
