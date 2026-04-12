// const express = require("express")
// const router = express.Router()

// const supabase = require("../config/supabase")

// const { verifyToken, allowRoles } = require("../middleware/authMiddleware")
// const {
//   getProfile,
//   getMarks,
//   getAttendance,
//   getRank,
//   getDashboard
// } = require("../controllers/studentController")


// // =========================
// // ADMIN STUDENT MANAGEMENT
// // =========================

// // // GET ALL STUDENTS
// // router.get("/", async (req, res) => {

// //   const { data, error } = await supabase
// //     .from("users")
// //     .select("id, full_name, email")
// //     .eq("role", "student")

// //   if (error) return res.status(400).json(error)

// //   res.json(data)
// // })

// // GET ALL STUDENTS (ADMIN)
// // GET ALL STUDENTS (ADMIN)
// router.get("/", async (req, res) => {

//   const { data, error } = await supabase
//     .from("students")
//     .select(`
//       id,
//       roll_number,
//       class_id,
//       users!students_user_id_fkey (
//         full_name
//       ),
//       classes!students_class_id_fkey (
//         class_name,
//         section
//       )
//     `)

//   if (error) {
//     console.log(error)
//     return res.status(400).json(error)
//   }

//   res.json(data)

// })


// // GET SINGLE STUDENT PROFILE
// // GET SINGLE STUDENT PROFILE
// router.get("/:id", async (req, res) => {

//   const { id } = req.params

//   try {

//     const { data, error } = await supabase
//       .from("students")
//       .select(`
//         id,
//         roll_number,
//         user_id,
//         class_id
//       `)
//       .eq("id", id)
//       .single()

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     // get user info
//     const { data: user } = await supabase
//       .from("users")
//       .select("full_name, email")
//       .eq("id", data.user_id)
//       .single()

//     // get class info
//     const { data: classInfo } = await supabase
//       .from("classes")
//       .select("class_name, section")
//       .eq("id", data.class_id)
//       .single()

//     res.json({
//       id: data.id,
//       roll_number: data.roll_number,
//       full_name: user?.full_name,
//       email: user?.email,
//       class_name: classInfo?.class_name,
//       section: classInfo?.section
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })



// // // ADD STUDENT
// // router.post("/", async (req, res) => {

// //   const { full_name, email, password_hash } = req.body

// //   const { data, error } = await supabase
// //     .from("users")
// //     .insert([
// //       {
// //         full_name,
// //         email,
// //         password_hash,
// //         role: "student"
// //       }
// //     ])
// //     .select()

// //   if (error) return res.status(400).json(error)

// //   res.json(data)
// // })
// router.post("/", async (req, res) => {

//   const { full_name, email, password_hash, class_id, roll_number } = req.body

//   try {

//     // 1️⃣ Create user
//     const { data: userData, error: userError } = await supabase
//       .from("users")
//       .insert([
//         {
//           full_name,
//           email,
//           password_hash,
//           role: "student"
//         }
//       ])
//       .select()
//       .single()

//     if (userError) {
//       console.log(userError)
//       return res.status(400).json(userError)
//     }

//     // 2️⃣ Create student (🔥 FIX HERE)
//     const { data: studentData, error: studentError } = await supabase
//       .from("students")
//       .insert([
//         {
//           user_id: userData.id,
//           class_id,
//           roll_number,
//           name: full_name   // ✅ THIS WAS MISSING
//         }
//       ])
//       .select()

//     if (studentError) {
//       console.log(studentError)
//       return res.status(400).json(studentError)
//     }

//     res.json({
//       message: "Student created successfully",
//       user: userData,
//       student: studentData
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })




// //delete
// router.delete("/:id", async (req, res) => {

//   const { id } = req.params

//   try {

//     // 1️⃣ delete marks
//     const { error: marksError } = await supabase
//       .from("marks")
//       .delete()
//       .eq("student_id", id)

//     if (marksError) {
//       console.log("Marks delete error:", marksError)
//       return res.status(400).json(marksError)
//     }

//     // 2️⃣ delete attendance
//     const { error: attendanceError } = await supabase
//       .from("attendance")
//       .delete()
//       .eq("student_id", id)

//     if (attendanceError) {
//       console.log("Attendance delete error:", attendanceError)
//     }

//     // 3️⃣ delete student table record
//     const { error: studentError } = await supabase
//       .from("students")
//       .delete()
//       .eq("id", id)

//     if (studentError) {
//       console.log("Student table delete error:", studentError)
//     }

//     // 4️⃣ delete user account
//     const { data, error } = await supabase
//       .from("users")
//       .delete()
//       .eq("id", id)
//       .select()

//     if (error) {
//       console.log("User delete error:", error)
//       return res.status(400).json(error)
//     }

//     res.json({
//       message: "Student deleted successfully",
//       deleted: data
//     })

//   } catch (err) {
//     console.log("Server error:", err)
//     res.status(500).json({ error: "Server error" })
//   }

// })

// // UPDATE STUDENT
// router.put("/:id", async (req, res) => {

//   const { id } = req.params
//   const { full_name } = req.body

//   try {

//     // get user_id from students table
//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("user_id")
//       .eq("id", id)
//       .single()

//     if (studentError) {
//       console.log(studentError)
//       return res.status(400).json(studentError)
//     }

//     // update name in users table
//     const { data, error } = await supabase
//       .from("users")
//       .update({ full_name })
//       .eq("id", student.user_id)
//       .select()

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json({
//       message: "Student updated successfully",
//       data
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })

// // =========================
// // STUDENT PANEL
// // =========================

// router.get("/profile", verifyToken, allowRoles("student"), getProfile)

// router.get("/marks", verifyToken, allowRoles("student"), getMarks)

// router.get("/attendance", verifyToken, allowRoles("student"), getAttendance)

// router.get("/rank", verifyToken, allowRoles("student"), getRank)

// router.get("/dashboard", verifyToken, allowRoles("student"), getDashboard)


// const {
//   // getDashboard,
//   getSubjects,
//   getChapters,
//   toggleProgress
// } = require("../controllers/studentController")

// // ADD THESE ROUTES
// // router.get("/dashboard", verifyToken, allowRoles("student"), getDashboard)

// router.get("/subjects", verifyToken, allowRoles("student"), getSubjects)

// router.get("/chapters/:subject_id", verifyToken, allowRoles("student"), getChapters)

// router.post("/progress", verifyToken, allowRoles("student"), toggleProgress)

// module.exports = router































const express = require("express")
const router = express.Router()

const supabase = require("../config/supabase")

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")
const {
  getProfile,
  getMarks,
  getAttendance,
  getRank,
  getDashboard,
  getSubjects,
  getChapters,
  toggleProgress,
  addTask,
  toggleTask,
  getAcademics,
  toggleChapter,
  getHomeworkBySubject,
  getStudentResult,
  getFinalResult,
  getStudentTimetable,
  getStudentAnnouncements
} = require("../controllers/studentController")
const { createStudent } = require("../controllers/studentController")
// =========================
// ADMIN STUDENT MANAGEMENT
// =========================

// GET ALL STUDENTS
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("students")
    .select(`
      id,
      roll_number,
      class_id,
      users!students_user_id_fkey (
        full_name
      ),
      classes!students_class_id_fkey (
        class_name,
        section
      )
    `)

  if (error) {
    console.log(error)
    return res.status(400).json(error)
  }

  res.json(data)
})


// =========================
// STUDENT PANEL (IMPORTANT)
// =========================
router.post("/", createStudent)
router.get("/profile", verifyToken, allowRoles("student"), getProfile)

router.get("/marks", verifyToken, allowRoles("student"), getMarks)

router.get("/attendance", verifyToken, allowRoles("student"), getAttendance)

router.get("/rank", verifyToken, allowRoles("student"), getRank)

router.get("/dashboard", verifyToken, allowRoles("student"), getDashboard)

router.get("/subjects", verifyToken, allowRoles("student"), getSubjects)

router.get("/chapters/:subject_id", verifyToken, allowRoles("student"), getChapters)

router.post("/progress", verifyToken, allowRoles("student"), toggleProgress)

router.post("/task", verifyToken, addTask)

router.patch("/task/:id", verifyToken, toggleTask)

router.get("/academics", verifyToken, getAcademics)

router.patch("/chapter/:chapterId", verifyToken, toggleChapter)

router.get("/homework/:subject_id", verifyToken, getHomeworkBySubject)

router.get("/result", verifyToken, getStudentResult)


router.get("/final-result", verifyToken, getFinalResult)

router.get("/timetable", verifyToken, getStudentTimetable)


router.get(
  "/announcements",
  verifyToken,
  allowRoles("student"),
  getStudentAnnouncements
)
// =========================
// ❗ DYNAMIC ROUTES (ALWAYS LAST)
// =========================

// GET SINGLE STUDENT
router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const { data, error } = await supabase
      .from("students")
      .select(`
        id,
        roll_number,
        user_id,
        class_id
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    const { data: user } = await supabase
      .from("users")
      .select("full_name, email")
      .eq("id", data.user_id)
      .single()

    const { data: classInfo } = await supabase
      .from("classes")
      .select("class_name, section")
      .eq("id", data.class_id)
      .single()

    res.json({
      id: data.id,
      roll_number: data.roll_number,
      full_name: user?.full_name,
      email: user?.email,
      class_name: classInfo?.class_name,
      section: classInfo?.section
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})


// // UPDATE STUDENT

// router.put("/:id", async (req, res) => {
//   const { id } = req.params
//   const { full_name } = req.body

//   try {
//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("user_id")
//       .eq("id", id)
//       .single()

//     if (studentError) {
//       console.log(studentError)
//       return res.status(400).json(studentError)
//     }

//     const { data, error } = await supabase
//       .from("users")
//       .update({ full_name })
//       .eq("id", student.user_id)
//       .select()

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json({
//       message: "Student updated successfully",
//       data
//     })

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: "Server error" })
//   }
// })

// ============================================================
// studentRoutes.js mein ye purana PUT /:id route hai:

// Isko puri tarah replace karo neeche wale se:
// ============================================================

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { full_name, email, phone, roll_number } = req.body  // ✅ sab fields lo

  try {
    // 1. student ka user_id nikalo
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, user_id")
      .eq("id", id)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ error: "Student not found" })
    }

    // 2. users table update — full_name, email, phone
    const { error: userError } = await supabase
      .from("users")
      .update({
        ...(full_name && { full_name }),
        ...(email     && { email }),
        ...(phone     && { phone })
      })
      .eq("id", student.user_id)

    if (userError) {
      console.log("USER UPDATE ERROR:", userError)
      return res.status(400).json(userError)
    }

    // 3. ✅ FIX: students table bhi update karo — name + phone + roll_number
    //    pehle ye step tha hi nahi route mein
    const studentUpdate = {
      ...(full_name   && { name: full_name }),           // ✅ students.name sync
      ...(phone       && { phone }),                      // ✅ phone sync
      ...(roll_number && { roll_number: Number(roll_number) }) // ✅ roll_number update
    }

    const { error: stuUpdateError } = await supabase
      .from("students")
      .update(studentUpdate)
      .eq("id", id)

    if (stuUpdateError) {
      console.log("STUDENT UPDATE ERROR:", stuUpdateError)
      return res.status(400).json(stuUpdateError)
    }

    res.json({ message: "Student updated successfully" })

  } catch (err) {
    console.log("UPDATE STUDENT ERROR:", err)
    res.status(500).json({ error: "Server error" })
  }
})

// DELETE STUDENT
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    await supabase.from("marks").delete().eq("student_id", id)
    await supabase.from("attendance").delete().eq("student_id", id)
    await supabase.from("students").delete().eq("id", id)

    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)
      .select()

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    res.json({
      message: "Student deleted successfully",
      deleted: data
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})


router.delete("/task/:id", verifyToken, async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from("student_tasks")
    .delete()
    .eq("id", id)

  if (error) return res.status(400).json(error)

  res.json({ message: "Deleted" })
})

router.put("/task/:id", verifyToken, async (req, res) => {
  const { id } = req.params
  const { task } = req.body

  const { error } = await supabase
    .from("student_tasks")
    .update({ task })
    .eq("id", id)

  if (error) return res.status(400).json(error)

  res.json({ message: "Updated" })
})


router.get("/academics", async (req, res) => {
  try {
    const userId = req.user.id

    // student find
    const { data: student } = await supabase
      .from("students")
      .select("id, class_id")
      .eq("user_id", userId)
      .single()

    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }

    // subjects of class
    const { data: subjects } = await supabase
      .from("subjects")
      .select("*")
      .eq("class_id", student.class_id)

    // chapters + progress
    const result = await Promise.all(
      subjects.map(async (sub) => {

        const { data: chapters } = await supabase
          .from("chapters")
          .select("*")
          .eq("subject_id", sub.id)
          .order("order_no", { ascending: true })

        // progress
        const { data: progress } = await supabase
          .from("student_progress")
          .select("*")
          .eq("student_id", student.id)

        const formattedChapters = chapters.map(ch => {
          const done = progress.find(p => p.chapter_id === ch.id)

          return {
            id: ch.id,
            title: ch.name,
            is_done: done?.is_completed || false
          }
        })

        return {
          id: sub.id,
          name: sub.name,
          chapters: formattedChapters
        }
      })
    )

    res.json(result)

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})
module.exports = router