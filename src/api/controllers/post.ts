import { Request, Response } from 'express';
import { PostService } from './../../services/post';

const postService = new PostService();

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
        const data = await postService.getPost(req.params.id)

        res.json({
            message: true,
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
        let userId = req.user._id;
        const post = await postService.findPost({ _id: req.params.id });

        const updateLike = await postService.updatePost({ _id: post._id }, { $push: { likes: { userId } } })

        res.json({
            message: true,
            updateLike
        }).status(200)

    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}

//  TODO : remove like 
// export const RemoveLikePost = async (req: Request, res: Response) => { } 

export const commentOnPost = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;

        const post = await postService.findPost({ _id: req.params.id })

        const addComment = await postService.updatePost({
            _id: post._id
        }, { $push: { comments: { content: req.body.comment, userId: userId } } })

        res.json({
            message: true,
            addComment
        })

    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}

export const replyComment = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const post = await postService.findPost({ _id: req.params.id })
        // TODO : check for comment in db if exsits reply to it


        const addComment = await postService.updatePost({
            _id: post._id
        }, { $push: { replies: { commentId: req.params.commentId, content: req.body.comment, userId } } })

        res.json({
            message: true,
            addComment
        })

    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}
