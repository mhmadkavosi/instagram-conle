import { Router } from 'express';
import user from './routes/user'
import hashtag from "./routes/hashtags";
import post from "./routes/post";
// guaranteed to get dependencies
export default () => {
    const app = Router();
    user(app);
    hashtag(app);
    post(app)
    return app
}