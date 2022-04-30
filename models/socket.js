const {Schema, model} = require('mongoose')

const socketModel = Schema({
    name : {
        type : String,
        required : true,   
    },
    idUser : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true

    },
    idTempSocket  : {
        type : String,
        required :true
    }
})


module.exports = model('Socket', socketModel)