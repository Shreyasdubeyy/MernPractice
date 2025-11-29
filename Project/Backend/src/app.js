const connectDB=require("./config/DatabaseConnection")
const express=require("express")
const { adminAuthentication } = require("./Middleware/AdminAuth")
const User = require("./models/UserModel")

const app=express()
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




//Insert
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
const user=new User(data)

//save it to collection
try {
    await user.save();
    res.send("User Inserted successfully")
    console.log("User inserted successfully")
} catch (error) {
    res.status(401).send("Failed to insert the user")
}

})



