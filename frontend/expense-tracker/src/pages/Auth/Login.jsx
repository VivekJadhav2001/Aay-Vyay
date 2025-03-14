import React, { useState,useContext  } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper.js'
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/UserContext.jsx';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext)
  // console.log(updateUser);
  

  const navigate = useNavigate()

  // Handle Login Form submit
  const handleLogin = async (e) => {
    e.preventDefault();


    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError("")

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      // console.log("Login Response:", response.data); // Add this log

      const { refreshToken, accessToken, user } = response.data.data;

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
        updateUser(user)
        localStorage.setItem("accessToken", accessToken); // Store the accessToken too
        navigate("/dashboard");
      } else {
        setError("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      // console.log("Login Error:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, Please try again");
      }
    }

  }


  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center items-center bg-zinc-300 rounded-2xl'>
        <h3 className='text-xl font-semibold text-bold'>Welcome back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your email and password to login
        </p>

        <form onSubmit={handleLogin} >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='Email Address'
            placeholder='vivek@example.com'
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label='Password'
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button className='btn-primary cursor-pointer' type='submit'>Login</button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <Link className='font-medium text-primary underline' to='/signUp'>
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login