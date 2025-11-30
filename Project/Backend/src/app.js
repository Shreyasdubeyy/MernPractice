const connectDB=require("./config/DatabaseConnection")
const express=require("express")
const { adminAuthentication } = require("./Middleware/AdminAuth")
const User = require("./models/UserModel")
const app=express()
app.use(express.json())
const port=3000

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


//Database Connectivity
const startServer=(async()=>{
await connectDB()
app.listen(port,()=>{
    console.log(`Server running succesfully on http://localhost:${port}`)
})
})()




//Insert//
const data={
    firstName:"Shreyas",
    lastName:"Dubey",
    email:"shreyasdubey@gmail.com",
    age:22,
    password:1234
}
    //Create Route
app.post("/signUp",async(req,res)=>{

    //create instance
const user=new User(req.body) 

    //save it to collection
try {
    await user.save();
    res.send(`User ${req.body.firstName+" "+req.body.lastName} inserted successfully`)
    console.log("User inserted successfully")
} catch (error) {
    res.status(401).send("Failed to insert the user:"+error)
}
})


//Read
//to read json (converting json to java object)

app.get("/feed",async(req,res)=>{
    try {
        const data=await User.find({});
        if(data.length===0){
           return res.status(401).send("Users Not found")
        }
        
        res.send(data)
        console.log("User count:"+data.length);
    
    } catch (error) {
        res.status(400).send("error while fetching the data\n "+error)
        console.log("Error occured\n",error)
    }
})

//Update
app.patch("/feed/:firstName",async(req,res)=>{
    try {
        const ALLOWED_UPDATES=["firstName","lastName","age","photoUrl","skills","about","password"]

        const isAllowed=Object.keys(req.body).every((key)=>{
            if(!ALLOWED_UPDATES.includes(key)){
                return false
            }
            return true
        })
        console.log(isAllowed)
        if(!isAllowed){
            return res.status(400).send("Cannot update email id")
        }
        const updatingParameter=req.body
        const name=req.body.firstName;
        const updated=await User.findOneAndUpdate({firstName:name},updatingParameter,{validator:true})

        if(updated){
            console.log("Updated successfully")
           return res.send("Updated Successfully");
        }
        
        res.send("Unable to find the user")
        
        
    } catch (error) {
        res.status(400).send("Error While Updating \n",error)
        console.log("Error While Updating \n",error)
    }
})


//Delete

app.delete("/feed/:name",async(req,res)=>{
    try {
    const firstName=req.params.name
    const deletedUser=await User.findOneAndDelete({firstName:firstName})
    if(deletedUser){
        res.send("Deleted Successfully")
    }
    else{
        res.send("User not found")
    } 
    } catch (error) {
        console.log("Unable to delete")
     return res.status(500).send("Unable to delete user\n"+error);
    }
    

})