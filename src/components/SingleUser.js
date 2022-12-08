import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { useDispatch } from 'react-redux';
import { createNewUser } from '../store/reducers/allUsers';
const SingleUser = () => {
  const { logOut, user } = useUserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
   dispatch(createNewUser('-dkfjghs7777','fake@email.com'));
   console.log()
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      SingleUser
      <button className='text-red-800' onClick={handleLogout}>
          Log out
        </button>
      </div>
  )
}

export default SingleUser
