const jwt = require('jsonwebtoken');

const jwtToken = (params) => {
    return new Promise((resolve, reject) => {
        const data = {
            id: params
        }

        jwt.sign(data, process.env.KEY_PASS , {
            expiresIn: '1d'
        }, (err, info) => {
            if (err) {
                reject(err)
                
            }else{
                resolve(info)
            }
        })

    } )
}
module.exports = jwtToken;