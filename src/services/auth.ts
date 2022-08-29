import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import config from "../config/index";
import { get } from "lodash";
import { UserDocument } from "../models/user";
import Session, { SessionDocument } from "../models/auth";
import { sign, decode } from "../utils/jwt";
import UserService from '@/services/user';

// : {
//     user:
//     | Omit<UserDocument, "password">
//     | LeanDocument<Omit<UserDocument, "password">>;
//     session:
//     | Omit<SessionDocument, "password">
//     | LeanDocument<Omit<SessionDocument, "password">>;
// }

export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({ user: userId, userAgent });

    return session.toJSON();
}


export function createAccessToken({
    user,
    session,
}) {
    // Build and return the new access token
    const accessToken = sign(
        { ...user, session: session._id },
        { expiresIn: '15m' } // 15 minutes
    );

    return accessToken;
}

export async function reIssueAccessToken({
    refreshToken,
}: {
    refreshToken: string;
}) {
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

    const accessToken = createAccessToken({ user, session });

    return accessToken;
}

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) {
    return Session.updateMany(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return Session.find(query).lean();
}
