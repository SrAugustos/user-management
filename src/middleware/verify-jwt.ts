import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Load environment variables from the .env file
dotenv.config()

// Get the JWT secret from the environment variables
const secret = process.env.SECRET

// Middleware function for verifying JWTs
const verifyJWT = async (req, res, next) => {
    // Get the JWT from the authorization header
    const token = req.headers.authorizarion
    
    // Use jsonwebtoken's verify function to validate the token
    jwt.verify(token, secret, (err, decoded) => {
        // If the token is invalid, return a 400 error with a message
        if(err) return res.status(400).json({error: 'Invalid token'})
        
        // If the token is valid, set the request's _id property to the decoded user's id
        req._id = decoded.id
        
        // Call the next middleware function
        return next()
    })
}

// Export the verifyJWT function
export {verifyJWT}
