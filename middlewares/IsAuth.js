const jwt = require("jsonwebtoken")

const isAuthenticated=(req,res,next) =>{
    const auth = req.headers['authorization'];
    if(!auth){
       return res.status(403)
        .json({message:"UnAuthorized, JWT Token is required"});
    }
    
    try {
        const decoded = jwt.verify(auth,process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403)
        .json({message:"UnAuthorized, JWT Token is Expired or wrong"});
    }
};

module.exports=isAuthenticated;