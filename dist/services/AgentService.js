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
class AgentService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    // 1. Update Profile
    updateProfile(agentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, address } = data;
            return this.prisma.agent.update({
                where: { id: agentId },
                data: {
                    name,
                    address: address
                        ? {
                            upsert: {
                                create: {
                                    state: address.state,
                                    city: address.city,
                                    localGovernment: address.localGovernment,
                                },
                                update: {
                                    state: address.state,
                                    city: address.city,
                                    localGovernment: address.localGovernment,
                                },
                            },
                        }
                        : undefined,
                },
                include: { address: true },
            });
        });
    }
    // 2. Verify Role with BVN
    verifyRole(agentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bvn, role, nin } = data;
            return this.prisma.agent.update({
                where: { id: agentId },
                data: {
                    bvn,
                    role,
                    nin
                },
            });
        });
    }
    // 3. Get Profile
    getProfile(agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('hello');
            const agent = yield this.prisma.agent.findUnique({
                where: { id: agentId },
                include: { address: true, electionResults: true },
            });
            if (!agent)
                throw new Error("Agent not found");
            return agent;
        });
    }
}
exports.default = AgentService;
