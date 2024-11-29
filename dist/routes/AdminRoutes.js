"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = __importDefault(require("../controllers/AdminController"));
const router = (0, express_1.Router)();
const adminController = new AdminController_1.default();
// Route for getting all agents
router.get("/agents", adminController.getAllAgents);
router.get("/election-results", adminController.getElectionResults);
router.delete("/agents/:id", adminController.deleteAgent);
// router.post("/agents/pay", adminController.payAllAgents);
router.get("/analytics", adminController.getAnalytics);
exports.default = router;
