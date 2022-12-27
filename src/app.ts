import  server  from "./server";
import dontenv from "dotenv"

// Import the database configuration
import db  from "./database/db-config"

// Connect to the database
db

// Load environment variables from the .env file
dontenv.config()

// Get the port number from the environment variables
const port = process.env.PORT

// Start the server and listen on the specified port
server.listen(port, function() { console.log(`listening on port ${port}`)});
