import { Router } from "express";
import {
    registerUser, 
    loginUser, 
    getUserInfo,
    
} from '../controllers/user.controller.js'

const router = Router()

router.post('/login', loginUser)

//secured routes
router.post('/register', registerUser)
router.get('/getUser', protect, getUserInfo)



export default router