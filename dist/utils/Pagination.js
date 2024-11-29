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
exports.paginate = paginate;
function paginate(prismaModel, // The Prisma model to query
query // Optional filters, includes, etc.
) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page = 1, limit = 10, where, include } = query;
        const skip = (page - 1) * limit;
        const [data, totalItems] = yield Promise.all([
            prismaModel.findMany({
                where,
                include,
                skip,
                take: limit,
            }),
            prismaModel.count({ where }),
        ]);
        return {
            data,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        };
    });
}
