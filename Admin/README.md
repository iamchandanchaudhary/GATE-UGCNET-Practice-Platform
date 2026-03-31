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
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx
│   │   └── PageMenu.jsx
│   ├── context/         # React Context providers
│   │   └── AdminAuthContext.jsx
│   ├── pages/           # Page components
│   │   ├── AddTestPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisteredUsersPage.jsx
│   │   └── TestListPage.jsx
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
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

# Create .env file
# Add the following:
# VITE_BACKEND_URL=http://localhost:5000

# Start development server
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔗 Routes

| Route | Component | Description | Auth |
|-------|-----------|-------------|------|
| `/login` | LoginPage | Admin login | No |
| `/dashboard` | Dashboard | Admin dashboard | Yes |
| `/add-test` | AddTestPage | Create new test | Yes |
| `/test-list` | TestListPage | View all tests | Yes |
| `/users` | RegisteredUsersPage | View all users | Yes |

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API URL | `http://localhost:5000` |

---

## 🛡️ Authentication

The admin panel uses JWT-based authentication:
1. Admin credentials are verified against the backend
2. JWT token is stored in localStorage
3. Token is sent with each API request
4. Protected routes redirect to login if not authenticated

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
