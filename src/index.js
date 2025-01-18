import dotenv from "dotenv"
dotenv.config({
    path:".env"
})

import { connectToDB } from "./database/database.js"
import startServer from "./app.js"


console.log("program started")

connectToDB().then((data)=>{
    if(data) console.log("mongodb connected")
    
    startServer();
}).catch((e)=>{
    console.log("mongodb connection error ",e)
})