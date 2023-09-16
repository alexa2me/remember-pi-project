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
exports.updatePost = exports.deletePost = exports.getPostById = exports.getPosts = exports.addPost = void 0;
const connection_1 = __importDefault(require("../data/connection"));
const addPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)("posts").insert(post);
});
exports.addPost = addPost;
const getPosts = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, connection_1.default)("posts")
        .select("posts.id", "post_title", "post_content", "user_id", "created_at")
        .where("user_id", `${id}`)
        .orderBy("created_at");
    return result;
});
exports.getPosts = getPosts;
const getPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, connection_1.default)("posts")
        .select("posts.id", "post_title", "post_content", "user_id", "created_at")
        .where("posts.id", `${id}`);
    return result;
});
exports.getPostById = getPostById;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)("posts").where("id", id).delete();
});
exports.deletePost = deletePost;
const updatePost = (postId, newTitle, newContent) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)("posts")
        .update({
        post_title: newTitle,
        post_content: newContent
    })
        .where("id", postId);
});
exports.updatePost = updatePost;
//# sourceMappingURL=postQueries.js.map