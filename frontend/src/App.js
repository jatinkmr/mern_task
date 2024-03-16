import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './components/Login';
import SignIn from './components/SignUp';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignIn />} />

        <Route exact path='/home' element={<PrivateRoute/>}>
          <Route exact path='/home' element={<Home/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
