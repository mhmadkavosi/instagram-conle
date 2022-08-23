import mongoose from 'mongoose';
import config from '@/config';

export default async () => {
    mongoose.connect(config.databaseURL, {
        autoIndex: true,
        autoCreate: true
    });

};
