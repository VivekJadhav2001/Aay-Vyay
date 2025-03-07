import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
}
from '../controllers/expense.controller.js'

const router = Router()

router.route("/addExpense").post(verifyJWT, addExpense)

router.route("/getAllExpense").get(verifyJWT, getAllExpense)

router.route("/downloadExpenseExcel").get(verifyJWT, downloadExpenseExcel)

router.route("/:id").delete(verifyJWT, deleteExpense)

export default  router