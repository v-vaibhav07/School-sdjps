// routes/calendarRoutes.js

const express = require("express")
const router  = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/calendarController")

// GET — sabhi dekh sakte hain (student, teacher, admin)
router.get("/", verifyToken, getEvents)

// POST — sirf admin
router.post("/", verifyToken, allowRoles("admin"), createEvent)

// PUT — sirf admin
router.put("/:id", verifyToken, allowRoles("admin"), updateEvent)

// DELETE — sirf admin
router.delete("/:id", verifyToken, allowRoles("admin"), deleteEvent)

module.exports = router


// ============================================================
// server.js / app.js mein ye line add karo:
//
//   const calendarRoutes = require("./routes/calendarRoutes")
//   app.use("/api/calendar", calendarRoutes)
// ============================================================