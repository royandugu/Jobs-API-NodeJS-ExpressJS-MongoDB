const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
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
module.exports=mongoose.model("User-Model",userSchema);