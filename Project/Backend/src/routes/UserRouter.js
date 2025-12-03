const express=require("express")
const jwtAuth=require("../Middleware/JwtAuthetication")
const { checkEditCredentials } = require("../helper/CheckingInputs")
const bcrypt=require("bcrypt")
const userRoute=express.Router()

userRoute.get("/profile/view",jwtAuth,async(req,res)=>{
    try {

    const user=req.user
    res.send("The current user is:"+user.firstName+" "+user.lastName)
   
    } catch (error) {
        res.send("Error:"+error.message)
    }

})

userRoute.patch("/profile/edit",jwtAuth,async(req,res)=>{
try {
    checkEditCredentials(req);
    
    const loggedInUser=req.user
    //set the fields
    Object.keys(req.body).forEach((field)=>{
        loggedInUser[field]=req.body[field]
    })

    //save it into database
     await loggedInUser.save()
    const {password,...userDataWithoutPassword}=loggedInUser.toObject()
     res.send(`${loggedInUser.firstName} you updated your profile\nUpdated data:${JSON.stringify(userDataWithoutPassword,null,2)}`)
    // res.json({
    //     message:`${loggedInUser.firstName} you updated your profile`},
           // userDataWithoutPassword
    // ).send()

} catch (error) {
    res.send("Error:"+error.message)

}
})

userRoute.patch("/profile/edit/password",jwtAuth,async(req,res)=>{
     try {
        const newPassword=await bcrypt.hash(req.body.password,10)

        const loggedInUser=req.user;

        //setfield
         loggedInUser["password"]=newPassword

        //save in databse
        await loggedInUser.save()

        res.send("Password updated successfully "+loggedInUser.firstName+"!")

     } catch (error) {
        res.status(401).send(error.message)
     }
})


module.exports=userRoute