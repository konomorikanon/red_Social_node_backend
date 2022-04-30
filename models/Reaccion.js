const {Schema, model } = require('mongoose')

const Reaccion = Schema({
    idPublicacion : {
        type : Schema.Types.ObjectId,
        ref : 'Publication',
        required : true
    },
    idUser : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    reaction: {
        type: Boolean,
        required: [true],
        default: false
    }
})

module.exports = model('Reaccion', Reaccion)