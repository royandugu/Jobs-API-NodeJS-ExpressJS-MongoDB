require("express-async-errors");
require("dotenv").config();

const express=require("express");
const app=express();

const userRoute=require("./Routes/userRoute");
const jobRouter=require('./Routes/jobs');
const errorController=require("./Error_Handlers/errorController");
const notFoundError=require("./Error_Handlers/notFoundError");
const dbConnector=require("./Connectors/dbConnector");

//Middlewares
app.use(express.json());
app.use("/api/V1/authentication",userRoute);
app.use("/api/V1/jobs",jobRouter);
app.use(notFoundError);
app.use(errorController);

const start=async()=>{
    const port=process.env.API_PORT||5000;
    try{
        await dbConnector(process.env.MONGO_URI);
        app.listen(port,()=>console.log(`API is listening to port ${port}`));
    }
    catch(err){
        console.log(err);
    }
}
start();