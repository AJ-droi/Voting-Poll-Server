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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pagination_1 = require("../utils/Pagination");
const client_1 = require("@prisma/client");
class AdminService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getAgents(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search, filters } = query, paginationParams = __rest(query, ["search", "filters"]);
            const where = {};
            if (search) {
                where.OR = [
                    { name: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                ];
            }
            if (filters) {
                Object.assign(where, filters);
            }
            return (0, Pagination_1.paginate)(this.prisma.agent, Object.assign(Object.assign({}, paginationParams), { where, include: { address: true, electionResults: true } }));
        });
    }
    getElectionResults() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.electionResult.findMany({
                include: {
                    agent: true,
                    // candidate: true,
                },
            });
        });
    }
    deleteAgent(agentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.agent.delete({
                where: { id: agentId },
            });
        });
    }
    getAnalytics() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalAgents = yield this.prisma.agent.count();
            const totalElections = yield this.prisma.electionResult.count();
            const totalPayments = yield this.prisma.payment.aggregate({
                _sum: { amount: true },
            });
            return {
                totalAgents,
                totalElections,
                totalPayments: totalPayments._sum.amount || 0,
            };
        });
    }
}
exports.default = AdminService;
