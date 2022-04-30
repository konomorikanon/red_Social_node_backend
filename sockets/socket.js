const SocketModel = require('../models/sockets');
const Notificacion = require('../controllers/noficicacionesServer');

const socketModel = new SocketModel();
const notificacion = new Notificacion();

const sockets = (socket) => {

    socket.on("iniciar-sesion" , (values) => {
        console.log(values.id);


    })

    socket.on('usuario-nuevo', (values, callback) => {

        callback("se a creado exitosamente")

        socket.broadcast.emit('usuario-nuevo', values)



    })

     socket.on('solicitud-enviada', async(values, callback) => {

        
        const obtenerValores =await  socketModel.getSocket(values);

        console.log(obtenerValores, values , 30);

        // vamos a crear una notificacion del usuario con anticipacion
        let valor;
        switch (values.rol) {
            case "SOLICITUD":
                valor =await  notificacion.postNotificationServer(values)
                break;
            case 'SOLICITUD_REMOVE':
                valor =await  notificacion.deleteNotification(values)
                break;
            
        }
        if(valor){
            socket.to(obtenerValores.idTempSocket).emit('solicitud-enviada', {...valor,rol :  values.rol, solicitudid : values.idSolicitud} )
        }else{
            callback("NO SE PUDO EJECTUAR LA ACCION")
        }

    })

    socket.on('solicitud-aceptada', async(values, callback) => {


        
        const obtenerValores =await  socketModel.getSocket(values);
        console.log(obtenerValores , values, 56);

        socket.to(obtenerValores.idTempSocket).emit('solicitud-aceptada', values )

        

    })
    socket.on('solicitud-rechazada', async(values, callback) => {


        
        const obtenerValores =await  socketModel.getSocket(values);
        console.log(obtenerValores , values, 68);

        socket.to(obtenerValores.idTempSocket).emit('solicitud-rechazada', values )

        

    })
    // socket.to(id).emit()



    socket.on('usuario-conectado', (values, callback) => {

        callback("a iniciado sesion correctamente")

     
        const user = {...values, idTempSocket : socket.id}

        // aqui vamos a hacer algunos procesos

        socketModel.appendBd(user);
        
        // socket.emit('solicitud-enviada', values)



    })
    console.log(socket.id , 51 );

}

module.exports = sockets;