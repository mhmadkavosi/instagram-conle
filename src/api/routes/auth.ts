import { createUser } from './../controllers/user';
import { Router } from "express";

import {
    createUserSessionHandler,
    getUserSessionsHandler,
    invalidateUserSessionHandler
} from "../controllers/auth";
import requiresUser from "../middlewares/requiresUser";

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route.route('/signup').post(createUser);
    route.route('/login').post(createUserSessionHandler);
    route.route('/me').get(requiresUser, getUserSessionsHandler);
    route.route('/logout').delete(requiresUser, invalidateUserSessionHandler);

}