require("express-async-errors");
require("dotenv").config();

const express=require("express");
const app=express();

const userRoute=require("./Routes/userRoute");
const jobRouter=require('./Routes/jobs');
const errorController=require("./Error_Handlers/errorController");
const notFoundError=require("./Error_Handlers/notFoundError");
const dbConnector=require("./Connectors/dbConnector");
const authenticateToken=require("./Middlewares/authentication");

//Security dependencies
const helmet=require("helmet");
const cors=require("cors");
const xssClean=require("xss-clean");
const rateLimit=require("express-rate-limit"); 

app.set("trust-proxy", 1);
//Middlewares
app.use(rateLimit({
    windowMs:15*60*1000,
    max:100
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xssClean());
app.use("/api/V1/authentication",userRoute);
app.use("/api/V1/jobs",authenticateToken,jobRouter);
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