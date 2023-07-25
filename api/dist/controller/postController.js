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
Object.defineProperty(exports, "__esModule", { value: true });
const authenticator_1 = require("../services/authenticator");
const idGenerator_1 = require("../services/idGenerator");
const postQueries_1 = require("../data/postQueries");
class PostController {
    constructor() {
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { post_title, post_content } = req.body;
                const token = req.headers.authorization;
                const verifiedToken = (0, authenticator_1.getTokenData)(token);
                if (!verifiedToken) {
                    res.statusCode = 401;
                    throw new Error("Não autorizado");
                }
                if (!post_title || !post_content) {
                    res.statusCode = 422;
                    throw new Error("Preencha todos os campos.");
                }
                const newPost = {
                    id: (0, idGenerator_1.generateId)(),
                    post_title,
                    post_content,
                    user_id: verifiedToken.id,
                };
                yield (0, postQueries_1.addPost)(newPost);
                res.status(200).send({
                    message: "Post adicionado com sucesso!"
                });
            }
            catch (error) {
                res.status(400).send({
                    error: error.message
                });
            }
        });
    }
}
exports.default = PostController;
//# sourceMappingURL=postController.js.map