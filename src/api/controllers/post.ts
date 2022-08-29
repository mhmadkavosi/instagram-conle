import { Request, Response } from 'express';
import { PostService } from './../../services/post';

const postService = new PostService();

export const getPosts = async (req: Request, res: Response) => {
    try {
        const data = await postService.getPosts();
        res.json({
            message: true,
            data
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
            data
        })
    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}


export const createPost = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const data = postService.createPost({ userId: req.user._id }, req.body)

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