const { response } = require("express");
const { validarArchivos, obtenerPublicId } = require("../helpers/validar_archivos");
const Publication = require("../models/Publication");
const User = require("../models/User");

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const validarTiposPub = [
    "PROFILE", "UPDATED_PROFILE", "COVER_PROFILE", "COVER_PROFILE_UPDATED", 'SUBIR_PUBLICACION'
]



const postPublication  = async(req, res = response) => {

    try {
        const {typePub, File, description  } = req.body
        const {archivo } = req.files
        const {_id} = req.usuario
        const pub = new Publication()

        
        // validar extension

        console.log(archivo);
        await  validarArchivos(archivo)
        if (!typePub && validarTiposPub.includes(typePub)) {
            return res.status(401).json({
                msg : "el tipo de publicacion no esta definido o simplemente no existe"
            })
            
        }
        const {secure_url} = await cloudinary.uploader.upload(req.files.archivo.tempFilePath)

        pub.image = secure_url;
        pub.idUsuario = _id;
        pub.date = new Date();
        if (description ) {
            pub.description = description
        }

        if (typePub == "PROFILE") {
            pub.role = 'PROFILE_ROLE';
            await pub.save();               
            const model =  await User.findByIdAndUpdate(_id, {
                profile: secure_url
            },  {new : true})

            return res.json({
                model,
                pub
            })                    
        }
        if (typePub == "UPDATED_PROFILE") {
            pub.role = 'PROFILE_ROLE';
            const model =  await User.findByIdAndUpdate(_id, {
                profile: secure_url
            },  {new : true})
            
            // actualizar el perfil del usuario
            await Publication.findOneAndUpdate({
                role : "PROFILE_ROLE"

            }, {role : "PUBLIC_ROLE"})

            await pub.save();   


            return res.json({
                model,
                pub
            })   
        }

        if(typePub == "COVER_PROFILE" ){
            pub.role = 'COVER_PAGE_ROLE';
            await pub.save();  

            console.log("paso en cover");
            return res.json({
                pub
            })
        }

        if(typePub == "COVER_PROFILE_UPDATED" ){
            pub.role = 'COVER_PAGE_ROLE';

            // actualizar la portada del usuario
      
            
            // actualizar el perfil del usuario
            await Publication.findOneAndUpdate({
                role : "COVER_PAGE_ROLE"

            }, {role : "PUBLIC_ROLE"})

            await pub.save();   
            return res.json({
                pub
            })
        }

         if(typePub == "SUBIR_PUBLICACION" ){
            pub.role = 'PUBLIC_ROLE';

            // actualizar la portada del usuario
          
            await pub.save();  

            return res.json({
                pub
            })
        }

        
        // SUBIR_PUBLICACION

        
    } catch (error) {
        console.log(error);

        return res.status(401).json(error)   
    }
}

const postTextPublication = async(req, res) => {

    const {description} = req.body;
    const {_id} = req.usuario

    console.log(req.body);

    const pub = new Publication({description});

    pub.role = 'PUBLIC_ROLE';
    pub.idUsuario = _id;
    pub.date = new Date();

    await pub.save()

    res.json({
        pub
    })



}

const obtenerPublicacionProfile = async(req, res = response) => {

    const {_id} = req.usuario;

    const {limit, page} = req.query


    const model = await Publication.find({
            idUsuario : _id,
            status : true,
        }).skip(Number(page - 1) * Number(limit)).limit(limit).sort({date : -1})
    

    res.json({
        model, 
    })
}

const obtenerPublicacionID = async(req, res = response) => {

    const {id} = req.params;

    const {limit, page} = req.query


    const model = await Publication.find({
            idUsuario : id,
            status : true,
        }).skip(Number(page - 1) * Number(limit)).limit(limit).sort({date : -1})
    

    res.json({
        model, 
    })
}

const obtenerPaginationProfile = async(req, res = response) => {

    const {_id} = req.usuario;


    const pagination = await Publication.find({
        idUsuario : _id,
        status : true,
    }).count()

    res.json({
        pagination
    })
    // Publication.filters()

}

const actualizarPublicacionText = async(req, res = response) => {
    const {description} = req.body;
    const {_id} = req.usuario
    const {id} = req.params


    const pub1 = await Publication.find({
        _id : id,
        idUsuario : _id
    });
    if (pub1.length < 0) {

        return res.status(401).json({
            msg : "error al actualizar la publicacion"
        })
    }

    const pub = await Publication.findByIdAndUpdate(id, {
        description
    }, {new : true});

    res.json({
        pub
    })


}

const actualizarPublicacion = async(req, res = response) => {

    const {typePub,description  } = req.body
    const {id} = req.params
    const {_id} = req.usuario
    const {archivo } = req.files
    try {
        // vamos a comprobar si la publicacion es legitima al dueño
        const pub1 = await Publication.find({
            _id : id,
            idUsuario : _id
        });

        if (pub1.length < 0) {
            return res.status(401).json({
                msg : "error al actualizar la publicacion"
            })
        }
        const namePath = await validarArchivos(archivo);
        const pub = await Publication.findById(id)


      
        console.log(typePub);
        
        if(typePub == "COVER_PAGE_ROLE_UPLOAD" || typePub == "PROFILE_ROLE_UPLOAD"){
            if (description) {
                pub.description = description 
            }
            await pub.save();
            res.json({
                pub
            })
        }else{
              // validamos el path
            if (namePath) {
                // remover la imagen que tenemos en clowdinary
                if (pub.image) {
                    const public =await obtenerPublicId(pub.image)
                    cloudinary.uploader.destroy(public)
                    
                }
               
            }
            console.log(archivo);

            const {secure_url} =await cloudinary.uploader.upload(archivo.tempFilePath)
            pub.image = secure_url;
            if (description) {
                pub.description = description 
            }

            await pub.save(); 

            res.json({
                pub
            })
        }

        
        
    } catch (error) {

        console.log(error);
        res.status(401).json({
            error
        })
        
    }
 


}

const deletePublicacion = async(req, res = response) => {

    const {id} = req.params
    const {_id} = req.usuario

    const pub1 = await Publication.find({
        _id : id,
        idUsuario : _id
    });

    if (pub1.length < 0) {
        return res.status(401).json({
            msg : "error al actualizar la publicacion"
        })
    }

    // vamos a actualizar el usser en caso de que sea profile
    if (pub1[0].role == "PROFILE_ROLE") {
        const model = await User.findByIdAndUpdate(_id, {
            profile : ""
        } , {new : true})

        const pub = await Publication.findByIdAndUpdate(id , {
            status : false
        })
    
    
        return res.json({
            pub,
            model
        })
    
        

    }

    const pub = await Publication.findByIdAndUpdate(id , {
        status : false
    })


    res.json({
        pub
    })


}
module.exports = {
    actualizarPublicacion,
    actualizarPublicacionText,
    deletePublicacion,
    obtenerPaginationProfile,
    obtenerPublicacionID,
    obtenerPublicacionProfile,
    postPublication,
    postTextPublication,

}