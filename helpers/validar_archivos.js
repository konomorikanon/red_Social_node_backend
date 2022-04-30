
const {v4} = require('uuid')
const extencionesPermitidas = [
    "image/jpeg", 'image/png'
]

const pathFile = (img) => {

    // obtener la extension
    const imagen = img.name.split('.')

    // obtener el ultimo punto
    const extension = imagen[imagen.length-1];
    // colocar un nombre
    const newname = v4()+"."+extension;

    return newname;

}
 const validarArchivos = ( img ) => {

    return new Promise((resolve, reject) => {

        if( extencionesPermitidas.includes(img.mimetype)){
            // const nombreArchvo  =  pathFile(img)

            resolve(true)

        }else{
            reject({
                msg : "extension no valida"
            })

        }

    })

}
const obtenerPublicId = (url) => {
    const pathname = url.split('/');

    var nombre  = pathname[pathname.length -1];
       
    // obtenermos el id publico sn la extension
    const [public_id ] = nombre.split('.');
    return public_id



}

module.exports = {
    obtenerPublicId,
    validarArchivos
}