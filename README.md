<div align="center">

<img src="https://img.shields.io/badge/School%20SDJPS-Management%20System-6366f1?style=for-the-badge&logo=graduation-cap&logoColor=white" alt="School SDJPS" />

# 🏫 School SDJPS — Smart School Management System

**A full-stack, AI-powered school management platform built for the modern education ecosystem.**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-school--sdjps.vercel.app-22c55e?style=for-the-badge)](https://school-sdjps.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-v--vaibhav07%2FSchool--sdjps-181717?style=for-the-badge&logo=github)](https://github.com/v-vaibhav07/School-sdjps)
[![Deployments](https://img.shields.io/badge/Deployments-11%20Successful-6366f1?style=for-the-badge&logo=vercel)](https://school-sdjps.vercel.app)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)

</div>

---

## ✨ What is School SDJPS?

**School SDJPS** is an industry-grade, full-stack school management platform that digitizes every corner of school operations — from admin analytics to student task tracking. Built with a modern tech stack and powered by AI, it brings together admins, teachers, students, and parents under one seamless platform.

> 🎯 **Mission**: Replace outdated school management with a fast, intelligent, and beautifully designed system that actually works.

---

## 🖥️ Live Previews

### 👨‍💼 Admin Analytics Dashboard
> Powerful overview of the entire school — real-time stats, performance charts, and AI-driven insights.

- 📊 **86 Students** | 👨‍🏫 **28 Teachers** | 👪 **Parents** | 📅 **88% Avg Attendance**
- Top student performance charts & class average scores
- **AI Smart Insights** — automatically surfaces key metrics like academic risk students and fee collection

### 🎓 Student Dashboard
> A personalized command center for every student.

- ✅ Task manager with daily progress tracking
- 📚 Academics, Results, Timetable, Attendance in one place
- 🤖 **AI Chat** — built-in AI assistant for students
- 💬 Class Chat, 📢 Announcements, 🎮 Games, 📅 Calendar

---

## 🚀 Features

### 🔐 Multi-Role Authentication
| Role | Access |
|------|--------|
| **Admin** | Full dashboard, analytics, salary, reports, settings |
| **Teacher** | Classes, attendance, exams, student performance |
| **Student** | Academics, results, timetable, AI chat, tasks |
| **Parent** | Child's progress, attendance, fees, announcements |

### 📊 Admin Panel
- 📈 Real-time analytics with beautiful charts
- 🧠 **AI Smart Insights** — automated data analysis
- 👨‍🎓 Student & Teacher management
- 📅 Attendance tracking system
- 📝 Exam creation & management
- 💰 Fee management & reports
- 🚌 Transport management
- 🏆 Leaderboard
- 📢 Announcements
- 💬 Chat system
- 📆 Calendar & scheduling
- 💵 Teacher salary management

### 🎓 Student Panel
- 🌅 Personalized daily dashboard with greeting
- ✅ My Tasks — personal to-do manager
- 📊 Progress tracking (tasks done / total)
- 🤖 **AI Chat** — AI-powered academic assistant
- 📚 Academics & Results
- 🕐 Timetable viewer
- 📅 Attendance history
- 📢 School announcements
- 💬 Class Chat (real-time)
- 💰 Fee status & history
- 🎮 Games section
- 📆 Calendar
- 👤 Profile management

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)

### Database & Auth
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## 📁 Project Structure

```
School-sdjps/
├── frontend/          # Next.js React application
│   ├── app/
│   │   ├── admin/     # Admin panel pages
│   │   ├── student/   # Student panel pages
│   │   ├── teacher/   # Teacher panel pages
│   │   └── parent/    # Parent panel pages
│   └── components/    # Reusable UI components
│
└── backend/           # Node.js + Express REST API
    ├── routes/        # API route handlers
    ├── models/        # MongoDB data models
    ├── controllers/   # Business logic
    └── middleware/    # Auth & validation
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/v-vaibhav07/School-sdjps.git
cd School-sdjps
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

Create a `.env.local` file in `/frontend`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

### 4. Open in Browser
```
http://localhost:3000
```

---

## 🌐 Deployment

The app is deployed on **Vercel** with **11 successful production deployments**.

| Environment | URL |
|-------------|-----|
| 🟢 Production | [school-sdjps.vercel.app](https://school-sdjps.vercel.app) |

---

## 🤖 AI Features

- **Admin AI Smart Insights** — Automatically analyzes school data and surfaces actionable insights (attendance rates, at-risk students, fee collection status)
- **Student AI Chat** — An AI assistant embedded in the student panel to help with queries, academics, and support

---

## 📸 Screenshots

| Admin Dashboard | Student Dashboard |
|---|---|
| Analytics, charts & AI insights | Tasks, progress & AI chat |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Vaibhav** — [@v-vaibhav07](https://github.com/v-vaibhav07)

---

## 📄 License

This project is open source. Feel free to use it as inspiration or build upon it.

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ by Vaibhav

</div>
