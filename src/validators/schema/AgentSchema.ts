import Joi from "joi";

// Validation schema for updating profile
export const updateProfileSchema = Joi.object({
  name: Joi.string().optional(),
  address: Joi.object({
    state: Joi.string().required(),
    city: Joi.string().required(),
    localGovernment: Joi.string().required(),
  }).optional(),
});

// Validation schema for verifying role
export const verifyRoleSchema = Joi.object({
  bvn: Joi.string().length(11).required(), // Assuming BVN is 11 characters
  nin:Joi.string().length(11).required(), // Assuming BVN is 11 characters
  role: Joi.string().valid("POLLING_UNIT", "LOCAL", "STATE", "ADMIN").required(),

});
