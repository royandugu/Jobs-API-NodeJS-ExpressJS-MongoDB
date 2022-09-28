const {StatusCodes}=require("http-status-codes");

const errorController=async (err,req,res,next)=>{
    let errorObject={
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || "Internal Server error"
    }
    if(err.name==="CastError"){
        errorObject.statusCode=StatusCodes.BAD_REQUEST
        errorObject.msg=`The job of id : ${err.value} doesnot exist`
    }
    if(err.name==="ValidationError"){
        console.log(Object.values(err.errors))
        errorObject.statusCode=StatusCodes.BAD_REQUEST;
        errorObject.message=Object.values(err.errors).map(item=>item.message).join(',');
    }
    if(err.code && err.code===11000) {
        errorObject.statusCode=StatusCodes.BAD_REQUEST;
        errorObject.msg=`Duplicate value entered for ${Object.keys(err.keyValue)}`;
    }
    res.status(errorObject.statusCode).json({message:errorObject.msg});
}
module.exports=errorController;