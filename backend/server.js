const express = require("express")
const cors = require("cors")
require("dotenv").config()

const http = require("http")
const { Server } = require("socket.io")

const { verifyToken, allowRoles } = require("./middleware/authMiddleware")

// ROUTES
const authRoutes = require("./routes/authRoutes")
const leaderboardRoutes = require("./routes/leaderboardRoutes")
const studentRoutes = require("./routes/studentRoutes")
const teacherRoutes = require("./routes/teacherRoutes")
const adminRoutes = require("./routes/adminRoutes")
const assignmentRoutes = require("./routes/assignmentRoutes")
const announcementRoutes = require("./routes/announcementRoutes")
const feeRoutes = require("./routes/feeRoutes")
const notificationRoutes = require("./routes/notificationRoutes")
const parentRoutes = require("./routes/parentRoutes")
const homeworkRoutes = require("./routes/homeworkRoutes")
const feedbackRoutes = require("./routes/feedbackRoutes")
const reportCardRoutes = require("./routes/reportCardRoutes")
const progressRoutes = require("./routes/progressRoutes")
const performanceRoutes = require("./routes/performanceRoutes")
const chatRoutes = require("./routes/chatRoutes")
const riskRoutes = require("./routes/riskRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes")
const transportRoutes = require("./routes/transportRoutes")
const idCardRoutes = require("./routes/idCardRoutes")
const timetableRoutes = require("./routes/timetableRoutes")
const attendanceRoutes = require("./routes/attendanceRoutes")
const classRoutes = require("./routes/classRoutes")
const adminAttendanceRoutes = require("./routes/adminAttendanceRoutes")
const examRoutes = require("./routes/examRoutes")
const aiRoutes = require("./routes/ai")
const gameRoutes = require("./routes/gameRoutes")

const calendarRoutes = require("./routes/calendarRoutes")
const { setupAutoMonthlyFeesJob } = require("./controllers/feeController")
const app = express()

app.use(cors({
  origin: ["https://school-sdjps.vercel.app", "http://localhost:5173"],
  credentials: true
}))
app.use(express.json())

// =========================
// ROUTES
// =========================

app.use("/api/auth", authRoutes)
app.use("/api/leaderboard", leaderboardRoutes)
app.use("/api/student", studentRoutes)
app.use("/api/teacher", teacherRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/assignments", assignmentRoutes)
app.use("/api/announcements", announcementRoutes)
app.use("/api/fees", feeRoutes)
app.use("/api/notifications", notificationRoutes)
app.use("/api/parent", parentRoutes)
app.use("/api/homework", homeworkRoutes)
app.use("/api/feedback", feedbackRoutes)
app.use("/api/report-card", reportCardRoutes)
app.use("/api/progress", progressRoutes)
app.use("/api/performance", performanceRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/risk", riskRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/transport", transportRoutes)
app.use("/api/id-card", idCardRoutes)
app.use("/api/timetable", timetableRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/classes", classRoutes)
app.use("/api/admin/attendance", adminAttendanceRoutes)
app.use("/api/leaderboard", leaderboardRoutes)
app.use("/api/exams", examRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/games", gameRoutes)
app.use("/api/calendar", calendarRoutes)
// =========================
// BASIC ROUTE
// =========================

app.get("/", (req, res) => {
  res.send("SDJPS Backend Running 🚀")
})

// =========================
// DASHBOARDS
// =========================

app.get(
  "/api/admin/dashboard",
  verifyToken,
  allowRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin Dashboard",
      user: req.user
    })
  }
)

app.get(
  "/api/teacher/dashboard",
  verifyToken,
  allowRoles("teacher"),
  (req, res) => {
    res.json({
      message: "Welcome Teacher Dashboard",
      user: req.user
    })
  }
)

app.get(
  "/api/student/dashboard",
  verifyToken,
  allowRoles("student"),
  (req, res) => {
    res.json({
      message: "Welcome Student Dashboard",
      user: req.user
    })
  }
)

// =========================
// SOCKET SERVER
// =========================

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on("connection", (socket) => {

  console.log("User connected:", socket.id)

  // Class chat
  socket.on("join_class", (class_id) => {
    socket.join(class_id)
  })

  socket.on("send_message", (data) => {
    io.to(data.class_id).emit("receive_message", data)
  })


  // 🟢 typing indicator
  socket.on("typing", (data) => {

    socket.to(data.class_id).emit("user_typing", {
      user: data.user
    })

  })

  socket.on("stop_typing", (data) => {

    socket.to(data.class_id).emit("user_stop_typing")

  })


  // =========================
  // GAME ROOM SOCKETS
  // =========================
  socket.on("join_game_room", (roomCode) => {
    socket.join(`game_${roomCode}`)
    console.log(`Socket joined game room: game_${roomCode}`)
  })

  socket.on("leave_game_room", (roomCode) => {
    socket.leave(`game_${roomCode}`)
  })

  socket.on("game_progress_update", (data) => {
    io.to(`game_${data.room_code}`).emit("game_progress_update", data)
  })

  socket.on("game_started", (data) => {
    io.to(`game_${data.room_code}`).emit("game_started", data)
  })

  socket.on("game_finished", (data) => {
    io.to(`game_${data.room_code}`).emit("game_finished", data)
  })



  // Bus live tracking
  socket.on("bus_location_update", (data) => {
    console.log("Bus update:", data)
    io.emit("bus_location_update", data)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })

})

// =========================
// SERVER START
// =========================

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

  setupAutoMonthlyFeesJob()
})