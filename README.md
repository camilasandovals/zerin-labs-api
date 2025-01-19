# Zerin Labs API

A RESTful API for managing user health information and medications.

## Project Overview

This API provides endpoints for managing users, their medications, and health information. Built with Node.js and Express.js, it uses MongoDB for data persistence and includes authentication features.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/zerin-labs-api.git
cd zerin-labs-api
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `env.js`:

```javascript
export const MONGOURI = "your_mongodb_connection_string";
export const secretKey = "your_secret_key_for_jwt";
export const salt = "your_bcrypt_salt";
```

4. Start the server:

```bash
node src/app.js
```

The server will start on `http://localhost:3001/api/`

## Project Structure

```
zerin-labs-api/
├── src/
│   ├── app.js              # Express app setup
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   └── routes/            # API routes
├── env.js                 # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

### Base URL

`http://localhost:3001/api/`

### Users

- `GET /users` - Get all users
- `POST /users` - Create a new user
- `POST /users/login` - User login
- `PATCH /users` - Update user information
- `POST /users/points` - Manage user points

### Medications

- `GET /medications` - Get all medications
- `POST /medications` - Add a new medication
- `GET /medications/:docId` - Get specific medication information
- `PATCH /medications/:docId` - Update medication information

## Dependencies

- express: ^4.18.2 - Web framework
- mongoose: ^7.1.0 - MongoDB ODM
- bcrypt: ^5.1.0 - Password hashing
- jsonwebtoken: ^9.0.0 - JWT authentication
- cors: ^2.8.5 - Cross-Origin Resource Sharing
- dotenv: ^16.0.3 - Environment variable management
- mongodb: ^5.4.0 - MongoDB driver

## Environment Variables

Required environment variables in `env.js`:

- `MONGOURI`: MongoDB connection string
- `secretKey`: Secret key for JWT token generation
- `salt`: BCrypt salt for password hashing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
