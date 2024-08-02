import { z } from 'zod';

// Define the schema for username
export const usernameSchema = z.string()
  .min(8, { message: "Username must be at least 8 characters long" })
  .regex(/^[^A-Z]*$/, { message: "Username must not contain capital letters" });

// Define the schema for password
export const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" });

// Define the schema for email
export const emailSchema = z.string().email({ message: "Invalid email address" });

// Define the schema for full name
export const fullNameSchema = z.string();

// Combine into a single user schema
export const userSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  email: emailSchema,
  fullName: fullNameSchema
});


export const uniqueIdValidator = (userEmail)=>{

    const uniqueId = emailSchema.safeParse(userEmail);
    let query = {};
    if(uniqueId.success){
        query = {
            email: uniqueId.data,
        }
    }
    else{
        query = {
            username: userEmail
        }
    }
    return query;
}

export const removePassword = (user)=> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}