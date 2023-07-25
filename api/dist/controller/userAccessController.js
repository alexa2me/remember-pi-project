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
const connection_1 = __importDefault(require("../data/connection"));
const userAccessQueries_1 = require("../data/userAccessQueries");
const authenticator_1 = require("../services/authenticator");
const hashManager_1 = require("../services/hashManager");
const idGenerator_1 = require("../services/idGenerator");
class UserAccessController {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                if (!name || !email || !password) {
                    res.statusCode = 422;
                    throw new Error("Preencha todos os campos.");
                }
                if (!email.includes("@")) {
                    throw new Error("E-mail inválido");
                }
                if (password.length < 6) {
                    throw new Error("A senha deve conter pelo menos 6 caracteres.");
                }
                const [user] = yield (0, connection_1.default)("users").where({ email });
                if (user) {
                    res.statusCode = 409;
                    throw new Error("Email já está cadastrado");
                }
                const newUser = {
                    id: (0, idGenerator_1.generateId)(),
                    name,
                    email,
                    password: (0, hashManager_1.generateHash)(password),
                };
                const token = (0, authenticator_1.generateToken)({
                    id: newUser.id
                });
                yield (0, userAccessQueries_1.signUp)(newUser);
                res.status(200).send(token);
            }
            catch (err) {
                res.status(400).send({
                    message: err.message,
                });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.statusCode = 422;
                    throw new Error("Para fazer o login informe e-mail e senha");
                }
                if (!email.includes("@")) {
                    throw new Error("E-mail inválido");
                }
                const user = yield (0, userAccessQueries_1.login)(email, password);
                if (!user) {
                    throw new Error("Usuário não encontrado");
                }
                const passwordIsCorrect = (0, hashManager_1.compareHash)(password, user.password);
                if (!passwordIsCorrect) {
                    throw new Error("Senha incorreta");
                }
                const token = (0, authenticator_1.generateToken)({
                    id: user.id,
                });
                res.status(200).send({ token: token });
            }
            catch (err) {
                res.status(400).send({
                    message: err.message,
                });
            }
        });
    }
}
exports.default = UserAccessController;
//# sourceMappingURL=userAccessController.js.map