import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from 'path';
import ConnectDB from '../src/lib/db.js';

dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000
const app = express(); //   Create an Express application
const __dirname = path.resolve(); // Get the current directory name

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/auth', authRoutes); // Use auth routes for /api/auth endpoint
app.use('/api/message', messageRoutes); // Use message routes for /api/message endpoint

//make ready for deployment
if (process.env.NODE_ENV === 'production') { // Check if the environment is productio
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}
app.listen(PORT, () => {
    console.log(`Server is continuouslyrunning on port ${PORT}`);
    ConnectDB();
});