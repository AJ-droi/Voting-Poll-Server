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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class ElectionResultService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    uploadResult(agentId, file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file)
                throw new Error("No file uploaded");
            // const imagePath = `/uploads/election_results/${file.filename}`;
            const cloudinaryUrl = file.path;
            const electionResult = yield this.prisma.electionResult.create({
                data: {
                    agentId,
                    resultImage: cloudinaryUrl,
                },
            });
            // Optionally, move the file to the desired storage (e.g., cloud storage or local directory)
            return electionResult;
        });
    }
}
exports.default = ElectionResultService;
