"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ElectionResultController_1 = __importDefault(require("../controllers/ElectionResultController"));
const FileUploadMiddleware_1 = require("../middlewares/FileUploadMiddleware");
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const router = (0, express_1.Router)();
const electionResultController = new ElectionResultController_1.default();
// Route to upload election result
router.post("/upload", FileUploadMiddleware_1.uploadElectionResult, AuthMiddleware_1.default.authenticateUser, electionResultController.uploadElectionResult);
exports.default = router;
