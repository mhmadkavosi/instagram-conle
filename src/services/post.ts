import mongoose from "mongoose";
import Post, { PostDocument } from './../models/post';

import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";

export class PostService {

    public async getPosts() {
        try {
            // return await Post.find();

            const post = await Post.aggregate([
                {
                    $project: {
                        userId: 1,
                        caption: 1,
                        location: 1,
                        imagesPath: 1,
                        comments: 1,
                        replies: 1,
                        hashtags: 1,
                        likes: 1,
                        likesCount: { $size: "$likes" }
                    }
                }
            ])

            return post;

        } catch (error) {
            return error
        }

    }

    public async findPost(query: FilterQuery<PostDocument>) {
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

    public async getPost(postId: string) {
        try {
            const post = await Post.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(postId) }
                },
                {
                    $project: {
                        userId: 1,
                        caption: 1,
                        location: 1,
                        imagesPath: 1,
                        comments: 1,
                        replies: 1,
                        hashtags: 1,
                        likes: 1,
                        likesCount: { $size: "$likes" }
                    }
                }
            ])

            return post
        } catch (error) {
            return error
        }
    }
}