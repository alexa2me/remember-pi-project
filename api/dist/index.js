"use strict";
// import { config } from "dotenv";
// import App from "./app";
// import userHandle from './routes/UserRouter';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// config();
// const expressApp: App = new App([userHandle]);
// expressApp.init().listen();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.default);
app.listen(3304, () => {
    console.log("Server is running at http://localhost:3304");
});
//# sourceMappingURL=index.js.map