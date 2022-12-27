import userModel from "./user-model";

import { CreateUserDto, UpdateUserDto, UserLoginDto, UserResponse } from "./user-dto";



async function createUser (data: CreateUserDto): Promise<UserResponse> {
    // Create a new user using the provided data
    const user = await userModel.create(data);
    return user.toObject()
}

async function login (data: UserLoginDto) {
    // Find a user with the provided email and select their password
    const user = await userModel.findOne({ email: data.email }).select('+password');
    return user
}

async  function findUser (data: string) {
    // Find a user with the provided email
    const user = await userModel.findOne({ email: data })
    return user
}

async function changePassword(id, data: UpdateUserDto) {
    // Find a user by the provided ID and update their password with the provided data
    const user = await userModel.findByIdAndUpdate(id, data)
    user.save()
    return user.toObject()
}

async  function deleteUser(id: string) {
    // Find a user by the provided ID and delete it
    await userModel.findByIdAndRemove(id)
}


export default {
    createUser, login, findUser, changePassword, deleteUser
}
