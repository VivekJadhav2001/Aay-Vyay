import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Income } from "../models/Income.model.js";
import { Expense } from "../models/Expense.model.js";

import { isValidObjectId, Types } from "mongoose";



const getDashboardData = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const userObjectId = new Types.ObjectId(String(userId))

    //Fetch Total income and expense
    const totalIncome = await Income.aggregate([
        {
            $match: {
                userId: userObjectId
            }
        },
        {
            $group: {
                _id: null, 
                total: {
                    $sum: "$amount"
                }
            }
        }
    ])

    console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

    //Fetch Total expense and expense
    const totalExpense = await Expense.aggregate([
        {
            $match: {
                userId: userObjectId
            }
        },
        {
            $group: {
                _id: null, 
                total: {
                    $sum: "$amount"
                }
            }
        }
    ])

    //Get income transaction in the last 60 days
    const last60DaysIncomeTransaction = await Income.find({
        userId,
        date: {
            $gte: new Date(Date.now - 60 * 24 * 60 * 1000)
        },
    }).sort({date: -1})
    
    //Get total income for last 60 days
    const incomeLast60Days = last60DaysIncomeTransaction.reduce((sum, transaction) => sum + transaction.amount, 0)

    //Get expense transaction in the last 30 days
    const last30DaysExpenseTransaction = await Expense.find({
        userId,
        date: {
            $gte: new Date(Date.now - 30 * 24 * 60 * 1000)
        },
    }).sort({date: -1})

    //Get total expense for last 30 days
    const expensesLast30Days = last30DaysExpenseTransaction.reduce((sum, transaction) => sum + transaction.amount, 0)

    //Fetch last 5 transaction (income + expense)

    const lastTransaction = [
        ...(await Income.find({userId}).sort({date: -1}).limit(5).map(
        (txn) => ({
            ...txn.toObject(),
            type: "income"
        })
        )),
        ...(await Expense.find({userId}).sort({date: -1}).limit(5).map(
            (txn) => ({
                ...txn.toObject(),
                type: "expense"
            })
            ))
    ].sort((a,b) => b.date - a.date)  //sort latest first


    //final Response
    res.json({
        totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        totalIncome : totalIncome[0]?.total || 0,
        totalExpense : totalExpense[0]?.total || 0,
        last30DaysExpense:{
            total: expensesLast30Days,
            transaction: last30DaysExpenseTransaction,
        },
        last60DaysIncome: {
            total: incomeLast60Days,
            transaction: last60DaysIncomeTransaction
        },
        recentTransaction: lastTransaction
    })


    //response
    return res.status(500)
    .json(
        new ApiResponse(500,)
    )
})


export { getDashboardData }