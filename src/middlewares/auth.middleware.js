//check for access token or user's username in req and do next() if loged in and if not ,redirect to login page

import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandeler } from "../utils/asyncHandeler.js";

export const verifyAuth=asyncHandeler(async (req,res)=>{

    const {refresh_token}=req?.cookies;

    if(!refresh_token) throw new apiError(500,"user not loged in")

    req.refresh_token=refresh_token;




})