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
exports.UserController = void 0;
const UserBusiness_1 = __importDefault(require("../business/user/UserBusiness"));
const BaseDatabase_1 = require("../data/BaseDatabase");
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                };
                const token = yield UserBusiness_1.default.signUp(input);
                res.status(200).send({ token });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).send({ error: error.message });
                }
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginData = {
                    email: req.body.email,
                    password: req.body.password,
                };
                const token = yield UserBusiness_1.default.login(loginData);
                res.status(200).send({ token });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).send({ error: error.message });
                }
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map