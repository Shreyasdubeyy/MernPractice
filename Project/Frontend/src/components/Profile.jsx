import React, { useEffect } from 'react'
import EditProfile from './EditProfile'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {

const user=useSelector((store)=>store.user)

if (!user) {
  return <div>Loading profile...</div>;
}
  return (
   <EditProfile user={user}/>
  )
}

export default Profile
