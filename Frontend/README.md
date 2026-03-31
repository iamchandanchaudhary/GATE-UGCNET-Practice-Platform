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
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable UI components
│   │   ├── DashboardLayout.jsx
│   │   ├── Features.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── context/         # React Context providers
│   │   └── AuthContext.jsx
│   ├── Pages/           # Page components
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MyTestsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── ReportsPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── StartTestPage.jsx
│   │   ├── TestPage.jsx
│   │   └── TestReportPage.jsx
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
| `/` | HomePage | Landing page | No |
| `/login` | LoginPage | User login | No |
| `/signup` | SignupPage | User registration | No |
| `/about` | AboutPage | About the platform | No |
| `/contact` | ContactPage | Contact information | No |
| `/dashboard` | Dashboard | User dashboard | Yes |
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
