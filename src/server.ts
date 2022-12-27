import express  from "express";
import {Server} from "http"

// Import the user router
import router from './api/user-route'

// Create a new express app
const app = express();

// Create a new HTTP server using the express app
const server = new Server(app)

// Use the express.json middleware to parse the body of incoming requests as JSON
app.use(express.json())

// Use the user router for all routes starting with '/api'
app.use('/api', router)

// Export the server
export default server
