const {Schema, model} = require('mongoose')

const friendsSchema = Schema({
    idUser : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    idFriend : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    name :{
        type: String,
        required :[true]
    },
    img : {
        type: String,
        required :[true]
    },
    role: {
        type: String,
        enum: [ 'FRIENDS_MODE'],
        default : 'FRIENDS_MODE'
    },
    date : {
        type : Date,
        default : new Date()
    }

})

module.exports = model('Friend', friendsSchema);