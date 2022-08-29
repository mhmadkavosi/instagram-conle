import { omit } from "lodash";
import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";

import User, { UserDocument } from "../models/user";

export default class UserService {
    public findUsers() {
        return User.find();
    }

    public findUser(query: FilterQuery<UserDocument>) {
        return User.findOne(query).lean();
    }

    public createUser(input: DocumentDefinition<UserDocument>) {
        return User.create(input);
    }

    public updateUser(
        query: FilterQuery<UserDocument>,
        update: UpdateQuery<UserDocument>,
        options?: QueryOptions
    ) {
        return User.findOneAndUpdate(query, update, options)
    }

    public deleteUser(query: FilterQuery<UserDocument>) {
        return User.deleteOne(query);
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
