const express=require("express");
const app=express();


const start=()=>{
    try{
        app.listen(5000,()=>console.log("API is listening to port 5000"));
    }
    catch(err){
        console.log(err);
    }
}
start();