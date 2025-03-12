import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';

function Expense() {

  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);


      // Get All Expense Details
      const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);
        setError(null);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`, {
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
            console.log("Get All Expense Data Response:", data);
            setExpenseData(data.data);

        } catch (error) {
            console.log("Something went wrong. Please try again later", error);
            setError("Failed to load Expense data");
        } finally {
            setLoading(false);
        }
    };
    
    //Handle Add Expense
    const handleAddExpense = async (expense) => {
        const {category, amount, date, icon} = expense;

        //Validation checks
        if(!category.trim()){
            toast.error("Category is Required.");
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


        try {
            const accessToken = localStorage.getItem('accessToken');
        
            const response = await fetch(API_PATHS.EXPENSE.ADD_EXPENSE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    category,
                    amount,
                    date,
                    icon
                })
            });
        
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }
        
            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully");
            fetchExpenseDetails();
            
        } catch (error) {
            console.log("Something went wrong. Please try again later", error);
            setError("Failed to Add Expense.");
        }

    }

    useEffect(() => {
      fetchExpenseDetails();
        }, []);
    

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto px-4">
      {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                            transactions={expenseData}
                            onAddExpense={() => setOpenAddExpenseModal(true)}
                        />
                    </div>

                    {/* <IncomeList
                    transactions={incomeData}
                    onDelete={(id) => {
                        setOpenDeleteAlert({show: true, data: id})
                    }}
                    onDownload={handleDownloadIncomeDetails}
                    /> */}
                </div>
      </div>
    </DashboardLayout>
  )
}

export default Expense