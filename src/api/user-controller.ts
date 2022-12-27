import { Request, Response } from "express";
import  UserService  from "./user-service";


const userService = UserService

// Function for creating a new user
async function createUser(req: Request, res:Response)  {
    try {
        // Call the createUser function on the user service to create a new user
        const user = await userService.createUser(req.body)
        // If the user was successfully created, return a 201 response with the user object
        return res.status(201).send(user)
        
    } catch (error) {
        // If there was an error, return a response with the error's status code and message
        return res.status(error.statusCode || 500 ).send(error.message || error)
    }
}

// Function for logging in a user
async function login(req: Request, res:Response)  {
    try {
        // Call the login function on the user service to log in the user
        const token = await userService.login(req.body)
        // If the login was successful, return a 200 response with the JWT
        return res.status(200).send(token)
    } catch (error) {
        // If there was an error, return a response with the error's status code and message
        return res.status(error.statusCode || 500 ).send(error.message || error)
    }
}

// Function for changing a user's password
async function changePassword(req: Request, res:Response)  {
    
    try {
        // Call the changePassword function on the user service to change the user's password
        const response = await userService.changePassword(req.params, req.body)
        // If the password was successfully changed, return a 200 response with the updated user object
        return res.status(200).send(response)
    } catch (error) {
        // If there was an error, return a response with the error's status code and message
        return res.status(error.statusCode || 500 ).send(error.message || error)
    }
}

// Function for deleting a user
async function deleteUser (req: Request, res:Response) {
    try {
        // Call the deleteUser function on the user service to delete the user
        const response = await userService.deleteUser(req.body._id, req.body.email)
        // If the user was successfully deleted, return a 204 response with a success message
        return res.status(204).send(response)
    } catch (error) {
        // If there was an error, return a response with the error's status code and message
        return res.status(error.statusCode || 500 ).send(error.message || error)
    }
}

// Export the functions as an object
export default {createUser, login, changePassword, deleteUser}

