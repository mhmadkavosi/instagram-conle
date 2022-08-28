import { Router } from 'express';
import user from './routes/user'
import hashtag from "./routes/hashtags";
// guaranteed to get dependencies
export default () => {
    const app = Router();
    user(app);
    hashtag(app);
    return app
}