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
│   └── connectDB.js       # MongoDB connection configuration
├── controllers/
│   ├── adminController.js  # Admin authentication logic
│   ├── authController.js   # User authentication logic
│   ├── testController.js   # Test management logic
│   └── userController.js   # User management logic
├── middleware/
│   ├── adminAuth.js        # Admin authentication middleware
│   └── userAuth.js         # User authentication middleware
├── models/
│   ├── Test.js             # Test and Question schema
│   ├── TestResult.js       # Test result schema
│   └── User.js             # User schema
├── routes/
│   ├── adminRoutes.js      # Admin API routes
│   ├── authRoutes.js       # Authentication routes
│   ├── testRoutes.js       # Test API routes
│   └── userRoutes.js       # User API routes
├── .env                    # Environment variables
├── index.js                # Application entry point
└── package.json            # Dependencies and scripts
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
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/gate-ugcnet
# JWT_SECRET=your_super_secret_jwt_key
# ADMIN_EMAIL=admin@example.com
# ADMIN_PASSWORD=your_admin_password

# Start development server
npm start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start the server |

---

## 🔗 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |

### Admin (`/api/admin`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/login` | Admin login | No |
| GET | `/verify` | Verify admin token | Admin |

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
