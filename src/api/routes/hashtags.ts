import { Router } from 'express';
import { createHashtags, getHashtag, getHashtags } from "../controllers/hashtags";
import requiresUser from '../middlewares/requiresUser';

const route = Router();

export default (app: Router) => {
    app.use('/hashtags', route)

    route.route('/').get(getHashtags).post(requiresUser, createHashtags)
    route.route('/:id').get(getHashtag)

}