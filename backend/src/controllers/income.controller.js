import { asyncHandler } from "../utils/asyncHandler.js";
import { Income } from "../models/Income.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


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
// get income source
const getAllIncome = asyncHandler(async(req, res) => {

})
//Add delete income source
const deleteIncome = asyncHandler(async(req, res) => {

})
//Add download income source excel
const downloadIncomeExcel = asyncHandler(async(req, res) => {

})

export {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
}