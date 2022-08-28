import Post, { PostDocument } from './../models/post';

import { DocumentDefinition, FilterQuery } from "mongoose";

export class PostService {

    public async getPosts(): Promise<any> {
        try {
            return await Post.find();
        } catch (error) {
            console.log(error)
        }
    }

    public async getPost(query: FilterQuery<PostDocument>) {
        return await Post.findOne(query).lean();
    }

    public async createPost(input: DocumentDefinition<PostDocument>) {
        try {
            return await Post.create(input);
        } catch (error) {
            console.log(error)
        }
    }

    // public async updatePost() { }

    // public async deletePost() { }
}