// src/controllers/comment.controller.js
import * as commentService from '../services/comment.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAllComments = asyncHandler(async (req, res) => {
    const comments = await commentService.getAllComments();
    res.status(200).json(new ApiResponse(200, comments, 'All comments fetched successfully.'));
});

export const getCommentsByPostId = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);

    if (isNaN(postId)) {
        return res.status(400).json(new ApiResponse(400, null, 'Invalid postId'));
    }

    const comments = await commentService.getCommentsByPostId(postId);
    res.status(200).json(new ApiResponse(200, comments, `Comments for post ${postId} retrieved.`));
});

export const createCommentForPost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { text, authorId } = req.body;

    if (!text || !authorId) {
        return res.status(400).json(new ApiResponse(400, null, 'Both text and authorId are required.'));
    }

    const newComment = await commentService.createComment(postId, authorId, { text });

    if (!newComment) {
        return res.status(404).json(new ApiResponse(404, null, 'Post or author not found.'));
    }

    res.status(201).json(new ApiResponse(201, newComment, 'Comment created successfully.'));
});