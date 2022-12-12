import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomeHome from './components/HomeHome';
import Login from './components/Login';
import Signup from './components/Signup';
import { UserAuthContextProvider } from './context/userAuthContext';
import MapPage from './components/MapPage';
import NewsPage from './components/NewsPage';
import CreateTripForm from './components/CreateTripForm';
import SingleTrip from './components/SingleTrip';
import AllTrips from './components/AllTrips';
import SingleUser from './components/SingleUser';
import Navbar from './components/Navbar';
import { checkUser } from './store/reducers/user';
import { auth } from './firebase-config';
import { useDispatch } from 'react-redux';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  auth.onAuthStateChanged(authData => {
    if (authData && authData.uid)
      dispatch(checkUser(authData.uid, authData.email));
  });

  return (
    <UserAuthContextProvider>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<HomeHome />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user' element={<SingleUser />} />
        <Route path='/map' element={<MapPage />} />
        <Route path='/news' element={<NewsPage />} />
        <Route exact path='/trips' element={<AllTrips />} />
        <Route path='/trips/:tripId' element={<SingleTrip />} />
        <Route path='/createTripForm' element={<CreateTripForm />} />
      </Routes>
      <Footer />
    </UserAuthContextProvider>
  );
}

export default App;
