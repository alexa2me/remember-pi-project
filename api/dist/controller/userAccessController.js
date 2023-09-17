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
const authenticator_2 = require("../services/authenticator");
const hashManager_1 = require("../services/hashManager");
const idGenerator_1 = require("../services/idGenerator");
const mailTransporter_1 = __importDefault(require("../services/mailTransporter"));
const validateEmail_1 = require("../services/validateEmail");
const postQueries_1 = require("../data/postQueries");
class UserAccessController {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                if (!name || !email || !password) {
                    res.statusCode = 422;
                    throw new Error("Preencha todos os campos.");
                }
                (0, validateEmail_1.validateEmail)(email);
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
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verifiedToken = (0, authenticator_2.getTokenData)(token);
                if (!verifiedToken) {
                    res.statusCode = 401;
                    throw new Error("Não autorizado");
                }
                const user = yield (0, userAccessQueries_1.getUserById)(verifiedToken.id);
                const userData = {
                    name: user.name,
                    email: user.email,
                };
                res.status(200).send({ user: userData });
            }
            catch (err) {
                res.status(400).send({
                    message: err.message,
                });
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verifiedToken = (0, authenticator_2.getTokenData)(token);
                if (!verifiedToken) {
                    res.statusCode = 401;
                    throw new Error("Não autorizado");
                }
                yield (0, postQueries_1.deleteAllPostsByUserId)(verifiedToken.id);
                yield (0, userAccessQueries_1.deleteUser)(verifiedToken.id);
                res.status(200).send({ message: 'Usuário removido com sucesso!' });
            }
            catch (err) {
                res.status(400).send({
                    message: err.message,
                });
            }
        });
        this.editUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email } = req.body;
                const token = req.headers.authorization;
                const verifiedToken = (0, authenticator_2.getTokenData)(token);
                if (!verifiedToken) {
                    res.statusCode = 401;
                    throw new Error("Não autorizado");
                }
                (0, validateEmail_1.validateEmail)(email);
                yield (0, userAccessQueries_1.updateUser)(verifiedToken.id, name, email);
                res.status(200).send({ message: 'Usuário editado com sucesso!' });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message,
                });
            }
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield (0, userAccessQueries_1.getUserById)(id);
                if (!user) {
                    res.statusCode = 400;
                    throw new Error("Usuario não encontrado!.");
                }
                const characters = "abcdefABCDEF12345!@#$%&*";
                let newPassword = "";
                for (let i = 0; i < 10; i++) {
                    const index = Math.floor(Math.random() * (characters.length - 1));
                    newPassword += characters[index];
                }
                const newHash = (0, hashManager_1.generateHash)(newPassword);
                yield (0, userAccessQueries_1.resetSenha)(newHash, id);
                const info = yield mailTransporter_1.default.sendMail({
                    from: `<${process.env.NODEMAILER_USER}>`,
                    to: user.email,
                    subject: "Teste 1 de nodemailer",
                    text: `Sua nova senha é ${newPassword}`,
                    html: `<p>Sua nova senha é <strong>${newPassword}</strong></p>`,
                });
                console.log(info);
                res.status(200).send({ messagem: 'Senha alterada com sucesso!' });
            }
            catch (error) {
                console.log(error.message);
                res.status(400).send({
                    message: error.message,
                });
            }
        });
    }
}
exports.default = UserAccessController;
//# sourceMappingURL=userAccessController.js.map