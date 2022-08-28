import { Router } from 'express';
import { createHashtags, getHashtag, getHashtags } from "../controllers/hashtags";

const route = Router();

export default (app: Router) => {
    app.use('/hashtags', route)

    route.route('/').get(getHashtags).post(createHashtags)
    route.route('/:id').get(getHashtag)

}