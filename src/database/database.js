import mongoose from "mongoose";
import { dbname } from "../constants.js";
export const connectToDB=async ()=>{

    return await mongoose.connect(`${process.env.MONGODB_URI}/${dbname}`)
}