import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { UserAuthContextProvider } from './context/userAuthContext';
import MapPage from './components/MapPage';
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
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/map' element={<MapPage />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
