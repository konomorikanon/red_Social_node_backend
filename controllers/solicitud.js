const { response } = require("express");
const Friend = require("../models/Friend");
const Solicitud = require("../models/Solicitud");
const User = require("../models/User");

// el idFriend es el id de la persona a la que se le esta enviando solicitud
// el idUser es el id a quien le pertenece la solicitud
const solicitudPost = async(req, res = response) => {

    const {id } = req.params
    const {_id} = req.usuario

    // vamos a comprobar si existe un registro
    const model1 = await Solicitud.find({
        idFriend : id,
        idUser: _id,

    })
    if (model1.length > 0) {
        res.json({
            model: model1[0]
        })
    }else{
        res.json ({
            model :{}
        })
    }
}

const solicitudGetSolicitud = async(req, res = response) => {

    const {id } = req.params
    const {_id} = req.usuario

    // vamos a comprobar si existe un registro
    const model1 = await Solicitud.find({
         idUser: id,
         idFriend: _id,

    })
    console.log(model1, id, _id );
    if (model1.length > 0) {
        res.json({
            model: model1[0]
        })
    }
    else{
        res.json ({
            model :{}
        })
    }
}

const solicitudGetSolicitudId = async(req, res = response) => {

    const {id } = req.params
   

    // vamos a comprobar si existe un registro
    const model = await Solicitud.findById(id)
    res.json({
        model
    })
}


const solicitudRemoveSol = async(req, res = response) => {

    const {id } = req.params

    // vamos a comprobar si existe un registro
    const model = await Solicitud.findByIdAndUpdate(id, {
        role : 'NO_SOLICITUD',
        roleFriend : 'NO_SOLICITUD'
    }, {new : true} );

    res.json({
        model
    })

}
const solicitudSendPost = async(req, res = response) => {

    
    const {uid } = req.body
    const {_id} = req.usuario
    // el id frind es el id de la persona a la que se le va a mandar la solicitud

    const model1 = await Solicitud.find({
        idFriend : uid,
        idUser: _id,

    })


    

    if (!model1.length) {

        const model = new Solicitud();
        model.idFriend = uid;
        model.idUser = _id
        model.role = 'SOLICITUD_MODE'
        model.roleFriend = 'SEND_SOLICITUD';

       await model.save()

       res.json({
            model
        })
    }
 
}
const solicitudSendPut = async(req, res = response) => {

    const {id} = req.params
    const {uid} = req.body;
    const {_id} = req.usuario

    console.log(uid, _id, 104 );
 
    const model = await Solicitud.findByIdAndUpdate(id, {
        idFriend : uid,
        idUser: _id,
        role : 'SOLICITUD_MODE',
        roleFriend : 'SEND_SOLICITUD'
    }, {new : true} );

    res.json({
        model
    })

    
}

const solicitudupdatedAccept = async(req, res = response) => {
    const {id} = req.params;
    const {_id} = req.usuario;
    // vamos a verificar si esto fue enviado por el propietario y por el que acepta la solicitud
    const {property }  = req.body

    const model1 =await Solicitud.findByIdAndUpdate(id, {
        role : 'FRIENDS_MODE',
        roleFriend : 'FRIENDS_MODE'
    }, {new : true});

    // vamos a crear el lazo de amigos en este apartado
    // crear los amigos de usuario principal poniendo los datos del usuario secundario

    // vamos a sacar los valoes del propietario de esta solicitud
    const model = new Friend();
    if(property){
        // del propietario de solicitud a recibidor
        const model2 = await User.findById(model1.idFriend);
        model.idUser = _id
        model.idFriend = model.idFriend
        model.name = model2.name
        model.img = model.profile
        model.date = new Date();

    }else{
        // de recibidor de solicitud al propietario

        const model2 = await User.findById(model1.idUser);
        model.idUser = _id
        model.idFriend = model2.idUser
        model.name = model2.name
        model.img = model.profile
        model.date = new Date();
    }

    res.json({
        model1,
    })
}

const deleteSolicitud = async(req, res = response) => {
    const {id} = req.params;
    const {_id} = req.usuario;
    // vamos a verificar si esto fue enviado por el propietario y por el que acepta la solicitud

    const model1 =await Solicitud.findByIdAndUpdate(id, {
        role : 'NO_BOTON',
        roleFriend : 'NO_SOLICITUD'
    }, {new : true});

    res.json({
        model1,
    })
}

const obtenerUnaSolicitud = async(req, res) => {
    const {idUser, idFriend} = req.query

    if ((!idUser || !idFriend) || (!idUser && !idFriend) ) {
        return res.status(401).json({
            msg : "se nesetita un idUser y un IDFriend para verficar los valores"
        })
        
    }
    console.log(idUser, idFriend, 187);
    // verificar si existe una solicitud de id friend a idUser
    const model =await Solicitud.findOne({
        idFriend,
        idUser,
    })
    if (model) {
        return res.json({
            model
        })
    }
    // de amigo a friend
  
    const model1 =await Solicitud.findOne({
        idUser: idFriend,
        idFriend :idUser,
    })
    if (model1) {
        return res.json({
            model: model1
        })
    }


}
module.exports = {
    deleteSolicitud,
    obtenerUnaSolicitud,
    solicitudGetSolicitud,
    solicitudGetSolicitudId,
    solicitudPost,
    solicitudRemoveSol,
    solicitudSendPost,
    solicitudSendPut,
    solicitudupdatedAccept,
}
