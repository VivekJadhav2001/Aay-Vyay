import React, { useState, useEffect } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper.js'
import CustomBarChart from '../Charts/CustomBarChart.jsx'

function Last30DaysExpense({data}) {

    const [charData, setCharData] = useState([])

    useEffect(() => {
        const result = prepareExpenseBarChartData(data)
        setCharData(result)

        return () => {}
    },[data])
  return (
    <div className="card col-span-1">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart data={charData} />
    </div>
  )
}

export default Last30DaysExpense