
const express = require('express')
const cors = require('cors')
const { conexion } = require('../db/conexion')
const sockets = require('../sockets/socket')
const fileUpload = require('express-fileupload');

const app = express()


//1 istalamos el web socket npm i socket.io
//2 colocamos nuestro servidor del web sockt
//3 colocamos el websocket usando socket.io y nuestro servidor
//4 remplazamos al app con "this.server" para tener nuestro web socket a la escucha
class Server {
    constructor(){

        //  conectar a la base de datos
        this.conexion()
        // valores del web socket
        // creamos un servidor en donde importamos http de node y creamos el servidor en la variable de express
        this.server = require('http').createServer(app);

        // esto nos conectara a socket io para poder comunicarnos en tiempo real
        this.io = require('socket.io')(this.server);

        // middlewares
        this.middlewares()

        // hablitar rutas
        this.routes()

        // conexion
        this.socket()

    }

    conexion(){
        conexion()
    }   
    middlewares(){
        // origenes desconocidos
        app.use(cors())
        
        // ruta estatica
        app.use(express.static('public'))


        //devolver mensajs a a json
        app.use(express.json())


        //createparentpath sirve para crear directorios
        app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));


    }
    listen(){
        this.server.listen(process.env.PORT , () => {
            console.log("servido corriendo..." );
        })

    }
    routes(){

        app.use('/api/auth', require('../routers/auth')  )
        app.use('/api/user', require('../routers/users')  )
        app.use('/api/publication', require('../routers/Publication')  )
        app.use('/api/solicitud', require('../routers/solicitud')  )
        app.use('/api/notificaciones', require('../routers/notificaciones')  )
    }
    socket(){
        this.io.on('connection',sockets )
    }


}

module.exports = Server