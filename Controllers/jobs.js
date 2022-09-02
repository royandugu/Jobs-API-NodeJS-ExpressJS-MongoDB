const {StatusCodes}=require("http-status-codes");
const BadRequestError=require("../Error_Handlers/badRequestError");

const jobModel=require("../Models/job");

const throwError=()=>{
    throw new BadRequestError("The provided item doesn't exist");
}
const getAllJobs=async (req,res)=>{
    const allJobs=await jobModel.find({});
    res.status(StatusCodes.OK).json({allJobs:allJobs});
}
const getSpecificJob=async (req,res)=>{   
    const {id:taskID}=req.params;
    const selectedJob=await jobModel.findOne({_id:taskID});
    if(!selectedJob) throwError();
    res.status(StatusCodes.OK).json({selectedJob:selectedJob});
}
const createJob=async (req,res)=>{
    req.body.createdBy=req.user.userID;
    const createdJob=await jobModel.create({...req.body});
    res.status(StatusCodes.CREATED).json({createdJob:createdJob});
}
const deleteJob=async (req,res)=>{
    const {id:taskID}=req.params;
    const deletedJob=await jobModel.findOneAndDelete({_id:taskID});
    if(!deletedJob) throwError();
    res.status(StatusCodes.OK).json({deletedJob:deletedJob});
}
const updateJob=async (req,res)=>{
    const {id:taskID}=req.params;
    const updatedJob=await jobModel.findOneAndUpdate({_id:taskID},{...req.body},{new:true,runValidators:true});
    if(!updatedJob) throwError();
    res.status(StatusCodes.OK).json({updatedJob:updatedJob});
}


module.exports={getAllJobs,getSpecificJob,createJob,deleteJob,updateJob};