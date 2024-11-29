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
const AdminService_1 = __importDefault(require("../services/AdminService"));
class AdminController {
    constructor() {
        this.getAllAgents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit, search, role, status } = req.query;
                const agents = yield this.adminService.getAgents({
                    page: parseInt(page, 10),
                    limit: parseInt(limit, 10),
                    search: search,
                    filters: Object.assign(Object.assign({}, (role && { role })), (status && { status })),
                });
                res.status(200).json(agents);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.getElectionResults = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield this.adminService.getElectionResults();
                res.status(200).json(results);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.deleteAgent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.adminService.deleteAgent(id);
                res.status(200).json({ message: "Agent deleted successfully" });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.getAnalytics = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const analytics = yield this.adminService.getAnalytics();
                res.status(200).json(analytics);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.adminService = new AdminService_1.default();
    }
}
exports.default = AdminController;
