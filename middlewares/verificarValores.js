const {validationResult} = require('express-validator')

const verificarValues = (req, res , next) => {

    const errors = validationResult(req)

    if (errors.errors.length){
        res.status(401).json({
            errs : errors.errors
        })

        return;
    }

    next()

}

module.exports = {
    verificarValues
}