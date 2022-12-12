import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../store/reducers/allUsers";
import { fetchAllTrips } from "../store/reducers/allTrips";

const SingleUser = () => {
  const [userTrips, updates] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { allTrips } = useSelector((state) => state.allTrips);
  const { logOut } = useUserAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allTrips.length) {
      dispatch(fetchAllTrips());
    } else if (user) {
      const myTrips = allTrips.filter((trip) => {
        return trip.owner === user.id;
      });
      updates(myTrips);
    }
  }, [allTrips, user]);

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
      <div className="flex flex-row justify-center items-center min-h-screen">
        <div className="content-center w-2/3">
          <div className="content-center items-center overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-lg leading-6 text-gray-900 content-center items-center justify-center flex-row flex">
                {user.identifier}
              </h2>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Badges</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {user.badges.join(", ")}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Mileage</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex">
                    {user.mileage ? user.mileage : 0}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Saved Trips
                  </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 pt-10 grid grid-cols-2 gap-10">
                    {userTrips.map(trip => (
                  <div
                      key={trip.id}
                      onClick={() => navigate(`../trips/${trip.id}`)}
                      id={trip.id}
                      >
                    <div>
                      <img
                      src={trip.img_url || './pics/default.jpg'}
                      alt='none found'
                      className='w-full object-cover object-center rounded-lg shadow-md'
                      />
                      <div className="relative px-4 -mt-6  ">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                          <div className="flex items-baseline">
                            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                            label
                            </span>
                            <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                            {" "}
                            click me
                            </div>
                          </div>

                          <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                          {trip.name}

                          </h4>
                        </div>
                      </div>
                    </div>
                   </div> ))}
                 </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="flex content-center justify-center p-10">
            <button
              className="bg-gray-500 hover:bg-red-700 text-white font-bold pt-3 pb-3 pl-10 pr-10 rounded-full"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
