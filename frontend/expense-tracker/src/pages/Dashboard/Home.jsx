// import React, { useEffect, useState } from 'react'
// import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
// import {useUserAuth} from '../../hooks/useUserAuth.jsx'
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance.js';
// import { API_PATHS } from '../../utils/apiPaths.js';
// function Home() {
//   useUserAuth();

//   const navigate = useNavigate();

//   const [dashboardData, setDashboardData] = useState(null)

//   const [loading, setLoading] =useState(false);

//   const fetchDashboardData = async () => {
//     if(loading) return;

//     setLoading(true);

//     try{
//       const response = await axiosInstance.get(
//         `${API_PATHS.DASHBOARD.GET_DATA}`
//       );

//       if(response.data){
//         setDashboardData(response.data)
//       }
//     }catch(error){
//       console.log("Something went Wrong. Please try again later",error);
      
//     }finally{
//       setLoading(false)
//     }
//   }


//   useEffect(() => {
//     fetchDashboardData()
//     return () => {}
//   }, [])


//   return (
//     <DashboardLayout activeMenu= "Dashboard">
//       <div className="my-5 mx-auto">
        
//       </div>
//     </DashboardLayout>
//   )
// }

// export default Home



import React, { useState, useContext } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/UserContext.jsx';

function Home() {
  useUserAuth();
  const { user } = useContext(UserContext);
  
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      console.log("Dashboard Data Response:", response.data);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong:", error);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-bold">Welcome, {user?.fullName || "User"}!</h2>
        
        <button 
          className="btn-primary mt-4" 
          onClick={fetchDashboardData} 
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Dashboard Data"}
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}
        
        {dashboardData && (
          <div className="mt-5 p-4 bg-white rounded shadow">
            <h3 className="text-lg font-semibold">Dashboard Data:</h3>
            <pre className="text-sm text-gray-800">{JSON.stringify(dashboardData, null, 2)}</pre>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Home;
