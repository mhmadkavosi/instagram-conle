import mongoose from 'mongoose';


const Hashtags = new mongoose.Schema(
    {
        hashtag: String
    }
)

export default mongoose.model<mongoose.Document>('Hashtags', Hashtags)