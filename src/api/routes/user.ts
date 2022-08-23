import { Router } from 'express';
import { getUser } from "../controllers/user";
const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    route.get('/me', getUser);
};
