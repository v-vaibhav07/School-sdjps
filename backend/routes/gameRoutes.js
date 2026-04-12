// const express = require("express")
// const router = express.Router()

// const { verifyToken, allowRoles } = require("../middleware/authMiddleware")
// const {
//   createRoom,
//   joinRoom,
//   getRoomDetails,
//   startGame,
//   submitAnswer,
//   getGameLeaderboard
// } = require("../controllers/gameController")

// router.post("/create-room", verifyToken, allowRoles("student"), createRoom)
// router.post("/join-room", verifyToken, allowRoles("student"), joinRoom)
// router.get("/room/:room_code", verifyToken, allowRoles("student"), getRoomDetails)
// router.post("/start", verifyToken, allowRoles("student"), startGame)
// router.post("/submit-answer", verifyToken, allowRoles("student"), submitAnswer)
// router.get("/leaderboard", verifyToken, allowRoles("student"), getGameLeaderboard)

// module.exports = router
const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")
const {
  createRoom,
  joinRoom,
  getRoomDetails,
  startGame,
  submitAnswer,
  getGameLeaderboard,
  getMatchHistory,
} = require("../controllers/gameController")

router.post("/create-room",    verifyToken, allowRoles("student"), createRoom)
router.post("/join-room",      verifyToken, allowRoles("student"), joinRoom)
router.get("/room/:room_code", verifyToken, allowRoles("student"), getRoomDetails)
router.post("/start",          verifyToken, allowRoles("student"), startGame)
router.post("/submit-answer",  verifyToken, allowRoles("student"), submitAnswer)
router.get("/leaderboard",     verifyToken, allowRoles("student"), getGameLeaderboard)
router.get("/match-history",   verifyToken, allowRoles("student"), getMatchHistory)

module.exports = router