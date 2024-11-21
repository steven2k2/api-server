const db = require('../db'); // Database connection

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users ORDER BY user_id');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { email, display_name, role } = req.body;

    if (!email || !display_name) {
        return res.status(400).json({ error: 'Email and display_name are required' });
    }

    try {
        const result = await db.query(
            'INSERT INTO users (email, display_name, role) VALUES ($1, $2, $3) RETURNING *',
            [email, display_name, role || 'user']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { email, display_name, role } = req.body;

    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const result = await db.query(
            'UPDATE users SET email = COALESCE($1, email), display_name = COALESCE($2, display_name), role = COALESCE($3, role) WHERE user_id = $4 RETURNING *',
            [email, display_name, role, userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const result = await db.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: result.rows[0] });
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };