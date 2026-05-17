# 🎓 GATE & UGC NET Practice Platform - Backend

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-9.2.2-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens)

**RESTful API server for the GATE and UGC NET Practice Platform**

</div>

---

## 📌 Overview

The Backend module is a Node.js/Express REST API server that handles all business logic, authentication, and database operations for the platform. It provides secure endpoints for both student and admin functionality.

---

## ✨ Features

- 🔐 **Authentication** - JWT-based user and admin authentication
- 👤 **User Management** - Registration, login, profile management
- 📝 **Test Management** - CRUD operations for tests and questions
- 📊 **Results Tracking** - Store and retrieve test results
- 📈 **Statistics** - User performance analytics
- 🛡️ **Security** - Password hashing with bcrypt

---

## 🏗️ Project Structure

```
Backend/
├── config/
│   └── connectDB.js         # MongoDB connection configuration
├── controllers/
│   ├── adminController.js   # Admin authentication and management logic
│   ├── authController.js    # User authentication logic
│   ├── testController.js    # Test management and submission logic
│   └── userController.js    # User profile and statistics logic
├── middleware/
│   ├── adminAuth.js         # Admin JWT authentication middleware
│   └── userAuth.js          # User JWT authentication middleware (required & optional)
├── models/
│   ├── Test.js              # Test and Question schema definition
│   ├── TestResult.js        # Test result and answers schema
│   └── User.js              # User profile and authentication schema
├── routes/
│   ├── adminRoutes.js       # Admin-only API routes
│   ├── authRoutes.js        # Public authentication routes
│   ├── testRoutes.js        # Test CRUD and submission routes
│   └── userRoutes.js        # User profile and stats routes
├── .env                     # Environment variables (not in git)
├── .gitignore               # Git ignore rules
├── index.js                 # Express app entry point
├── package.json             # Dependencies and scripts
└── README.md                # Backend documentation
```

---

## 💻 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | Runtime environment |
| Express.js | 5.2.1 | Web framework |
| MongoDB | - | Database |
| Mongoose | 9.2.2 | MongoDB ODM |
| JWT | 9.0.3 | Authentication tokens |
| bcryptjs | 3.0.3 | Password hashing |
| CORS | 2.8.6 | Cross-origin support |
| dotenv | 17.3.1 | Environment variables |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)

### Installation

```bash
# Navigate to Backend directory
cd Backend

# Install dependencies
npm install

# Create .env file with the following variables:
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gate-ugcnet
JWT_SECRET=your_super_secret_jwt_key_2026
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password

# Start the server
npm start
# Server will be available at http://localhost:8080
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the server |

---

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---|---|
| POST | `/register` | Register new user | No | `{ email, password, name }` |
| POST | `/login` | User login | No | `{ email, password }` |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/login` | Admin login | No |
| GET | `/verify` | Verify admin token & get admin info | Admin Only |

### Test Routes (`/api/tests`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/create` | Create new test | Admin Only |
| GET | `/all` | Get all tests (admin) | Admin Only |
| GET | `/:id` | Get test by ID | Admin Only |
| PUT | `/update/:id` | Update test | Admin Only |
| DELETE | `/delete/:id` | Delete test | Admin Only |
| GET | `/active/list` | Get all active tests | No |
| GET | `/attempt/:testId` | Get test for attempt | User Only |
| POST | `/submit` | Submit test answers | User Only |
| GET | `/results/user` | Get user's test results | User Only |
| GET | `/stats/user` | Get user's test statistics | User Only |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/profile` | Get user profile | User Only |
| PUT | `/profile/update` | Update user profile | User Only |
| GET | `/stats` | Get user statistics | User Only |

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|--------|
| `PORT` | Server port | `8080` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_super_secret_jwt_key_2026` |
| `ADMIN_EMAIL` | Admin login email | `admin@example.com` |
| `ADMIN_PASSWORD` | Admin login password | `password123` |

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **User Authentication**: Users register/login and receive a JWT token
2. **Admin Authentication**: Admins login separately and receive an admin JWT token
3. **Token Storage**: Tokens are sent via HTTP headers: `Authorization: Bearer <token>`
4. **Token Validation**: Middleware validates tokens before allowing access to protected routes

### Tests (`/api/tests`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/create` | Create new test | Admin |
| GET | `/all` | Get all tests | Admin |
| GET | `/:id` | Get test by ID | Admin |
| PUT | `/:id` | Update test | Admin |
| DELETE | `/:id` | Delete test | Admin |
| GET | `/user/results` | Get user's test results | User |
| GET | `/user/stats` | Get user's statistics | User |
| GET | `/public/active` | Get active tests | No |
| GET | `/public/:id` | Get test for attempt | No |
| POST | `/public/:id/submit` | Submit test answers | Optional |

### Users (`/api/users`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/profile` | Get user profile | User |
| PUT | `/profile` | Update user profile | User |
| GET | `/profile/results` | Get user's results | User |
| GET | `/all` | Get all users | Admin |
| GET | `/:id` | Get user by ID | Admin |
| GET | `/:id/performance` | Get user performance | Admin |
| DELETE | `/:id` | Delete user | Admin |

---

## 📊 Database Models

### User Model
```javascript
{
  name: String,          // Required
  email: String,         // Required, unique
  password: String,      // Required, hashed
  phone: String,
  college: String,
  exam: String,          // Default: "GATE CS"
  year: String,          // Default: "2026"
  timestamps: true
}
```

### Test Model
```javascript
{
  name: String,          // Required
  subject: String,       // Enum: Computer Science, General Aptitude, etc.
  duration: Number,      // Enum: 10, 20, 30, 60 minutes
  numberOfQuestions: Number, // Enum: 10, 30, 50, 100
  questions: [{
    questionText: String,
    options: [String],   // Exactly 4 options
    correctAnswer: Number // Index 0-3
  }],
  isActive: Boolean,
  createdBy: String,
  timestamps: true
}
```

### TestResult Model
```javascript
{
  user: ObjectId,        // Reference to User
  test: ObjectId,        // Reference to Test
  testName: String,
  totalQuestions: Number,
  correct: Number,
  wrong: Number,
  unanswered: Number,
  score: Number,
  timeTaken: Number,
  answers: [{
    questionIndex: Number,
    userAnswer: Number,
    isCorrect: Boolean
  }],
  timestamps: true
}
```

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/gate-ugcnet` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key` |
| `ADMIN_EMAIL` | Admin email for login | `admin@example.com` |
| `ADMIN_PASSWORD` | Admin password | `secure_password` |

---

## 🛡️ Security

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware ensures only authorized access
- **Input Validation**: Mongoose schema validation for all inputs

---

## 🔄 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 👥 Contributing

Please refer to the main [README](../README.md) for contribution guidelines.

---

## 📜 License

This project is part of the GATE & UGC NET Practice Platform and is licensed under the MIT License.
