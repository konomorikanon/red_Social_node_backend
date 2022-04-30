const { response } = require("express");
const User = require("../models/User");

const obtenerTodosLosUsuarios = async(req, res = response) => {

    const {tope= 10, pagina = 0 } = req.query;

    const users  =await  User.find({
        status: true
    }).skip(Number( pagina)).limit(Number(tope))

    res.json({
        users
    })
}


const obtenerUsuarioId = async(req, res = response) => {
    const {id} = req.params
    const model  = await User.findById(id);

    res.json({
        model
    })


}




module.exports = {
    obtenerTodosLosUsuarios,
    obtenerUsuarioId
};