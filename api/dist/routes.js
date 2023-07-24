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
(0, dotenv_1.config)();
const routes = express_1.default.Router();
const userAccessController = new userAccessController_1.default();
const postController = new postController_1.default();
routes.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("Connection is on!");
}));
routes.post("/signup", userAccessController.signUp);
routes.post("/login", userAccessController.login);
routes.post("/post", postController.createPost);
exports.default = routes;
//# sourceMappingURL=routes.js.map