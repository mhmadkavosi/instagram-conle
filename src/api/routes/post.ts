import { createPost, getPost, getPosts } from "../controllers/post";
import { Router } from "express";

const route = Router();

export default (app: Router) => {
    app.use('/posts', route);

    route.route('/').get(getPosts).post(createPost);
    route.route('/:id').get(getPost);
}