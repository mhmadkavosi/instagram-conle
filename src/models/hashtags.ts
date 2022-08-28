import mongoose from 'mongoose';

export interface HashtagsDocument extends mongoose.Document {
    _id: string,
    hashtag: string
}

const HashtagsSchema = new mongoose.Schema(
    {
        hashtag: {
            type: String,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

const HashTags = mongoose.model<HashtagsDocument>('Hashtags', HashtagsSchema);

export default HashTags;