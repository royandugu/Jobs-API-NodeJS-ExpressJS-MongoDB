const {StatusCodes}=require("http-status-codes");
const CustomAPIError=require("./customAPIError");

class AuthenticationError extends CustomAPIError{
    constructor(message){
        super(message);
        this.statusCode=StatusCodes.UNAUTHORIZED;
    }
}
module.exports=AuthenticationError;