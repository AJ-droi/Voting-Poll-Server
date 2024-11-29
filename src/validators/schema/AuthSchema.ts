import Joi from "joi";

// Joi schemas
export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    name: Joi.string().min(3).required(),
  });
  
 export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });