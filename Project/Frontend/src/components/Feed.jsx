  import React, { useEffect } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { BASE_URL } from '../constants'
  import { addFeed } from '../utils/feedSlice'
  import axios from "axios"
import UserCard from './UserCard'


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
 
    return (
      <UserCard user={feed[0]}/>
    )
    
  }

else{
  return(
    <>
    No Users found
    </>
  )
}
  }
  export default Feed
