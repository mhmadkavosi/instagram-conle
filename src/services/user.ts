import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";

import User, { UserDocument } from "../models/user";

export default class UserService {
    public async findUsers() {
        try {
            return await User.find();

        } catch (error) {
            return error
        }
    }

    public async findUser(query: FilterQuery<UserDocument>) {
        try {
            return await User.findOne(query).lean();

        } catch (error) {
            return error
        }
    }

    public async createUser(input: DocumentDefinition<UserDocument>) {
        try {
            return await User.create(input);

        } catch (error) {
            return error
        }
    }

    public async updateUser(
        query: FilterQuery<UserDocument>,
        update: UpdateQuery<UserDocument>,
        options?: QueryOptions
    ) {
        try {
            return await User.findOneAndUpdate(query, update, options)

        } catch (error) {
            return error
        }
    }

    public async deleteUser(query: FilterQuery<UserDocument>) {
        try {
            return await User.deleteOne(query);

        } catch (error) {
            return error
        }
    }

    public async validatePassword({
        email,
        password,
    }: {
        email: UserDocument["email"];
        password: string;
    }) {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return false;
            }

            const isValid = await user.comparePassword(password);

            if (!isValid) {
                return false;
            }

            return omit(user.toJSON(), "password");
        } catch (error) {
            return error
        }
    }
}
