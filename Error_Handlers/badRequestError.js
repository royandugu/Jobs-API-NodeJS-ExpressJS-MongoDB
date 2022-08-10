const CustomAPIError = require("./customAPIError");

class BadRequestError extends CustomAPIError{
    constructor(message){
        super(message);
        this.statusCode=401;
    }
}
module.exports=BadRequestError;