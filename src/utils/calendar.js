import { google } from "googleapis";
import { asyncHandeler } from "./asyncHandeler.js";
import { GoogleAuth2 } from "./google.auth.js";
import { apiError } from "./apiError.js";
import { apiResponse } from "./apiResponse.js";


export const createTask=asyncHandeler(async(req,res)=>{
    if(!req.client) throw new apiError(400,"client not recieved")
    const calendar = google.calendar({ version: "v3", auth: req.client });
    
    const {title,description,dueDate,visibility,colorId}=req.task;

    if([title,description,dueDate,visibility,colorId].some((e)=>(!e||e.trim()===""))) {
        throw new apiError(500,"some fields are missing")
    }

    const event = {
        summary: title,
        description: description,
        start: {
          dateTime: dueDate, // Your desired start time
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: dueDate, // End time
          timeZone: "Asia/Kolkata",
        },
        reminders: {
          useDefault: false,
          overrides: [{ method: "popup", minutes: 1 }], // Reminder 10 minutes before
        },
        visibility:visibility,
        colorId:colorId,
        
      };
      const response =await calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
  
      
    

    if(!response) throw new apiError(500,"failed to create a task")
        
    res.json(new apiResponse("task created successfully",200,response))
    

})

export const getAllTasks=asyncHandeler(async(req,res)=>{
    if(!req.client) throw new apiError(400,"client not recieved")
        const calendar = google.calendar({ version: "v3", auth: req.client });
    const now = new Date().toISOString();

    const response = await calendar.events.list({
      calendarId: "primary", 
      timeMin: now, 
      showDeleted: false, 
      singleEvents: true, 
      orderBy: "startTime",
    });

    if(!response) throw new apiError(500,"failed to load tasks")

    const events = response?.data?.items;
    if (!events) {
      throw new apiError(500,"task list failed to load")
    }

    res.json(new apiResponse("task list fetched",200,events))
})


export const deleteTasks=asyncHandeler(async(req,res)=>{
    if(!req.client) throw new apiError(400,"client not recieved")
    const {eventId}= req.body;
        const calendar = google.calendar({ version: "v3", auth: req.client });

    const response = await calendar.events.delete({
        calendarId: "primary",  
        eventId: eventId,       // ID of the event to delete
      });

    if(!response) throw new apiError(500,"failed to delete the task")


    res.json(new apiResponse("task deleted ",200))
})