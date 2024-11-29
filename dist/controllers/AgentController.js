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
const AgentService_1 = __importDefault(require("../services/AgentService"));
class AgentController {
    constructor() {
        this.updateProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const agentId = req.userId;
                const { name, address } = req.body;
                const updatedAgent = yield this.agentService.updateProfile(agentId, { name, address });
                return res.status(200).json({
                    message: "Profile updated successfully",
                    agent: updatedAgent,
                });
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
        this.verifyRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const agentId = req.userId;
                const { bvn, role, nin } = req.body;
                const updatedAgent = yield this.agentService.verifyRole(agentId, { bvn, role, nin });
                return res.status(200).json({
                    message: "Role updated successfully",
                    agent: updatedAgent,
                });
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const agentId = req.userId;
                const agent = yield this.agentService.getProfile(agentId);
                console.log({ agent });
                return res.status(200).json({
                    message: "Profile fetched successfully",
                    agent,
                });
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
        this.agentService = new AgentService_1.default();
    }
}
exports.default = AgentController;
