import express from "express"
import { asyncHandeler } from "../utils/asyncHandeler.js";
import {  GoogleAuth2 } from "../middlewares/google.auth.middleware.js";

const AuthRouter=express.Router();

AuthRouter.route("/GoogleLogin").get(GoogleAuth2.GoogleLogin)

AuthRouter.route("/google/auth").get(GoogleAuth2.GoogleAuth)

export default AuthRouter