import { asyncHandler } from "../utils/asyncHandler.js";
import { Income } from "../models/Income.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

import * as xlsx from 'xlsx';


//Add income source
const addIncome = asyncHandler(async(req, res) => {

    const {icon, source, amount, date} = req.body
    const userId = req.user._id;

    // Validation: check for missind fields
    if(!source || !amount || !date){
        throw new ApiError(400, "All fields are required")
    }

    const newIncome = new Income({
        userId,
        icon,
        source,
        amount,
        date: new Date(date)
    })

    await newIncome.save();

    return res
    .status(200)
    .json(
        new ApiResponse(newIncome)
    )

})
// get all income source
const getAllIncome = asyncHandler(async(req, res) => {
    const userId = req.user._id

    const income = await Income.find({userId}).sort({date: -1});

    if(!income){
        throw new ApiError(404, "Income not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, income, "Fetched all Income sources")
    )

})
//Add delete income source
const deleteIncome = asyncHandler(async(req, res) => {
    // const userId = req.user._id        // not required as the user is logged in and to delete Income user needs to logged in

     await Income.findByIdAndDelete(req.params.id);

    return res
    .status(200)
    .json(
        new ApiResponse(200,{}, "The Income was deleted successfully")
    )

})
//Add download income source excel
const downloadIncomeExcel = asyncHandler(async(req, res) => {
    const userId = req.user._id

    const income = await Income.find({userId}).sort({date: -1})

    if (!income || income.length === 0) {
        throw new ApiError(404, "No income records found");
    }

    //preparing data for excel
    const data = income.map((item) => ({
        Source : item.source,
        Amount: item.amount,
        Date: item.date
    }))

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx")

    return res.download('income_details.xlsx', (err) => {
        if (err) {
            throw new ApiError(500, "Failed to download income file");
        }
    })


})

export {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
}