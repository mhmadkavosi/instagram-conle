import { IUser } from '@/models/interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter a full name'],
            index: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
        },
        profilePhoto: String,
        saltedPassword: String,
        fristName: String,
        lastName: String,
        bio: String,
        lastIp: String,
        followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
        following: [{ type: mongoose.Types.ObjectId, ref: "User" }]
    },
    { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
