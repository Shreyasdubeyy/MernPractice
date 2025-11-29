const adminAuthentication=((req,res,next)=>{
const dummyToken="xyz"
if(dummyToken==="xyz"){
    console.log("Authenticated Successfully")
    next()
}
})

module.exports={
    adminAuthentication
}