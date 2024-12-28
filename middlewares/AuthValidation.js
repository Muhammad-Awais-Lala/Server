const joi = require("joi")

const registerValidation = (req,res,next) =>{
    const schema = joi.object({
        name : joi.string(),
        email : joi.string().email().required(),
        password : joi.string().min(4).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"bad request",error})
    }
    else{
        next();
    }
}

const loginValidation = (req,res,next) =>{
    const schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().min(4).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"bad request",error})
    }
    else{
        next();
    }
}

module.exports = {
    registerValidation,
    loginValidation
}
