# 🎓 GATE & UGC NET Practice Platform - Admin Panel

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite)

**Administrative control panel for managing the GATE and UGC NET Practice Platform**

</div>

---

## 📌 Overview

The Admin Panel is a secure, React-based dashboard for administrators to manage the platform. It provides tools for creating tests, managing questions, and monitoring user activity.

---

## ✨ Features

- 🔐 **Admin Authentication** - Secure login for administrators
- 📊 **Dashboard** - Overview of platform statistics
- ➕ **Test Management** - Create, edit, and delete practice tests
- 📝 **Question Management** - Add questions with multiple-choice options
- 👥 **User Management** - View and manage registered users
- 📈 **Analytics** - Monitor test attempts and user performance

---

## 🏗️ Project Structure

```
Admin/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, and static files
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx        # Admin navigation bar
│   │   └── PageMenu.jsx      # Page menu/sidebar
│   ├── context/         # React Context for state management
│   │   └── AdminAuthContext.jsx  # Admin authentication context
│   ├── pages/           # Page components (lowercase)
│   │   ├── AddTestPage.jsx          # Create new test
│   │   ├── Dashboard.jsx            # Admin dashboard
│   │   ├── LoginPage.jsx            # Admin login
│   │   ├── RegisteredUsersPage.jsx  # View all users
│   │   └── TestListPage.jsx         # View all tests
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   ├── App.css          # App-specific styles
│   ├── index.css        # Global styles
│   └── style.css        # Additional styles
├── .env                 # Environment variables (not in git)
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration
└── README.md            # Admin panel documentation
```

---

## 💻 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| React Router DOM | 7.13.1 | Client-side routing |
| Tailwind CSS | 4.2.1 | Utility-first CSS framework |
| React Icons | 5.6.0 | Icon library |
| Vite | 7.3.1 | Build tool and dev server |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend server running

### Installation

```bash
# Navigate to Admin directory
cd Admin

# Install dependencies
npm install

# Create .env file with:
VITE_BACKEND_URL=http://localhost:8080

# Start development server
npm run dev
# Admin panel will be available at http://localhost:5174
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite development server on port 5174 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run start` | Alias for `npm run dev` |

---

## 🔗 Routes

| Route | Component | Description | Auth Required |
|-------|-----------|-------------|---|
| `/login` | LoginPage | Admin login form | No |
| `/dashboard` | Dashboard | Admin dashboard with statistics | Yes |
| `/add-test` | AddTestPage | Create new test with questions | Yes |
| `/test-list` | TestListPage | View all tests (edit/delete) | Yes |
| `/users` | RegisteredUsersPage | View all registered users | Yes |

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API base URL | `http://localhost:8080` |

---

## 🛡️ Authentication

The admin panel uses JWT-based authentication:
1. Admin credentials are verified against the backend via `/api/admin/login`
2. JWT token is stored in localStorage
3. Token is automatically sent with each API request in Authorization header
4. Protected routes redirect unauthenticated admins to login page
5. Admin context provides authentication state across the application

---

## 📊 Features Overview

### Dashboard
- View platform statistics (total tests, users, attempts)
- Quick navigation to other admin features
- Real-time data updates

### Test Management
- **Create Tests**: Add new tests with multiple questions
- **Question Management**: Support for multiple choice questions
- **Edit Tests**: Modify existing tests
- **Delete Tests**: Remove tests from the platform
- **View Test List**: Browse all created tests with details

### User Management
- View all registered users
- Track user statistics
- Monitor user activity

---

## 🔗 API Integration

The admin panel communicates with these backend endpoints:
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/verify` - Token verification
- `POST /api/tests/create` - Create new test
- `GET /api/tests/all` - Fetch all tests
- `PUT /api/tests/update/:id` - Update test
- `DELETE /api/tests/delete/:id` - Delete test
- `GET /api/users` - Fetch all users

---

## 📝 Test Creation

When creating a test, administrators can specify:
- **Test Name** - Descriptive name for the test
- **Subject** - Computer Science, General Aptitude, or Mathematics
- **Duration** - 10, 20, 30, or 60 minutes
- **Number of Questions** - 10, 30, 50, or 100
- **Questions** - Each with 4 options and a correct answer

---

## 🎨 Styling

The admin panel uses **Tailwind CSS** with:
- Clean, professional design
- Gradient backgrounds
- Responsive layout
- Consistent color scheme

---

## 👥 Contributing

Please refer to the main [README](../README.md) for contribution guidelines.

---

## 📜 License

This project is part of the GATE & UGC NET Practice Platform and is licensed under the MIT License.
