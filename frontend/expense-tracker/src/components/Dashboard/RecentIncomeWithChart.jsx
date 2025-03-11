import React, { useState, useEffect } from 'react'
import CustomPieChart from '../Charts/CustomPieChart.jsx';

const COLORS = ["#875CF5", "#FA2C97", "#FF6900", "#4f39f6"]
function RecentIncomeWithChart({ data, totalIncome }) {

    const [charData, setCharData] = useState([])
    const [dashboardData, setDashboardData] = useState(null);

    const PrepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,

        }));
        setCharData(dataArr)
    };

    useEffect(() => {
        PrepareChartData()

        return () => { }
    }, [data])

    return (
        <div className='card'>


            {/* {dashboardData?.last60DaysIncome?.transaction?.length > 0 ? (
                <CustomPieChart
                    data={charData}
                    label="Total Income"
                    totalAmount={`${totalIncome}`}
                    colors={COLORS}
                    showTextAnchor
                />
            ) : (
                <p className="text-gray-500 flex items-center justify-center">No last 60 days income</p>
            )} */}


            <div className="flex items-center justify-between">
            <h5 className="text-lg">Last 60 Days Income</h5>
        </div>

        <CustomPieChart
        data={charData}
        label="Total Income"
        totalAmount={`${totalIncome}`}
        colors={COLORS}
        showTextAnchor
        />
        </div>
    )
}

export default RecentIncomeWithChart

//?.length > 0