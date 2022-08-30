import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../../utils/jwt";
import AuthService from "../../services/auth";

const authService = new AuthService();

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );

    const refreshToken = get(req, "headers.x-refresh");

    if (!accessToken) return next();

    const { decoded, expired } = decode(accessToken);

    if (decoded) {
        // @ts-ignore
        req.user = decoded;

        return next();
    }

    if (expired && refreshToken) {
        const newAccessToken = await authService.reIssueAccessToken({ refreshToken });

        if (newAccessToken) {
            // Add the new access token to the response header
            res.setHeader("x-access-token", newAccessToken);

            const { decoded } = decode(newAccessToken);

            // @ts-ignore
            req.user = decoded;
        }

        return next();
    }

    return next();
};

export default deserializeUser;
