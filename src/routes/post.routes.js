// src/routes/post.routes.js
import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import { updatePost } from '../services/post.service.js';
import { createPostRules, updatePostRules } from '../validators/post.validator.js';
import { validatePost  } from '../middleware/validator.middleware.js';
import { createCommentForPost } from '../controllers/comment.controller.js';
import { validateComment } from '../middleware/validator.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createPost } from '../controllers/post.controller.js';


const router = Router();


router.put('/:id', validatePost, postController.updatePost);
router.patch('/:id', postController.partiallyUpdatePost);



router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
// router.put('/:id', updatePostRules, postController.updatePost);
// router.delete('/:id', postController.deletePost);

router.post('/:postId/comments', validateComment, createCommentForPost);

// Protected Routes
router.post('/', authMiddleware, validatePost, postController.createPost);
router.put('/:id', authMiddleware, validatePost, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

export default router;