
import { DocumentDefinition, FilterQuery } from "mongoose";

import HashTags, { HashtagsDocument } from '../models/hashtags'


export class HashTagsService {
    public async getHashtags(): Promise<any> {
        try {
            return await HashTags.find();
        } catch (error) {
            return error
        }
    }

    public async getHashtag(query: FilterQuery<HashtagsDocument>) {
        try {
            return await HashTags.findOne(query).lean();
        } catch (error) {
            return error
        }
    }

    public async createHashtags(input: DocumentDefinition<HashtagsDocument>) {
        try {
            return await HashTags.create(input)
        } catch (error) {
            return error
        }
    }

    // public async updateHashtags() { }

    // public async deleteHashtags() { }

}