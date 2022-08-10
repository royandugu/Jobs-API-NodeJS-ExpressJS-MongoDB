const CustomAPIError=require("./customAPIError");

class AuthenticationError extends CustomAPIError{
    constructor(message){
        super(message);
        this.statusCode=404;
    }
}
module.exports=AuthenticationError;