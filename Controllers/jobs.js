const {StatusCodes}=require("http-status-codes");
const BadRequestError=require("../Error_Handlers/badRequestError");

const jobModel=require("../Models/job");

const getMyJobs=async (req,res)=>{
    const allJobs=await jobModel.find({createdBy:req.user.userId}).sort("createdAt");
    res.status(StatusCodes.OK).json({yourJobs:allJobs});
}
const getAllJobs=async (req,res)=> {
    const allJobs=await jobModel.find();
    res.status(StatusCodes.OK).json({allJobs:allJobs});
}
const getSpecificJob=async (req,res)=>{   
    const {user:{userId},params:{id:jobId}}=req;
    const selectedJob=await jobModel.findOne({_id:jobId,createdBy:userId});
    if(!selectedJob) throw new BadRequestError("The job doesn't exist");
    res.status(StatusCodes.OK).json({specificJob:selectedJob});
}
const createJob=async (req,res)=>{
    req.body.createdBy=req.user.userId;
    const createdJob=await jobModel.create({...req.body});
    res.status(StatusCodes.CREATED).json({createdJob:createdJob});
}
const deleteJob=async (req,res)=>{
    const {user:{userId},params:{id:jobId}}=req;
    const toBeDeleted=await jobModel.findOneAndDelete({_id:jobId,createdBy:userId});
    if(!toBeDeleted) throw new BadRequestError("The job you want to delete doesn't exist");
    res.status(StatusCodes.OK).json({deletedJob:toBeDeleted});
}
const updateJob=async (req,res)=>{
    const {user:{userId},params:{id:jobId},body:{company,position}}=req;
    if(company===" " || position===" ") throw new BadRequestError("Company or position cannot be left empty");
    const toBeUpdated=await jobModel.findOneAndUpdate({_id:jobId,createdBy:userId},{...req.body},{new:true,runValidators:true});
    if(!toBeUpdated) throw new BadRequestError("The job you are trying to update doesn't exist");
    res.status(StatusCodes.OK).json({updatedJob:toBeUpdated});
}
const deleter=async (req,res)=>{
    await jobModel.deleteMany();
    res.status(200).json({delete:"Delete"});
}


module.exports={getMyJobs,getSpecificJob,createJob,deleteJob,updateJob,getAllJobs,deleter};