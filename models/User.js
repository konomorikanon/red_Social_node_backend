const {Schema, model} = require('mongoose')
const moment = require('moment')

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'el email es obligatorio' ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'el password es obligatorio']
    },
    status: {
        type: Boolean,
        required: [true],
        default: false
    },
    cuentaActiva: {
        type: Boolean,
        required: [true],
        default: true
    },
    profile:{
        type: String

    },
    portada:{
        type: String

    },
    presentation: {
        type: String

    },
    date: {
        type: Date,
        default: new Date()
    }

})

UsuarioSchema.methods.toJSON = function(){
    const  {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id
    return usuario;
}


module.exports = model('User', UsuarioSchema)
