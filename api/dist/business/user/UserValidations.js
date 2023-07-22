"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const CustomError_1 = require("../../error/CustomError");
class UserValidations {
    validateIfEmptyFields({ email, name, password, }) {
        if (!email || !name || !password) {
            throw new CustomError_1.CustomError('Todos os campos devem ser preenchidos', 422);
        }
    }
    validateIfEmailValid(email) {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            throw new CustomError_1.CustomError("E-mail inválido", 422);
        }
    }
    validatePassword(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{6}$/;
        if (!passwordRegex.test(password)) {
            throw new CustomError_1.CustomError("Sua senha não atende aos requisitos mínimos", 422);
        }
    }
    validateData(data) {
        this.validateIfEmptyFields(data);
        this.validateIfEmailValid(data.email);
        this.validatePassword(data.password);
    }
}
exports.UserValidations = UserValidations;
//# sourceMappingURL=UserValidations.js.map