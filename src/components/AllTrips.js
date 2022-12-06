import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchAllTrips } from "../store/reducers/allTrips";
import Navbar from "./Navbar";

const AllTrips = () => {
  const dispatch = useDispatch();
  dispatch(fetchAllTrips());

  const { allTrips } = useSelector((state) => state.allTrips);
  const [redirect, redirectTo] = useState(false);

  const handleClick = (e) => {
    console.log(e.target.id);
    redirectTo(e.target.id);
  };

  if (!allTrips.length) return <div>Loading Trips...</div>;
  if (redirect) return <Navigate to={`/trips/${redirect}`} />;
  return (
    <div>
      <Navbar />
      {allTrips.map((trip) => (
        <div key={trip.id} onClick={handleClick} id={trip.id}>
          {trip.name}
        </div>
      ))}
    </div>
  );
};

export default AllTrips;
