import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT = async(req,_,next) => {
    try {
        const token = req.cookies?.accessToken;
        const decodedToken = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user) throw new ApiError(401,"User is not logged in for prior operation")
        req.user = user;
        next();
    } 
    catch (error) {
        throw new ApiError(401, "Invalid access Token")
    }
}

export default verifyJWT