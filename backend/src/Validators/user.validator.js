import { z } from 'zod';

export const usernameSchema = z.string()
  .min(8, { message: "Username must be at least 8 characters long" })
  .regex(/!@#$%^&*(),.?":{}|/, { message: "Username must not contain capital letters" });

export const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" });

  export const emailSchema = z.string().email({ message: "Invalid email address" });
  
  export const fullNameSchema = z.string();
  
  const bioSchema = z.string()
    .max(250, 'Bio cannot exceed 250 characters.')
    .optional();

export const userSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  email: emailSchema,
  fullName: fullNameSchema, 
  bio: bioSchema,
});

export const updateUserSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  fullName: fullNameSchema, 
  bio: bioSchema,
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