import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchAllTrips } from "../store/reducers/allTrips";

const AllTrips = () => {
  const dispatch = useDispatch();
  dispatch(fetchAllTrips());
  const navigate = useNavigate();

  const { allTrips } = useSelector((state) => state.allTrips);
  const [redirect] = useState(false);

  // const handleClick = (e) => {
  //   redirectTo(e.target.id);
  // };

  if (!allTrips.length) return <div>Loading Trips...</div>;
  if (redirect) return <Navigate to={`/trips/${redirect}`} />;
  return (
    <div>
      <div className="p-10 grid grid-cols-2 gap-20">
        {allTrips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => navigate(`./${trip.id}`)}
            id={trip.id}
          >
            {/* <div className="wrapper bg-white-400 antialiased text-gray-900 pointer-events-auto"> */}
            <div className="trips">
              <img
                src={trip.img_url || "./pics/default.jpg"}
                alt="none found"
                className="w-full object-cover object-center rounded-lg shadow-md"
              />

              <div className="relative px-4 -mt-6  ">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-baseline">
                    <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                      {trip.featured === true ? "Featured" : ""}
                    </span>
                    <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                      {" "}
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
    </div>
  );
};

export default AllTrips;
