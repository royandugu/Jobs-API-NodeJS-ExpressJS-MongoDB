const router=require("express").Router();
const {getMyJobs,getSpecificJob,createJob,updateJob,deleteJob,getAllJobs}=require("../Controllers/jobs");
router.route("/").get(getAllJobs).post(createJob);
router.route("/my").get(getMyJobs);
router.route("/:id").get(getSpecificJob).patch(updateJob).delete(deleteJob);
module.exports=router;