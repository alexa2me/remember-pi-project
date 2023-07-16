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
exports.UserBusiness = void 0;
const UserDatabase_1 = __importDefault(require("../../data/UserDatabase"));
const IdGenerator_1 = __importDefault(require("../../services/IdGenerator"));
const Authenticator_1 = __importDefault(require("../../services/Authenticator"));
const HashManager_1 = __importDefault(require("../../services/HashManager"));
const CustomError_1 = require("../../error/CustomError");
const UserValidations_1 = require("./UserValidations");
class UserBusiness extends UserValidations_1.UserValidations {
    constructor(authenticator, hashManager, idGenerator, userDatabase) {
        super();
        this.authenticator = authenticator;
        this.hashManager = hashManager;
        this.idGenerator = idGenerator;
        this.userDatabase = userDatabase;
    }
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateData(user);
            const userEmailFromDB = yield this.userDatabase.getUserByEmail(user.email);
            if (userEmailFromDB) {
                throw new CustomError_1.CustomError("Algo deu errado, tente novamente mais tarde ou tente com outro email.", 422);
            }
            const id = this.idGenerator.generate();
            const hashPassword = this.hashManager.hash(user.password);
            yield this.userDatabase.createUser(id, user.email, user.name, hashPassword);
            const accessToken = this.authenticator.generateToken(id);
            return accessToken;
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFromDB = yield this.userDatabase.getUserByEmail(user.email);
            if (!userFromDB) {
                throw new CustomError_1.CustomError("Credenciais inválidas", 401);
            }
            const hashCompare = this.hashManager.compare(user.password, userFromDB.getPassword());
            if (!hashCompare) {
                throw new CustomError_1.CustomError("Credenciais inválidas", 401);
            }
            const accessToken = this.authenticator.generateToken(userFromDB.getId());
            if (!hashCompare) {
                throw new Error("Senha inválida");
            }
            return accessToken;
        });
    }
}
exports.UserBusiness = UserBusiness;
exports.default = new UserBusiness(Authenticator_1.default, HashManager_1.default, IdGenerator_1.default, UserDatabase_1.default);
//# sourceMappingURL=UserBusiness.js.map