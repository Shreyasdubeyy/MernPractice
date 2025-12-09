import React from 'react'
import {useState} from "react"
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';



const Login = () => {

const [email,setEmail]=useState("shreyas@gmail.com");
const [password,setPassword]=useState("12345");

const[errorMessage,setErrorMessage]=useState("")

const dispatch=useDispatch()

const navigate=useNavigate()

const handleLogin=async()=>{
  try {
    const res=await axios.post(
      BASE_URL+"/login",
    {
      email,password
    },{
      withCredentials:true
    })
    console.log(res)
    dispatch(addUser(res.data.user))
    return navigate("/feed")


  } catch (error) {
    setErrorMessage(error?.response?.data)
    console.log(error.message)
  }
}


  return  (
    <div className="flex-grow flex justify-center bg-base-100 pt-24">
      <div className="card w-full max-w-sm shadow-xl bg-base-300">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-2">
            Login
          </h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered"
               value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
            <p className='text-red-500'>{errorMessage}</p>
          <div className="form-control mt-5 flex justify-center ">
           <button className="btn btn-primary w-20 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                   onClick={handleLogin}      
           >
               Login
            </button>
          </div>
        </div>
      </div>
    </div>
)}

export default Login
