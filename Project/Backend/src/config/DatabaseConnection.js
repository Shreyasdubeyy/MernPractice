const mongoose=require("mongoose")

const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://shreyas:shreyas@geekconnectcluster.wofjb4i.mongodb.net/GeekConnectDatabase")
        console.log("Connected to database Successfully")
    } catch (error) {
        console.log("Unable to connect to the database")
    }
}

module.exports=connectDB