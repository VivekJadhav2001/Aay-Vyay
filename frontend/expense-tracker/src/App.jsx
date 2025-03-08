import React,{ useState } from 'react'

import { 
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate,
} from 'react-router-dom';

import Login from './pages/Auth/Login.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import Home from './pages/Dashboard/Home.jsx';
import Income from './pages/Dashboard/Income.jsx';
import Expense from './pages/Dashboard/Expense.jsx';


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
