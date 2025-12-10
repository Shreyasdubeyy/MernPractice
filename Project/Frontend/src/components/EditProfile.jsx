import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
//  const [formData, setFormData] = useState({
//     firstName:user.firstName,
//     lastName: user.lastName,
//     gender: user.gender,
//     photoUrl: user.photoUrl,
//     skills: user.skills,
//     about: user.about,
//     age: user.age
//   });
  
// const handleChange = (e) => {
//   const { name, value } = e.target;

//   setFormData((prev) => ({
//     ...prev,
//     [name]: value
//   }));
// };

const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [skills, setSkills] = useState(user.skills.map(value=>value+" "));
  const [about, setAbout] = useState(user?.about || "");
  const [age, setAge] = useState(user?.age || "");
  const[errorMessage,setErrorMessage]=useState("")
  const[showToast,setShowToast]=useState(false)


const dispatch=useDispatch()

const saveProfile=async()=>{
   try {
    setErrorMessage("")

     const res=await axios.patch(BASE_URL+"/profile/edit",{
        firstName:firstName,
        lastName:lastName,
        age:age,
        gender:gender,
        skills:skills,
        about:about,
        photoUrl:photoUrl
    },{withCredentials:true})

    dispatch(addUser(res.data.user))
    setShowToast(true)
    setTimeout(()=>{
        setShowToast(false)
    },3000)
    
   } catch (error) {
    setErrorMessage(error.response.data.message)
   }
}


return (
  <>
   
    {showToast && (
      <div className="toast toast-top toast-end z-50">
        <div className="alert alert-success">
          <span>User saved successfully ✅</span>
        </div>
      </div>
    )}

   
<div className="w-full flex justify-center px-4 py-10">
  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 ">

       
        <div className="w-full max-w-md bg-base-100 shadow-md p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold text-center">
            Edit Profile
          </h2>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="url"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            placeholder="Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="input input-bordered w-full"
          />

          <textarea
            placeholder="About you"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="textarea textarea-bordered w-full"
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input input-bordered w-full"
          />

          {errorMessage && (
            <p className="text-error text-sm">{errorMessage}</p>
          )}

          {/* ✅ BUTTON FIX */}
          <button
            onClick={saveProfile}
            className="
              w-full mt-6 py-3 rounded-lg
              bg-gradient-to-r from-indigo-500 to-purple-600
              text-white font-semibold
              hover:scale-105 transition-transform
            "
          >
            Save Changes
          </button>
        </div>

        
        <UserCard
          user={{ firstName, lastName, gender, age, photoUrl, about, skills }}
        />
      </div>
    </div>
  </>
);

};

export default EditProfile;
