"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../services/AuthService"));
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password, confirmPassword, name } = req.body;
            try {
                const token = yield this.authService.registerAgent(email, password, confirmPassword, name);
                yield this.authService.sendVerificationEmail(email, token); // Send verification email
                res.status(201).json({ message: "Registration successful. Verify your email.", token });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.authService.loginAgent(email, password);
                res.status(200).json({ token });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.verifyEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.params; // Token from verification link
                yield this.authService.verifyEmail(token);
                res.status(200).json({ message: "Email verified successfully." });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield this.authService.sendPasswordResetEmail(email);
                res.status(200).json({ message: "Password reset email sent successfully." });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, newPassword } = req.body; // Reset token and new password
                yield this.authService.resetPassword(token, newPassword);
                res.status(200).json({ message: "Password reset successfully." });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.authService = new AuthService_1.default();
    }
}
exports.default = AuthController;
