// import React, {useEffect, useState} from 'react'
// import DashboardLayout from '../../components/layouts/DashboardLayout'
// import IncomeOverview from '../../components/Income/IncomeOverview'
// import { API_PATHS } from '../../utils/apiPaths'



// function Income() {
//   const [incomeData, setIncomeData] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null);
//   const [openDeleteAlert, setOpenDeleteAlert] = useState({
//     show: false,
//     data: null,
//   });

//   const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

//   //Get All income Details
//   const fetchIncomeDetails = async () => {
//     if (loading) return;

//         setLoading(true);
//         setError(null);

//         try { 
//           const accessToken = localStorage.getItem('accessToken');
//                       const response = await fetch(`${API_PATHS.INCOME.GET_ALL_INCOME}`, {
//                           method: 'GET',
//                           headers: {
//                               'Content-Type': 'application/json',
//                               'Authorization': `Bearer ${accessToken}`
//                           },
//                       });
          
//                       if (!response.ok) {
//                           const errorText = await response.text();
//                           throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
//                       }
          
          
//                       const data = await response.json();
//                       console.log("Get ALl Income Data Response:", data);
//                       setIncomeData(data.data);
          
//         } catch (error) {
//           console.log("Something went wrong. Please try again later", error);
//             setError("Failed to load Income data");
//         }
//   }

  
  

//   useEffect(() => {
//     fetchIncomeDetails()
//   },[])


//   return (
//     <DashboardLayout activeMenu="Income">
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="my-5 mx-auto px-4">
//         <div className="grid grid-cols-1 gap-6">
//           <div className="">
//             <IncomeOverview
//             transactions={incomeData}
//             onAddIncome={() => setOpenAddIncomeModal(true)}
//             />
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default Income

import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import { API_PATHS } from '../../utils/apiPaths';

function Income() {
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    // Get All income Details
    const fetchIncomeDetails = async () => {
        if (loading) return;

        setLoading(true);
        setError(null);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${API_PATHS.INCOME.GET_ALL_INCOME}`, {
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
            console.log("Get All Income Data Response:", data);
            setIncomeData(data.data);

        } catch (error) {
            console.log("Something went wrong. Please try again later", error);
            setError("Failed to load Income data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomeDetails();
    }, []); // <-- Added empty dependency array to run only on mount

    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto px-4">
            {/* {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>} */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Income;













  // //Handle Add Income
  // const handleAddIncome = async () => {}

  // //DeleteIncome
  // const deleteIncome = async () => {}

  // // handle download income details
  // const handleDownloadIncomeDetails = async () => {}