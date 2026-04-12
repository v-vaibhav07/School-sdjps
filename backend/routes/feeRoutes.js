// const express = require("express")
// const router = express.Router()

// const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

// const {
//   createFeeStructure,
//   getStudentFees,
//   payFee
// } = require("../controllers/feeController")

// const {
//   createFeeStructure,
//   getStudentFees,
//   payFee,
//   getStudentFeeDashboard
// } = require("../controllers/feeController")

// // Admin create fee structure
// router.post(
//   "/structure",
//   verifyToken,
//   allowRoles("admin"),
//   createFeeStructure
// )

// // Student view fee
// router.get(
//   "/student/:student_id",
//   verifyToken,
//   getStudentFees
// )

// // Pay fee
// router.post(
//   "/pay",
//   verifyToken,
//   allowRoles("student"),
//   payFee
// )


// // Student fee dashboard
// router.get(
//   "/dashboard",
//   verifyToken,
//   allowRoles("student"),
//   getStudentFeeDashboard
// )

// module.exports = router



// const express = require("express")
// const router = express.Router()

// const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

// const {
//   createFeeStructure,
//   getStudentFees,
//   payFee,
//   getStudentFeeDashboard
// } = require("../controllers/feeController")

// const {
//   createFeeStructure,
//   getStudentFees,
//   payFee,
//   getStudentFeeDashboard,
//   getAdminFinanceDashboard
// } = require("../controllers/feeController")

// // Admin create fee structure
// router.post(
//   "/structure",
//   verifyToken,
//   allowRoles("admin"),
//   createFeeStructure
// )

// // Student view fee
// router.get(
//   "/student/:student_id",
//   verifyToken,
//   getStudentFees
// )

// // Pay fee
// router.post(
//   "/pay",
//   verifyToken,
//   allowRoles("student"),
//   payFee
// )

// // Student fee dashboard
// router.get(
//   "/dashboard",
//   verifyToken,
//   allowRoles("student"),
//   getStudentFeeDashboard
// )


// // Admin finance dashboard
// router.get(
//   "/admin/finance",
//   verifyToken,
//   allowRoles("admin"),
//   getAdminFinanceDashboard
// )

// module.exports = router




























// const express = require("express")
// const router = express.Router()

// const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

// const {
//   createFeeStructure,
//   getStudentFees,
//   payFee,
//   getStudentFeeDashboard,
//   getAdminFinanceDashboard,
//   getMonthlyRevenue,
//   getRecentPayments,
//   getClassFeeSummary,
//   getClassStudentsFees,
//   sendFeeReminder,
//   getClassMonthlyFees
// } = require("../controllers/feeController")

// // Admin create fee structure
// router.post(
//   "/structure",
//   verifyToken,
//   allowRoles("admin"),
//   createFeeStructure
// )

// // Student view fee
// router.get(
//   "/student/:student_id",
//   verifyToken,
//   getStudentFees
// )

// // Pay fee
// router.post(
//   "/pay",
//   verifyToken,
//   allowRoles("student"),
//   payFee
// )

// // Student fee dashboard
// router.get(
//   "/dashboard",
//   verifyToken,
//   allowRoles("student"),
//   getStudentFeeDashboard
// )

// // Admin finance dashboard
// router.get(
//   "/admin/finance",
//   verifyToken,
//   allowRoles("admin"),
//   getAdminFinanceDashboard
// )

// // Monthly revenue analytics
// router.get(
//   "/admin/revenue",
//   verifyToken,
//   allowRoles("admin"),
//   getMonthlyRevenue
// )

// router.get(
//   "/admin/recent-payments",
//   verifyToken,
//   allowRoles("admin"),
//   getRecentPayments
// )

// router.get(
//   "/admin/class-summary",
//   verifyToken,
//   allowRoles("admin"),
//   getClassFeeSummary
// )


// router.get(
//   "/admin/class-students/:class_id",
//   verifyToken,
//   allowRoles("admin"),
//   getClassStudentsFees
// )


// router.post(
//   "/admin/send-reminder",
//   verifyToken,
//   allowRoles("admin"),
//   sendFeeReminder
// )


// router.get(
//   "/admin/class-monthly/:class_id",
//   verifyToken,
//   allowRoles("admin"),
//   getClassMonthlyFees
// )
// module.exports = router

























// const express = require("express")
// const router = express.Router()

// const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

// const {
//   createFeeStructure,
//   getStudentFees,
//   payFee,
//   getStudentFeeDashboard,
//   getAdminFinanceDashboard,
//   getMonthlyRevenue,
//   getRecentPayments,
//   getClassFeeSummary,
//   getClassStudentsFees,
//   sendFeeReminder,
//   getClassMonthlyFees,
//   fixNullMonths,
//   createBulkMonthlyFees,
//   getMyFees,
//   createPaymentOrder,
//   verifyPaymentAndSave,
//   downloadFeeReceipt,
//   getMyReceipts
// } = require("../controllers/feeController")

// // ============================
// // Admin Routes
// // ============================

// // Create fee structure
// router.post(
//   "/structure",
//   verifyToken,
//   allowRoles("admin"),
//   createFeeStructure
// )

// // Create bulk monthly fees
// router.post(
//   "/admin/bulk-monthly",
//   verifyToken,
//   allowRoles("admin"),
//   createBulkMonthlyFees
// )

// // Fix NULL months
// router.patch(
//   "/admin/fix-null-months",
//   verifyToken,
//   allowRoles("admin"),
//   fixNullMonths
// )

// // Admin finance dashboard
// router.get(
//   "/admin/finance",
//   verifyToken,
//   allowRoles("admin"),
//   getAdminFinanceDashboard
// )

// // Monthly revenue
// router.get(
//   "/admin/revenue",
//   verifyToken,
//   allowRoles("admin"),
//   getMonthlyRevenue
// )

// // Recent payments
// router.get(
//   "/admin/recent-payments",
//   verifyToken,
//   allowRoles("admin"),
//   getRecentPayments
// )

// // Class summary
// router.get(
//   "/admin/class-summary",
//   verifyToken,
//   allowRoles("admin"),
//   getClassFeeSummary
// )

// // Class students fees
// router.get(
//   "/admin/class-students/:class_id",
//   verifyToken,
//   allowRoles("admin"),
//   getClassStudentsFees
// )

// // Send reminder
// router.post(
//   "/admin/send-reminder",
//   verifyToken,
//   allowRoles("admin"),
//   sendFeeReminder
// )

// // Class monthly fees
// router.get(
//   "/admin/class-monthly/:class_id",
//   verifyToken,
//   allowRoles("admin"),
//   getClassMonthlyFees
// )

// // ============================
// // Student Routes
// // ============================

// // ✅ IMPORTANT: specific route first
// router.get(
//   "/student/my-fees",
//   verifyToken,
//   allowRoles("student"),
//   getMyFees
// )

// // Student fee dashboard
// router.get(
//   "/dashboard",
//   verifyToken,
//   allowRoles("student"),
//   getStudentFeeDashboard
// )

// // Pay fee
// router.post(
//   "/pay",
//   verifyToken,
//   allowRoles("student"),
//   payFee
// )

// //new
// // ============================
// // Student Receipts
// // ============================

// // List all paid receipts for logged-in student
// router.get(
//   "/receipts",
//   verifyToken,
//   allowRoles("student"),
//   getMyReceipts
// )

// // Download receipt PDF
// router.get(
//   "/receipt/:payment_id",
//   verifyToken,
//   allowRoles("student"),
//   downloadFeeReceipt
// )



// // ✅ dynamic route always last
// router.get(
//   "/student/:student_id",
//   verifyToken,
//   getStudentFees
// )
// router.post(
//   "/student/create-order",
//   verifyToken,
//   allowRoles("student"),
//   createPaymentOrder
// )

// router.post(
//   "/student/verify-payment",
//   verifyToken,
//   allowRoles("student"),
//   verifyPaymentAndSave
// )

// module.exports = router

// ye uper ka working h

const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

const {
  createFeeStructure,
  getStudentFees,
  payFee,
  getStudentFeeDashboard,
  getAdminFinanceDashboard,
  getMonthlyRevenue,
  getRecentPayments,
  getClassFeeSummary,
  getClassStudentsFees,
  sendFeeReminder,
  getClassMonthlyFees,
  fixNullMonths,
  createBulkMonthlyFees,
  getMyFees,
  createPaymentOrder,
  verifyPaymentAndSave,
  downloadFeeReceipt,
  getMyReceipts
} = require("../controllers/feeController")

// ============================
// Admin Routes
// ============================

// Create fee structure
router.post(
  "/structure",
  verifyToken,
  allowRoles("admin"),
  createFeeStructure
)

// Create bulk monthly fees
router.post(
  "/admin/bulk-monthly",
  verifyToken,
  allowRoles("admin"),
  createBulkMonthlyFees
)

// Fix NULL months
router.patch(
  "/admin/fix-null-months",
  verifyToken,
  allowRoles("admin"),
  fixNullMonths
)

// Admin finance dashboard
router.get(
  "/admin/finance",
  verifyToken,
  allowRoles("admin"),
  getAdminFinanceDashboard
)

// Monthly revenue
router.get(
  "/admin/revenue",
  verifyToken,
  allowRoles("admin"),
  getMonthlyRevenue
)

// Recent payments
router.get(
  "/admin/recent-payments",
  verifyToken,
  allowRoles("admin"),
  getRecentPayments
)

// Class summary
router.get(
  "/admin/class-summary",
  verifyToken,
  allowRoles("admin"),
  getClassFeeSummary
)

// Class students fees
router.get(
  "/admin/class-students/:class_id",
  verifyToken,
  allowRoles("admin"),
  getClassStudentsFees
)

// Send reminder
router.post(
  "/admin/send-reminder",
  verifyToken,
  allowRoles("admin"),
  sendFeeReminder
)

// Class monthly fees
router.get(
  "/admin/class-monthly/:class_id",
  verifyToken,
  allowRoles("admin"),
  getClassMonthlyFees
)

// ============================
// Student Routes
// ============================

// ✅ IMPORTANT: specific routes FIRST
router.get(
  "/student/my-fees",
  verifyToken,
  allowRoles("student"),
  getMyFees
)

router.post(
  "/student/create-order",
  verifyToken,
  allowRoles("student"),
  createPaymentOrder
)

router.post(
  "/student/verify-payment",
  verifyToken,
  allowRoles("student"),
  verifyPaymentAndSave
)

// Student fee dashboard
router.get(
  "/dashboard",
  verifyToken,
  allowRoles("student"),
  getStudentFeeDashboard
)

// Pay fee
router.post(
  "/pay",
  verifyToken,
  allowRoles("student"),
  payFee
)

// ============================
// Student Receipts
// ============================

// List all paid receipts for logged-in student
router.get(
  "/receipts",
  verifyToken,
  allowRoles("student"),
  getMyReceipts
)

// ✅ CHANGED: payment_id → fee_id (clarity ke liye)
router.get(
  "/receipt/:fee_id",
  verifyToken,
  allowRoles("student"),
  downloadFeeReceipt
)

// ✅ Dynamic route ALWAYS LAST
router.get(
  "/student/:student_id",
  verifyToken,
  getStudentFees
)

module.exports = router