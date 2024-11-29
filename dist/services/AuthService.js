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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthService {
    constructor() {
        this.secretKey = process.env.JWT_SECRET || "yourSecretKey";
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail", // Replace with your email provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    registerAgent(email, password, confirmPassword, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (password !== confirmPassword)
                throw new Error("Passwords do not match.");
            const existingUser = yield prisma.agent.findUnique({ where: { email } });
            if (existingUser)
                throw new Error("Email is already registered.");
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const verificationToken = jsonwebtoken_1.default.sign({ email }, this.secretKey, { expiresIn: "1d" });
            yield prisma.agent.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    isVerified: false,
                    verificationToken,
                },
            });
            yield this.sendVerificationEmail(email, verificationToken);
            return "Registration successful. Please verify your email.";
        });
    }
    loginAgent(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.agent.findUnique({ where: { email } });
            if (!user)
                throw new Error("User not found.");
            if (!user.isVerified)
                throw new Error("Email not verified.");
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid)
                throw new Error("Invalid credentials.");
            const token = jsonwebtoken_1.default.sign({ email, id: user.id }, this.secretKey, { expiresIn: "1h" });
            return token;
        });
    }
    sendVerificationEmail(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificationLink = `${process.env.CLIENT_URL}/verify-email/${token}`;
            yield this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Verify Your Email",
                html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
            });
        });
    }
    verifyEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = jsonwebtoken_1.default.verify(token, this.secretKey);
                console.log({ payload });
                const user = yield prisma.agent.findUnique({ where: { email: payload.email } });
                if (!user)
                    throw new Error("Invalid verification token.");
                yield prisma.agent.update({
                    where: { email: payload.email },
                    data: { isVerified: true, verificationToken: null },
                });
            }
            catch (error) {
                throw new Error("Invalid or expired verification token.");
            }
        });
    }
    sendPasswordResetEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.agent.findUnique({ where: { email } });
            if (!user)
                throw new Error("User not found.");
            const resetToken = jsonwebtoken_1.default.sign({ email }, this.secretKey, { expiresIn: "1h" });
            yield prisma.agent.update({
                where: { email },
                data: { passwordResetToken: resetToken, passwordResetExpires: new Date(Date.now() + 3600 * 1000) },
            });
            const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
            yield this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Reset Your Password",
                html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
            });
        });
    }
    resetPassword(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = jsonwebtoken_1.default.verify(token, this.secretKey);
                const user = yield prisma.agent.findUnique({
                    where: { email: payload.email },
                });
                if (!user || user.passwordResetToken !== token || (user.passwordResetExpires && new Date() > user.passwordResetExpires)) {
                    throw new Error("Invalid or expired password reset token.");
                }
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                yield prisma.agent.update({
                    where: { email: payload.email },
                    data: {
                        password: hashedPassword,
                        passwordResetToken: null,
                        passwordResetExpires: null,
                    },
                });
            }
            catch (error) {
                throw new Error("Failed to reset password.");
            }
        });
    }
}
exports.default = AuthService;
