import UserService from '@/services/user';
import { Request, Response } from 'express';

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const user = await userService.findUsers()
        return res.json({ user: user }).status(200);
    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        // const user = await userService.findUser({ _id: req.user._id })
        // return res.json({
        //     user,
        //     followersCount: user.followers.length,
        //     followingCount: user.following.length
        // }).status(200)
        const user = await userService.userProfile(req.user._id);


        return res.json({
            user
        }).status(200)
    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({
            message: true,
            data: user
        })
    } catch (error) {
        res.json({
            error
        }).status(400)
    }
}

export const followUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const userWantToFollow = req.body.userId;
        const user = await userService.findUser({ _id: userId });


        const updateFollowing = await userService.updateUser({ _id: user._id }, { $addToSet: { following: userWantToFollow } })
        const updateFollower = await userService.updateUser({ _id: userWantToFollow }, { $addToSet: { followers: userId } })

        res.json({
            message: true,
        }).status(200)
    } catch (error) {
        res.json({
            error
        }).status(500);
    }
}

export const unfollowUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const userWantToFollow = req.body.userId;
        const user = await userService.findUser({ _id: userId });

        const updateFollowing = await userService.updateUser({ _id: user._id }, { $pull: { following: userWantToFollow } })
        const updateFollower = await userService.updateUser({ _id: userWantToFollow }, { $pull: { followers: userId } })

        res.json({
            message: true,
        }).status(200)
    } catch (error) {
        res.json({
            error
        }).status(500);
    }
}