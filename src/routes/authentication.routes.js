import express from "express";
import { GoogleAuth2 } from "../utils/google.auth.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const AuthRouter = express.Router();

AuthRouter.route("/GoogleLogin").get(GoogleAuth2.GoogleLogin);

AuthRouter.route("/google/auth").get(GoogleAuth2.GoogleAuth);

AuthRouter.route("/verifyAuth").get(verifyAuth);

export default AuthRouter;
