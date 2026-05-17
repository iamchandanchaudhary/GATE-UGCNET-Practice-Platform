# 🎓 GATE & UGC NET Practice Platform - Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite)

**Student-facing web application for GATE and UGC NET exam preparation**

</div>

---

## 📌 Overview

The Frontend module is the student-facing web application that provides an intuitive interface for exam preparation. Built with React 19 and styled with Tailwind CSS, it offers a modern, responsive user experience.

---

## ✨ Features

- 🏠 **Landing Page** - Informative homepage with platform features
- 👤 **User Authentication** - Secure login and registration
- 📊 **Dashboard** - Personalized user dashboard with statistics
- 📝 **Test Interface** - Interactive test-taking experience with timer
- 📈 **Reports** - Detailed performance analytics and progress tracking
- 👨‍💼 **Profile Management** - Update user profile and preferences

---

## 🏗️ Project Structure

```
Frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, and static files
│   ├── components/      # Reusable UI components
│   │   ├── DashboardLayout.jsx  # Dashboard layout wrapper
│   │   ├── Features.jsx         # Platform features section
│   │   ├── HeroSection.jsx      # Landing page hero
│   │   ├── Navbar.jsx           # Navigation bar
│   │   └── Sidebar.jsx          # Dashboard sidebar
│   ├── context/         # React Context for state management
│   │   └── AuthContext.jsx      # User authentication context
│   ├── Pages/           # Page components (capital P)
│   │   ├── AboutPage.jsx        # About page
│   │   ├── ContactPage.jsx      # Contact page
│   │   ├── Dashboard.jsx        # User dashboard
│   │   ├── HomePage.jsx         # Landing page
│   │   ├── Learning.jsx         # Learning resources page
│   │   ├── LoginPage.jsx        # User login
│   │   ├── MyTestsPage.jsx      # User's tests list
│   │   ├── ProfilePage.jsx      # User profile
│   │   ├── ReportsPage.jsx      # Test reports & analytics
│   │   ├── SignupPage.jsx       # User registration
│   │   ├── StartTestPage.jsx    # Test selection
│   │   ├── TestPage.jsx         # Active test interface
│   │   └── TestReportPage.jsx   # Individual test report
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
└── README.md            # Frontend documentation
```

---

## 💻 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| React Router DOM | 7.13.1 | Client-side routing |
| Tailwind CSS | 4.2.1 | Utility-first CSS framework |
| Recharts | 3.7.0 | Charts and data visualization |
| React Icons | 5.5.0 | Icon library |
| Vite | 7.3.1 | Build tool and dev server |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Navigate to Frontend directory
cd Frontend

# Install dependencies
npm install

# Create .env file with:
VITE_BACKEND_URL=http://localhost:8080

# Start development server
npm run dev
# Frontend will be available at http://localhost:5173
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start development server (alias for `npm run dev`) |
| `npm run dev` | Start Vite development server on port 5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|--------|
| `VITE_BACKEND_URL` | Backend API base URL | `http://localhost:8080` |

## 🛡️ Authentication

The frontend uses JWT-based authentication:
1. Users register/login via the API
2. JWT token is stored in localStorage
3. Token is automatically sent with each API request
4. Protected routes redirect unauthenticated users to login
5. User context provides auth state across the application

---

## 🔗 Routes

| Route | Component | Description | Auth Required |
|-------|-----------|-------------|---|
| `/` | HomePage | Landing page with features | No |
| `/login` | LoginPage | User login form | No |
| `/signup` | SignupPage | User registration form | No |
| `/about` | AboutPage | About the platform | No |
| `/contact` | ContactPage | Contact information page | No |
| `/learning` | Learning | Learning resources & guides | No |
| `/dashboard` | Dashboard | User dashboard with stats | Yes |
| `/my-tests` | MyTestsPage | List of available tests | Yes |
| `/start-test` | StartTestPage | Select and start a test | Yes |
| `/test/:testId` | TestPage | Active test taking interface | Yes |
| `/test-report/:testId` | TestReportPage | Individual test report | Yes |
| `/reports` | ReportsPage | All test reports & analytics | Yes |
| `/profile` | ProfilePage | User profile & settings | Yes |
| `/my-tests` | MyTestsPage | View available tests | Yes |
| `/reports` | ReportsPage | Performance reports | Yes |
| `/profile` | ProfilePage | User profile | Yes |
| `/start-test` | StartTestPage | Test selection | Yes |
| `/test/:testId` | TestPage | Take a test | Yes |
| `/test-report` | TestReportPage | Test results | Yes |

---

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API URL | `http://localhost:5000` |

---

## 🎨 Styling

The project uses **Tailwind CSS** for styling with a custom configuration. Key design principles:
- Responsive design for all screen sizes
- Consistent color scheme with blue as primary color
- Clean, modern UI with smooth transitions
- Accessible design patterns

---

## 👥 Contributing

Please refer to the main [README](../README.md) for contribution guidelines.

---

## 📜 License

This project is part of the GATE & UGC NET Practice Platform and is licensed under the MIT License.
