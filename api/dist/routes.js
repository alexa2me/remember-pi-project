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
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const userAccessController_1 = __importDefault(require("./controller/userAccessController"));
const postController_1 = __importDefault(require("./controller/postController"));
const express_rate_limit_1 = require("express-rate-limit");
(0, dotenv_1.config)();
const routes = express_1.default.Router();
const userAccessController = new userAccessController_1.default();
const postController = new postController_1.default();
const signupLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: "Você excedeu o número limite de tentativas de criar conta, tente novamente mais tarde."
});
const loginLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 3 * 60 * 1000,
    max: 5,
    message: "Você excedeu o número limite de tentativas de login, tente novamente mais tarde."
});
const postLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 2 * 60 * 1000,
    max: 15,
    message: "Você excedeu o número máximo de postagens, tente novamente mais tarde."
});
routes.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("Connection is on!");
}));
routes.post("/signup", userAccessController.signUp, signupLimiter);
routes.post("/login", userAccessController.login, loginLimiter);
routes.post("/post", postController.createPost, postLimiter);
routes.get("/post/getAll", postController.getPosts);
exports.default = routes;
//# sourceMappingURL=routes.js.map