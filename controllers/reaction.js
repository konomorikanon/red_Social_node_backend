const { response } = require("express");
const Publication = require("../models/Publication");
const Reaccion = require("../models/Reaccion");

const reaction = async(req, res = response) => {

    const {id } = req.params
    const {_id} = req.usuario

    // vamos a comprobar si existe un registro
    const model1 = await Reaccion.find({
        idPublicacion : id,
        idUser: _id
    })
    if (model1.length > 0) {
        res.json({
            model: model1[0]
        })
    }else{
        const model = new Reaccion();
        model.idPublicacion = id;
        model.idUser = _id;

       await model.save()
       console.log("estas en el else");
        res.json({
            model
        })
    }

}
const reactionAll = async(req, res = response) => {
    const {id } = req.params

    const counter = await Publication.find({
        idPublicacion : id,
        reaction : true

    }).count()

    console.log(counter);
    res.json({
        counter,
    

    })

}

const reactionPut = async(req, res = response) => {

    const {id } = req.params
    const {_id} = req.usuario

    const model = await Reaccion.findById(id);
    const pub = await Publication.findById(model.idPublicacion)


    if (model.reaction) {
        model.reaction = false
        pub.interacciones = pub.interacciones - 1
        
    }else{
        

        model.reaction = true

        pub.interacciones = pub.interacciones + 1

    }

    Promise.all([
        await model.save(),
        await pub.save(),
    ])

    
    console.log(model);

    res.json({
        model,
        pub

    })
}


const borrarReaccion = () => {

}
module.exports = {
    reaction,
    reactionAll,
    reactionPut,
}