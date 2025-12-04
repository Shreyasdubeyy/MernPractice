const express=require("express")
const jwtAuthCheck = require("../Middleware/JwtAuthetication")
const ConnectionRequest=require("../models/ConnectionModel")
const userRouter=express.Router()

userRouter.get("/received/requests",jwtAuthCheck,async(req,res)=>{
try {
const loggedInUser=req.user;

const requests=await ConnectionRequest.find({
    ReceiverId:loggedInUser._id,
    status:"interested"
}).populate("SenderId",["firstName","lastName"])

res.send(requests)


} catch (error) {
    res.status(400).json({
        message:error.message
    })
}

})






module.exports=userRouter