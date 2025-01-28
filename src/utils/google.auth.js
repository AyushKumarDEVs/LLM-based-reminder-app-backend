import google from "googleapis";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

import { asyncHandeler } from "./asyncHandeler.js";
import { apiError } from "./apiError.js";
import { User } from "../models/user.model.js";

const client = new google.Auth.OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:3000/auth/google/auth"
);

const GoogleLogin = asyncHandeler(async (req, res, next) => {
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/tasks",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  res.json({
    url: authUrl,
  });
});

const GoogleAuth = asyncHandeler(async (req, res) => {
  const { code } = req.query;
  if (!code) throw new apiError(500, "no code recieved for google auth");
  const { tokens } = await oauth2Client.refreshAccessToken();
    if (!tokens)
    throw new apiError(500, "failed to fetch tokens from given code");
  console.log(tokens);

  client.setCredentials(tokens);

  

    //fetch user info from google


  const oauth2 = new google.oauth2_v2.Oauth2({
    auth: client,
    version: "v2",
  });
  const userInfo = await oauth2.userinfo.get({ auth: client });

  if (!userInfo)
    throw new apiError(500, "Failed to fetch user info from Google");

  console.log(userInfo.data);

    //check if user is already present in the database

  let databaseUser=await User.findOne({
    email: userInfo?.data?.email,
  });
//if not create that user and store user access token in cookies and add user's username in req
  //if already present store user access token in cookies and add user;s username in req
  if (
    !databaseUser
  ) {
    databaseUser=await User.create({
      name: userInfo?.data.name,
      email: userInfo?.data.email,
      idToken: tokens.id_token,
      refresh_token: tokens.refresh_token,
      picture: userInfo?.data.picture,
    });
  }
  if(!databaseUser) throw new apiError(500,"user not created/found")
  const cookieOption={
    secure:true,
    httpOnly:true,
  }
  
  

  res.cookie("refresh_token",tokens.refresh_token,cookieOption)

  res.redirect("http://localhost:3000/auth/googleverify")



  
});




export const GoogleAuth2 = {
  client,
  GoogleLogin,
  GoogleAuth,
};
