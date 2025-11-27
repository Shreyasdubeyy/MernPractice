const {MongoClient} =require("mongodb")

const dbName="MongoDBModule"
const url="mongodb+srv://shreyas:shreyas@easycode.02oop2d.mongodb.net/?appName=EasyCode"
const client=new MongoClient(url);

 const connectToDB=(async()=>{
    await client.connect();
    console.log("Connected to the database successfully")

   const db=client.db(dbName)
   const collection=db.collection("User")

   //insert
   const data={
    name:"Shreyas Dubey",
    age:22
   }

   await collection.insertOne(data)
   console.log("Data inserted successfully")


   //read
   const read=await collection.find().toArray()
   console.log(read)

   //update
   const updateCount=await collection.updateMany({name:"Shreyas Dubey"},{$set:{name:"Shreyas Updated"}})
   console.log("Updated Succefully",updateCount)


   //delete
   await collection.deleteMany({})
   console.log("Deleted succesfully")
 })()  

 


