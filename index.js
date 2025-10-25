// index.js
import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import postRoutes from './src/routes/post.routes.js';
import userRoutes from './src/routes/user.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import photoRoutes from './src/routes/photo.routes.js';
import { testConnection } from './src/config/db.js'; 
import { errorHandler } from './src/middleware/errorHandler.middleware.js';

const app = express();
const port = 3000;

app.use(express.json());

// Making 'uploads' accessible
app.use('/uploads', express.static('uploads'));

// Mount the authorized users
app.use('/api/auth', authRoutes)

// Mount the post routes
app.use('/api/posts', postRoutes);
// Mount the user routes
app.use('/api/users', userRoutes);
// Mount the comments routes
app.use('/api', commentRoutes);
// Mount the photo routes
app.use('/api/photos', photoRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    testConnection(); // Test the database connection on startup
});