import { createPost, getPost, getPosts } from "../controllers/post";
import { Router } from "express";
import requiresUser from "../middlewares/requiresUser";

const route = Router();

export default (app: Router) => {
    app.use('/posts', route);

    route.route('/').get(getPosts).post(requiresUser, createPost);
    route.route('/:id').get(getPost);
}