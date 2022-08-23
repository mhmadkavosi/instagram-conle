import { Request, Response } from 'express';


export const getUser = async (req: Request, res: Response) => {
    try {
        return res.json({ user: 'user' }).status(200);
    } catch (error) {
        res.json({
            error
        }).status(400)
    }
}