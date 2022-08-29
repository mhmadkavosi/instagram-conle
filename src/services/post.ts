import Post, { PostDocument } from './../models/post';

import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";

export class PostService {

    public getPosts() {
        return Post.find();
    }

    public getPost(query: FilterQuery<PostDocument>) {
        return Post.findOne(query).lean();
    }

    public createPost(input: DocumentDefinition<PostDocument>) {
        return Post.create(input);
    }

    public updatePost(
        query: FilterQuery<PostDocument>,
        update: UpdateQuery<PostDocument>,
        options?: QueryOptions
    ) {
        return Post.findOneAndUpdate(query, update, options)
    }

    public deletePost(query: FilterQuery<PostDocument>) {
        return Post.deleteOne(query);
    }
}