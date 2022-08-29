import { followUser, getUser, unfollowUser } from './../controllers/user';
import { Router } from 'express';
import requiresUser from '../middlewares/requiresUser';

const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    route.get('/me', requiresUser, getUser);
    route.post('/follow', requiresUser, followUser)
    route.post('/unfollow', requiresUser, unfollowUser)
};
