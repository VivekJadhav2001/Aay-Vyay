import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper.js'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/UserContext.jsx';

function SignUp() {

  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

   const {updateUser} = useContext(UserContext)


  const navigate = useNavigate()

  // Handle Sign up Form Submit

  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = "";

    if(!fullName){
      setError("Please enter your name")
      return
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email")
      return
    }

    if(!password){
      setError("Please enter the password")
    }

    setError("")


    //SignUp API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
      });
  
      console.log("Signup Response:", response.data);
  
      if (response.data.success) {
        // alert("Registration successful! Please log in.");
        navigate("/login"); // Navigate to login after successful registration 
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Signup Error:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, Please try again");
      }
    }
    // try {

    //   // To Upload image if present
    //   // if(profilePic){                                                 //Refer uploadImage.js file
    //   //   const imgUploadRes = await uploadImage(profilePic);
    //   //   profileImageUrl = imgUploadRes.imageUrl || "";
    //   // }


    //   const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
    //     fullName,
    //     email,
    //     password,
    //   });

    //   const { refreshToken, user } = response.data.data;

    //   if(refreshToken){
    //     localStorage.setItem("refreshToken", refreshToken)
    //     updateUser(user)
    //     navigate("/dashboard");
    //   }

    // } catch (error) {
    //   console.log("Login Error:", error);
    //   if (error.response && error.response.data.message) {
    //     setError(error.response.data.message);
    //   } else {
    //     setError("Something went wrong, Please try again");
    //   }
    // }

  }

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto  mt-10 md:mt-0 flex flex-col justify-center  ">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6 ">
          Join us today by entering your details below
        </p>
      </div>

      <form action="" onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder={"Vivek"}
            type="text"
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label='Email Address'
            placeholder='vivek@example.com'
            type="text"
          />
          <div className="col-span-2">
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label='Password'
            placeholder="Min 8 characters"
            type="password"
          />
          </div>
          

        </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        
                  <button className='btn-primary cursor-pointer' type='submit'>Sign Up</button>
        
                  <p className='text-[13px] text-slate-800 mt-3'>
                    Already have an account?{" "}
                    <Link className='font-medium text-primary underline' to='/login'>
                    Login
                    </Link>
                  </p>
      </form>
    </AuthLayout>
  )
}

export default SignUp