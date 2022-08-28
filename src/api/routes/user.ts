import { createUser, getUser } from './../controllers/user';
import { Router } from 'express';

const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    route.get('/me', getUser);
    route.post('/', createUser)
};
