import express from "express";
import { apiResponse } from "./utils/apiResponse.js";
import { apiError } from "./utils/apiError.js";
import google from "googleapis";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
dotenv.config({
    path:".env"
})
import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/trial", (req, res) => {
  res.json(new apiResponse(204, "how"));
});


// const client = new google.Auth.OAuth2Client(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   "http://localhost:3000/auth/google/auth",

// );

// app.get('/auth/GoogleLogin', (req, res)=>{
//     const authUrl = client.generateAuthUrl({
//         access_type: "offline",
//         scope: [
//           "https://www.googleapis.com/auth/calendar",
//           "https://www.googleapis.com/auth/userinfo.profile",
//           "https://www.googleapis.com/auth/userinfo.email",
//         ],
//       });
//       res.json({
//         url:authUrl
//       })
// })

// app.get('/auth/google/auth', async (req, res) =>{
// const { code } = req.query;
//     const { tokens } = await client.getToken(code);
//     console.log(tokens)

// })

import AuthRouter from "./routes/authentication.routes.js";
import taskRouter from "./routes/task.routes.js";


app.use("/auth",AuthRouter)
app.use("/task",taskRouter)

export default function startServer() {
  app.listen(process.env.PORT || 4000, () => {
    console.log("server started");
  });
}
