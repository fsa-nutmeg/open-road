import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTrip } from "../store/reducers/trip";

const CreateTripForm = () => {
  const dispatch = useDispatch();

  const [originLat, originLong] = JSON.parse(localStorage.getItem("origin"));
  const [destLat, destLong] = JSON.parse(localStorage.getItem("dest"));
  const uid = localStorage.getItem("uid") || null;

  const [formData, setFormData] = useState({
    name: "",
    originLat: originLat,
    originLong: originLong,
    destLat: destLat,
    destLong: destLong,
    uid: uid,
  });

  const [redirect, updateRedirect] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.length) {
      alert("Please name your route before submitting.");
    } else {
      const { name, originLat, originLong, destLat, destLong, uid } = formData;
      const trip = {};
      trip.name = name;
      trip.owner = uid;
      trip.coordinates = [
        [+originLat, +originLong],
        [+destLat, +destLong],
      ];
      dispatch(createTrip(trip));
      updateRedirect(true);
    }
  };

  if (redirect) {
    // redirect to single trip page
    const tripId = localStorage.getItem("tripId");
    return <Navigate to={`../trips/${tripId}`} />;
  }

  return (
    <div>
      <form className="login">
        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <h2>Save Your Trip</h2>
          <div className="form-group col-md-6">
            <label for="name">Name of Trip</label>
            <input
              type="text"
              style={{ width: "48vw" }}
              className="form-control"
              name="name"
              placeholder={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <h3>Trip Origin</h3>

          <div className="form-group col-md-6">
            <label for="originLat">Lattitude</label>
            <input
              type="text"
              className="form-control"
              name="originLat"
              placeholder={formData.originLat}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="originLong">Longitude</label>
            <input
              type="password"
              className="form-control"
              name="originLong"
              placeholder={formData.originLong}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          {/* <div class="form-row"> */}
          <h3>Trip Destination</h3>
          <div className="form-group col-md-6">
            <label for="destLat">Lattitude</label>
            <input
              type="text"
              className="form-control"
              name="destLat"
              placeholder={formData.originLat}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label for="destLong">Longitude</label>
            <input
              type="text"
              className="form-control"
              name="destLong"
              placeholder={formData.originLong}
              onChange={handleChange}
            />
            {/* </div> */}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateTripForm;
