import { Router } from "express";
import {
    registerUser, 
    loginUser, 
    getUserInfo,
    
} from '../controllers/user.controller.js'

const router = Router()
