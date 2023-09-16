"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        const error = new Error("E-mail inválido");
        error.status = 422;
        throw error;
    }
};
exports.validateEmail = validateEmail;
//# sourceMappingURL=validateEmail.js.map