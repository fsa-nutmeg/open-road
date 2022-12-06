import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";
import { Button } from "react-bootstrap";
import Navbar from "./Navbar";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <img src="https://www.mensjournal.com/wp-content/uploads/2018/07/Americas.jpg?quality=86&strip=all" />

      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;
