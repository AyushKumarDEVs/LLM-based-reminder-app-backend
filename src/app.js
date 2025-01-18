import express from "express"

const app=express()

app.get('/', (req, res) => {
    res.send('Hello World');
  });
export default function startServer() {
    app.listen(process.env.PORT||4000,()=>{
        console.log("server started")
    })
}