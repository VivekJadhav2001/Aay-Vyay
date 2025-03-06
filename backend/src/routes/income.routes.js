import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} from '../controllers/income.controller.js'

const router = Router()

router.route("/addIncome").post(verifyJWT, addIncome)

router.route("/getAllIncome").get(verifyJWT, getAllIncome)

router.route("/downloadIncomeExcel").get(verifyJWT, downloadIncomeExcel)

router.route("/:id").delete(verifyJWT, deleteIncome)

export default  router