const express=require("express")
const jwtAuth=require("../Middleware/JwtAuthetication")

const userRoute=express.Router()

userRoute.get("/profile",jwtAuth,async(req,res)=>{
    try {

    // const cookie=req.cookies
    // const {token}=cookie

    // const decodedMessage=jwt.verify(token,"randomsecretkey")
    // const user=await User.findById(decodedMessage)
    // if(!user){
    //     return res.send("User not exists")
    // }

    const user=req.user
    res.send("The current user is:"+user.firstName+" "+user.lastName)
    // const cookies=req.cookies
    // const {token}=cookies

    // const isValid=token==="arandontokenstoredascookiename"
    
    // if(!isValid){
    //   return  res.send("User not authenticated")
    // }

    // res.send("User is authenticated")
    } catch (error) {
        res.send("Error:"+error.message)
    }

})

module.exports=userRoute