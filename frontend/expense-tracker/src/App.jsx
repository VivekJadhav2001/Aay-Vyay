import React,{ useState } from 'react'

import { 
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate,
} from 'react-router-dom';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/signUp" exact element={<SignUp/>} />
          <Route path="/dashboard" exact element={<Home/>} />
          <Route path="/income" exact element={<Income/>} />
          <Route path="/expense" exact element={<Expense/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

const Root = () => {
  // Check if token exists in localStorage
  const isAuthenicated = !!localStorage.getItem('token');

  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenicated ? (<Navigate to="/dashboard" />) : (<Navigate to="/login" />);
};
