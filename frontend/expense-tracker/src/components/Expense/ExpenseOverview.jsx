import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

function ExpenseOverview({ transactions, onAddExpense }) {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareExpenseBarChartData(transactions);
        setChartData(result);

        return () => { }
    }, [transactions])

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Expense Overview</h5>
                    <p className="text-xs">
                        Track your spendings trends over time and and gain insights your money goes.
                    </p>
                </div>
                <button className="add-btn" onClick={onAddExpense}>
                    <LuPlus className='text-lg' />
                    Add Expense
                </button>
            </div>

            <div className="mt-10">
                <CustomLineChart data={chartData}/>
            </div>

        </div>
    )
}

export default ExpenseOverview