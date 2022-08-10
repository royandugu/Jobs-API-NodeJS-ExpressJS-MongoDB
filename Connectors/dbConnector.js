const mongoose=require("mongoose");
const dbConnector=(url)=>{
   return mongoose.connect(url);
}
module.exports=dbConnector;