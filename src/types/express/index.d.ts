import { Document, Model } from 'mongoose';
import { IUser } from '@/models/interfaces/IUser';



declare global {
    namespace Express {
        // this is for middleware 
        export interface Request {
            currentUser: IUser & Document;
        }
    }
    namespace Models {
        export type UserModel = Model<IUser & Document>;
    }
}
