import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser } from '../store/reducers/allUsers';

const SingleUser = () => {
  const { user } = useSelector(state => state.user);
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
if(user === null){
  return (<div>user is null</div>)
}
  return (
    <div>
      <Navbar />
      {user.id}
      {user.identifier}
      <button className='text-red-800' onClick={handleLogout}>
          Log out
        </button>
      </div>
  )
}

export default SingleUser
