import React from 'react'
import Card2 from '../../assets/images/card2.jpg'
import { TrendingUpDown } from 'lucide-react';

function AuthLayout({children}) {
  return (
    <div className='flex '>
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
            <h2 className="text-lg font-medium text-black mb-4">Expense Tracker</h2>
            {children} 
        </div>

        <div className="hidden md:block w-[40vw] h-screen bg-[#70AD46] bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
            <div className="w-48 h-48 rounded-[40px] bg-[#92f650] absolute -top-7 -left-5"></div>
            <div className="w-48 h-56 rounded-[40px] border-[20px] border-[#5ef159] absolute to-[30%] -right-10"></div>
            <div className="w-48 h-48 rounded-[40px] bg-[#84e146] absolute -bottom-7 -left-5"></div>

            <div className="grid grid-col-1 z-20">
                <StatsInfoCard
                    icon={<TrendingUpDown />}
                    label="Track Your Income & Expenses"
                    value="430,000"
                    color="bg-primary"
                />
            </div>


            <img src={Card2} alt="" className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15" />
        </div>

    </div>
  )
}

export default AuthLayout

const StatsInfoCard = ({icon, label, value, color}) => {
    return <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-green-400/10 border border-gray-200/50 z-10">
        <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div className="">
            <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
            <span className="text-[20px]">${value}</span>
        </div>
    </div>
}