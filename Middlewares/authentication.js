require("dotenv").config();

const jwt=require("jsonwebtoken");
const AuthenticationError=require("../Error_Handlers/authenticationError");

const authenticateToken=async (req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) throw new AuthenticationError("Invalid token pattern");
    const token=authHeader.split(" ")[1];
    try{
        const payload=await jwt.verify(token,process.env.JWT_SECRET);    
        req.user = { userId: payload.userId, name: payload.name };
        next();
    }
    catch(err){
        throw new AuthenticationError("Token doesnot exist");
    }
}
module.exports=authenticateToken;