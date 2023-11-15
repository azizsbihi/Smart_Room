import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
/* import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"; */
import Auth from './Pages/Auth';
import NotFound from './Pages/NotFound';
import Landing from './Pages/Landing';
import Dashboard from './Pages/Dashboard';
import Devices from './Pages/Devices';
import Weather from './Pages/Weather';
import Cards from './Pages/Cards';
import Main from './Pages/Main';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { hideError } from './controllers/error';
import { verifyIsConnected } from './controllers/auth';
import CardAdministration from './Pages/CardAdministration';
function App() {

  const error = useSelector(state => state.errorReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyIsConnected())
  }, []);

  useEffect(() => {
    console.log(error)
    dispatch(hideError())
  }, [error]);
  return (
    <Router>
      {error&&<div className='z-10 absolute bg-opacity-60 bg-white bottom-5 right-5 rounded-full p-3 w-1/3'>
        {error.message}
      </div>}

      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/dashboard' element={<Dashboard/>} >
          <Route index element={<Main/>}/>
          <Route path='devices' element={<Devices/>}/>
          <Route path='weather' element={<Weather/>}/>
          <Route path='cards' element={<Cards/>}/>
          <Route path='admin' element={<CardAdministration/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
