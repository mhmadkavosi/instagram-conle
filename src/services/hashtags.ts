
import { DocumentDefinition, FilterQuery } from "mongoose";

import HashTags, { HashtagsDocument } from '../models/hashtags'


export class HashTagsService {
    public async getHashtags(): Promise<any> {
        try {
            return await HashTags.find();
        } catch (error) {
            console.log(error)
        }
    }

    public async getHashtag(query: FilterQuery<HashtagsDocument>) {
        return await HashTags.findOne(query).lean();
    }

    public async createHashtags(input: DocumentDefinition<HashtagsDocument>) {
        try {
            return await HashTags.create(input)
        } catch (error) {
            console.log(error)
        }
    }

    // public async updateHashtags() { }

    // public async deleteHashtags() { }

}