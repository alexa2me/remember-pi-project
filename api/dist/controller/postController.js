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
const authenticator_1 = require("../services/authenticator");
const idGenerator_1 = require("../services/idGenerator");
const postQueries_1 = require("../data/postQueries");
const formatData_1 = __importDefault(require("../utils/formatData"));
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
        this.getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const verifiedToken = (0, authenticator_1.getTokenData)(token);
                if (!verifiedToken) {
                    res.statusCode = 401;
                    throw new Error("Não autorizado");
                }
                const post = yield (0, postQueries_1.getPosts)(verifiedToken.id);
                const postMap = post.map((item) => {
                    return {
                        id: item.id,
                        postTitle: item.post_title,
                        postContent: item.post_content,
                        createdAt: (0, formatData_1.default)(item.created_at),
                        userId: item.user_id,
                    };
                });
                res.status(200).send({ posts: postMap });
            }
            catch (err) {
                res.status(400).send({
                    message: err.message,
                });
            }
        });
        this.getPostById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const token = req.headers.authorization;
                const verifiedToken = (0, authenticator_1.getTokenData)(token);
                if (!verifiedToken) {
                    res.statusCode = 401;
                    throw new Error("Não autorizado");
                }
                const post = yield (0, postQueries_1.getPosts)(verifiedToken.id);
                const postMap = post.map((item) => {
                    return {
                        id: item.id,
                        postTitle: item.post_title,
                        postContent: item.post_content,
                        createdAt: (0, formatData_1.default)(item.created_at),
                        userId: item.user_id,
                    };
                });
                const postById = postMap.filter((item) => {
                    return item.id === id;
                });
                res.status(200).send({ posts: postById });
            }
            catch (err) {
                res.status(400).send({
                    message: err.message,
                });
            }
        });
        this.editPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { post_title, post_content } = req.body;
            try {
                yield (0, postQueries_1.updatePost)(id, post_title, post_content);
                return res.status(200).json({ message: 'Atualizado com sucesso', updated_post_content: post_content, updated_post_title: post_title });
            }
            catch (error) {
                return res.status(400).json({ error: 'Erro ao atualizar' });
            }
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const token = req.headers.authorization;
                const verifiedToken = (0, authenticator_1.getTokenData)(token);
                if (!verifiedToken) {
                    res.statusCode = 401;
                    throw new Error("Não autorizado");
                }
                yield (0, postQueries_1.deletePost)(id);
                return res.status(200).json({ message: 'Post removido com sucesso' });
            }
            catch (err) {
                return res.status(400).send({
                    message: err.message,
                });
            }
        });
    }
}
exports.default = PostController;
//# sourceMappingURL=postController.js.map