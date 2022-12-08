import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserAuthContextProvider } from "./context/userAuthContext";
import MapPage from "./components/MapPage";
import NewsPage from "./components/NewsPage";
import CreateTripForm from "./components/CreateTripForm";
import SingleTrip from "./components/SingleTrip";
import AllTrips from "./components/AllTrips";
import SingleUser from "./components/SingleUser";
import HomeHome from "./components/HomeHome";
//import { useDispatch, useSelector } from 'react-redux';
//import { fetchAllUsers } from './store/reducers/allUsers';
//import { useEffect } from 'react';

function App() {
  /* COMMENTED CODE SUBSCRIBES TO STATE.ALLUSERS
     & FETCHES ALLUSERS FROM DB
     ----> WORKS AS IT SHOULD, BUT
     ----> ONLY LEAVING FOR NOW FOR AN EXAMPLE

  const dispatch = useDispatch();
  const { allUsers } = useSelector(state => state.allUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
    console.log(allUsers);
  });*/

  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeHome />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<SingleUser />} />
        <Route path="/news" element={<NewsPage />} />
        <Route exact path="/trips" element={<AllTrips />} />
        <Route path="/trips/:tripId" element={<SingleTrip />} />
        <Route path="/createTripForm" element={<CreateTripForm />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
