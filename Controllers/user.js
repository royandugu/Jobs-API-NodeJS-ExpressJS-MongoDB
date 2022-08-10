const {StatusCodes}=require("http-status-codes");
const bcrypt=require("bcryptjs");

const userModel=require("../Models/user");

const register=async (req,res)=>{
    const {name,email,password}=req.body;
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser={name,email,password:hashedPassword};
    const result=await userModel.create({...newUser});
    res.status(StatusCodes.CREATED).json({result:result});
}

const login=async(req,res)=>{
    console.log("Login User");
}
module.exports={register,login}