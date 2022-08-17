const {StatusCodes}=require("http-status-codes");

const userModel=require("../Models/user");

const register=async (req,res)=>{
    const result=await userModel.create({...req.body});
    const token=result.generateToken();
    res.status(StatusCodes.CREATED).json({result:result,token:token});
}

const login=async(req,res)=>{
    console.log("Login User");
}
module.exports={register,login};