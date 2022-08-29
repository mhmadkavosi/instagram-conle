import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document {
    _id: string;
    username: string;
    email: string;
    profilePhoto: string,
    password: string;
    fristName: string,
    lastName: string,
    bio: string,
    lastIp: string,
    followers: [string],
    following: [string],
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
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
        password: String,
        fristName: String,
        lastName: String,
        bio: String,
        lastIp: String,
        followers: [{ type: mongoose.Types.ObjectId, ref: "User", uniqe: true }],
        following: [{ type: mongoose.Types.ObjectId, ref: "User", uniqe: true }]
    },
    { timestamps: true },
);

UserSchema.pre('save', async function (next) {
    let user = this;

    if (!user.isModified("password")) return next();

    // Random additional data
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hashSync(user.password, salt);

    // Replace the password with the hash
    user.password = hash;

    return next();
})


// Used for logging in
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};


UserSchema.virtual('followingCount').get(function () {
    return this.following.length;
})

UserSchema.virtual('followerCount').get(function () {
    return this.followers.length;
})

const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;
