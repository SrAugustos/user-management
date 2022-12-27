import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";


export class UserLoginDto {
    @IsEmail()
    @IsNotEmpty({message: 'Please enter a valid email address'})
    email:string;
    @IsNotEmpty({message:'Please enter a password'})
    password: string
}

export class CreateUserDto {
    @IsNotEmpty({message: 'Please enter a name'})
    name: string;
    @IsEmail()
    @IsNotEmpty({message: 'Please enter a valid email address'})
    email: string;
    @IsNotEmpty({message: 'Please enter a password'})
    password: string
}

export class UpdateUserDto {
    @IsNotEmpty({message: 'Please enter a password'})
    password: string;
    updatedAt: Date;
}

export class UserResponse {
    name:string;
    email: string; 
    password: string;
    createdAt: Date;
    updatedAt: Date;
}