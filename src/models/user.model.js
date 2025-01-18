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

userSchema.methods.signAccess=async function (){
    return jwt.sign({
        name:this.name,
        email:this.email,
    },
        process.env.JWT_ACCESS_TOKEN,
        {
            expiresIn:process.env.ACCESS_EXPIRE
        }
    )

  
}


userSchema.methods.signRefresh=async function (){
    return jwt.sign({
        name:this.name,
        
    },
        process.env.JWT_REFRESH_TOKEN,
        {
            expiresIn:process.env.REFRESH_EXPIRE
        }
    )
}

const User=mongoose.model("User",userSchema);