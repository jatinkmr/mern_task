import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './components/Login';
import SignIn from './components/SignUp';
import Home from './components/Home';

export function App () {

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignIn />} />

        <PrivateRoute path="/home" element={Home} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
