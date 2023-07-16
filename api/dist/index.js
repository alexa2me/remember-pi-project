"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("./app"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
(0, dotenv_1.config)();
const expressApp = new app_1.default([UserRouter_1.default]);
expressApp.init().listen();
//# sourceMappingURL=index.js.map