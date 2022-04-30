const bcryptjs = require("bcryptjs");
const { response } = require("express");
const jwtToken = require("../helpers/jwtToken");
const { transporter, sendMailOpt, sendmailer } = require("../helpers/nodemailer");
const Publication = require("../models/Publication");

const User = require("../models/User");

const postRegister = async(req, res = response) =>{
    
    const {name, email, password } =  req.body
    const data = {
        name, email
    }

    const model = new User(data);

    // enviar el datos

    const sait = bcryptjs.genSaltSync(4);
    model.password = bcryptjs.hashSync(password, sait);

    // enviar email para que el usuario acceda a su cuenta     

    try {

        await model.save();
        //  generar jwt
        const token = await jwtToken(model._id)
        // enviar el email para confirmacion de cuenta
        const sendEmail = await sendmailer(email, token)
        res.json({
            token
        })
    
        
    } catch (error) {

        res.status(401).json({
            error
        })   
    }    
} 


const postAuth = (req ,res = response) => {

    const { usuario : model } = req
    

    res.json({
        model
    })

}

const postLoginAuth = async(req ,res  = response) => {

    const {email, password} = req.body;
    const model = await User.findOne({email})

    // verificar password

    console.log(model.password, password);
    const passVerify = bcryptjs.compareSync(password, model.password)

    if (!passVerify) {

        return res.status(400).json({
            msg : 'email y password incorrectos'
        })   
    }
    if(!model.cuentaActiva){
        return res.status(400).json({
            msg : 'email y password incorrectos (status)' 
        })  
    }

    // generar token

    const token = await jwtToken(model._id)

    if (!model.status) {
        await sendmailer(email, token)
        return  res.json({
            msg : 'a iniciadno sesion correctamente, para activar su email necesita ir a la bandeja de correo para poder activarla' ,
            token
        })  
    }

    res.json({
        token,
        model,
    })
    
}
const postVerify = async(req, res = response) => {

    const {id} = req.params;

    const model =await User.findByIdAndUpdate(id, {
        status: true
    })

    res.json({
        msg: 'ya puedes acceder a tu cuenta :D'
    })


}


const obtenerProfile = async(req, res = response) => {
    const {_id} = req.usuario

    const model = await Publication.find({
        idUsuario: _id,
        role : "PROFILE_ROLE",
        status: true

    })

    if (model.length) {
        return res.json({
            model : model[0]
        })
        
    }

    res.json({
        model : {}
    })


}

const obtenerProfileId = async(req, res = response) => {
    const {id} = req.params

    const model = await Publication.find({
        idUsuario: id,
        role : "PROFILE_ROLE",
        status: true

    })

    if (model.length) {
        return res.json({
            model : model[0]
        })
        
    }

    res.json({
        model : {}
    })


}

const obtenerCover = async(req, res = response) => {
    const {_id} = req.usuario

    const model = await Publication.find({
        idUsuario: _id,
        role : "COVER_PAGE_ROLE",
        status: true

    })

    if (model.length) {
        return res.json({
            model : model[0]
        })
        
    }

    res.json({
        model : {}
    })


}

const obtenerCoverId = async(req, res = response) => {
    const {id} = req.params

    const model = await Publication.find({
        idUsuario: id,
        role : "COVER_PAGE_ROLE",
        status: true

    })

    if (model.length) {
        return res.json({
            model : model[0]
        })
        
    }

    res.json({
        model : {}
    })


}
module.exports = {
    obtenerCover,
    obtenerCoverId,
    obtenerProfile,
    obtenerProfileId,
    postAuth,
    postLoginAuth,
    postRegister,
    postVerify,
}