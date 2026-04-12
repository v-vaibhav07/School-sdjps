// const express = require("express")
// const router = express.Router()

// const { register, login } = require("../controllers/authController")

// router.post("/register", register)
// router.post("/login", login)

// module.exports = router





const express = require("express");
const router = express.Router();

const {
  login,
  createUserByAdmin,
  forgotPassword,
  resetPassword,
  resetOwnPassword,
} = require("../controllers/authController");

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Public Routes
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected Routes
router.post("/admin/create-user", verifyToken, isAdmin, createUserByAdmin);
router.post("/reset-own-password", verifyToken, resetOwnPassword);

module.exports = router;



// const express = require("express")
// const router = express.Router()

// const { login, createUserByAdmin } = require("../controllers/authController")
// const { resetOwnPassword, adminResetUserPassword } = require("../controllers/userController")
// const { verifyToken, isAdmin } = require("../middleware/authMiddleware")

// // Public
// router.post("/login", login)

// // Only admin can create student/teacher
// router.post("/admin/create-user", verifyToken, isAdmin, createUserByAdmin)

// // Logged-in user can change own password
// router.post("/reset-password", verifyToken, resetOwnPassword)

// // Admin can reset anyone's password
// router.post("/admin/reset-password", verifyToken, isAdmin, adminResetUserPassword)

// module.exports = router