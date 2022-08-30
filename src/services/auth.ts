import { FilterQuery, UpdateQuery } from "mongoose";
import config from "../config/index";
import { get } from "lodash";
import Session, { SessionDocument } from "../models/auth";
import { sign, decode } from "../utils/jwt";
import UserService from '@/services/user';

export default class AuthService {

    public async createSession(userId: string, userAgent: string) {
        try {
            const session = await Session.create({ user: userId, userAgent });

            return session.toJSON();
        } catch (error) {
            console.log(error);
        }
    }

    public createAccessToken({ user, session }) {
        // Build and return the new access token
        const accessToken = sign(
            { ...user, session: session._id },
            { expiresIn: '15m' } // 15 minutes
        );

        return accessToken;
    }

    public async reIssueAccessToken({ refreshToken, }: { refreshToken: string; }) {
        try {
            const getUser = new UserService().findUser;
            // Decode the refresh token
            const { decoded } = decode(refreshToken);

            if (!decoded || !get(decoded, "_id")) return false;

            // Get the session
            const session = await Session.findById(get(decoded, "_id"));

            // Make sure the session is still valid
            if (!session || !session?.valid) return false;

            const user = await getUser({ _id: session.user });

            if (!user) return false;

            const accessToken = this.createAccessToken({ user, session });

            return accessToken;
        } catch (error) {
            console.log(error)
        }
    }

    public async updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
        try {
            return await Session.updateMany(query, update);
        } catch (error) {
            console.log(error)
        }
    }

    public async findSessions(query: FilterQuery<SessionDocument>) {
        try {
            return await Session.find(query).lean();
        } catch (error) {
            console.log(error)
        }
    }

}
