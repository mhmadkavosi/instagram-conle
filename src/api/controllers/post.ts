import { Request, Response } from 'express';
import { PostService } from './../../services/post';

const postService = new PostService();

// TODO return number of likes in response and users that like it
export const getPosts = async (req: Request, res: Response) => {
    try {
        const data = await postService.getPosts();
        res.json({
            message: true,
            data,
        }).status(200)
    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const data = await postService.getPost({ _id: req.params.id });
        res.json({
            message: true,
            likeCount: data.likes.length,
            data,
        })
    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}

// TODO : make hashtags by destructuring in captions using only # signs
export const createPost = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user._id;
        const body = req.body;

        const data = await postService.createPost({ ...body, userId })

        res.json({
            message: true,
            data
        }).status(201)
    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}


export const likePost = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        console.log(userId)
        const post = await postService.getPost({ _id: req.params.id });

        const updateLike = await postService.updatePost({ _id: post._id }, { $set: { likes: { userId } } })

        return res.json({
            message: true,
            updateLike
        }).status(200)

    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}
