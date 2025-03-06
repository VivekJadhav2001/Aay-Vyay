import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { User } from '../models/User.model.js';
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

// generate access token and refresh token

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.save({ validateBeforeSave : false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while genrating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, password } = req.body


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

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Profile Picture file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    // check for profilepic
    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }
    
    

    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new ApiError(400, "User already exists")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        // profileImageUrl,
        avatar: avatar.url,

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

const loginUser = asyncHandler(async (req, res) => {

    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email,password} = req.body;

    if(!email || !password){
        throw new ApiError(400, "Email and Password are required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(400, "User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)  //isPasswordCorrect is a custom method in User.model.js

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)             //cookie(name/key, value, options)
        .cookie("refreshtoken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken   //this is data field from api response
                },
                "User Logged in Successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true // this gets us new updated value
        }
    )


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const getUserInfo = asyncHandler(async(req,res) => {
    return res
    .json(new ApiResponse(200, req.user, "User details fetched successfully"))
})


export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getUserInfo,

}