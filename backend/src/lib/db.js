import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const { MONGO_URI } = process.env;
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    } finally {
        mongoose.set('strictQuery', false); // Disable strict query mode
    }
};

export default connectDB;