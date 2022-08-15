const {StatusCodes}=require("http-status-codes");
const bcrypt=require("bcryptjs");

const userModel=require("../Models/user");

const register=async (req,res)=>{
    const result=await userModel.create({...req.body});
    res.status(StatusCodes.CREATED).json({result:result});
}

const login=async(req,res)=>{
    console.log("Login User");
}
module.exports={register,login}