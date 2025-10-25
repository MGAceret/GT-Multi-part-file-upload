// src/controllers/post.controller.js
import * as postService from '../services/post.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving posts', error: error.message });
    }
};

export const getPostById = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.getPostById(postId);

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post retrieved successfully"));
});

export const createPost = asyncHandler(async (req, res) => {
    
    const authorId = req.user.id;
    const postData = req.body;

    const newPost = await postService.createPost(postData, authorId);
    res.status(201).json(new ApiResponse(201, newPost, "Post created Successfully!"));
});

export const updatePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const postData = req.body;
    const userId = req.user.id; // Get the user ID from the middleware

    const updatedPost = await postService.updatePost(postId, postData, userId);
    res.status(200).json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});


export const partiallyUpdatePost = async (req, res) => {
    try { 
    const postId = parseInt(req.params.id, 10);
    const post = await postService.partiallyUpdatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
    } catch (error) {
        res.status(500).json ({ message: 'Error retrieving posts', error: error.message });        
    }
};

export const deletePost = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const userId = req.user.id; // Get the user ID from the middleware

    await postService.deletePost(postId, userId);
    res.status(200).json(new ApiResponse(200, null, "Post deleted successfully"));
});