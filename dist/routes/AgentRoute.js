"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AgentController_1 = __importDefault(require("../controllers/AgentController"));
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const validators_1 = require("../validators");
const AgentSchema_1 = require("../validators/schema/AgentSchema");
const router = (0, express_1.Router)();
const agentController = new AgentController_1.default();
// Route for updating profile
router.put("/update-profile", AuthMiddleware_1.default.authenticateUser, (0, validators_1.validateRequest)(AgentSchema_1.updateProfileSchema), agentController.updateProfile);
// Route for verifying role
router.put("/role", AuthMiddleware_1.default.authenticateUser, (0, validators_1.validateRequest)(AgentSchema_1.verifyRoleSchema), agentController.verifyRole);
// Route for getting profile
router.get("/profile", AuthMiddleware_1.default.authenticateUser, agentController.getProfile);
exports.default = router;
