"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const error = new Error("Not Authenticated, No Token detected");
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    let checkToken;
    try {
        if (token) {
            checkToken = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        }
        else {
            const error = new Error("Token is undefined");
            throw error;
        }
    }
    catch (error) {
        error.statusCode = 500;
        throw error;
    }
    if (!checkToken) {
        const error = new Error("Not Authenticated");
        error.statusCode = 403;
        throw error;
    }
    next();
};
exports.default = auth;
//# sourceMappingURL=auth.js.map