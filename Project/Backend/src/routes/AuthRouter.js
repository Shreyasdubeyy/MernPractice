const express=require("express")
const User=require("../models/UserModel")
const {checkSignUpCredentials,checkLoginCredentials,checkEditCredentials}= require("../helper/CheckingInputs")
const bcrypt=require("bcrypt")



const authRouter=express.Router()

//SignUp
authRouter.post("/signUp",async(req,res)=>{
   try {
     checkSignUpCredentials(req)

        //Destructure the elements that need to be added
        const {firstName,lastName,age,email,password,about,skills,photoUrl}=req.body
        const passwordHash=await bcrypt.hash(password,10)


        //create instance
        const user=new User({
            firstName:firstName,
            lastName:lastName,
            age:age,
            email:email,
            password:passwordHash,
            about:about,
            skills:skills,
            photoUrl:photoUrl,
        }) 

        //save it to collection
        const success=await user.save()
        console.log(success)
        res.send("User created successfully")
        
    } catch (error) {
        res.status(401).send("Error:"+error.message)
    }

})

//Login

authRouter.post("/login",async(req,res)=>{
   try {
    
   checkLoginCredentials(req)
    const {email,password}=req.body

    const user= await  User.findOne({email:email})
   
      if(!user){
       return res.status(404).send("User not found")
     }

    const isValid=await user.isPasswordValid(password)
     if(isValid){
        const token=await user.createJwtToken();
        res.cookie("token",token)
       return  res.send("Login successfully")
     }
     res.send("invalid credentials")

   } catch (error) {
    res.status(400).send("Error:"+error.message)
   
   }


})

authRouter.post("/logout",(req,res)=>{
    res.cookie("token","randomvalue",{
        expires:new Date(Date.now())
    })

    res.send("Logged out successfully")
})



module.exports=authRouter