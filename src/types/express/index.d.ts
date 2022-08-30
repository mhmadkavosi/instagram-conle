import { Document, Model } from 'mongoose';



declare global {
    namespace Express {
        // this is for middleware 
        export interface Request {
            user: Document;
        }
    }
}
