"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const validators_1 = require("../validators");
const AuthSchema_1 = require("../validators/schema/AuthSchema");
const router = (0, express_1.Router)();
const authController = new AuthController_1.default();
router.post("/register", (0, validators_1.validateRequest)(AuthSchema_1.registerSchema), authController.register);
router.post("/login", (0, validators_1.validateRequest)(AuthSchema_1.loginSchema), authController.login);
router.get('/verify-email/:token', authController.verifyEmail);
exports.default = router;
