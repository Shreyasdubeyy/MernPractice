const mongoose=require("mongoose")
const { type } = require("os")

//Create a schema
const userSchema=mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String
    },
    password:{
        type:String
    }

})


//Create a model (combined structure for a document defines collection)
//the model name parameter must be a capital letter without plural since the collection will be named as plural of it
const User=mongoose.model("User",userSchema)

module.exports=User