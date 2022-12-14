import AuthService from './../../services/auth';
import UserService from '@/services/user';
import { get } from "lodash";
import { Request, Response } from "express";
import { sign } from "../../utils/jwt";

const authService = new AuthService();

export async function createUserSessionHandler(req: Request, res: Response) {
    // validate the email and password
    const validatePassword = new UserService().validatePassword;
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid username or password");
    }

    console.log(req.user)
    // Create a session
    const session = await authService.createSession(user._id, req.get("user-agent") || "");

    // create access token
    const accessToken = authService.createAccessToken({
        user,
        session,
    });

    // create refresh token
    const refreshToken = sign(session, {
        expiresIn: '1y', // 1 year
    });

    // send refresh & access token back
    return res.send({ accessToken, refreshToken });
}

export async function invalidateUserSessionHandler(
    req: Request,
    res: Response
) {
    const sessionId = get(req, "user.session");

    await authService.updateSession({ _id: sessionId }, { valid: false });

    return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");

    const sessions = await authService.findSessions({ user: userId, valid: true });

    return res.send(sessions);
}
