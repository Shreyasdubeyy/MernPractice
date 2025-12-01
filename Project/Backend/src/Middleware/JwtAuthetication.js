const jwt=require("jsonwebtoken")
const User=require("../models/UserModel")
const jwtAuthCheck=async(req,res,next)=>{
try {
    const {token}=req.cookies
    if(!token){
        return res.send("Please Login")
    }
    const decodedObject=await jwt.verify(token,"randomsecretkey")
    
    const user=await User.findById(decodedObject)

    if(!user){
        return res.send("User not found")
    }
    req.user=user;
    next()
    
   } catch (error) {
    res.send("Error:"+error.message)
   }

}

module.exports=jwtAuthCheck