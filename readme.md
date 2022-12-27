# Introduction

This API is designed to handle user management tasks such as creating, logging in, deleting, and changing the password of users.

## Routes

`**/create-user**`
Creates a new user with the provided data.

Method: `**POST**`

Request Body:

```json

{
"name": string,
"email": string,
"password": string
}

```

- Response:
    - 201: User created successfully
        
        ```json
        {
        "name": string,
        "email": string,
        "password": string
        }
        
        ```
        
    - 400: Invalid request body
    - 409: Email already exists
    - 500: Internal server error

`**/login**`
Logs in a user with the provided email and password.

Method: `**POST**`

Request Body:

```json

{
"email": string,
"password": string
}
```

- Response:
    - 200: Login successful
        
        ```json
        {
        "token": string
        }
        ```
        
    - 400: Invalid request body or incorrect password
    - 404: User not found

`**/delete-user**`
Deletes a user with the provided email.

Method: `**DELETE**`

Headers:

`**Authorization**`: JSON web token (JWT)
Request Body:

```json
{
"_id": string,
"email": string
}

```

- Response:
    - 204: User deleted successfully
    - 400: Invalid request body
    - 401: Unauthorized (JWT not provided or invalid)
    - 404: User not found

`**/change-password**`
Changes the password of a user with the provided email and new password.

Method: `**PATCH**`

Headers:

`**Authorization**`: JSON web token (JWT)
Request Body:

```json
	
{
	"email": string,
	"password": string
}
```

- Response:
    - 200: Password changed successfully
        
        ```json
        {
        "name": string,
        "email": string,
        "password": string
        }
        ```
        
    
    - 400: Invalid request body
    - 401: Unauthorized (JWT not provided or invalid)
    - 404: User not found

## User Service

This service handles the business logic for creating, logging in, deleting, and changing the password of users.

### Functions

`**createUser**`
This function allows users to create a new account. It hashes the provided password before saving it to the database and checks if a user with the same email already exists. If a user with the same email does exist, it throws an exception. If the user was successfully created, it returns the user object.

`**login**`
This function allows users to log in to their existing account. It finds the user in the database and verifies the provided password. If the password is correct, it generates a JSON web token (JWT) and returns it to the client. If the user is not found or the password is incorrect, it throws an exception.

`**changePassword**`
This function allows users to change their password. It hashes the new password before saving it to the database and updates the user's password in the database. If an error occurs while changing the password, it throws an exception.

`**deleteUser**`
This function allows users to delete their account. It checks if the user with the specified email exists and, if they do, it deletes the user from the database. If the user does not exist, it throws an exception.

## User Repository

This repository handles the database logic for creating, logging in, deleting, and changing the password of users.

### **Functions**

`**createUser`**
This function creates a new user using the provided data.

`**login`**
This function finds a user with the provided email and selects their password.

`**findUser**`
This function finds a user with the provided email.

`**changePassword**`
This function finds a user by the provided ID and updates their password with the provided data.

`**deleteUser**`
This function finds a user by the provided ID and deletes it.