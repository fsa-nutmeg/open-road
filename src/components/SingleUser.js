import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { useDispatch, useSelector } from 'react-redux';
 import { fetchUser } from "../../src/store/reducers/user"
import { useEffect } from 'react';


const SingleUser = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  // const dispatch = useDispatch();
  // const { user: something } = useSelector(state => state.user);

  // useEffect(() => {
  //   dispatch(fetchUser(user.uid));
  //   console.log(user);
  // });

  return (
    <div>
      {/* {something} */}
      <Navbar />
      SingleUser
      <button className='text-red-800' onClick={handleLogout}>
          Log out
        </button>
      </div>
  )
}

export default SingleUser
