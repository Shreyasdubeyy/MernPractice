import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../constants'
import axios from "axios"
import { removeUser } from '../utils/userSlice'

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const closeDropdown = () => {
    document.activeElement?.blur();
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">GeekConnect</a>
      </div>

      {user && (
        <div className="flex gap-2 mx-10">
          <p className="mt-1">{user.firstName}</p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" onClick={closeDropdown}>
                  Profile
                </Link>
              </li>

              <li>
                <a onClick={closeDropdown}>Settings</a>
              </li>

              <li>
                <a
                  onClick={() => {
                    closeDropdown();
                    handleLogout();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

