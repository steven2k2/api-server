const express = require('express');
const cors = require('cors'); // Import CORS
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3005;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
}));

// Middleware: Serve static files
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// Middleware: Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Server',
            version: '1.0.1',
            description: 'RESTful API server documentation.',
        },
    },
    apis: [path.join(__dirname, 'routes/*.js')], // Dynamically fetch Swagger docs
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API routes
app.use('/api', apiRoutes);

// Home route
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>API Home</title>
                <link rel="stylesheet" href="/main.css">
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon">
            </head>
            <body>
                <h1>Welcome to the API Server</h1>
                <p>The API is running. You can view the documentation at <a href="/api-docs">/api-docs</a>.</p>
            </body>
        </html>
    `);
});

// 404 handler: Catch all undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const isProduction = process.env.NODE_ENV === 'production';
    console.error(`[${new Date().toISOString()}] Error: ${err.stack}`);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        ...(isProduction ? {} : { stack: err.stack }), // Include stack trace in non-production
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});