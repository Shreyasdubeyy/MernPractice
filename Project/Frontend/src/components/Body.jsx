import React from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import {BASE_URL} from "../constants"
import { useDispatch, useSelector } from 'react-redux'
import {addUser} from "../utils/userSlice"
import { useEffect } from 'react'

const Body = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userStored=useSelector((store)=>store.user)
  const fetchUser=async()=>{
    try {
      if(!userStored){

        const res=await axios.get(BASE_URL+"/profile/view",{
        withCredentials:true
      })
      
      dispatch(addUser(res.data))
    }
    } catch (error) {
      
        if (error.response?.status === 401) {
    navigate("/login")
  }
    }
  }
useEffect(()=>{
  fetchUser()
},[])

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Body
