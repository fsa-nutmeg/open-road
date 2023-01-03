import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenRoadLogo from "../OpenRoadLogo.png";
import DefaultUserPhoto from "../PngItem_6490124.png";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
      <a className="logo" href="/">
        <img src={OpenRoadLogo} alt="Open Road Logo" />
      </a>
      <div className="flex items-center space-x-7 pr-4">
        <NavLink className="bg-slate-800 rounded-md no-underline" to="/">
          <h4 className="text-white text-sm pl-2 pr-2 pt-1">Home</h4>
        </NavLink>
        <NavLink className="bg-slate-800 rounded-md no-underline" to="/map">
          <h4 className="text-white text-sm pl-2 pr-2 pt-1 ">Map</h4>
        </NavLink>
        <NavLink className="bg-slate-800 rounded-md no-underline" to="/trips">
          <h4 className="text-white text-sm pl-2 pr-2 pt-1">Trips</h4>
        </NavLink>
        {/* <NavLink className="bg-slate-800 rounded-md no-underline" to="/news">
          <h4 className="text-white text-sm pl-2 pr-2 pt-1">News</h4>
        </NavLink> */}
      </div>
      <NavLink className="no-underline" to="/user">
        <div className="flex flex-shrink-0 items-center space-x-4 text-white">
          <div className="flex flex-col items-end ">
            {user ? (
              <div className="text-md font-medium ">{user.identifier}</div>
            ) : (
              <NavLink
                className="text-md font-medium no-underline text-white"
                to="/login"
              >
                Login
              </NavLink>
            )}
          </div>

          <div className="h-10 w-10 rounded-full cursor-pointer bg-gray-200 border-2 border-blue-400">
            <img alt="Default User" src={DefaultUserPhoto} />
          </div>
        </div>
      </NavLink>
    </header>
  );
};

export default Navbar;
