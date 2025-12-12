import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../constants';
import { removeFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const loggedInUser = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const reviewSuggestion = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeFromFeed(id));
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  if (!user) {
  return (
    <div className='flex justify-center text-2xl bold mt-10'>
      No new users found
    </div>
  );
}

const { _id, firstName, lastName, skills, about, photoUrl, age } = user;


const isOwnProfile =!user._id || String(loggedInUser?._id) === String(user._id);

console.log({
  loggedInUserId: loggedInUser?._id,
  cardUserId: _id,
  isOwnProfile
});

  return (
    <div className="flex justify-center mt-5">
      <div className="card bg-base-100 shadow-md w-full max-w-sm">
        <figure className="shrink-0 max-h-80 max-w-80 flex items-center">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="h-full w-auto object-contain"
          />
        </figure>

        <div className="card-body gap-2 py-4">
          <h2 className="card-title mb-1">New Suggestion</h2>

          <div className="space-y-1">
            <p>{firstName}</p>
            <p>{age}</p>
            <p>{about}</p>
            <p>{skills}</p>
          </div>

          <div className="card-actions justify-end">
            <button
              className="btn btn-primary px-5"
              onClick={() => !isOwnProfile && reviewSuggestion("ignored", _id)}
              disabled={isOwnProfile}
            >
              Ignore
            </button>

            <button
              className="btn btn-secondary px-5"
              onClick={() => !isOwnProfile && reviewSuggestion("interested", _id)}
              disabled={isOwnProfile}
            >
              Interested
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};


export default UserCard
