import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserAuthContextProvider } from "./context/userAuthContext";
import MapPage from "./components/MapPage";
import StoreAdmin from "./StoreAdmin";
import NewsPage from "./components/NewsPage";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/admin/*" element={<StoreAdmin />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
