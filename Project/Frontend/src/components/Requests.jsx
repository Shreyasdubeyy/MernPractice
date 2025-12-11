import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../constants';
import { useEffect } from 'react';
import { addRequests, removeRequests } from '../utils/requestsSlice';
import { useState } from 'react';

const Requests = () => {

  const [selectedReq, setSelectedReq] = useState(null);

  const [toastMsg, setToastMsg] = useState(null);


const dispatch=useDispatch();
const requestSelector=useSelector(store=>store.request)

const getRequests=async()=>{
    const res=await axios.get(BASE_URL+"/received/requests",{withCredentials:true})
    console.log(res.data)
    dispatch(addRequests(res.data))
}

useEffect(()=>{
    getRequests()
},[])

if(!requestSelector){
    <div>Loading..</div>
}

  // Loading state
  if (requestSelector === null) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Empty state
  if (requestSelector.length === 0) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        No requests found
      </div>
    );
  }



  const reviewRequest=async(status,id)=>{
    try {
        await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true})
     setToastMsg(`Request ${status}`);

    
    dispatch(removeRequests(id));

    
    setTimeout(() => setToastMsg(null), 2000);
    } catch (error) {
        console.log(error.message)
    }
  }

  return  (
   <div className="p-4">
  <h2 className="text-xl font-bold mb-4">Requests</h2>

  <div className="flex flex-col gap-4">
    {requestSelector.map((req) => (
      <div
        key={req._id}
        className="card bg-base-200 shadow-md p-4 flex flex-row items-center gap-4"
      >
        {/* Image */}
        <div className="avatar">
          <div className="w-20 h-20 rounded-full">
            <img src={req.SenderId.photoUrl} alt="profile" />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1 flex-1">
          <h3 className="text-lg font-bold">
            {req.SenderId.firstName} {req.SenderId.lastName}
          </h3>

          {req.gender && (
            <p className="text-sm opacity-80">
              <span className="font-semibold">Gender</span> {req.gender}
            </p>
          )}

          <p className="text-sm opacity-60">
            <span className="font-semibold">Requested On:</span>{" "}
            {new Date(req.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button className="btn btn-success btn-sm" onClick={()=>reviewRequest("accepted",req._id)}>Accept</button>
          <button className="btn btn-error btn-sm" onClick={()=>reviewRequest("rejected",req._id)}>Reject</button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => setSelectedReq(req)}
          >
            View
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Modal */}
  {selectedReq && (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {selectedReq.SenderId.firstName} {selectedReq.SenderId.lastName}
        </h3>

        <div className="flex items-center gap-4">
          <img
            src={selectedReq.SenderId.photoUrl}
            className="w-24 h-24 rounded-full"
            alt="profile"
          />

          <div className="flex flex-col gap-1">
            <p>
              <span className="font-semibold">Age:</span>{" "}
              {selectedReq.SenderId.age}
            </p>

            <p>
              <span className="font-semibold">About:</span>{" "}
              {selectedReq.SenderId.about}
            </p>

            <p>
              <span className="font-semibold">Skills:</span>{" "}
              {selectedReq.SenderId.skills.join(" ,")}
            </p>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={() => setSelectedReq(null)}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  )}
  {toastMsg && (
  <div className="toast toast-top toast-end">
    <div className="alert alert-info">
      <span>{toastMsg}</span>
    </div>
  </div>
)}

</div>
  )
};



export default Requests
