import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Get the database name and URL from the environment variables
const dbname = process.env.DBNAME;
const dbUrl = process.env.URL;

// Construct the full database URL using the name and URL
const url = `${dbUrl}${dbname}`;

// Connect to the database and log the result
export default mongoose.connect(url)
  .then(() => { console.log('Connected to MongoDB'); })
  .catch(() => { console.log('Failed to connect to MongoDB'); });

  