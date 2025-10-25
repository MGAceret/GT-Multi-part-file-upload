// src/routes/comment.routes.js
import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';
import { validateComment } from '../middleware/validator.middleware.js';

const router = Router();

// Route for fetching all comments
router.get('/comments', commentController.getAllComments);
// Route for fetching specific post
router.get('/posts/:postId/comments', commentController.getCommentsByPostId);
// Route for adding a comment on a post (authorId included)
router.post('/posts/:postId/comments', validateComment, commentController.createCommentForPost);

export default router;