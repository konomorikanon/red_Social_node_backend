const mongoose = require('mongoose')


const conexion = async() => {

    try {
        const con = mongoose.connect(process.env.MONGODB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("database corriendo....");
        

    } catch (error) {
        console.log(error);
        
    }
    
}

module.exports = {conexion}