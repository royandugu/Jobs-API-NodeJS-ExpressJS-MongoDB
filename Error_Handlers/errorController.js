const {StatusCodes}=require("http-status-codes");

const CustomAPIError=require("./customAPIError");
const errorController=async (err,req,res,next)=>{
    let errorObject={
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || "Internal Server error"
    }
    if(err instanceof CustomAPIError) return res.status(err.statusCode).json({message:err.message});
    else if(err.code && err.code===11000) {
        errorObject.statusCode=StatusCodes.BAD_REQUEST;
        errorObject.msg="The email you are trying to register with is not avaliable";
    }
    res.status(errorObject.statusCode).json({message:errorObject.msg});
}
module.exports=errorController;