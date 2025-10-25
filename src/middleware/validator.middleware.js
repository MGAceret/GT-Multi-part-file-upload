// src/middlewares/validator.middleware.js
import { body, validationResult } from 'express-validator';

export const validatePost = [
    // Title must not be empty and is sanitized
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required.'),

    // Content must not be empty and is sanitized
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required.'),

    // This function handles the result of the validations
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateComment = [
    body('text')
        .trim()
        .notEmpty()
        .withMessage('Comment is required.'),

    body('authorId')
        .isInt({ min: 1 })
        .withMessage('A valid author ID is required'),

    // Validation Result Handler
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateRegistration = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required.'),

    body('email')
        .isEmail()
        .withMessage('A valid email is required.'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];

export const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('A valid email is required.'),

    body('password')
        .notEmpty()
        .withMessage('Password is required.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];
