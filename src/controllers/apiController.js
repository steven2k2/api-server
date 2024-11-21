// src/controllers/apiController.js

// Mock data (replace this with actual database logic)
const users = [
    { id: 1, name: 'Alice', email: 'alice@umbrellacorp.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// Controller function to get all users
exports.getAllUsers = (req, res) => {
    res.json(users);
};

// Example controller function
exports.getApiMessage = (req, res) => {
    console.log('API endpoint hit');
    res.json({
        message: 'Hello from the API!',
        timestamp: new Date().toISOString(),
        status: 'Running',
    });
};