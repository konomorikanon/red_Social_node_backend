const {Schema, model} = require('mongoose')

const Solicitud = Schema({
    idFriend : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    idUser : {

        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    role: {
        type: String,
        enum: ['SOLICITUD_MODE', 'NO_SOLICITUD', 'NO_BOTON', 'FRIENDS_MODE', 'SEND_SOLICITUD'],
        default : 'NO_SOLICITUD'
    },
    roleFriend: {
        type: String,
        enum: ['SOLICITUD_MODE', 'NO_SOLICITUD', 'NO_BOTON', 'FRIENDS_MODE', 'SEND_SOLICITUD'],
        default : 'NO_SOLICITUD'
    },

})
module.exports = model('Solicitud', Solicitud);