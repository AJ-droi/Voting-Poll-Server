"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoleSchema = exports.updateProfileSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Validation schema for updating profile
exports.updateProfileSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    address: joi_1.default.object({
        state: joi_1.default.string().required(),
        city: joi_1.default.string().required(),
        localGovernment: joi_1.default.string().required(),
    }).optional(),
});
// Validation schema for verifying role
exports.verifyRoleSchema = joi_1.default.object({
    bvn: joi_1.default.string().length(11).required(), // Assuming BVN is 11 characters
    role: joi_1.default.string().valid("POLLING_UNIT", "LOCAL", "STATE", "ADMIN").required(),
});
