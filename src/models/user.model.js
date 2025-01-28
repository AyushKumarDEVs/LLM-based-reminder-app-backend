import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
  
    picture:{
        type:String,
        required:true,
    },
    refresh_token:{
        type:String,
        required:true,
    },


},{
    timestamps:true
});


export const User=mongoose.model("User",userSchema);