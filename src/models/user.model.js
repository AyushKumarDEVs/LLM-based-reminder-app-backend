import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    accessToken:String,
},{
    timestamps:true
});


const User=mongoose.model("User",userSchema);