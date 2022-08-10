const {StatusCodes}=require("http-status-codes");
 
const notFoundError=async (req,res)=>{
    res.status(StatusCodes.NOT_FOUND).json({message:"The requested route does not exist"});
}
module.exports=notFoundError;