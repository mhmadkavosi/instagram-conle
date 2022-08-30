import { commentOnPost, createPost, getPost, getPosts, likePost, replyComment } from "../controllers/post";
import { Router } from "express";
import requiresUser from "../middlewares/requiresUser";

const route = Router();

export default (app: Router) => {
    app.use('/posts', route);

    route.route('/').get(getPosts).post(requiresUser, createPost);
    route.route('/:id').get(getPost).post(requiresUser, likePost)
    route.route("/:id/comment").post(requiresUser, commentOnPost);
    route.route('/:id/reply/:commentId').post(requiresUser, replyComment);
}