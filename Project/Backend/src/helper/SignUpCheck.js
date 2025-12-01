const validator=require("validator")



const checkSignUpCredentials=(req)=>{

const {firstName,lastName,email,password,age}=req.body;

if(!firstName || !lastName){
    throw new Error("firstName or lastName is missing")
}else if(!email){
    throw new Error("Missing email")
}
else if( !validator.isEmail(email)){
    throw new Error("Email is not correct")
}
else if(!password){
    throw new Error("Password is missing")
}
else if(typeof(password)!=="string"){
    throw new Error("Password must be string")
}
else if(!age){
    throw new Error("Age is missing")
}
else{
    console.log("Valid body parameters")
}
} 

module.exports=checkSignUpCredentials