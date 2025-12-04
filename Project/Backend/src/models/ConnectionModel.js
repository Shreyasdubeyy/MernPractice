const mongoose=require("mongoose")

const connectionSchema=new mongoose.Schema({
SenderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
ReceiverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
status:{
    type:String,
    enum:{
        values:["ignored","accepted","rejected","interested"],
        message:`{VALUE} is not a valid value`
    }
}

},{timestamps:true})

const connectionModel=mongoose.model("ConnectionRequest",connectionSchema)

module.exports=connectionModel