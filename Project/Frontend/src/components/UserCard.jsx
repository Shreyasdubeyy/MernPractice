import React from 'react'

const UserCard = ({user}) => {
    const {firstName,lastName,skills,about,photoUrl,age}=user

  return (
     <div className="flex justify-center mt-5">
<div className="card bg-base-100 shadow-md w-full max-w-sm">

    {/* IMAGE */}
    <figure className="shrink-0 max-h-80 max-w-80 flex items-center">
      <img
        src={photoUrl}
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

export default UserCard
