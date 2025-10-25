import { body } from 'express-validator';

// Validation rules for creating a post
export const createPostRules = [
    body('title')
        .isString().withMessage('Title must be a string.')
        .trim()
        .notEmpty().withMessage('Title is required.')
        .isLength({min: 5, max: 100}).withMessage('The Title must be between 5 and 100 characcters.')
        .custom(value => {
            const forbiddenWords = ['spam', 'advertisement'];
            const lowerCaseTitle = value.toLowerCase();
            for (const word of forbiddenWords) {
                if (lowerCaseTitle.includes(word)) {
                    throw new Error(`The title cannot contain the word "${word}".`);
                }
            }
            return true; // If validation is passed
        }),
    body('content')
        .isString().withMessage('Content must be a string.')
        .trim()
        .notEmpty().withMessage('Content is required.')
];

export const updatePostRules = [
    body('title')
        .optional() // This field is not required
        .trim()
        .notEmpty().withMessage('Title cannot be empty.')
        .isString().withMessage('Title must be a string.'),
    body('content')
        .optional()
        .trim()
        .notEmpty().withMessage('Content cannot be empty.')
        .isString().withMessage('Content must be a string.')
];