import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomeHome from "./components/HomeHome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserAuthContextProvider } from "./context/userAuthContext";
import MapPage from "./components/MapPage";
import NewsPage from "./components/NewsPage";
import CreateTripForm from "./components/CreateTripForm";
import SingleTrip from "./components/SingleTrip";
import AllTrips from "./components/AllTrips";
import SingleUser from "./components/SingleUser";
import Navbar from "./components/Navbar";
import { checkUser } from "./store/reducers/user";
import { auth } from "./firebase-config";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
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
  const dispatch = useDispatch();
  auth.onAuthStateChanged((authData) => {
    dispatch(checkUser(authData.uid, authData.email));
  });
  return (
    <UserAuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeHome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<SingleUser />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route exact path="/trips" element={<AllTrips />} />
        <Route path="/trips/:tripId" element={<SingleTrip />} />
        <Route path="/createTripForm" element={<CreateTripForm />} />
      </Routes>
      <Footer />
    </UserAuthContextProvider>
  );
}

export default App;
