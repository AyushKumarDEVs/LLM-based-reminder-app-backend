import google from "googleapis";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

import { asyncHandeler } from "./asyncHandeler.js";
import { apiError } from "./apiError.js";
import { User } from "../models/user.model.js";
import { apiResponse } from "./apiResponse.js";

const client = new google.Auth.OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  `${process.env.BACKEND_DOMAIN}/auth/google/auth`
);

const GoogleLogin = asyncHandeler(async (req, res, next) => {
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  res.redirect(authUrl)
});

const GoogleAuth = asyncHandeler(async (req, res) => {
  const { code } = req.query;
  if (!code) throw new apiError(500, "no code recieved for google auth");
  let { tokens } = await client.getToken(code);
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

  let databaseUser = await User.findOne({
    email: userInfo?.data?.email,
  });
  //if not create that user and store user access token in cookies and add user's username in req
  //if already present store user access token in cookies and add user;s username in req
  if (!databaseUser) {
    databaseUser = await User.create({
      name: userInfo?.data.name,
      email: userInfo?.data.email,
      idToken: tokens.id_token,
      refresh_token: tokens.refresh_token,
      picture: userInfo?.data.picture,
    });
  }
  if (!databaseUser) throw new apiError(500, "user not created/found");
  const cookieOption = {
    secure: true,
    httpOnly: true,
  };

  console.log("refreshToken=",tokens.refresh_token);
  res.cookie("refresh_token", tokens.refresh_token, cookieOption);

  res.redirect(`${process.env.FRONTEND_DOMAIN}/home`);///redirect to home page here

});

export const GoogleAuth2 = {
  client,
  GoogleLogin,
  GoogleAuth,
};
