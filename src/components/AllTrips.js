import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { Navigate } from "react-router-dom";
=======
import { Navigate, useNavigate } from "react-router-dom";
>>>>>>> dc56c75d49baa1ac4a248e1ddd594dbc40ea0622
import { fetchAllTrips } from "../store/reducers/allTrips";
import Navbar from "./Navbar";

const AllTrips = () => {
  const dispatch = useDispatch();
  dispatch(fetchAllTrips());
  const navigate = useNavigate();

  const { allTrips } = useSelector((state) => state.allTrips);
  const [redirect, redirectTo] = useState(false);

<<<<<<< HEAD
  const handleClick = (e) => {
    console.log(e.target.id);
    redirectTo(e.target.id);
  };
=======
  // const handleClick = (e) => {
  //   redirectTo(e.target.id);
  // };
>>>>>>> dc56c75d49baa1ac4a248e1ddd594dbc40ea0622

  if (!allTrips.length) return <div>Loading Trips...</div>;
  if (redirect) return <Navigate to={`/trips/${redirect}`} />;
  return (
    <div>
      <Navbar />
<<<<<<< HEAD
      {allTrips.map((trip) => (
        <div key={trip.id} onClick={handleClick} id={trip.id}>
          {trip.name}
        </div>
      ))}
=======
      <div className="p-10 grid grid-cols-2 gap-20">
        {allTrips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => navigate(`./${trip.id}`)}
            id={trip.id}
          >
            {/* <div className="wrapper bg-white-400 antialiased text-gray-900 pointer-events-auto"> */}
            <div>
              <img
                src="https://source.unsplash.com/random/350x350"
                alt=" random imgee"
                className="w-full object-cover object-center rounded-lg shadow-md"
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

                  {/* <div className="mt-1">
                      how many miles
                      <span className="text-gray-600 text-sm"></span>
                    </div>
                    <div className="mt-4">
                      <span className="text-teal-600 text-md font-semibold">
                        4/5 ratings{" "}
                      </span>
                      <span className="text-sm text-gray-600">
                        (based on 234 ratings)
                      </span>
                    </div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
>>>>>>> dc56c75d49baa1ac4a248e1ddd594dbc40ea0622
    </div>
  );
};

export default AllTrips;
