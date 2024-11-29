"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    static authenticateUser(req, res, next) {
        var _a;
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Assuming "Bearer token"
        if (!token) {
            return res.status(401).json({ error: 'Authorization token missing' });
        }
        try {
            // Verify token (replace 'secret' with your JWT secret key)
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // Attach the userId to the request object
            req.userId = decoded.id;
            next(); // Proceed to the next middleware or route handler
        }
        catch (error) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
    }
}
exports.default = AuthMiddleware;
