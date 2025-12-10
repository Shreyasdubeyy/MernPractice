  import React, { useEffect } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { BASE_URL } from '../constants'
  import { addFeed } from '../utils/feedSlice'
  import axios from "axios"


  const Feed = () => {

  const dispatch=useDispatch()
  const feed=useSelector((store)=>store.feed)

  const getFeed=async()=>{
    
  if(feed)return;

  const res=await axios.get(BASE_URL+"/feed",{withCredentials:true})


  dispatch(addFeed(res.data))

  }

  useEffect(()=>{
    getFeed()
  },[])

 if(feed){
    const {firstName,lastName,skills,about,photoUrl,age}=feed[0]
  


    return (
   <div className="flex justify-center mt-5">
  <div className="card card-side bg-base-100 shadow-sm items-center mt-16">

    {/* IMAGE */}
    <figure className="shrink-0 max-h-80 max-w-80 flex items-center">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyTTDr-b3Q1sQsRRcmzjq0PHdImZfTpyq5KBTB1YuUAhirr1OpeFVhd_Ll2nw7qzI2iSM-0Pwu6YxDNINKTpWGPYJr1tIBkEkKUIjXhLXDoQ&s=10"
        alt={`${firstName} ${lastName}`}
        className="h-full w-auto object-contain"
      />
    </figure>

    {/* CONTENT */}
    <div className="card-body gap-2 py-4">
      <h2 className="card-title mb-1">New Suggestion</h2>

      <div className="space-y-1">
        <p>{firstName}</p>
        <p>{age}</p>
        <p>{about}</p>
        <p>{skills}</p>
      </div>

      <div className="card-actions justify-end">
        <button className="btn btn-primary px-5">Ignore</button>
        <button className="btn btn-secondary px-5">Interested</button>
      </div>
    </div>

  </div>
</div>

    )
    
  }
  }
  export default Feed
