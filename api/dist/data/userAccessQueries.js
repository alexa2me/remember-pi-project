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
exports.resetPassword = exports.getUserById = exports.editUser = exports.deleteUser = exports.login = exports.signUp = void 0;
const connection_1 = __importDefault(require("./connection"));
const signUp = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)("users").insert(user);
});
exports.signUp = signUp;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, connection_1.default)("users")
        .select("*")
        .where("email", `${email}`);
    return result[0];
});
exports.login = login;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)("users").where("id", id).delete();
});
exports.deleteUser = deleteUser;
const editUser = (id, newName, newEmail) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)("users")
        .where("id", id)
        .update({
        "name": newName,
        "email": newEmail,
    });
});
exports.editUser = editUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, connection_1.default)("users")
        .select("name", "email")
        .where("id", id);
    return result[0];
});
exports.getUserById = getUserById;
const resetPassword = (newHash, email) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)("users").update("password", newHash).where("email", email);
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=userAccessQueries.js.map