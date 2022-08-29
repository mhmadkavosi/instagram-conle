import { Router } from 'express';
import user from './routes/user'
import hashtag from "./routes/hashtags";
import post from "./routes/post";
import auth from './routes/auth';
// guaranteed to get dependencies
export default () => {
    const app = Router();
    user(app);
    hashtag(app);
    post(app)
    auth(app)
    return app
}