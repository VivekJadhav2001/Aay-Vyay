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
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

function Income() {

    useUserAuth();

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
    
    //Handle Add Income
    const handleAddIncome = async (income) => {
        const {source, amount, date, icon} = income;

        //Validation checks
        if(!source.trim()){
            toast.error("Source is Required.");
            return;
        }

        if(!amount || isNaN(amount) || Number(amount) <=0){
            toast.error("Amount should be a valid number greater than 0.");
            return;
        }
        if(!date){
            toast.error("Date is required")
            return;
        }

        // try {
        //     await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        //         source,
        //         amount,
        //         date,
        //         icon
        //     })

        //     setOpenAddIncomeModal(false)
        //     toast.success("Income added successfull")
        //     fetchIncomeDetails();

        // } catch (error) {
        //     console.log("Something went wrong. Please try again later", error);
        //     setError("Failed to Add Income.");
        // } 

        try {
            const accessToken = localStorage.getItem('accessToken');
        
            const response = await fetch(API_PATHS.INCOME.ADD_INCOME, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    source,
                    amount,
                    date,
                    icon
                })
            });
        
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }
        
            setOpenAddIncomeModal(false);
            toast.success("Income added successfully");
            fetchIncomeDetails();
            
        } catch (error) {
            console.log("Something went wrong. Please try again later", error);
            setError("Failed to Add Income.");
        }

    }
    
    //DeleteIncome
    const deleteIncome = async (id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
        
            const response = await fetch(API_PATHS.INCOME.DELETE_INCOME(id), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }
        
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income details deleted successfully");
            fetchIncomeDetails();
            
        } catch (error) {
            console.log("Error deleting income:", error.message || "Unknown error");
        }
        
    }
    
    // handle download income details
    const handleDownloadIncomeDetails = async () => {}
    useEffect(() => {
        fetchIncomeDetails();
    }, []); // <-- Added empty dependency array to run only on mount

    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto px-4">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>

                    <IncomeList
                    transactions={incomeData}
                    onDelete={(id) => {
                        setOpenDeleteAlert({show: true, data: id})
                    }}
                    onDownload={handleDownloadIncomeDetails}
                    />
                </div>

                <Modal
                isOpen={openAddIncomeModal}
                onClose={() => setOpenAddIncomeModal(false)}
                title="Add Income"
                >
                <AddIncomeForm onAddIncome={handleAddIncome}/>
                </Modal>

                <Modal
                isOpen={openDeleteAlert.show}
                onClose={() => setOpenDeleteAlert({show: false, data: null})}
                title="Delete Income"
                >
                    <DeleteAlert
                    content="Are you sure you want to delete this income details"
                    onDelete={()=> deleteIncome(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    );
}

export default Income;












