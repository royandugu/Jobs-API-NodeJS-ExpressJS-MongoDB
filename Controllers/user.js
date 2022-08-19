const {StatusCodes}=require("http-status-codes");
const BadRequestError=require("../Error_Handlers/badRequestError");
const UnauthenticatedEror=require("../Error_Handlers/authenticationError");

const userModel=require("../Models/user");

const register=async (req,res)=>{
    const result=await userModel.create({...req.body});
    const token=result.generateToken();
    res.status(StatusCodes.CREATED).json({result:result,token:token});
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password) throw new BadRequestError("Email or password is not provided");

    const user=await userModel.findOne({email:email});
    if(!user) throw new UnauthenticatedEror("The email you are providing doesnot exist"); 
    
    const passwordMatches=await user.verifyPassword(password);
    if(passwordMatches){
        const token=user.generateToken();
        res.status(StatusCodes.OK).json({message:"Login sucesfull",token:token});
    }
    else throw new UnauthenticatedEror("The password doesn't match");
}
module.exports={register,login};