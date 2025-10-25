// src/controllers/user.controller.js
import * as userService from '../services/user.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createUser = asyncHandler(async (req, res) => {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(new ApiResponse(true, 'User created successfully', newUser));
});

export const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(new ApiResponse(true, 'User fetched successfully', user));
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(new ApiResponse(true, 'Multiple Users fetched successfully', users));
});

export const getPostsByUser = asyncHandler(async (req, res) => {
    const postUser = await userService.getPostsByUser(req.params.userId);
    res.status(200).json(new ApiResponse(true, 'Posts by specific Author fetched successfully.', postUser));
});