const router=require("express").Router();
const {getAllJobs,getSpecificJob,createJob,updateJob,deleteJob,getAllStaticJobs}=require("../Controllers/jobs");
router.route("/static").get(getAllStaticJobs);
router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getSpecificJob).patch(updateJob).delete(deleteJob);
module.exports=router;