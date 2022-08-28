import { DocumentDefinition } from "mongoose";

import User, { UserDocument } from '../models/user'



export default class UserService {

    public async findUsers(): Promise<any> {
        const user = await User.find()
        return user;
    }

    /**
     * createUset
     */
    public async createUser(input: DocumentDefinition<UserDocument>) {
        try {
            return await User.create(input);

        } catch (error) {
            throw new Error(error)
        }

    }
}