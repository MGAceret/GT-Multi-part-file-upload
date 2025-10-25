// src/services.user.service.js
import db from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Creating a User by inserting username and email
export const createUser = async(userData) => {
    const { username, email } = userData;

    try {
        const [insertUser] = await db.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email]);

    const newUserId = insertUser.insertId;
    return await getUserById(newUserId);

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ApiError(409, 'Username or email already exists.');
        }
        throw error;
    }
};


// Fetching all posts by specific user
export const getPostsByUser = async (userId) => {
    const [posts] = await db.query('SELECT * FROM posts WHERE authorId = ?', [userId]);
    return posts;
};

export const registerUser = async (userData) => {
    const { username, email, password } = userData;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await db.query (
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        const newUser = await getUserById(result.insertId);
        return newUser;

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ApiError(409, "Username or email already exists.");
        }
        throw error;
    }
};

export const getUserById = async (id) => {
    const [rows] = await db.query('SELECT id, username, email, createdAt FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
        throw new ApiError(404, "User not found");
    }
    return rows[0];
};

export const getAllUsers = async () => {
    const [users] = await db.query ('SELECT id, username, email, createdAt FROM users');
    return users;
}

export const loginUser = async (loginData) => {
    const { email, password } = loginData;

    // 1. Finding the user email
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
        throw new ApiError(401, "Invalid credentials");
    }
    const user = rows[0];

    // 2. Compare provided password and stored hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError(401, "Invalid Credentials");
    }

    // 3. Password matched? Generate a JWT
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    };

    const token  = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h' // Duration of expiration is 1 hour
    });

    return token;
}