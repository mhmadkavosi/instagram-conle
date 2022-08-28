import { HashTagsService } from "../../services/hashtags";
import { Request, Response } from "express";


const hashTagsServie = new HashTagsService();


export const getHashtags = async (req: Request, res: Response) => {
    try {
        const data = await hashTagsServie.getHashtags();
        return res.status(200).json({
            message: true,
            data
        });
    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}

export const createHashtags = async (req: Request, res: Response) => {
    try {
        const data = await hashTagsServie.createHashtags(req.body);
        return res.status(201).json({
            message: true,
            data
        })
    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}

export const getHashtag = async (req: Request, res: Response) => {
    try {
        const data = await hashTagsServie.getHashtag({ _id: req.params.id });
        return res.status(200).json({
            message: true,
            data
        })
    } catch (error) {
        res.json({
            error
        }).status(500)
    }
}


