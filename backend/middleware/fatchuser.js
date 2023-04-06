
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Koushikisagoodb$oy';


const fatchuser = (req,res,next)=>{
    //Get the user from the jwt token and add id to req object
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Place authenticate using a valid token"})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Place authenticate using a valid token hi"})
    }
}

module.exports=fatchuser;