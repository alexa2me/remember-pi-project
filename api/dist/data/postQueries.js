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
exports.addPostImages = exports.addPost = void 0;
const connection_1 = __importDefault(require("../data/connection"));
const idGenerator_1 = require("../services/idGenerator");
const addPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)("posts").insert(post);
});
exports.addPost = addPost;
const addPostImages = (postId, imageUrls) => __awaiter(void 0, void 0, void 0, function* () {
    const imageInserts = imageUrls.map((url) => ({
        id: (0, idGenerator_1.generateId)(),
        url,
    }));
    yield (0, connection_1.default)("images_urls").insert(imageInserts);
    const postsUrlsInserts = imageInserts.map((image) => ({
        id: (0, idGenerator_1.generateId)(),
        post_id: postId,
        url_image_id: image.id,
    }));
    yield (0, connection_1.default)("posts_urls").insert(postsUrlsInserts);
});
exports.addPostImages = addPostImages;
//# sourceMappingURL=postQueries.js.map