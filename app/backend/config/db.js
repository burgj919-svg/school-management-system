
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Prefer environment variable
        let mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/step2scientist";

        if (!process.env.MONGO_URI) {
            console.warn("Warning: MONGO_URI not defined, will attempt local MongoDB or in-memory fallback if available.");
        }

        // Try a normal connection first
        try {
            const conn = await mongoose.connect(mongoUri);
            console.log(` MongoDB Connected Successfully: ${conn.connection.host}`);
            return;
        } catch (err) {
            console.warn(`Initial MongoDB connect failed: ${err.message}`);
            // If connection refused and memory server is available, spin it up
            if ((err.message && err.message.includes('ECONNREFUSED')) || !process.env.MONGO_URI) {
                try {
                    const { MongoMemoryServer } = await import('mongodb-memory-server');
                    console.warn('Starting mongodb-memory-server as a fallback development DB...');
                    const ms = await MongoMemoryServer.create();
                    mongoUri = ms.getUri();
                    const conn2 = await mongoose.connect(mongoUri);
                    console.log(` In-memory MongoDB started. Connected to: ${conn2.connection.host}`);
                    return;
                } catch (msErr) {
                    console.error('Failed to start mongodb-memory-server fallback:', msErr.message);
                }
            }
            throw err; // rethrow original
        }
    } catch (error) {
        console.error(` Database Connection Error: ${error.message}`);
        console.error("Please ensure MongoDB is running locally or set MONGO_URI in app/backend/.env");
        process.exit(1);
    }
};

export default connectDB;

