import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    idToken:String,
    picture:String,
    accessToken:String,


},{
    timestamps:true
});


export const User=mongoose.model("User",userSchema);