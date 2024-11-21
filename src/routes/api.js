const express = require('express');
const router = express.Router();

// Import individual resource routes
const clientRoutes = require('./clients');
const userRoutes = require('./users');
const travelLogRoutes = require('./travel_logs');

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API. Documentation is available at /api-docs.',
    });
});

// Group resource routes under `/api`
router.use('/clients', clientRoutes);
router.use('/users', userRoutes);
router.use('/travel_logs', travelLogRoutes);

module.exports = router;