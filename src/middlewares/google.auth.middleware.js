import google from "googleapis";
import dotenv from "dotenv"
dotenv.config({
    path:".env"
})

import { asyncHandeler } from "../utils/asyncHandeler.js";
import { apiError } from "../utils/apiError.js";

const client = new google.Auth.OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:3000/auth/google/auth",


);

const GoogleLogin=asyncHandeler(async (req,res,next)=>{
    const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: [
          "https://www.googleapis.com/auth/calendar",
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      });
      
      res.json({
        url:authUrl
      })

})

const GoogleAuth=asyncHandeler(async(req,res)=>{
    const { code } = req.query;
    if(!code) throw new apiError(500,"no code recieved for google auth")
    const { tokens } = await client.getToken(code);
    if(!tokens) throw new apiError(500,"failed to fetch tokens from given code")
    console.log(tokens)
    res.json({
        tokens:tokens
    })

    //fetch user info from google
    //check if user is already present in the database
    //if not create that user and store user access token in cookies and add user's username in req 
    //if already present store user access token in cookies and add user;s username in req
    

})


export  const GoogleAuth2={
    GoogleLogin,
    GoogleAuth
}