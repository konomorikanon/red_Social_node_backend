const socket = require("./socket")

class SocketModel {

    async appendBd(user){
        // vamos a verficiar si existe el usuario de la bbdd
        const model1 = await socket.findOne({idUser: user.idUser});
        console.log(model1);

        if(model1){
            model1.idTempSocket = user.idTempSocket
            await model1.save()
        }else{
            
            const model =  new socket(user);
            await model.save()


        }

    }
    async getSocket(id){
        console.log(id, 23);
        const model = await socket.findOne({
            idUser : id.solicitudID
        })

        return model
    }
    
    


}


module.exports = SocketModel