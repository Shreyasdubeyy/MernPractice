import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../constants'
import { useEffect } from 'react'
import axios from 'axios'
import { addConnection } from '../utils/connectionSlice'
import { useState } from 'react'



const Connections = () => {

const [selectedUser, setSelectedUser] = useState(null);

const dispatch=useDispatch()
const connectionSelector=useSelector((store)=>store.connection)

const getConnections=async()=>{
    const res=await axios.get(BASE_URL+"/connections",{withCredentials:true})
    console.log(res.data.connections)
    dispatch(addConnection(res.data.connections))
}

useEffect(()=>{
    getConnections()
    console.log(connectionSelector)
},[])



 if (connectionSelector === null) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (connectionSelector.length === 0) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        No connections found
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Connections</h2>

      <div className="flex flex-col gap-4">
        {connectionSelector.map((conn) => (
          <div
            key={conn._id}
            className="card bg-base-200 shadow-md p-4 flex flex-row items-center gap-4"
          >
            
            <div className="avatar">
              <div className="w-20 h-20 rounded-full">
                <img
                  src={conn.photoUrl || "https://via.placeholder.com/150"}
                  alt="profile"
                />
              </div>
            </div>

            
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-lg font-bold">
                {conn.firstName} {conn.lastName}
              </h3>


              {conn.gender && (
                <p className="text-sm">
                  <span className="font-semibold">Gender:</span> {conn.gender}
                </p>
              )}

              {conn.age && (
                <p className="text-sm">
                  <span className="font-semibold">Age:</span> {conn.age}
                </p>
              )}
            </div>

            
            <div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setSelectedUser(conn)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialogue box after view */}
      {selectedUser && (
        <dialog id="detailsModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {selectedUser.firstName} {selectedUser.lastName}
            </h3>

            <div className="flex items-center gap-4">
              <img
                src={selectedUser.photoUrl || "https://via.placeholder.com/150"}
                className="w-24 h-24 rounded-full"
                alt="profile"
              />

              <div className="flex flex-col">
                <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
                <p><span className="font-semibold">About:</span> {selectedUser.about}</p>
                <p><span className="font-semibold">Skills:</span> {selectedUser.skills.join(", ")}</p>

                
                {selectedUser.gender && (
                  <p><span className="font-semibold">Gender:</span> {selectedUser.gender}</p>
                )}
                {selectedUser.age && (
                  <p><span className="font-semibold">Age:</span> {selectedUser.age}</p>
                )}
              </div>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedUser(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
export default Connections
