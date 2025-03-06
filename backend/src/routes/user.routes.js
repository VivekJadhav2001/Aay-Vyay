import { Router } from "express";

// import { upload } from '../middlewares/multer.middleware.js'


import {
    registerUser,
    loginUser, 
    logoutUser,
    // getUserInfo,

} from '../controllers/user.controller.js'

const router = Router()

router.post('/login', loginUser)

//secured routes

//multer middleware is used to upload files
//upload.fields() is used to upload multiple files
// router.route("/register").post(
//     // upload.fields([
//     //     {
//     //         name: "profileImageUrl",
//     //         maxCount: 1
//     //     }
//     // ]),
//     registerUser
// )
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/register").post(registerUser)

// router.get('/getUser', protect, getUserInfo)



export default router