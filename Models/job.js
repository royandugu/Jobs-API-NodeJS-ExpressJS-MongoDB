const mongoose=require("mongoose");

const jobShema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true, "Name field cannot be empty"]
    },
    company:{
        type:String,
        trim:true,
        required:[true, "Please provide company name"]
    },
    position:{
        type:String,
        trim:true,
        required:[true,"Please provide position"]
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User-Model",
        required:[true,"A job must have a user created"]
    }
    
})