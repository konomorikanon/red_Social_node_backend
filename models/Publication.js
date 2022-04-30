const {Schema, model} = require('mongoose')

const Publication = Schema({

    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    image: {
        type: String,
    },
    multimedia : {
        type: Schema.Types.Mixed
    },
    role: {
        type: String,
        enum: ['PUBLIC_ROLE', 'PROFILE_ROLE', 'COVER_PAGE_ROLE'],
        default : 'PUBLIC_ROLE'
    },
    
    description: {
        type: String,
    },
    interacciones : {
        type: Number,
        default: 0

    },
    status : {
        type: Boolean,
        required: [true],
        default: true

    },
    date: {
        type: Date,
        default: new Date()
    }


})

Publication.methods.toJSON = function(){
    const  {__v, _id, ...publications} = this.toObject();
    publications.uid = _id
    return publications;
}

module.exports = model("Publication", Publication)