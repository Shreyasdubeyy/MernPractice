const express=require("express")
const jwtAuthCheck = require("../Middleware/JwtAuthetication");
const User = require("../models/UserModel");
const ConnectionRequest=require("../models/ConnectionModel")
const { default: mongoose } = require("mongoose");

const connectRouter=express.Router()


connectRouter.post("/request/send/:status/:userId",jwtAuthCheck,async(req,res)=>{
try {
 
//Validating senders id
const receiverId=req.params.userId;

if (!mongoose.Types.ObjectId.isValid(receiverId)) {
  return res.status(400).send("Invalid userId format");
}

const receiver=await User.findById(receiverId)

if(!receiver){
 throw new Error("Receiver's id is invalid")   
}

//Validating status
const status=req.params.status;

const AllowedStatus=["ignored","interested"]

if(!AllowedStatus.includes(status)){
    throw new Error("Status is invalid")
}

//Checking if the sender and receiver are not the same user
const loggedInUser=req.user;
const senderId=loggedInUser._id;

if(senderId.equals(receiverId)){
    throw new Error("You cannot send connection request to yourself")
}


//SenderId is db field senderId is extracted here
const connectionExist=await ConnectionRequest.find({
    $or:[
        {SenderId:senderId,ReceiverId:receiverId},
        {SenderId:receiverId,ReceiverId:senderId}
    ]
})

if(connectionExist.length>0){
    throw new Error(`${loggedInUser.firstName} already has a connection request with ${receiver.firstName}`)
}

//data is cleaned and clear to insert

const user= new ConnectionRequest({
    SenderId:senderId,
    ReceiverId:receiverId,
    status,
})

await user.save()

res.json({
    user,
    message:`${loggedInUser.firstName} sent request to ${receiver.firstName}`
})


} catch (error) {
    res.status(400).send("Error:"+error.message)
}

})

module.exports=connectRouter