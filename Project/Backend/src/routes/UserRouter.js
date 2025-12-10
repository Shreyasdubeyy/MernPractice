const express=require("express")
const jwtAuthCheck = require("../Middleware/JwtAuthetication")
const ConnectionRequest=require("../models/ConnectionModel")
const User = require("../models/UserModel")
const userRouter=express.Router()

const USER_DATA_ALLOWED="firstName lastName age about skills photoUrl gender"

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

userRouter.get("/feed",jwtAuthCheck,async(req,res)=>{
try {
    
//get the user
//check if user has info in connection request db
//create a set to keep track of users that doesnt want to be shown
//run find query with $nin and $nt in $and
//make use of select()


//pagination: skip(),limit() skip=(pages-1)*limit

const pages=parseInt(req.query.page || 1)
const limit=parseInt(req.query.limit || 10)
const skip=(pages-1)*limit

const loggedInUser=req.user;

const requests=await ConnectionRequest.find({
    $or:[
        {SenderId:loggedInUser._id},{ReceiverId:loggedInUser._id}
    ]
})

const hideUsers=new Set();

requests.forEach((req)=>{
    hideUsers.add(req.SenderId)
    hideUsers.add(req.ReceiverId)
})

const feedUsers=await User.find({
    $and:[
        {_id:{
            $nin:Array.from(hideUsers)
        }},
        {
            _id:{
                $ne:loggedInUser._id
            }
        }
    ]
}).select(USER_DATA_ALLOWED).skip(skip).limit(limit)

res.send(feedUsers)


} catch (error) {
    res.status(400).json({
        message:error.message
    })
}

})






module.exports=userRouter