import mongoose from 'mongoose';


const Posts = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        caption: String,
        latitude: String,
        longitude: String,
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
        hashtags: {
            type: mongoose.Types.ObjectId,
            ref: 'Hashtags'
        },
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


export default mongoose.model<mongoose.Document>('Posts', Posts)