import mongoose ,{ Document, Schema } from "mongoose";
import { CreateUserDto } from "./user-dto";


const userSchema = new Schema({
    email: {type: "string", required: true, lowerCase: true,unique: true},
    name: {type: "string", required: true},
    password: {type: "string", required: true, private: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now}
})

export default mongoose.model<CreateUserDto>("User", userSchema)