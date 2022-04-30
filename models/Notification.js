const {model, Schema} = require('mongoose')

const Notificaciones = Schema({
    idUserNotification : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },

    idUser : {
        type : Schema.Types.ObjectId,
        ref : 'User',
     
    },
    idPub : {
        type : Schema.Types.ObjectId,
        ref : 'Publication',
    },
    notification : {
        type : String,
        required : true
    },
   
    leido : {
        type : Boolean,
        required: true,
        default : false
    },
    role: {
        type: String,
        enum: ['SOLICITUD'],
    },
    urlLink :{
        type : String,
    },
    NotificacionVista : {
        type : Boolean,
        required: true,
        default : false
    },
    status : {
        type : Boolean,
        required: true,
        default : true
    },
    date : {
        type : Date,
        required : true,
        default : new Date()
    }
})

module.exports = model('Notification', Notificaciones);