import dotenv from "dotenv"
dotenv.config({
    path:".env"
})
import {asyncHandeler} from "../utils/asyncHandeler.js"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { apiError } from "../utils/apiError.js";

const genAI = new GoogleGenerativeAI(process.env.GENAI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



//req body me text milega uss text se response bna fir uss se time ,date,title vaghrah nikal kr task object me daal fir uss task object ko req me daal kr next kr de

export const LLM_Call= asyncHandeler(async (req,res,next)=>{
    console.log("in llm call")
    const {text}=req.body;
    if(!text) throw new apiError(400,"text not recieved");
    console.log(text)
    const currentDate_and_Time=new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    console.log(currentDate_and_Time)
    const prompt=process.env.PROMPT;
    const result = await model.generateContent(`${prompt} present date(in DD/MM/YYYY format) and time  ${currentDate_and_Time} text:"${text}" `);
    if(!result) throw new apiError(500,"llm failed to generate response");
    console.log(result.response.text(),currentDate_and_Time);
    const rawResponse=String(result.response.text());
    const response_f1=rawResponse.replace("json","")
    const response_f2=response_f1.replaceAll("`","")

    console.log(response_f1)
    console.log(response_f2)

    const data=JSON.parse(response_f2);
    console.log(data)
    req.task={
        title:data.title,
        description:data.description,
        dueDate:data.timeAndDate,
        colorId:data.colorId,
        visibility:data.visibility,
    }
    next();


}) 
    


