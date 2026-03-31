# 🎓 GATE & UGC NET Practice Platform

<div align="center">

![GATE & UGC NET](https://img.shields.io/badge/GATE-UGC%20NET-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A comprehensive web-based practice platform for GATE and UGC NET exam preparation**

[🌐 Live Demo](https://gate-ugcnet-practice-platform-1.onrender.com/) | [📖 Documentation](#-project-structure) | [🚀 Quick Start](#-quick-start)

</div>

---

## 📌 About The Project

The **GATE & UGC NET Practice Platform** is an educational web application designed to help aspirants prepare effectively for GATE (Graduate Aptitude Test in Engineering) and UGC NET (National Eligibility Test) examinations.

This platform provides structured practice resources, mock tests, and comprehensive performance tracking to enhance conceptual understanding and exam readiness.

> **🎓 Final Year BCA Project** - Developed as part of the Bachelor of Computer Applications curriculum, focusing on real-world problem solving, scalable architecture, and modern web development practices.

---

## ✨ Key Features

### 👨‍🎓 For Students
- 📚 **Subject-wise Question Bank** - Practice questions organized by Computer Science, General Aptitude, Mathematics
- 📝 **Mock Tests** - Timed practice tests simulating real exam environment (10/30/50/100 questions)
- ⏱️ **Timed Quizzes** - Multiple duration options (10/20/30/60 minutes)
- 📊 **Performance Analytics** - Detailed reports with score tracking and progress visualization
- 👤 **User Dashboard** - Personalized dashboard with test history and statistics
- 🔐 **Secure Authentication** - JWT-based user authentication with encrypted passwords

### 👨‍💼 For Administrators
- ➕ **Test Management** - Create, update, and delete practice tests
- 👥 **User Management** - View registered users and their performance
- 📈 **Analytics Dashboard** - Overview of platform statistics
- 🔒 **Admin Authentication** - Secure admin login system

---

## 🏗️ Project Structure

```
GATE-UGCNET-Practice-Platform/
├── Frontend/          # React-based student portal
├── Admin/             # React-based admin panel  
├── Backend/           # Node.js/Express REST API server
├── LICENSE            # MIT License
└── README.md          # This file
```

| Directory | Description | Tech Stack |
|-----------|-------------|------------|
| [Frontend](./Frontend/) | Student-facing practice platform | React 19, Tailwind CSS, Vite |
| [Admin](./Admin/) | Administrator control panel | React 19, Tailwind CSS, Vite |
| [Backend](./Backend/) | RESTful API server | Node.js, Express 5, MongoDB |

---

## 💻 Tech Stack

### Frontend & Admin Panel
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| Tailwind CSS | 4.2.1 | Styling |
| React Router DOM | 7.13.1 | Routing |
| Recharts | 3.7.0 | Data Visualization |
| Vite | 7.3.1 | Build Tool |
| React Icons | 5.5.0 | Icon Library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | Runtime Environment |
| Express.js | 5.2.1 | Web Framework |
| MongoDB/Mongoose | 9.2.2 | Database & ODM |
| JWT | 9.0.3 | Authentication |
| bcryptjs | 3.0.3 | Password Hashing |
| CORS | 2.8.6 | Cross-Origin Support |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/ChandanChaudhary226/GATE-UGCNET-Practice-Platform.git

# Navigate to project directory
cd GATE-UGCNET-Practice-Platform
```

### Backend Setup
```bash
cd Backend
npm install

# Create .env file with:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# ADMIN_EMAIL=admin@example.com
# ADMIN_PASSWORD=your_admin_password

npm start
```

### Frontend Setup
```bash
cd Frontend
npm install

# Create .env file with:
# VITE_BACKEND_URL=http://localhost:5000

npm run dev
```

### Admin Panel Setup
```bash
cd Admin
npm install

# Create .env file (similar to Frontend)

npm run dev
```

---

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/admin/login` | Admin login |

### Tests
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tests/public/active` | Get all active tests |
| GET | `/api/tests/public/:id` | Get test for attempt |
| POST | `/api/tests/public/:id/submit` | Submit test answers |
| GET | `/api/tests/user/results` | Get user's test results |
| GET | `/api/tests/user/stats` | Get user's statistics |

### Admin Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tests/create` | Create new test |
| GET | `/api/tests/all` | Get all tests |
| PUT | `/api/tests/:id` | Update test |
| DELETE | `/api/tests/:id` | Delete test |
| GET | `/api/users/all` | Get all users |

---

## 👥 Development Team

This project is developed collaboratively as part of the **Final Year BCA Project**.

| Role | Name | Responsibilities |
|------|------|-----------------|
| **Team Lead + Full Stack Lead** | Chandan Chaudhary | Project management, Full-stack development, Architecture design |
| **Testing & Deployment** | Deepanshu Yadav | Quality assurance, Testing, Deployment automation |
| **Backend Developer** | Ayush Verma | API development, Database design, Server-side logic |
| **Frontend & Database** | Devendra Jaiswal | UI development, Database integration |
| **Documentation & Integration** | Divyansh | Documentation, System integration, Code review |

---

## 📈 Future Enhancements

- [ ] 🤖 AI-based personalized study recommendations
- [ ] 📊 Advanced analytics and ranking system
- [ ] 📱 Mobile application version (React Native)
- [ ] 📄 Integration of previous years' question papers
- [ ] 🏆 Leaderboard and competitive features
- [ ] 💬 Discussion forum for doubt clearing
- [ ] 📧 Email notifications and reminders

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- Faculty mentors and guides at our institution
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- Online learning resources and the open-source community

---

<div align="center">

**Made with ❤️ by Team GATE-UGCNET**

⭐ Star this repository if you find it helpful!

</div>
- Integration of previous years’ question papers


