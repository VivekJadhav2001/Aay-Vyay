// this middleware verify if user is avaliable/authenticated or not 

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/User.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {  //_ is used here because we don't have any use of res(standard industry level practise )
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")  // even for mobile applications

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
        
})