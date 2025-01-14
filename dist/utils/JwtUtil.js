"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtUtil {
    static generateToken(id, role) {
        return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    }
    static verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
}
exports.default = JwtUtil;
