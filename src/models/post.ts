import mongoose from 'mongoose';

export interface PostDocument extends mongoose.Document {
    userId: string,
    caption: string,
    location: {
        type: String,
        coordinates: [Number],
    },
    imagesPath: [string],
    comments: [{
        _id: string,
        content: string,
    }],
    replies: [{
        commentId: string
    }]
    hashtags: [string],
    likes: [number],
    views: [number]
}


const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        caption: String,
        location: {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number]
        },
        imagesPath: {
            type: [String],
        },
        comments: [{
            _id: mongoose.Types.ObjectId,
            content: String
        }],
        replies: [
            {
                commentId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'comments'
                },

            }
        ],
        hashtags: [{
            type: mongoose.Types.ObjectId,
            ref: 'Hashtags'
        }],
        // TODO : fix likes issue, check for counts and add just user id into arrays
        likes: [
            {
                likeNumber: {
                    type: Number,
                    default: 0
                },
                user_id: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User'
                }
            }
        ],
        views: Number,
    }, {
    timestamps: true
}
)

const Post = mongoose.model<PostDocument>('Post', PostSchema)

export default Post; 