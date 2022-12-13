import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserAuthContextProvider } from "./context/userAuthContext";
import MapPage from "./components/MapPage";
import CreateTripForm from "./components/CreateTripForm";
import SingleTrip from "./components/SingleTrip";
import AllTrips from "./components/AllTrips";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map" element={<MapPage />} />
        <Route exact path="/trips" element={<AllTrips />} />
        <Route path="/trips/:tripId" element={<SingleTrip />} />
        <Route path="/createTripForm" element={<CreateTripForm />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
