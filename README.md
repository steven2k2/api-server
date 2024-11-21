# Project Name

A Node.js and PostgreSQL API project designed to run in a Dockerized environment. This project sets up a simple Express API connected to a PostgreSQL database.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [License](#license)

## Project Overview

This project sets up an Express API server and PostgreSQL database using Docker Compose. The API server connects to PostgreSQL to provide basic CRUD functionality, with initial data populated through an SQL initialization script.

## Features

- Dockerized setup for easy deployment and development
- Express API with PostgreSQL database
- Sample data pre-populated using an SQL script
- Retry mechanism in the API server for connecting to PostgreSQL

## Requirements

- Docker and Docker Compose
- Node.js (for local development if not using Docker)

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/yourusername/yourprojectname.git
   cd yourprojectname
```

2. Set up environment variables by creating a .env file (or use the included .env as a template).
3. Run the application with Docker Compose:

```bash
docker-compose up --build
```
4. The API server should now be accessible at http://localhost:3005.

## Usage

Once the containers are running, you can access the API endpoints:
- Test the server: Visit http://localhost:3005/api to check if the API is running.
- View sample data: Visit http://localhost:3005/api/users to retrieve the list of users from PostgreSQL.

## Endpoints

- ``GET /api`` - Basic endpoint to test if the server is running
- ``GET /api/users`` - Retrieves all users from the PostgreSQL database

## Environment Variables

The project uses environment variables to configure PostgreSQL and the API server. Place these in a .env file in the project root:

```plaintext
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
DB_HOST=postgres
DB_PORT=5432
PORT=3005
```

## Testing

To test the API, you can use:

- **Curl:**

```bash
  curl http://localhost:3005/api
  curl http://localhost:3005/api/users
```

- **Postman or any other API client:** Send requests to http://localhost:3005/api and http://localhost:3005/api/users.
  Here’s the content formatted in Markdown:

## License

This project is licensed under the MIT Licence. See the LICENCE file for details.

```plaintext
/project-root
├── src/
│   ├── controllers/
│   │   └── usersController.js  # Controller for user-related logic
│   ├── routes/
│   │   ├── api.js             # Main API routes
│   │   └── users.js           # Routes for /api/users
│   ├── public/                # Static files (CSS, images, favicon, etc.)
│   ├── db.js                  # Database connection file
│   └── index.js               # Main entry point
├── docker-compose.yml         # Docker Compose configuration
├── package.json               # Project dependencies and scripts
├── init.sql                   # Database initialization SQL
└── db/                        # Secrets or volume-related database files
└── password.txt           # PostgreSQL password secret
```