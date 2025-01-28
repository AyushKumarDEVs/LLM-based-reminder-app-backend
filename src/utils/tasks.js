import { google } from "googleapis";
import { GoogleAuth2 } from "./google.auth.js";


const tasks = google.tasks({
    version: 'v1',
    auth: GoogleAuth2.client, // Pass the authenticated OAuth2Client
});
