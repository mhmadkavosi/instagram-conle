import UserService from '@/services/user';
import { Request, Response } from 'express';


const userService = new UserService();

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.findUsers()
        return res.json({ user: user }).status(200);
    } catch (error) {
        res.json({
            error
        }).status(400)
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