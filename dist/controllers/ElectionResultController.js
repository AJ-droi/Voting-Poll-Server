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
const ElectionResultService_1 = __importDefault(require("../services/ElectionResultService"));
class ElectionResultController {
    constructor() {
        this.uploadElectionResult = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const agentId = req.userId; // assuming userId is attached via middleware
                console.log({ agentId });
                const file = req.file; // assuming you use multer for file uploads
                if (!file) {
                    return res.status(400).json({ error: 'No file uploaded' });
                }
                const result = yield this.electionResultService.uploadResult(agentId, file);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
        this.electionResultService = new ElectionResultService_1.default();
    }
}
exports.default = ElectionResultController;
