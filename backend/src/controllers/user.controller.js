import { asyncHandler } from '../utils/asyncHandler.js';
// import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { User } from '../models/User.model.js';
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, password, profileImageUrl } = req.body


    if (
        [fullName, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //(or)

    // if(!fullName || !email || !password){
    //     throw new ApiError(400, "All fields are required")
    // }

    //(or)

    // if(!fullName){
    //     throw new ApiError(400, "Full Name is required")
    // }
    // if(!email){
    //     throw new ApiError(400, "Email is required")
    // }
    // if(!password){
    //     throw new ApiError(400, "Password is required")
    // }
    
    

    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new ApiError(400, "User already exists")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        profileImageUrl
    })

    //******************************************************************************************** */

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check is it a created user
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User register Successfully")
    )



})

export { registerUser }