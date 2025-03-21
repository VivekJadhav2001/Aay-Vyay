import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS, BASE_URL } from '../../utils/apiPaths';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

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
            const response = await fetch(`${BASE_URL}${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`, {
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
            // console.log("Get All Expense Data Response:", data);
            setExpenseData(data.data);

        } catch (error) {
            // console.log("Something went wrong. Please try again later", error);
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
        
            const response = await fetch(`${BASE_URL}${API_PATHS.EXPENSE.ADD_EXPENSE}`, {
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
            // console.log("Something went wrong. Please try again later", error);
            setError("Failed to Add Expense.");
        }

    }

     //DeleteExpense
     const deleteExpense = async (id) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            
            const response = await fetch(`${BASE_URL}${API_PATHS.EXPENSE.DELETE_EXPENSE(id)}`, {
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
            toast.success("Expense details deleted successfully");
            fetchExpenseDetails();
            
        } catch (error) {
            console.log("Error deleting expense:", error.message || "Unknown error");
        }
    };
    

    // handle download expense details
    const handleDownloadExpenseDetails = async () => {}

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

                    <ExpenseList
                    transactions={expenseData}
                    onDelete={(id) => {
                        setOpenDeleteAlert({show: true, data: id})
                    }}
                    onDownload={handleDownloadExpenseDetails}
                    />

                </div>
                <Modal
                isOpen={openAddExpenseModal}
                onClose={() => setOpenAddExpenseModal(false)}
                title="Add Expense"
                >
                <AddExpenseForm onAddExpense={handleAddExpense}/>
                </Modal>

                <Modal
                isOpen={openDeleteAlert.show}
                onClose={() => setOpenDeleteAlert({show: false, data: null})}
                title="Delete Expense"
                >
                    <DeleteAlert
                    content="Are you sure you want to delete this Expense details"
                    onDelete={()=> deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense