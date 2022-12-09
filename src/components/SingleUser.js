import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../store/reducers/allUsers";

const SingleUser = () => {
  const { user } = useSelector((state) => state.user);
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
  if (user === null) {
    return <div>user is null</div>;
  }
  return (
    <div className="bg-gray-800">
      <Navbar />
      <div className="flex flex-row justify-center items-center min-h-screen">
        <div className="content-center w-2/3">
          <div className="content-center items-center overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Trip Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {/* {name} */}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Owner</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {/* {owner} */}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Likes</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {/* {likes} */}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Curve Factor
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {/* {curveFactor} */}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">About</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                    incididunt cillum culpa consequat. Excepteur qui ipsum
                    aliquip consequat sint. Sit id mollit nulla mollit nostrud
                    in ea officia proident. Irure nostrud pariatur mollit ad
                    adipisicing reprehenderit deserunt qui eu.
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Coordinates
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul
                      // role="list"
                      className="divide-y divide-gray-200 rounded-md border border-gray-200"
                    >
                      <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div className="flex w-0 flex-1 items-center"></div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          {/* <div className="bg-white">
        {user.id}
        {user.identifier}
        <button className="text-red-800" onClick={handleLogout}>
          Log out
        </button>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
