const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

const {
  createHomework,
  getHomeworkBySubject,
  submitHomework,
  gradeHomework
} = require("../controllers/homeworkController")

// Teacher create homework
router.post(
  "/",
  verifyToken,
  allowRoles("teacher"),
  createHomework
)

// Students view homework
router.get(
  "/class/:class_id",
  verifyToken,
  getHomeworkBySubject
)

// Student submit homework
router.post(
  "/submit",
  verifyToken,
  allowRoles("student"),
  submitHomework
)

// Teacher grade homework
router.patch(
  "/grade/:submission_id",
  verifyToken,
  allowRoles("teacher"),
  gradeHomework
)

module.exports = router