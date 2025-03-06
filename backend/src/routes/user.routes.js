import { Router } from "express";

import { upload } from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
    registerUser,
    loginUser, 
    logoutUser,
    refreshAccessToken,
    getUserInfo,

} from '../controllers/user.controller.js'

const router = Router()

router.post('/login', loginUser)

//secured routes

// multer middleware is used to upload files
// upload.fields() is used to upload multiple files
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
    ]),
    registerUser
)

// router.route("/register").post(registerUser)
router.route("/logout").post(verifyJWT, logoutUser) // verifyJWT middleware
router.route("/refresh-token").post(verifyJWT, refreshAccessToken)

router.route("/getUserInfo").get(verifyJWT, getUserInfo)



export default router