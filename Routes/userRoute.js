const router=require("express").Router();
const {login,register}=require("../Controllers/user");
router.route("/login").post(login);
router.route("/register").post(register);
module.exports=router;