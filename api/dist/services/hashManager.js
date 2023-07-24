"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.generateHash = void 0;
const bcryptjs_1 = require("bcryptjs");
const generateHash = (plainText) => {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = (0, bcryptjs_1.genSaltSync)(rounds);
    const hash = (0, bcryptjs_1.hashSync)(plainText, salt);
    return hash;
};
exports.generateHash = generateHash;
const compareHash = (plainText, cypherText) => {
    return (0, bcryptjs_1.compareSync)(plainText, cypherText);
};
exports.compareHash = compareHash;
//# sourceMappingURL=hashManager.js.map