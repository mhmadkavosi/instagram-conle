import Post, { PostDocument } from './../models/post';

import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";

export class PostService {

    public async getPosts() {
        try {
            return await Post.find();

        } catch (error) {
            return error
        }

    }

    public async getPost(query: FilterQuery<PostDocument>) {
        try {
            return await Post.findOne(query).lean();
        } catch (error) {
            return error
        }
    }

    public async createPost(input: DocumentDefinition<PostDocument>) {
        try {
            return await Post.create(input);

        } catch (error) {
            return error
        }
    }

    public async updatePost(
        query: FilterQuery<PostDocument>,
        update: UpdateQuery<PostDocument>,
        options?: QueryOptions
    ) {
        try {
            return await Post.findOneAndUpdate(query, update, options)

        } catch (error) {
            return error
        }
    }

    public async deletePost(query: FilterQuery<PostDocument>) {
        try {
            return await Post.deleteOne(query);
        } catch (error) {
            return error
        }
    }
}