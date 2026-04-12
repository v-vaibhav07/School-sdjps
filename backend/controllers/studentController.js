//   const supabase = require("../config/supabase")

//   // Student Profile
//   // exports.getProfile = async (req, res) => {
//   //   const userId = req.user.id

//   //   const { data, error } = await supabase
//   //     .from("users")
//   //     .select("id, full_name, email, role")
//   //     .eq("id", userId)
//   //     .single()

//   //   if (error) return res.status(400).json(error)

//   //   res.json(data)
//   // }







//   // exports.getProfile = async (req, res) => {
//   //   const userId = req.user.id

//   //   try {

//   //     // 🔥 GET STUDENT
//   //     const { data: student, error: sErr } = await supabase
//   //       .from("students")
//   //       .select("class_id")
//   //       .eq("user_id", userId)
//   //       .single()

//   //     if (sErr || !student) {
//   //       return res.status(404).json({ error: "Student not found" })
//   //     }

//   //     res.json({
//   //       class_id: student.class_id
//   //     })

//   //   } catch (err) {
//   //     res.status(500).json({ error: err.message })
//   //   }
//   // }
//  exports.getProfile = async (req, res) => {
//   const userId = req.user.id

//   try {
//     const { data: user, error: userError } = await supabase
//       .from("users")
//       .select("id, full_name, email, role")
//       .eq("id", userId)
//       .single()

//     if (userError || !user) {
//       return res.status(404).json({ error: "User not found" })
//     }

//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select(`
//         id,
//         roll_number,
//         class_id,
//         classes!students_class_id_fkey (
//           class_name,
//           section
//         )
//       `)
//       .eq("user_id", userId)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({ error: "Student not found" })
//     }

//     res.json({
//       full_name: user.full_name,
//       email: user.email,
//       role: user.role,
//       student_id: student.id,
//       roll_number: student.roll_number,
//       class_id: student.class_id,
//       class_name: student.classes?.class_name || "-",
//       section: student.classes?.section || "-"
//     })
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: err.message })
//   }
// }











//   // Student Marks
//   exports.getMarks = async (req, res) => {
//     const userId = req.user.id

//     const { data, error } = await supabase
//       .from("marks")
//       .select("*")
//       .eq("student_id", userId)

//     if (error) return res.status(400).json(error)

//     res.json(data)
//   }

//   // Student Attendance
//   // exports.getAttendance = async (req, res) => {
//   //   const userId = req.user.id

//   //   const { data, error } = await supabase
//   //     .from("attendance")
//   //     .select("*")
//   //     .eq("student_id", userId)

//   //   if (error) return res.status(400).json(error)

//   //   res.json(data)
//   // }
//   // exports.getAttendance = async (req, res) => {
//   //   try {

//   //     const userId = req.user.id

//   //     // ✅ STEP 1: get student id
//   //     const { data: student, error: sErr } = await supabase
//   //       .from("students")
//   //       .select("id")
//   //       .eq("user_id", userId)
//   //       .single()

//   //     if (sErr || !student) {
//   //       return res.status(400).json({ error: "Student not found" })
//   //     }

//   //     // ✅ STEP 2: get attendance
//   //     const { data, error } = await supabase
//   //       .from("attendance")
//   //       .select("*")
//   //       .eq("student_id", student.id)
//   //       .order("date", { ascending: true })

//   //     if (error) return res.status(400).json(error)

//   //     res.json(data)

//   //   } catch (err) {
//   //     res.status(500).json({ error: err.message })
//   //   }
//   // }
//   exports.getAttendance = async (req, res) => {
//     try {

//       const userId = req.user.id
//       const { month } = req.query

//       // ✅ STEP 1: get student id
//       const { data: student, error: sErr } = await supabase
//         .from("students")
//         .select("id")
//         .eq("user_id", userId)
//         .single()

//       if (sErr || !student) {
//         return res.status(400).json({ error: "Student not found" })
//       }

//       // ✅ STEP 2: query
//       let query = supabase
//         .from("attendance")
//         .select("*")
//         .eq("student_id", student.id)

//       // ✅ STEP 3: month filter
//       if (month) {
//         const start = `${month}-01`
//         const end = `${month}-31`

//         query = query.gte("date", start).lte("date", end)
//       }

//       const { data, error } = await query.order("date", { ascending: true })

//       if (error) return res.status(400).json(error)

//       res.json(data)

//     } catch (err) {
//       res.status(500).json({ error: err.message })
//     }
//   }

//   // Student Rank
//   exports.getRank = async (req, res) => {
//     const userId = req.user.id

//     const { data, error } = await supabase
//       .from("student_final_score")
//       .select("*")
//       .eq("student_id", userId)
//       .single()

//     if (error) return res.status(400).json(error)

//     res.json(data)
//   }


//   // ============================
//   // Get All Students (Admin)
//   // ============================
//   exports.getAllStudents = async (req, res) => {

//     const { data, error } = await supabase
//       .from("students")
//       .select(`
//         id,
//         roll_number,
//         class_id,
//         users(full_name,email),
//         classes(name)
//       `)

//     if (error) return res.status(400).json(error)

//     res.json(data)

//   }


//   // ================= DASHBOARD =================
//   // exports.getDashboard = async (req, res) => {
//   //   const userId = req.user.id

//   //   try {

//   //     const { data: student, error: studentError } = await supabase
//   //       .from("students")
//   //       .select("id, class_id")
//   //       .eq("user_id", userId)
//   //       .single()

//   //     if (studentError || !student) {
//   //       return res.status(400).json({ error: "Student not found" })
//   //     }

//   //     const classId = student.class_id

//   //     const { data: timetable } = await supabase
//   //       .from("timetables")
//   //       .select("*")
//   //       .eq("class_id", classId)

//   //     const { data: homework } = await supabase
//   //       .from("homework")
//   //       .select("*")
//   //       .eq("class_id", classId)
//   //       .order("created_at", { ascending: false })

//   //     const { data: attendance } = await supabase
//   //       .from("student_attendance_percentage")
//   //       .select("attendance_percentage")
//   //       .eq("student_id", student.id)
//   //       .single()

//   //     res.json({
//   //       timetable,
//   //       homework,
//   //       attendance: attendance?.attendance_percentage || 0
//   //     })

//   //   } catch (err) {
//   //     res.status(500).json({ error: err.message })
//   //   }
//   // }
//   exports.getDashboard = async (req, res) => {
//     try {

//       const studentId = req.user.id

//       // 🔹 Today's classes (timetable se)
//       const { data: classes } = await supabase
//         .from("timetables")
//         .select("subject, time, users(full_name)")
//         .eq("student_id", studentId)

//       // 🔹 Homework
//       const { data: homework } = await supabase
//         .from("homework")
//         .select("title, due_date")
//         .eq("class_id", req.user.class_id)

//       // 🔹 Tasks
//       const { data: tasks } = await supabase
//         .from("student_tasks")
//         .select("*")
//         .eq("student_id", studentId)
//         .order("created_at", { ascending: false })

//       res.json({
//         classes,
//         homework,
//         tasks
//       })

//     } catch (err) {
//       res.status(500).json({ error: err.message })
//     }
//   }


//   // ================= SUBJECTS =================
//   exports.getSubjects = async (req, res) => {
//     const userId = req.user.id

//     const { data: student } = await supabase
//       .from("students")
//       .select("class_id")
//       .eq("user_id", userId)
//       .single()

//     const { data } = await supabase
//       .from("subjects")
//       .select("*")
//       .eq("class_id", student.class_id)

//     res.json(data)
//   }

//   // ================= CHAPTERS =================
//   exports.getChapters = async (req, res) => {
//     const { subject_id } = req.params
//     const userId = req.user.id

//     const { data: student } = await supabase
//       .from("students")
//       .select("id")
//       .eq("user_id", userId)
//       .single()

//     const { data } = await supabase
//       .from("chapters")
//       .select("*")
//       .eq("subject_id", subject_id)

//     const { data: progress } = await supabase
//       .from("student_progress")
//       .select("*")
//       .eq("student_id", student.id)

//     res.json({ chapters: data, progress })
//   }

//   // ================= TOGGLE =================
//   exports.toggleProgress = async (req, res) => {
//     const { chapter_id } = req.body
//     const userId = req.user.id

//     const { data: student } = await supabase
//       .from("students")
//       .select("id")
//       .eq("user_id", userId)
//       .single()

//     await supabase
//       .from("student_progress")
//       .upsert({
//         student_id: student.id,
//         chapter_id,
//         is_completed: true
//       })

//     res.json({ message: "Updated" })
//   }


//   exports.addTask = async (req, res) => {
//     const { task } = req.body

//     const { error } = await supabase
//       .from("student_tasks")
//       .insert([
//         {
//           student_id: req.user.id,
//           task
//         }
//       ])

//     if (error) return res.status(400).json(error)

//     res.json({ message: "Task added" })
//   }

//   exports.toggleTask = async (req, res) => {
//     const { id } = req.params

//     const { data } = await supabase
//       .from("student_tasks")
//       .select("is_done")
//       .eq("id", id)
//       .single()

//     const { error } = await supabase
//       .from("student_tasks")
//       .update({ is_done: !data.is_done })
//       .eq("id", id)

//     if (error) return res.status(400).json(error)

//     res.json({ message: "Updated" })
//   }



//   exports.getAcademics = async (req, res) => {
//     try {
//       const userId = req.user.id

//       // ✅ STEP 1: student safely fetch
//       const { data: student, error: studentError } = await supabase
//         .from("students")
//         .select("id, class_id")
//         .eq("user_id", userId)
//         .single()

//       if (studentError || !student) {
//         return res.status(404).json({
//           error: "Student not found"
//         })
//       }

//       if (!student.class_id) {
//         return res.status(400).json({
//           error: "Student has no class assigned"
//         })
//       }

//       // ✅ STEP 2: subjects
//       const { data: subjects } = await supabase
//         .from("subjects")
//         .select("*")
//         .eq("class_id", student.class_id)

//       // ✅ STEP 3: chapters
//       const { data: chapters } = await supabase
//         .from("chapters")
//         .select("*")

//       // ✅ STEP 4: progress (IMPORTANT FIX)
//       const { data: progress } = await supabase
//         .from("student_progress")
//         .select("*")
//         .eq("student_id", student.id) // ✅ NOT user.id

//       const result = subjects.map(sub => ({
//         id: sub.id,
//         name: sub.name,
//         chapters: chapters
//           .filter(ch => ch.subject_id === sub.id)
//           .map(ch => {
//             const prog = progress.find(p => p.chapter_id === ch.id)

//             return {
//               id: ch.id,
//               title: ch.name,
//               is_done: prog ? prog.is_completed : false
//             }
//           })
//       }))

//       res.json(result)

//     } catch (err) {
//       console.log(err)
//       res.status(500).json({ error: err.message })
//     }
//   }
//   exports.toggleChapter = async (req, res) => {

//     const { chapterId } = req.params
//     const userId = req.user.id   // ✅ user id

//     try {

//       // ✅ STEP 1: get student id from user id
//       const { data: student, error: studentError } = await supabase
//         .from("students")
//         .select("id")
//         .eq("user_id", userId)
//         .single()

//       if (studentError || !student) {
//         return res.status(400).json({ error: "Student not found" })
//       }

//       const studentId = student.id   // ✅ CORRECT student id

//       // ✅ STEP 2: check existing progress
//       const { data: existing } = await supabase
//         .from("student_progress")
//         .select("*")
//         .eq("student_id", studentId)   // 🔥 FIX HERE
//         .eq("chapter_id", chapterId)
//         .single()

//       if (existing) {
//         // ✅ toggle
//         await supabase
//           .from("student_progress")
//           .update({
//             is_completed: !existing.is_completed
//           })
//           .eq("id", existing.id)
//       } else {
//         // ✅ insert if not exists
//         await supabase
//           .from("student_progress")
//           .insert([
//             {
//               student_id: studentId,   // 🔥 FIX HERE
//               chapter_id: chapterId,
//               is_completed: true
//             }
//           ])
//       }

//       res.json({ message: "updated" })

//     } catch (err) {
//       console.log(err)
//       res.status(500).json({ error: err.message })
//     }
//   }
//   exports.getStudentHomework = async (req, res) => {
//     try {
//       const userId = req.user.id

//       // 🔥 STEP 1: get student
//       const { data: student } = await supabase
//         .from("students")
//         .select("id, class_id")
//         .eq("user_id", userId)
//         .single()

//       if (!student) {
//         return res.status(404).json({ msg: "Student not found" })
//       }

//       // 🔥 STEP 2: get homework with subject
//       const { data: homework } = await supabase
//         .from("homework")
//         .select(`
//           id,
//           title,
//           description,
//           file_url,
//           due_date,
//           created_at,
//           subjects(name)
//         `)
//         .eq("class_id", student.class_id)
//         .order("created_at", { ascending: false })

//       // 🔥 STEP 3: group by subject
//       const grouped = {}

//       homework.forEach(hw => {
//         const subjectName = hw.subjects?.name || "Other"

//         if (!grouped[subjectName]) {
//           grouped[subjectName] = []
//         }

//         grouped[subjectName].push(hw)
//       })

//       res.json(grouped)

//     } catch (err) {
//       console.log(err)
//       res.status(500).json({ msg: "Server error" })
//     }
//   }

//   exports.createStudent = async (req, res) => {
//     const {
//       full_name,
//       email,
//       password_hash,
//       roll_number,
//       class_id
//     } = req.body

//     try {
//       // 1️⃣ create user
//       const { data: user, error: userError } = await supabase
//         .from("users")
//         .insert([
//           {
//             full_name,
//             email,
//             password_hash,
//             role: "student"
//           }
//         ])
//         .select()
//         .single()

//       if (userError) return res.status(400).json(userError)

//       // 2️⃣ create student
//       const { data: student, error: studentError } = await supabase
//         .from("students")
//         .insert([
//           {
//             user_id: user.id,
//             roll_number,
//             class_id
//           }
//         ])
//         .select()

//       if (studentError) return res.status(400).json(studentError)

//       res.json({
//         message: "Student created successfully",
//         student
//       })

//     } catch (err) {
//       res.status(500).json({ error: err.message })
//     }
//   }
//   exports.getHomeworkBySubject = async (req, res) => {
//     const { subject_id } = req.params

//     try {
      
//       const { data: student } = await supabase
//         .from("students")
//         .select("class_id")
//         .eq("user_id", req.user.id)
//         .single()

//       const { data, error } = await supabase
//         .from("homework")
//         .select("*")
//         .eq("subject_id", subject_id)
//         .eq("class_id", student.class_id) // ✅ MAIN FIX
//         .order("created_at", { ascending: false })

//       if (error) return res.status(400).json(error)

//       res.json(data)

//     } catch (err) {
//       console.log(err)
//       res.status(500).json({ error: "Server error" })
//     }
//   }


//   exports.getStudentResult = async (req, res) => {
//     const userId = req.user.id

//     // student
//     const { data: student } = await supabase
//       .from("students")
//       .select("id")
//       .eq("user_id", userId)
//       .single()

//     // 🔥 JOIN exams table
//     const { data: marks } = await supabase
//       .from("marks")
//       .select(`
//         *,
//         exams(name)
//       `)
//       .eq("student_id", student.id)

//     const result = {}

//     marks.forEach(m => {
//       if (!result[m.exam_id]) {
//         result[m.exam_id] = {
//           exam_id: m.exam_id,
//           exam_name: m.exams?.name || "Exam",
//           subjects: [],
//           total: 0,
//           max_total: 0
//         }
//       }

//       result[m.exam_id].subjects.push({
//         subject: m.subject,
//         marks: m.marks_obtained,
//         max: m.max_marks
//       })

//       result[m.exam_id].total += m.marks_obtained
//       result[m.exam_id].max_total += m.max_marks
//     })

//     Object.values(result).forEach(r => {
//       r.percentage = Math.round((r.total / r.max_total) * 100)
//     })

//     res.json(Object.values(result))
//   }

//   exports.getFinalResult = async (req, res) => {
//     const userId = req.user.id

//     const { data } = await supabase
//       .from("student_final_score")
//       .select("*")
//       .eq("student_id", userId)
//       .single()

//     res.json(data)
//   }





//   exports.getStudentTimetable = async (req, res) => {
//     try {

//       const userId = req.user.id

//       // ✅ STEP 1: get student + class
//       const { data: student } = await supabase
//         .from("students")
//         .select("id, class_id")
//         .eq("user_id", userId)
//         .single()

//       if (!student) {
//         return res.status(404).json({ error: "Student not found" })
//       }

//       // ✅ STEP 2: timetable of class
//       const { data: timetable } = await supabase
//         .from("timetables")
//         .select("*")
//         .eq("class_id", student.class_id)

//       // ✅ STEP 3: get teachers
//       const teacherIds = timetable.map(t => t.teacher_id)

//       let teachers = []

//       if (teacherIds.length > 0) {
//         const { data } = await supabase
//           .from("users")
//           .select("id, full_name")
//           .in("id", teacherIds)

//         teachers = data
//       }

//       // ✅ STEP 4: attach teacher name
//       const formatted = timetable.map(row => {
//         const teacher = teachers.find(t => t.id === row.teacher_id)

//         return {
//           ...row,
//           teacher_name: teacher?.full_name || "Unknown"
//         }
//       })

//       res.json(formatted)

//     } catch (err) {
//       res.status(500).json({ error: err.message })
//     }
//   }








//   exports.getStudentAnnouncements = async (req, res) => {
//     try {

//       const userId = req.user.id

//       // 🔹 get student
//       const { data: student, error: studentError } = await supabase
//         .from("students")
//         .select("class_id")
//         .eq("user_id", userId)
//         .single()

//       if (studentError || !student) {
//         return res.status(404).json({ error: "Student not found" })
//       }

//       // 🔵 SCHOOL
//       const { data: schoolData, error: e1 } = await supabase
//         .from("class_announcements")
//         .select(`
//           id,
//           message,
//           target_type,
//           class_id,
//           created_at,
//           users(full_name)
//         `)
//         .eq("target_type", "all")

//       // 🟢 CLASS
//       const { data: classData, error: e2 } = await supabase
//         .from("class_announcements")
//         .select(`
//           id,
//           message,
//           target_type,
//           class_id,
//           created_at,
//           users(full_name)
//         `)
//         .eq("target_type", "class")
//         .eq("class_id", student.class_id)

//       if (e1 || e2) {
//         console.log(e1 || e2)
//         return res.status(400).json(e1 || e2)
//       }

//       // 🔥 merge + sort
//       const finalData = [
//         ...(schoolData || []),
//         ...(classData || [])
//       ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

//       res.json(finalData)

//     } catch (err) {
//       console.log("SERVER ERROR:", err)
//       res.status(500).json({ error: err.message })
//     }
//   }







// ******************* YE WORKING CODE H FULL******************

// const supabase = require("../config/supabase")

// // Student Profile
// exports.getProfile = async (req, res) => {
//   const userId = req.user.id

//   try {
//     const { data: user, error: userError } = await supabase
//       .from("users")
//       .select("id, full_name, email, phone, role")
//       .eq("id", userId)
//       .single()

//     if (userError || !user) {
//       return res.status(404).json({ error: "User not found" })
//     }

//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select(`
//         id,
//         roll_number,
//         class_id,
//         classes!students_class_id_fkey (
//           class_name,
//           section
//         )
//       `)
//       .eq("user_id", userId)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({ error: "Student not found" })
//     }

//     res.json({
//       full_name: user.full_name,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//       student_id: student.id,
//       roll_number: student.roll_number,
//       class_id: student.class_id,
//       class_name: student.classes?.class_name || "-",
//       section: student.classes?.section || "-"
//     })
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: err.message })
//   }
// }

// // Student Marks
// exports.getMarks = async (req, res) => {
//   const userId = req.user.id

//   const { data, error } = await supabase
//     .from("marks")
//     .select("*")
//     .eq("student_id", userId)

//   if (error) return res.status(400).json(error)

//   res.json(data)
// }

// // Student Attendance
// exports.getAttendance = async (req, res) => {
//   try {
//     const userId = req.user.id
//     const { month } = req.query

//     const { data: student, error: sErr } = await supabase
//       .from("students")
//       .select("id")
//       .eq("user_id", userId)
//       .single()

//     if (sErr || !student) {
//       return res.status(400).json({ error: "Student not found" })
//     }

//     let query = supabase
//       .from("attendance")
//       .select("*")
//       .eq("student_id", student.id)

//     if (month) {
//       const start = `${month}-01`
//       const end = `${month}-31`
//       query = query.gte("date", start).lte("date", end)
//     }

//     const { data, error } = await query.order("date", { ascending: true })

//     if (error) return res.status(400).json(error)

//     res.json(data)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

// // Student Rank
// exports.getRank = async (req, res) => {
//   const userId = req.user.id

//   const { data, error } = await supabase
//     .from("student_final_score")
//     .select("*")
//     .eq("student_id", userId)
//     .single()

//   if (error) return res.status(400).json(error)

//   res.json(data)
// }

// // ============================
// // Get All Students (Admin)
// // ============================
// exports.getAllStudents = async (req, res) => {
//   const { data, error } = await supabase
//     .from("students")
//     .select(`
//       id,
//       roll_number,
//       class_id,
//       phone,
//       users(full_name,email,phone),
//       classes(name)
//     `)

//   if (error) return res.status(400).json(error)

//   res.json(data)
// }

// // ================= DASHBOARD =================
// exports.getDashboard = async (req, res) => {
//   try {
//     const studentId = req.user.id

//     const { data: classes } = await supabase
//       .from("timetables")
//       .select("subject, time, users(full_name)")
//       .eq("student_id", studentId)

//     const { data: homework } = await supabase
//       .from("homework")
//       .select("title, due_date")
//       .eq("class_id", req.user.class_id)

//     const { data: tasks } = await supabase
//       .from("student_tasks")
//       .select("*")
//       .eq("student_id", studentId)
//       .order("created_at", { ascending: false })

//     res.json({
//       classes,
//       homework,
//       tasks
//     })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

// // ================= SUBJECTS =================
// exports.getSubjects = async (req, res) => {
//   const userId = req.user.id

//   const { data: student } = await supabase
//     .from("students")
//     .select("class_id")
//     .eq("user_id", userId)
//     .single()

//   const { data } = await supabase
//     .from("subjects")
//     .select("*")
//     .eq("class_id", student.class_id)

//   res.json(data)
// }

// // ================= CHAPTERS =================
// exports.getChapters = async (req, res) => {
//   const { subject_id } = req.params
//   const userId = req.user.id

//   const { data: student } = await supabase
//     .from("students")
//     .select("id")
//     .eq("user_id", userId)
//     .single()

//   const { data } = await supabase
//     .from("chapters")
//     .select("*")
//     .eq("subject_id", subject_id)

//   const { data: progress } = await supabase
//     .from("student_progress")
//     .select("*")
//     .eq("student_id", student.id)

//   res.json({ chapters: data, progress })
// }

// // ================= TOGGLE =================
// exports.toggleProgress = async (req, res) => {
//   const { chapter_id } = req.body
//   const userId = req.user.id

//   const { data: student } = await supabase
//     .from("students")
//     .select("id")
//     .eq("user_id", userId)
//     .single()

//   await supabase
//     .from("student_progress")
//     .upsert({
//       student_id: student.id,
//       chapter_id,
//       is_completed: true
//     })

//   res.json({ message: "Updated" })
// }

// exports.addTask = async (req, res) => {
//   const { task } = req.body

//   const { error } = await supabase
//     .from("student_tasks")
//     .insert([
//       {
//         student_id: req.user.id,
//         task
//       }
//     ])

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Task added" })
// }

// exports.toggleTask = async (req, res) => {
//   const { id } = req.params

//   const { data } = await supabase
//     .from("student_tasks")
//     .select("is_done")
//     .eq("id", id)
//     .single()

//   const { error } = await supabase
//     .from("student_tasks")
//     .update({ is_done: !data.is_done })
//     .eq("id", id)

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Updated" })
// }

// exports.getAcademics = async (req, res) => {
//   try {
//     const userId = req.user.id

//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id, class_id")
//       .eq("user_id", userId)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({
//         error: "Student not found"
//       })
//     }

//     if (!student.class_id) {
//       return res.status(400).json({
//         error: "Student has no class assigned"
//       })
//     }

//     const { data: subjects } = await supabase
//       .from("subjects")
//       .select("*")
//       .eq("class_id", student.class_id)

//     const { data: chapters } = await supabase
//       .from("chapters")
//       .select("*")

//     const { data: progress } = await supabase
//       .from("student_progress")
//       .select("*")
//       .eq("student_id", student.id)

//     const result = subjects.map(sub => ({
//       id: sub.id,
//       name: sub.name,
//       chapters: chapters
//         .filter(ch => ch.subject_id === sub.id)
//         .map(ch => {
//           const prog = progress.find(p => p.chapter_id === ch.id)

//           return {
//             id: ch.id,
//             title: ch.name,
//             is_done: prog ? prog.is_completed : false
//           }
//         })
//     }))

//     res.json(result)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: err.message })
//   }
// }

// exports.toggleChapter = async (req, res) => {
//   const { chapterId } = req.params
//   const userId = req.user.id

//   try {
//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id")
//       .eq("user_id", userId)
//       .single()

//     if (studentError || !student) {
//       return res.status(400).json({ error: "Student not found" })
//     }

//     const studentId = student.id

//     const { data: existing } = await supabase
//       .from("student_progress")
//       .select("*")
//       .eq("student_id", studentId)
//       .eq("chapter_id", chapterId)
//       .single()

//     if (existing) {
//       await supabase
//         .from("student_progress")
//         .update({
//           is_completed: !existing.is_completed
//         })
//         .eq("id", existing.id)
//     } else {
//       await supabase
//         .from("student_progress")
//         .insert([
//           {
//             student_id: studentId,
//             chapter_id: chapterId,
//             is_completed: true
//           }
//         ])
//     }

//     res.json({ message: "updated" })
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: err.message })
//   }
// }

// exports.getStudentHomework = async (req, res) => {
//   try {
//     const userId = req.user.id

//     const { data: student } = await supabase
//       .from("students")
//       .select("id, class_id")
//       .eq("user_id", userId)
//       .single()

//     if (!student) {
//       return res.status(404).json({ msg: "Student not found" })
//     }

//     const { data: homework } = await supabase
//       .from("homework")
//       .select(`
//         id,
//         title,
//         description,
//         file_url,
//         due_date,
//         created_at,
//         subjects(name)
//       `)
//       .eq("class_id", student.class_id)
//       .order("created_at", { ascending: false })

//     const grouped = {}

//     homework.forEach(hw => {
//       const subjectName = hw.subjects?.name || "Other"

//       if (!grouped[subjectName]) {
//         grouped[subjectName] = []
//       }

//       grouped[subjectName].push(hw)
//     })

//     res.json(grouped)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ msg: "Server error" })
//   }
// }

// // ============================
// // Create Student
// // ============================
// exports.createStudent = async (req, res) => {
//   const {
//     full_name,
//     email,
//     phone,
//     password_hash,
//     roll_number,
//     class_id
//   } = req.body

//   try {
//     const { data: user, error: userError } = await supabase
//       .from("users")
//       .insert([
//         {
//           full_name,
//           email,
//           phone,
//           password_hash,
//           role: "student"
//         }
//       ])
//       .select()
//       .single()

//     if (userError) return res.status(400).json(userError)

//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .insert([
//         {
//           user_id: user.id,
//           roll_number,
//           class_id,
//           phone
//         }
//       ])
//       .select()
//       .single()

//     if (studentError) return res.status(400).json(studentError)

//     res.json({
//       message: "Student created successfully",
//       student
//     })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

// // ============================
// // Update Student
// // ============================
// exports.updateStudent = async (req, res) => {
//   const { id } = req.params
//   const { full_name, email, phone } = req.body

//   try {
//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id, user_id")
//       .eq("id", id)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({ error: "Student not found" })
//     }

//     const { error: userError } = await supabase
//       .from("users")
//       .update({
//         full_name,
//         email,
//         phone
//       })
//       .eq("id", student.user_id)

//     if (userError) return res.status(400).json(userError)

//     const { error: studentUpdateError } = await supabase
//       .from("students")
//       .update({
//         phone
//       })
//       .eq("id", id)

//     if (studentUpdateError) return res.status(400).json(studentUpdateError)

//     res.json({ message: "Student updated successfully" })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

// // ============================
// // Delete Student
// // ============================
// exports.deleteStudent = async (req, res) => {
//   const { id } = req.params

//   try {
//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id, user_id")
//       .eq("id", id)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({ error: "Student not found" })
//     }

//     const { error: deleteStudentError } = await supabase
//       .from("students")
//       .delete()
//       .eq("id", id)

//     if (deleteStudentError) return res.status(400).json(deleteStudentError)

//     const { error: deleteUserError } = await supabase
//       .from("users")
//       .delete()
//       .eq("id", student.user_id)

//     if (deleteUserError) return res.status(400).json(deleteUserError)

//     res.json({ message: "Student deleted successfully" })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

// exports.getHomeworkBySubject = async (req, res) => {
//   const { subject_id } = req.params

//   try {
//     const { data: student } = await supabase
//       .from("students")
//       .select("class_id")
//       .eq("user_id", req.user.id)
//       .single()

//     const { data, error } = await supabase
//       .from("homework")
//       .select("*")
//       .eq("subject_id", subject_id)
//       .eq("class_id", student.class_id)
//       .order("created_at", { ascending: false })

//     if (error) return res.status(400).json(error)

//     res.json(data)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: "Server error" })
//   }
// }

// exports.getStudentResult = async (req, res) => {
//   const userId = req.user.id

//   const { data: student } = await supabase
//     .from("students")
//     .select("id")
//     .eq("user_id", userId)
//     .single()

//   const { data: marks } = await supabase
//     .from("marks")
//     .select(`
//       *,
//       exams(name)
//     `)
//     .eq("student_id", student.id)

//   const result = {}

//   marks.forEach(m => {
//     if (!result[m.exam_id]) {
//       result[m.exam_id] = {
//         exam_id: m.exam_id,
//         exam_name: m.exams?.name || "Exam",
//         subjects: [],
//         total: 0,
//         max_total: 0
//       }
//     }

//     result[m.exam_id].subjects.push({
//       subject: m.subject,
//       marks: m.marks_obtained,
//       max: m.max_marks
//     })

//     result[m.exam_id].total += m.marks_obtained
//     result[m.exam_id].max_total += m.max_marks
//   })

//   Object.values(result).forEach(r => {
//     r.percentage = Math.round((r.total / r.max_total) * 100)
//   })

//   res.json(Object.values(result))
// }

// exports.getFinalResult = async (req, res) => {
//   const userId = req.user.id

//   const { data } = await supabase
//     .from("student_final_score")
//     .select("*")
//     .eq("student_id", userId)
//     .single()

//   res.json(data)
// }

// exports.getStudentTimetable = async (req, res) => {
//   try {
//     const userId = req.user.id

//     const { data: student } = await supabase
//       .from("students")
//       .select("id, class_id")
//       .eq("user_id", userId)
//       .single()

//     if (!student) {
//       return res.status(404).json({ error: "Student not found" })
//     }

//     const { data: timetable } = await supabase
//       .from("timetables")
//       .select("*")
//       .eq("class_id", student.class_id)

//     const teacherIds = timetable.map(t => t.teacher_id)

//     let teachers = []

//     if (teacherIds.length > 0) {
//       const { data } = await supabase
//         .from("users")
//         .select("id, full_name")
//         .in("id", teacherIds)

//       teachers = data
//     }

//     const formatted = timetable.map(row => {
//       const teacher = teachers.find(t => t.id === row.teacher_id)

//       return {
//         ...row,
//         teacher_name: teacher?.full_name || "Unknown"
//       }
//     })

//     res.json(formatted)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

// exports.getStudentAnnouncements = async (req, res) => {
//   try {
//     const userId = req.user.id

//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("class_id")
//       .eq("user_id", userId)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({ error: "Student not found" })
//     }

//     const { data: schoolData, error: e1 } = await supabase
//       .from("class_announcements")
//       .select(`
//         id,
//         message,
//         target_type,
//         class_id,
//         created_at,
//         users(full_name)
//       `)
//       .eq("target_type", "all")

//     const { data: classData, error: e2 } = await supabase
//       .from("class_announcements")
//       .select(`
//         id,
//         message,
//         target_type,
//         class_id,
//         created_at,
//         users(full_name)
//       `)
//       .eq("target_type", "class")
//       .eq("class_id", student.class_id)

//     if (e1 || e2) {
//       console.log(e1 || e2)
//       return res.status(400).json(e1 || e2)
//     }

//     const finalData = [
//       ...(schoolData || []),
//       ...(classData || [])
//     ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

//     res.json(finalData)
//   } catch (err) {
//     console.log("SERVER ERROR:", err)
//     res.status(500).json({ error: err.message })
//   }
// }




// ******************* YE WORKING CODE H FULL******************

























const supabase = require("../config/supabase")

// ============================
// Student Profile
// ============================
exports.getProfile = async (req, res) => {
  const userId = req.user.id

  try {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, full_name, email, phone, role")
      .eq("id", userId)
      .single()

    if (userError || !user) {
      return res.status(404).json({ error: "User not found" })
    }

    const { data: student, error: studentError } = await supabase
      .from("students")
      .select(`
        id,
        roll_number,
        class_id,
        classes!students_class_id_fkey (
          class_name,
          section
        )
      `)
      .eq("user_id", userId)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ error: "Student not found" })
    }

    res.json({
      full_name:  user.full_name,
      email:      user.email,
      phone:      user.phone,
      role:       user.role,
      student_id: student.id,
      roll_number: student.roll_number,
      class_id:   student.class_id,
      class_name: student.classes?.class_name || "-",
      section:    student.classes?.section    || "-"
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

// ============================
// Student Marks
// ============================
exports.getMarks = async (req, res) => {
  const userId = req.user.id

  const { data, error } = await supabase
    .from("marks")
    .select("*")
    .eq("student_id", userId)

  if (error) return res.status(400).json(error)

  res.json(data)
}

// ============================
// Student Attendance
// ============================
exports.getAttendance = async (req, res) => {
  try {
    const userId = req.user.id
    const { month } = req.query

    const { data: student, error: sErr } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", userId)
      .single()

    if (sErr || !student) {
      return res.status(400).json({ error: "Student not found" })
    }

    let query = supabase
      .from("attendance")
      .select("*")
      .eq("student_id", student.id)

    if (month) {
      const start = `${month}-01`
      const end   = `${month}-31`
      query = query.gte("date", start).lte("date", end)
    }

    const { data, error } = await query.order("date", { ascending: true })

    if (error) return res.status(400).json(error)

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ============================
// Student Rank
// ============================
exports.getRank = async (req, res) => {
  const userId = req.user.id

  const { data, error } = await supabase
    .from("student_final_score")
    .select("*")
    .eq("student_id", userId)
    .single()

  if (error) return res.status(400).json(error)

  res.json(data)
}

// ============================
// Get All Students (Admin)
// ============================
exports.getAllStudents = async (req, res) => {
  const { data, error } = await supabase
    .from("students")
    .select(`
      id,
      roll_number,
      class_id,
      phone,
      users(full_name, email, phone),
      classes(name)
    `)

  if (error) return res.status(400).json(error)

  res.json(data)
}

// ============================
// Student Dashboard
// ============================
exports.getDashboard = async (req, res) => {
  try {
    const studentId = req.user.id

    const { data: classes } = await supabase
      .from("timetables")
      .select("subject, time, users(full_name)")
      .eq("student_id", studentId)

    const { data: homework } = await supabase
      .from("homework")
      .select("title, due_date")
      .eq("class_id", req.user.class_id)

    const { data: tasks } = await supabase
      .from("student_tasks")
      .select("*")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false })

    res.json({ classes, homework, tasks })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ============================
// Subjects
// ============================
exports.getSubjects = async (req, res) => {
  const userId = req.user.id

  const { data: student } = await supabase
    .from("students")
    .select("class_id")
    .eq("user_id", userId)
    .single()

  const { data } = await supabase
    .from("subjects")
    .select("*")
    .eq("class_id", student.class_id)

  res.json(data)
}

// ============================
// Chapters
// ============================
exports.getChapters = async (req, res) => {
  const { subject_id } = req.params
  const userId = req.user.id

  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("user_id", userId)
    .single()

  const { data } = await supabase
    .from("chapters")
    .select("*")
    .eq("subject_id", subject_id)

  const { data: progress } = await supabase
    .from("student_progress")
    .select("*")
    .eq("student_id", student.id)

  res.json({ chapters: data, progress })
}

// ============================
// Toggle Progress
// ============================
exports.toggleProgress = async (req, res) => {
  const { chapter_id } = req.body
  const userId = req.user.id

  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("user_id", userId)
    .single()

  await supabase
    .from("student_progress")
    .upsert({
      student_id:   student.id,
      chapter_id,
      is_completed: true
    })

  res.json({ message: "Updated" })
}

// ============================
// Add Task
// ============================
exports.addTask = async (req, res) => {
  const { task } = req.body

  const { error } = await supabase
    .from("student_tasks")
    .insert([{ student_id: req.user.id, task }])

  if (error) return res.status(400).json(error)

  res.json({ message: "Task added" })
}

// ============================
// Toggle Task
// ============================
exports.toggleTask = async (req, res) => {
  const { id } = req.params

  const { data } = await supabase
    .from("student_tasks")
    .select("is_done")
    .eq("id", id)
    .single()

  const { error } = await supabase
    .from("student_tasks")
    .update({ is_done: !data.is_done })
    .eq("id", id)

  if (error) return res.status(400).json(error)

  res.json({ message: "Updated" })
}

// ============================
// Academics
// ============================
exports.getAcademics = async (req, res) => {
  try {
    const userId = req.user.id

    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, class_id")
      .eq("user_id", userId)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ error: "Student not found" })
    }

    if (!student.class_id) {
      return res.status(400).json({ error: "Student has no class assigned" })
    }

    const { data: subjects } = await supabase
      .from("subjects")
      .select("*")
      .eq("class_id", student.class_id)

    const { data: chapters } = await supabase
      .from("chapters")
      .select("*")

    const { data: progress } = await supabase
      .from("student_progress")
      .select("*")
      .eq("student_id", student.id)

    const result = subjects.map(sub => ({
      id:   sub.id,
      name: sub.name,
      chapters: chapters
        .filter(ch => ch.subject_id === sub.id)
        .map(ch => {
          const prog = progress.find(p => p.chapter_id === ch.id)
          return {
            id:      ch.id,
            title:   ch.name,
            is_done: prog ? prog.is_completed : false
          }
        })
    }))

    res.json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

// ============================
// Toggle Chapter
// ============================
exports.toggleChapter = async (req, res) => {
  const { chapterId } = req.params
  const userId = req.user.id

  try {
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", userId)
      .single()

    if (studentError || !student) {
      return res.status(400).json({ error: "Student not found" })
    }

    const studentId = student.id

    const { data: existing } = await supabase
      .from("student_progress")
      .select("*")
      .eq("student_id", studentId)
      .eq("chapter_id", chapterId)
      .single()

    if (existing) {
      await supabase
        .from("student_progress")
        .update({ is_completed: !existing.is_completed })
        .eq("id", existing.id)
    } else {
      await supabase
        .from("student_progress")
        .insert([{
          student_id:   studentId,
          chapter_id:   chapterId,
          is_completed: true
        }])
    }

    res.json({ message: "updated" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

// ============================
// Student Homework
// ============================
exports.getStudentHomework = async (req, res) => {
  try {
    const userId = req.user.id

    const { data: student } = await supabase
      .from("students")
      .select("id, class_id")
      .eq("user_id", userId)
      .single()

    if (!student) {
      return res.status(404).json({ msg: "Student not found" })
    }

    const { data: homework } = await supabase
      .from("homework")
      .select(`
        id,
        title,
        description,
        file_url,
        due_date,
        created_at,
        subjects(name)
      `)
      .eq("class_id", student.class_id)
      .order("created_at", { ascending: false })

    const grouped = {}
    homework.forEach(hw => {
      const subjectName = hw.subjects?.name || "Other"
      if (!grouped[subjectName]) grouped[subjectName] = []
      grouped[subjectName].push(hw)
    })

    res.json(grouped)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Server error" })
  }
}

// ============================
// ✅ FIX: Create Student
// CHANGES:
//   1. students insert mein `name: full_name` add kiya
//      — pehle students.name NULL rehta tha, ab properly fill hoga
//   2. admission_num optional support added
// ============================
exports.createStudent = async (req, res) => {
  const {
    full_name,
    email,
    phone,
    password_hash,
    roll_number,
    class_id,
    admission_num
  } = req.body
 
  try {
    // Step 1: users table mein insert
    const { data: user, error: userError } = await supabase
      .from("users")
      .insert([{
        full_name,
        email,
        phone,
        password_hash,
        role: "student"
      }])
      .select()
      .single()
 
    if (userError) {
      console.log("USER INSERT ERROR:", userError) // debug ke liye
      return res.status(400).json(userError)
    }
 
    // Step 2: students table mein insert
    const { data: student, error: studentError } = await supabase
      .from("students")
      .insert([{
        user_id:       user.id,
        roll_number:   Number(roll_number),  // ✅ FIX: int4 column hai — string se int convert karo
        class_id,
        phone,
        name:          full_name           // ✅ FIX: students.name fill karo
        // admission_num: admission_num || null // optional
      }])
      .select()
      .single()
 
    if (studentError) {
      console.log("STUDENT INSERT ERROR:", studentError) // debug ke liye
 
      // ✅ Agar student insert fail hua to user bhi rollback karo
      //    warna orphan user ban jaayega users table mein
      await supabase.from("users").delete().eq("id", user.id)
 
      return res.status(400).json(studentError)
    }
 
    res.json({
      message: "Student created successfully",
      student
    })
 
  } catch (err) {
    console.log("CREATE STUDENT SERVER ERROR:", err)
    res.status(500).json({ error: err.message })
  }
}
 

// ============================
// Update Student
// ============================

// exports.updateStudent = async (req, res) => {
//   const { id }                     = req.params
//   const { full_name, email, phone } = req.body

//   try {
//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id, user_id")
//       .eq("id", id)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({ error: "Student not found" })
//     }

//     // users table update
//     const { error: userError } = await supabase
//       .from("users")
//       .update({ full_name, email, phone })
//       .eq("id", student.user_id)

//     if (userError) return res.status(400).json(userError)

//     // ✅ CHANGE 2: students.name bhi update karo — warna name alag ho jayega
//     const { error: studentUpdateError } = await supabase
//       .from("students")
//       .update({
//         phone,
//         name: full_name   // ✅ FIX: students.name ko bhi sync rakho users.full_name ke saath
//       })
//       .eq("id", id)

//     if (studentUpdateError) return res.status(400).json(studentUpdateError)

//     res.json({ message: "Student updated successfully" })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }
// studentController.js mein updateStudent replace karo

exports.updateStudent = async (req, res) => {
  const { id }                                      = req.params
  const { full_name, email, phone, roll_number }    = req.body

  try {
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, user_id")
      .eq("id", id)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ error: "Student not found" })
    }

    // users table update
    const { error: userError } = await supabase
      .from("users")
      .update({ full_name, email, phone })
      .eq("id", student.user_id)

    if (userError) return res.status(400).json(userError)

    // ✅ FIX: students table mein name + phone + roll_number teen update ho
    //         pehle roll_number update nahi hota tha
    const updatePayload = {
      phone,
      name: full_name,                                    // ✅ name sync
      ...(roll_number && { roll_number: Number(roll_number) }) // ✅ roll_number bhi update
    }

    const { error: studentUpdateError } = await supabase
      .from("students")
      .update(updatePayload)
      .eq("id", id)

    if (studentUpdateError) return res.status(400).json(studentUpdateError)

    res.json({ message: "Student updated successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ============================
// Delete Student
// ============================
exports.deleteStudent = async (req, res) => {
  const { id } = req.params

  try {
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, user_id")
      .eq("id", id)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ error: "Student not found" })
    }

    const { error: deleteStudentError } = await supabase
      .from("students")
      .delete()
      .eq("id", id)

    if (deleteStudentError) return res.status(400).json(deleteStudentError)

    const { error: deleteUserError } = await supabase
      .from("users")
      .delete()
      .eq("id", student.user_id)

    if (deleteUserError) return res.status(400).json(deleteUserError)

    res.json({ message: "Student deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ============================
// Homework By Subject
// ============================
exports.getHomeworkBySubject = async (req, res) => {
  const { subject_id } = req.params

  try {
    const { data: student } = await supabase
      .from("students")
      .select("class_id")
      .eq("user_id", req.user.id)
      .single()

    const { data, error } = await supabase
      .from("homework")
      .select("*")
      .eq("subject_id", subject_id)
      .eq("class_id", student.class_id)
      .order("created_at", { ascending: false })

    if (error) return res.status(400).json(error)

    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
}

// ============================
// Student Result
// ============================
exports.getStudentResult = async (req, res) => {
  const userId = req.user.id

  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("user_id", userId)
    .single()

  const { data: marks } = await supabase
    .from("marks")
    .select(`*, exams(name)`)
    .eq("student_id", student.id)

  const result = {}

  marks.forEach(m => {
    if (!result[m.exam_id]) {
      result[m.exam_id] = {
        exam_id:   m.exam_id,
        exam_name: m.exams?.name || "Exam",
        subjects:  [],
        total:     0,
        max_total: 0
      }
    }

    result[m.exam_id].subjects.push({
      subject: m.subject,
      marks:   m.marks_obtained,
      max:     m.max_marks
    })

    result[m.exam_id].total     += m.marks_obtained
    result[m.exam_id].max_total += m.max_marks
  })

  Object.values(result).forEach(r => {
    r.percentage = Math.round((r.total / r.max_total) * 100)
  })

  res.json(Object.values(result))
}

// ============================
// Final Result
// ============================
exports.getFinalResult = async (req, res) => {
  const userId = req.user.id

  const { data } = await supabase
    .from("student_final_score")
    .select("*")
    .eq("student_id", userId)
    .single()

  res.json(data)
}

// ============================
// Student Timetable
// ============================
exports.getStudentTimetable = async (req, res) => {
  try {
    const userId = req.user.id

    const { data: student } = await supabase
      .from("students")
      .select("id, class_id")
      .eq("user_id", userId)
      .single()

    if (!student) {
      return res.status(404).json({ error: "Student not found" })
    }

    const { data: timetable } = await supabase
      .from("timetables")
      .select("*")
      .eq("class_id", student.class_id)

    const teacherIds = timetable.map(t => t.teacher_id)
    let teachers = []

    if (teacherIds.length > 0) {
      const { data } = await supabase
        .from("users")
        .select("id, full_name")
        .in("id", teacherIds)
      teachers = data
    }

    const formatted = timetable.map(row => {
      const teacher = teachers.find(t => t.id === row.teacher_id)
      return { ...row, teacher_name: teacher?.full_name || "Unknown" }
    })

    res.json(formatted)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ============================
// Student Announcements
// ============================
exports.getStudentAnnouncements = async (req, res) => {
  try {
    const userId = req.user.id

    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("class_id")
      .eq("user_id", userId)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ error: "Student not found" })
    }

    const { data: schoolData, error: e1 } = await supabase
      .from("class_announcements")
      .select(`id, message, target_type, class_id, created_at, users(full_name)`)
      .eq("target_type", "all")

    const { data: classData, error: e2 } = await supabase
      .from("class_announcements")
      .select(`id, message, target_type, class_id, created_at, users(full_name)`)
      .eq("target_type", "class")
      .eq("class_id", student.class_id)

    if (e1 || e2) {
      console.log(e1 || e2)
      return res.status(400).json(e1 || e2)
    }

    const finalData = [
      ...(schoolData || []),
      ...(classData  || [])
    ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    res.json(finalData)
  } catch (err) {
    console.log("SERVER ERROR:", err)
    res.status(500).json({ error: err.message })
  }
}

// ============================
// ✅ FIX: getMyFees
// CHANGES:
//   1. fee_payments table se payment_id bhi fetch kiya
//      — ye receipt download ke liye chahiye tha
//      — pehle payment_id response mein nahi tha
// ============================
exports.getMyFees = async (req, res) => {
  try {
    const userId = req.user.id

    const ALL_MONTHS = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ]

    // Step 1: student find karo
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, class_id")
      .eq("user_id", userId)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ message: "Student not found" })
    }

    // Step 2: class ki fee_structure lao
    const { data: feeStructures, error: fsError } = await supabase
      .from("fee_structure")
      .select("id, class_id, month, amount, due_date")
      .eq("class_id", student.class_id)

    if (fsError) return res.status(400).json(fsError)

    // Step 3: student_fees lao
    const { data: studentFees, error: sfError } = await supabase
      .from("student_fees")
      .select("id, student_id, fee_id, amount, paid_amount, status, month")
      .eq("student_id", student.id)

    if (sfError) return res.status(400).json(sfError)

    // ✅ CHANGE: fee_payments se payment_id fetch karo (receipt download ke liye)
    //           pehle ye nahi tha — isliye Download Receipt button kaam nahi karta tha
    const { data: allPayments } = await supabase
      .from("fee_payments")
      .select("id, fee_id, payment_status, created_at")
      .eq("student_id", student.id)
      .eq("payment_status", "paid")
      .order("created_at", { ascending: false })

    // Step 4: 12 months ka response banao
    const result = ALL_MONTHS.map((monthName) => {
      const feeStructure = (feeStructures || []).find(f => f.month === monthName)
      const studentFee   = (studentFees   || []).find(f => f.month === monthName)

      if (!feeStructure) {
        return {
          id:               null,
          fee_id:           null,
          payment_id:       null,
          month:            monthName,
          amount:           0,
          paid_amount:      0,
          remaining_amount: 0,
          due_date:         null,
          status:           "no_fee"
        }
      }

      const totalAmount     = Number(studentFee?.amount     || feeStructure.amount || 0)
      const paidAmount      = Number(studentFee?.paid_amount || 0)
      const remainingAmount = Math.max(totalAmount - paidAmount, 0)

      let finalStatus = "pending"
      if (paidAmount >= totalAmount && totalAmount > 0) finalStatus = "paid"
      else if (paidAmount > 0 && paidAmount < totalAmount) finalStatus = "partial"

      // ✅ CHANGE: is month ka latest paid payment_id dhoondo
      const latestPayment = (allPayments || []).find(p => p.fee_id === feeStructure.id)

      return {
        id:               studentFee?.id  || null,
        fee_id:           feeStructure.id,
        payment_id:       latestPayment?.id || null,  // ✅ receipt download ke liye
        month:            monthName,
        amount:           totalAmount,
        paid_amount:      paidAmount,
        remaining_amount: remainingAmount,
        due_date:         feeStructure.due_date,
        status:           finalStatus
      }
    })

    res.json(result)
  } catch (err) {
    console.log("getMyFees server error:", err)
    res.status(500).json({ message: "Server error" })
  }
}
