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
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            },
            content: String,
        }],
        replies: [
            {
                commentId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'comments'
                },
                userId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User'
                },
                content: String
            }
        ],
        hashtags: [{
            type: mongoose.Types.ObjectId,
            ref: 'Hashtags'
        }],
        likes: [
            {
                userId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                    unique: true
                },
            }
        ],
        views: Number,
    }, {
    timestamps: true
}
)

PostSchema.virtual('likeCount').get(function () {
    return this.likes.length;
})

const Post = mongoose.model<PostDocument>('Post', PostSchema)

export default Post; 