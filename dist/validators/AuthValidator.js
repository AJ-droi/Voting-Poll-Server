"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi schemas
const registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref("password")).required(),
    name: joi_1.default.string().min(3).required(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
// Validator middleware
const registerValidator = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }
    next();
};
exports.registerValidator = registerValidator;
const loginValidator = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map((err) => err.message) });
    }
    next();
};
exports.loginValidator = loginValidator;
