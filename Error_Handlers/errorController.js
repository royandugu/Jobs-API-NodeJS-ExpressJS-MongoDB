const {StatusCodes}=require("http-status-codes");

const CustomAPIError=require("./customAPIError");
const errorController=async (err,req,res,next)=>{
    if(err instanceof CustomAPIError) res.status(err.statusCode).json({message:err.message});
    else res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Something went wrong, please try again"});
}
module.exports=errorController;