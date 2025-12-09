const { timeStamp } = require("console")
const mongoose=require("mongoose")
const { type } = require("os")
const validator=require("validator")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

//Create a schema
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        maxLength:10,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        maxLength:10,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        max:99,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter a valid email id")
            }
        },
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    about:{
        type:String,
        maxLength:100,
        default:"No about section added"
    },
    skills:{
        type:[String],
        default:"No skills"
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter a valid image url")
            }
        },trim:true,
        default:"https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg"
    },
    

},{timestamps:true})


//Schema methods
userSchema.methods.createJwtToken=function(){
    const user=this;
    const token=jwt.sign({_id:user._id},"randomsecretkey",{
        expiresIn:"1d"
    })
return token;
}

userSchema.methods.isPasswordValid=async function(passwordInput){
    const user=this
    const passwordHash=user.password

    const isValid=await bcrypt.compare(passwordInput,passwordHash)

    if(isValid){
        return isValid
    }
    throw new Error("Invalid credentials")

}


//Create a model (combined structure for a document defines collection)
//the model name parameter must be a capital letter without plural since the collection will be named as plural of it
const User=mongoose.model("User",userSchema)

module.exports=User