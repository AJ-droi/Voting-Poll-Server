"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminRoutes_1 = __importDefault(require("./AdminRoutes"));
const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
const ElectionResultRoutes_1 = __importDefault(require("./ElectionResultRoutes"));
const AgentRoutes_1 = __importDefault(require("./AgentRoutes"));
// Create the main router
const router = (0, express_1.Router)();
// Use the imported route modules
router.use('/admin', AdminRoutes_1.default); // All admin-related routes
router.use('/auth', AuthRoutes_1.default); // All auth-related routes
router.use('/election-results', ElectionResultRoutes_1.default); // Election result upload route
router.use('/agents', AgentRoutes_1.default); // Election result upload route
// Export the router to be used in the app
exports.default = router;
