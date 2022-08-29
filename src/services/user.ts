import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";

import User, { UserDocument } from "../models/user";

export default class UserService {
    public async findUsers(): Promise<any> {
        const user = await User.find();
        return user;
    }

    public async findUser(query: FilterQuery<UserDocument>) {
        return await User.findOne(query).lean();
    }

    public async createUser(input: DocumentDefinition<UserDocument>) {
        try {
            return await User.create(input);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async validatePassword({
        email,
        password,
    }: {
        email: UserDocument["email"];
        password: string;
    }) {
        const user = await User.findOne({ email });

        if (!user) {
            return false;
        }

        const isValid = await user.comparePassword(password);

        if (!isValid) {
            return false;
        }

        return omit(user.toJSON(), "password");
    }
}
