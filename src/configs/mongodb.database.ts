import mongoose from 'mongoose';

export const connectMongodb = async () => {
    try {
        await mongoose.connect(String(process.env.MONGO_URL));
        console.log('MongoDB connected successfully.')
    } catch (error) {
        console.error('MongoDB connected error, ', error);
    }
}