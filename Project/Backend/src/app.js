const connectDB=require("./config/DatabaseConnection")
const express=require("express")
const cookieParser=require("cookie-parser")
const app=express()

//for handling json req received from req
app.use(express.json())

//for making cookie readable
app.use(cookieParser())

//jwt token
const jwt=require("jsonwebtoken")
const authRouter = require("./routes/AuthRouter")
const userRoute = require("./routes/UserRouter")


const port=3000



//Database Connectivity
const startServer=(async()=>{
await connectDB()
app.listen(port,()=>{
    console.log(`Server running succesfully on http://localhost:${port}`)
})
})()

app.use("/",authRouter) //first middleware will check for this routes
app.use("/",userRoute) //if no match founds it enters here 















//Middleware Example
// app.use("/admin",adminAuthentication)

// app.get("/admin/getUsers",(req,res)=>{
//     res.send("Feteched Users")
//     console.log("Fetched users")
// })

// app.get("/admin/deleteUsers",(req,res)=>{
//     res.send("Deleted")
//     console.log("Removed users")
// })


//Insert//
// const data={
//     firstName:"Shreyas",
//     lastName:"Dubey",
//     email:"shreyasdubey@gmail.com",
//     age:22,
//     password:1234
// }
//     //Create Route
// app.post("/signUp",async(req,res)=>{

//    try {
//      checkSignUpCredentials(req)

     
  
//         //Destructure the elements that need to be added
//         const {firstName,lastName,age,email,password,about,skills,photoUrl}=req.body
//         const passwordHash=await bcrypt.hash(password,10)


//         //create instance
//         const user=new User({
//             firstName:firstName,
//             lastName:lastName,
//             age:age,
//             email:email,
//             password:passwordHash,
//             about:about,
//             skills:skills,
//             photoUrl:photoUrl,
//         }) 

//         //save it to collection
//         const success=await user.save()
//         console.log(success)
//         res.send("User created successfully")
        
//     } catch (error) {
//         res.status(401).send("Error:"+error.message)
//     }

// })


//Read
//to read json (converting json to java object)

// app.get("/feed",async(req,res)=>{
//     try {
//         const data=await User.find({});
//         if(data.length===0){
//            return res.status(401).send("Users Not found")
//         }
        
//         res.send(data)
//         console.log("User count:"+data.length);
    
//     } catch (error) {
//         res.status(400).send("error while fetching the data\n "+error)
//         console.log("Error occured\n",error)
//     }
// })

//Update
// app.patch("/feed/:firstName",async(req,res)=>{
//     try {
//         const ALLOWED_UPDATES=["firstName","lastName","age","photoUrl","skills","about","password"]

//         const isAllowed=Object.keys(req.body).every((key)=>{
//             if(!ALLOWED_UPDATES.includes(key)){
//                 return false
//             }
//             return true
//         })
//         console.log(isAllowed)
//         if(!isAllowed){
//             return res.status(400).send("Cannot update email id")
//         }
//         const updatingParameter=req.body
//         const name=req.body.firstName;
//         const updated=await User.findOneAndUpdate({firstName:name},updatingParameter,{validator:true})

//         if(updated){
//             console.log("Updated successfully")
//            return res.send("Updated Successfully");
//         }
        
//         res.send("Unable to find the user")
        
        
//     } catch (error) {
//         res.status(400).send("Error While Updating \n",error)
//         console.log("Error While Updating \n",error)
//     }
// })


//Delete

// app.delete("/feed/:name",async(req,res)=>{
//     try {
//     const firstName=req.params.name
//     const deletedUser=await User.findOneAndDelete({firstName:firstName})
//     if(deletedUser){
//         res.send("Deleted Successfully")
//     }
//     else{
//         res.send("User not found")
//     } 
//     } catch (error) {
//         console.log("Unable to delete")
//      return res.status(500).send("Unable to delete user\n"+error);
//     }
    

// })


// //Login

// app.post("/login",async(req,res)=>{
//    try {
    
//     checkLoginCredentials(req)
//     const {email,password}=req.body

//     const user= await  User.findOne({email:email})
//     //Creating a jwt token
    
//     //  const id=user._id

//     //  const token=jwt.sign({_id:id},"randomsecretkey")
    
//     //send the cookie back
//     //  res.cookie("token",token)

    
   
//      if(user.length===0){
//         res.status(404).send("User not found")
//      }

//     const isValid=await user.isPasswordValid(password)
//      if(isValid){
//         const token=await user.createJwtToken();
//         res.cookie("token",token)
//        return  res.send("Login successfully")
//      }
//      res.send("invalid credentials")

//    } catch (error) {
//     res.status(400).send("Error:"+error.message)
   
//    }


// })

//profile route

// app.get("/profile",jwtAuth,async(req,res)=>{
//     try {

//     // const cookie=req.cookies
//     // const {token}=cookie

//     // const decodedMessage=jwt.verify(token,"randomsecretkey")
//     // const user=await User.findById(decodedMessage)
//     // if(!user){
//     //     return res.send("User not exists")
//     // }

//     const user=req.user
//     res.send("The current user is:"+user.firstName+" "+user.lastName)
//     // const cookies=req.cookies
//     // const {token}=cookies

//     // const isValid=token==="arandontokenstoredascookiename"
    
//     // if(!isValid){
//     //   return  res.send("User not authenticated")
//     // }

//     // res.send("User is authenticated")
//     } catch (error) {
//         res.send("Error:"+error.message)
//     }

// })