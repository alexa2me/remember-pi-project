"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor(routes) {
        this.routes = routes;
        this.port = Number(process.env.PORT) || 3003;
        this.express = (0, express_1.default)();
    }
    init() {
        this.middlewares();
        this.router();
        this.check();
        return this;
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use((0, cors_1.default)());
    }
    router() {
        this.routes.forEach((route) => {
            this.express.use(route.path, route.handle);
        });
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    check() {
        this.express.get("/", (_, res) => {
            res.send({ message: "Connection is on!" });
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map