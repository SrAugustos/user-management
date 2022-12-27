import { Router } from 'express'
import UserController from './user-controller'
import bodyParser from 'body-parser'

// Import the verifyJWT middleware for handling JWT authentication
import {verifyJWT} from '../middleware/verify-jwt'

// Create a new router instance
const router = Router()

// Create a new instance of the UserController
const userController = UserController

// Use the body-parser middleware to parse the body of incoming requests as JSON
router.use(bodyParser.json())

// Add routes for creating a user, logging in, deleting a user, and changing the password
router.route('/create-user').post(userController.createUser)
router.route('/login').post(userController.login)
router.route('/delete-user').delete(verifyJWT, userController.deleteUser)
router.route('/change-password/:_id').patch(verifyJWT,userController.changePassword)

// Export the router so it can be used by other parts of the application
export default router
