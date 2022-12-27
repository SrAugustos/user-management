import bcryptjs from "bcryptjs";

// Hash a given password using bcrypt
const hashPassword = async (password) => {
    // Generate a hashed password using bcrypt's hash function
    const newPassword = bcryptjs.hash(password, 10)
    return newPassword
}

// Verify that a given password matches a hashed password
const verifyPassword = async (reqPassword, resPassword) => {
    // Use bcrypt's compare function to check if the two passwords match
    await bcryptjs.compare(reqPassword, resPassword)
}

// Export the hashPassword and verifyPassword functions
export {hashPassword, verifyPassword}
