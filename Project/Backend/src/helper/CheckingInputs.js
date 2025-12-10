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

const checkEditCredentials=(req)=>{
    const Allowed_Updates=["firstName","lastName","age","photoUrl","about","skills","gender"]
    if(Object.keys(req.body).length===0)throw new Error("Please pass the fields to edit");

    const isAllowed=Object.keys(req.body).every((field)=>{
       return Allowed_Updates.includes(field)
    })

    if(!isAllowed){
        throw new Error("Email/password is not editable")
    }
    
}

module.exports={checkSignUpCredentials,
    checkLoginCredentials,
    checkEditCredentials
}