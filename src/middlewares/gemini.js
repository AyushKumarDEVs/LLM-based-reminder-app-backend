import dotenv from "dotenv"
dotenv.config()

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyARotVtLGv-n8mLD_1FC-lge7LKwU_hnNo");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works in json format and 1 line";

const result = await model.generateContent(prompt);
console.log(result.response.text());