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



// import React, { useState, useContext } from 'react';
// import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
// import { useUserAuth } from '../../hooks/useUserAuth.jsx';
// import axiosInstance from '../../utils/axiosInstance.js';
// import { API_PATHS } from '../../utils/apiPaths.js';
// import { UserContext } from '../../context/UserContext.jsx';

// function Home() {
//   useUserAuth();
//   const { user } = useContext(UserContext);
  
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
//       console.log("Dashboard Data Response:", response.data);
//       if (response.data) {
//         setDashboardData(response.data);
//       }
//     } catch (error) {
//       console.log("Something went wrong:", error);
//       setError("Failed to load dashboard data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DashboardLayout activeMenu="Dashboard">
//       <div className="my-5 mx-auto">
//         <h2 className="text-xl font-bold">Welcome, {user?.fullName || "User"}!</h2>
        
//         <button 
//           className="btn-primary mt-4" 
//           onClick={fetchDashboardData} 
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Fetch Dashboard Data"}
//         </button>

//         {error && <p className="text-red-500 mt-3">{error}</p>}
        
//         {dashboardData && (
//           <div className="mt-5 p-4 bg-white rounded shadow">
//             <h3 className="text-lg font-semibold">Dashboard Data:</h3>
//             <pre className="text-sm text-gray-800">{JSON.stringify(dashboardData, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths.js';

function Home() {
    useUserAuth();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        if (loading) return;

        setLoading(true);
        setError(null);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${API_PATHS.DASHBOARD.GET_DATA}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
           }
           

            const data = await response.json();
            console.log("Dashboard Data Response:", data);
            setDashboardData(data.data);

        } catch (error) {
            console.log("Something went wrong. Please try again later", error);
            setError("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // console.log("Fetching from URL:", API_PATHS.DASHBOARD.GET_DATA);


    return (
<DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto px-4">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {dashboardData && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-center">
                                <div className="bg-purple-500 p-4 rounded-full">
                                    <i className="fas fa-wallet text-white"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-gray-500">Total Balance</h3>
                                    <p className="text-2xl font-bold">${dashboardData.totalBalance}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-center">
                                <div className="bg-orange-500 p-4 rounded-full">
                                    <i className="fas fa-credit-card text-white"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-gray-500">Total Income</h3>
                                    <p className="text-2xl font-bold">${dashboardData.totalIncome}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-center">
                                <div className="bg-red-500 p-4 rounded-full">
                                    <i className="fas fa-money-bill-wave text-white"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-gray-500">Total Expense</h3>
                                    <p className="text-2xl font-bold">${dashboardData.totalExpense}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Home;

