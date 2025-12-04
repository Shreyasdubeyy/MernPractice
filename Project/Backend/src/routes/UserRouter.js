const express=require("express")
const jwtAuthCheck = require("../Middleware/JwtAuthetication")
const ConnectionRequest=require("../models/ConnectionModel")
const userRouter=express.Router()

const USER_DATA_ALLOWED="firstName lastName age about skills"

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

userRouter.get("/connections",jwtAuthCheck,async(req,res)=>{
    try {
        const loggedInUser=req.user;
        const connections=await ConnectionRequest.find({
            $or:[{SenderId:loggedInUser._id},{ReceiverId:loggedInUser._id}],
            status:"accepted"
        }).populate("SenderId",USER_DATA_ALLOWED).populate("ReceiverId",USER_DATA_ALLOWED)


        const filteredConnections=connections.map((row)=>{
            if(row.SenderId._id.toString()===loggedInUser._id.toString()){
                return row.ReceiverId
            }
            return row.SenderId
        })

        res.send("Friends:"+JSON.stringify(filteredConnections,null,2))


    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})






module.exports=userRouter