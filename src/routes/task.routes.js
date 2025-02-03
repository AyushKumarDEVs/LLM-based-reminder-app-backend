
import express from "express"
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { LLM_Call } from "../middlewares/gemini.js";
import { createTask } from "../utils/calendar.js";

const taskRouter=express.Router();

taskRouter.route("/create").post(verifyAuth,LLM_Call,createTask)


export default taskRouter;