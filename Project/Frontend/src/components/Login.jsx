import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';

const Login = () => {
  const [mode, setMode] = useState("login");

  const [firstName, setFirstName] = useState("");
  const [age, setAge] = useState("");

  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("shreyas@gmail.com");
  const [password, setPassword] = useState("12345");

  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/feed");

    } catch (error) {
      setErrorMessage(error?.response?.data);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        { firstName, lastName, email, password,age},
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/profile");

    } catch (error) {
      setErrorMessage(error?.response?.data);
    }
  };

  return (
    <div className="flex-grow flex justify-center bg-base-100 pt-24">
      <div className="card w-full max-w-sm shadow-xl bg-base-300">
        <div className="card-body">

          <h2 className="card-title justify-center text-2xl mb-2">
            {mode === "login" ? "Login" : "Signup"}
          </h2>

          
          {mode === "login" && (
            <>
              <div className="form-control">
                <label className="label"><span className="label-text">Email:</span></label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-control mt-3">
                <label className="label"><span className="label-text">Password</span></label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          )}

          
          {mode === "signup" && (
            <>
              <div className="form-control mt-3">
                <label className="label"><span className="label-text">First Name</span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="form-control mt-3">
                <label className="label"><span className="label-text">Last Name</span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-control mt-3">
                <label className="label"><span className="label-text">age</span></label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="form-control mt-3">
                <label className="label"><span className="label-text">Email</span></label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-control mt-3">
                <label className="label"><span className="label-text">Password</span></label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          )}

          {/* ERROR */}
          <p className='text-red-500'>{errorMessage}</p>

          
          <div className="form-control mt-5 flex justify-center">
            <button
              className="btn btn-primary w-20 mt-1"
              onClick={mode === "login" ? handleLogin : handleSignup}
            >
              {mode === "login" ? "Login" : "Signup"}
            </button>
          </div>

          {/* SWITCH MODE */}
          <p className="text-center text-sm mt-2">
            {mode === "login" ? (
              <>
                New user?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setMode("signup")}
                >
                  Signup
                </span>
              </>
            ) : (
              <>
                Existing user?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setMode("login")}
                >
                  Login
                </span>
              </>
            )}
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
