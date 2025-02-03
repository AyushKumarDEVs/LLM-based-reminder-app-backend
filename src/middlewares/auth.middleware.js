//check for access token or user's username in req and do next() if loged in and if not ,redirect to login page
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
import { apiError } from "../utils/apiError.js";
import { asyncHandeler } from "../utils/asyncHandeler.js";
import { GoogleAuth2 } from "../utils/google.auth.js";

export const verifyAuth = asyncHandeler(async (req,res,next) => {
  const  {refresh_token}  = req.body;

  if (!refresh_token) throw new apiError(500, "user not loged in");

  GoogleAuth2.client.setCredentials({
    refresh_token: refresh_token,
  });
  const { credentials } = await GoogleAuth2.client.refreshAccessToken();
  if (!credentials) throw new apiError(500, "log in again");
  console.log(credentials);
  req.access_token = credentials.access_token;

  req.refresh_token = credentials.refresh_token;
  GoogleAuth2.client.setCredentials({
    access_token: credentials.access_token,
  });
  req.client=GoogleAuth2.client;
  next()
});
