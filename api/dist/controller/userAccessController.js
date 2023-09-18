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
                yield (0, userAccessQueries_1.editUser)(verifiedToken.id, name, email);
                res.status(200).send({ message: 'Usuário editado com sucesso!' });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message,
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
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const user = yield (0, connection_1.default)("users").where({ "email": email });
                if (!user) {
                    res.statusCode = 400;
                    throw new Error("Usuario não encontrado!");
                }
                const characters = "abcdefABCDEF12345!@#$%&*";
                let newPassword = "";
                for (let i = 0; i < 10; i++) {
                    const index = Math.floor(Math.random() * (characters.length - 1));
                    newPassword += characters[index];
                }
                const newHash = (0, hashManager_1.generateHash)(newPassword);
                yield (0, userAccessQueries_1.resetPassword)(newHash, email);
                yield mailTransporter_1.default.sendMail({
                    from: `<${process.env.NODEMAILER_USER}>`,
                    to: email,
                    subject: "Sua nova senha Remember",
                    text: `Sua nova senha é ${newPassword}`,
                    html: `<html>
        <head>
          <style>
            body {
              background-color: #734A91;
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 20px;
              color: white;
            }
            .header {
              font-size: 40px;
              margin: 40px;
              border-bottom: 1px solid white;
              padding-bottom: 10px;
            }
            p {
              font-size: 18px;
              color: white;
              text-align: left;
            }
            .main-text {
              margin: 0 40px;
            }
            .footer {
              font-size: 14px;
              color: white;
              margin-top: 40px;
              text-align: center;
              padding-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">Remember</div>
          <p class="main-text">Esta é a sua nova senha: <strong>${newPassword}</strong><br /><br />
            Sabemos que é uma senha estranha e talvez difícil de memorizar e por enquanto
            ainda não é possível alterá-la, mas estamos trabalhando nisso e em breve teremos novidades. <br />
            Caso esqueça novamente, basta recuperá-la uma outra vez.<br /><br />Time Remember</p>
          <p class="footer">Este é um e-mail automático, não responda.</p>
        </body>
      </html>`,
                });
                res.status(200).send({ message: 'Sua nova senha foi enviada para o seu e-mail.' });
            }
            catch (error) {
                res.status(400).send({
                    message: error.message,
                });
            }
        });
    }
}
exports.default = UserAccessController;
//# sourceMappingURL=userAccessController.js.map