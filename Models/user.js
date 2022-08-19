require("dotenv").config();

const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const {sign}=require("jsonwebtoken");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name cannot be left empty"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email cannot be left empty"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Your email doesnot match the format"]
    },
    password:{
        type:String,
        required:[true,"Password cannot be left empty"]
    }
})

UserSchema.methods.generateToken=function (){
    return sign({name:this.name, email:this.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFELINE});
}

UserSchema.methods.verifyPassword=async function (candidatePassword){
    const match=await bcrypt.compare(candidatePassword,this.password);
    return match;
}

UserSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})


module.exports=mongoose.model("User-Model",UserSchema);