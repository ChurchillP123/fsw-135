import React, { useContext } from 'react'
import { Routes, Route, Navigate, Redirect } from 'react-router-dom'
import Auth from './components/Auth.js'
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFoundPage from './components/NotFoundPage.js';

import { UserContext } from './context/UserProvider.js'

export default function App(){
  const  context  = useContext(UserContext)
  const token = context.userState.token;
  console.log(token)
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={token ? <Navigate to="/profile" /> : <Navigate to="/signup"/>} /> 
        <Route exact path="/profile" element={token ? <Profile /> : <Navigate to="/signup"/>} /> 
        <Route exact path="/signup" element={token ? <Navigate to="/profile" /> : <Signup/>} /> 
        <Route exact path="/login" element={ token ? <Navigate to="/profile"/> : <Login /> } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}