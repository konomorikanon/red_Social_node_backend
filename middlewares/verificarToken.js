const JWT = require('jsonwebtoken');
const User = require('../models/User');

const verificarJWT = async(req, res ,next) => {


    try {
        const { token} = req.headers
        if (token) {
            const {id} = JWT.verify(token, process.env.KEY_PASS);
            const user = await User.findById(id);

            req.usuario = user

            next()


        }else{

            return res.status(401).json({
                error : {
                    message: "no existe un token a verificar",
                }
            })

        }
        
    } catch (error) {
        console.log(error);
        

        return res.status(401).json({
            error
        })
    }
    



}
// body es el cuerpo o los textos del post
// query que es lo que va adelante del signo ? 
// params son los que van adelante de un :id
// headers son los metadatos que enviamos a la red

module.exports = {
    verificarJWT
}