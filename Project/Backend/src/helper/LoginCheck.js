const validator=require("validator")

const checkLoginCredentials=(req)=>{
try{
    const {email,password}=req.body

if(!email || !password){
    throw new Error("Missing emaail or password")
 }
 else if(!validator.isEmail(email)){
    throw new Error("email is not correct")
 }
 else{
    console.log("Valid email and password")
 }
 
}
catch(error){
    throw new Error("Error:"+error.message)
}

}


module.exports=checkLoginCredentials