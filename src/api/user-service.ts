import { HttpException } from "../exception/http-exception"
import { hashPassword, verifyPassword } from "../utils/hash-password"
import { generateJWT } from "../utils/generate-jwt"
import { CreateUserDto, UpdateUserDto, UserLoginDto, UserResponse } from "./user-dto"
import userRepository from "./user-repository"
import {  Types, Schema } from "mongoose";
// This function allows users to create a new account
async function createUser(data: CreateUserDto) {
  
    // Check if a user with the same email already exists
    const userExists = await userRepository.findUser(data.email);
    
    // If a user with the same email does exist, throw an exception
    if (userExists) {
      throw new HttpException(409, 'This email already exists');
    }
    
    // Hash the password before saving it to the database
    data.password = await hashPassword(data.password);
    
    // Attempt to create a new user
    try {
      const user = await userRepository.createUser(data);
      // Delete the password field from the user object
      delete user.password
      return user
    } catch (error) {
      // If an error occurs while creating the user, throw an exception with the error's status code and message, or with a status code of 500 (internal server error) and a default message
      throw new HttpException(error.statusCode || 500, error.message || 'Cannot create user');
    }
}
  
// This function allows users to log in to their existing account
async function login(data: UserLoginDto) {
    // Find the user in the database
    let user;
    try {
      user = await userRepository.login(data);
    } catch (error) {
      // If the user is not found, throw an exception with a status code of 400 (bad request) and a message indicating that the user was not found
      throw new HttpException(error.statusCode || 400, error.message || 'User not found');
    }
    
    // Verify the password
    try {
      await verifyPassword(data.password, user.password);
    } catch (error) {
      // If the password is incorrect, throw an exception with a status code of 400 (bad request) and a message indicating that the password is incorrect
      throw new HttpException(400, 'Incorrect password');
    }
    
    // If the password is correct, generate a JSON web token (JWT) and return it to the client
    return await generateJWT(user._id.toString());
  }


// This function allows users to change their password
async function changePassword(id, data: UpdateUserDto){
  // Set the updateAt field of the data object to the current date and time

  data.updatedAt = new Date()
  // Hash the new password before saving it to the database
  data.password = await hashPassword(data.password);
  try {
      // Update the user's password in the database
      const newUser = await userRepository.changePassword(id, data)
      
      return 'Password changed successfully'
    } catch (error) {
      // If an error occurs while changing the password, throw an exception with the error's status code and message, or with a status code of 400 (bad request) and a default message
      throw new HttpException(error.statusCode || 400, error.message || 'Cannot change password')
    }
  }

// This function allows users to delete their account
async function deleteUser(id:string, email: string){
    // Check if the user with the specified email exists
    const userExists = await userRepository.findUser(email);
    
    // If the user does not exist, throw an exception with a status code of 404 (not found) and a message indicating that the user does not exist
    if(!userExists){
      throw new HttpException(404, 'User doesn\'t exists')
    }
    
    // If the user exists, delete the user from the database
    try {
      await userRepository.deleteUser(id)
      return 'User deleted successfully'
    } catch (error) {
      // If an error occurs while deleting the user, throw an exception with the error's status code and message, or with a status code of 400 (bad request) and a default message
      throw new HttpException(error.statusCode || 400, error.message || 'Cannot delete user')
    }
}

export default {
    createUser, login, changePassword, deleteUser
    
}