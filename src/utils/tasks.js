import { google } from "googleapis";
import { asyncHandeler } from "./asyncHandeler.js";
import { GoogleAuth2 } from "./google.auth.js";
import { apiError } from "./apiError.js";
import { apiResponse } from "./apiResponse.js";


export const createTask=asyncHandeler(async(req,res)=>{
    if(!req.client) throw new apiError(400,"client not recieved")
    const tasks = google.tasks({ version: "v1", auth: req.client });
    
    const {title,description,dueDate}=req.task;
    if([title,description,dueDate].some((e)=>(!e||e.trim()===""))) {
        throw new apiError(500,"some fields are missing")
    }
    const response = await tasks.tasks.insert({
        tasklist: "@default", 
        requestBody: {
          title: title,           // Task title
          notes: description,     //  Task  description
          due: dueDate,           //  Task  due date  & time (ISO 8601 format)
        },
      });
      
    

    if(!response) throw new apiError(500,"failed to create a task")
        
    res.json(new apiResponse("task created successfully",200,response))
    

})

export const showTaskList=asyncHandeler(async(req,res)=>{
    if(!req.client) throw new apiError(400,"client not recieved")
        const tasks = google.tasks({ version: "v1", auth: req.client });
    const response = await tasks.tasklists.list();
    if(!response) throw new apiError(500,"failed to create a task")
  console.log("Task Lists:", response.data.items);
  res.json(new apiResponse("success",200,response));
})

export const deleteTask=asyncHandeler(async(req,res)=>{
    const tasks = google.tasks({ version: "v1", auth: oauth2Client });
    const {taskId}=req.param;
    if(!taskId) throw new apiError(400,"task id not recieved")
    const response=await tasks.tasks.delete({ tasklist: "@default", task: taskId });
    if(!response) throw new apiError(500,"failed to delete",)
  console.log("Task Deleted");
res.json(new apiResponse("success",200,response))
})

