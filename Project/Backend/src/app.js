const express=require("express")
const { adminAuthentication } = require("./Middleware/AdminAuth")
const app=express()
const port=3000


app.use("/admin",adminAuthentication)

app.get("/admin/getUsers",(req,res)=>{
    res.send("Feteched Users")
    console.log("Fetched users")
})

app.get("/admin/deleteUsers",(req,res)=>{
    res.send("Deleted")
    console.log("Removed users")
})




app.listen(port,()=>{
    console.log(`Server running succesfully on http://localhost:${port}`)
})

