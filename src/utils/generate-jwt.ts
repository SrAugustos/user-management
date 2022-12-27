import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Import the HttpException class for handling HTTP errors
import { HttpException } from '../exception/http-exception'

// Load environment variables from the .env file
dotenv.config()

// Get the JWT secret from the environment variables
const secret = process.env.SECRET

// Function for generating a JWT
const generateJWT = async (id) => {
    try {
        // Use jsonwebtoken's sign function to generate a new JWT
        const token = jwt.sign({id: id}, secret, { expiresIn: 500 })
        return token
    } catch (error) {
        // If there is an error generating the JWT, throw a new HttpException with a message
        throw new HttpException(500, `Cannot possibly generate token`)
    }
}

// Export the generateJWT function
export { generateJWT }
