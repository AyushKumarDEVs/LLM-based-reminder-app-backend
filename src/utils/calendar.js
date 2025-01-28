import {client} from "../utils/google.auth.js"


const calendar = google.calendar({
    version: 'v3',
    auth: client ,
});
