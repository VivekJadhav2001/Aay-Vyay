import { asyncHandler } from "../utils/asyncHandler.js";
import { Expense } from '../models/Expense.model.js'
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

import { uploadOnCloudinary } from "../utils/cloudinary.js"
import path from "path";
import * as xlsx from 'xlsx';

//Add expense source
const addExpense = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const { icon, category, amount, date } = req.body

    if (!category || !amount || !date) {
        throw new ApiError("All fields are required")
    }

    const newExpense = new Expense({
        userId,
        icon,
        category,
        amount,
        date: new Date(date)
    })
    await newExpense.save();

    return res
    .status(200)
    .json(
        new ApiResponse(200, newExpense, "New Expense Added Successfully")
    )
})

// get all expense source
const getAllExpense = asyncHandler(async (req, res) => {

    const userId = req.user._id

    const expense = await Expense.find({userId}).sort({date: -1})

    if(!expense){
            throw new ApiError(404, "Expense not found")
        }
        return res
        .status(200)
        .json(
            new ApiResponse(200, expense, "Fetched all Income sources")
        )
})

//delete Expense
const deleteExpense = asyncHandler(async (req, res) => {

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200)
    .json(
        new ApiResponse(200,{},"Expense Deleted Successfully")
    )
})

// download Expense Excel
const downloadExpenseExcel = asyncHandler(async (req, res) => {
    const userId = req.user._id
    
        const expense = await Expense.find({userId}).sort({date: -1})
    
        if (!expense || expense.length === 0) {
            throw new ApiError(404, "No expense records found");
        }
    
        //preparing data for excel
        const data = expense.map((item) => ({
            Source : item.source,
            category: item.category,
            Amount: item.amount,
            Date: item.date
        }))
    
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "expense");
        xlsx.writeFile(wb, "expense_details.xlsx")
    
        // Save the Excel file temporarily
        const filePath = path.join(process.cwd(), "temp_expense_details.xlsx");
        xlsx.writeFile(wb, filePath);
    
        
        const excelExpenseFile = uploadOnCloudinary(filePath)
    
        if(!excelExpenseFile){
            throw new ApiError ("excelExpenseFile file is require")
        }
        const excelfileURL = excelExpenseFile.url
    
        return res.download('expense_details.xlsx',excelfileURL,  (err) => {
            if (err) {
                throw new ApiError(500, "Failed to download expense file");
            }
        })
})



export {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
}