const supabase = require("../config/supabase")

// Teacher create homework
// Teacher create homework
exports.createHomework = async (req, res) => {
  try {
    const teacherId = req.user.id
    const { class_id, title, description, due_date } = req.body

    // 🔥 STEP 1: teacher ka subject_id lo
    const { data: teacher, error: teacherError } = await supabase
      .from("teachers")
      .select("subject_id")
      .eq("user_id", teacherId)
      .single()

    if (teacherError || !teacher) {
      return res.status(400).json({ error: "Teacher subject not found" })
    }

    // 🔥 STEP 2: insert homework
    const { error } = await supabase
      .from("homework")
      .insert([
        {
          class_id,
          subject_id: teacher.subject_id,
          teacher_id: teacherId,
          title,
          description,
          due_date
        }
      ])

    if (error) return res.status(400).json(error)

    res.json({ message: "Homework created successfully ✅" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
  
// Students view homework
exports.getHomeworkBySubject = async (req, res) => {
  const { subject_id } = req.params

  const { data, error } = await supabase
    .from("homework")
    .select("*")
    .eq("subject_id", subject_id) // ✅ MAIN FIX
    .order("created_at", { ascending: false })

  if (error) return res.status(400).json(error)

  res.json(data)
}

// Student submit homework
exports.submitHomework = async (req, res) => {
  const { homework_id, submission_text } = req.body

  const { data, error } = await supabase
    .from("homework_submissions")
    .insert([
      {
        homework_id,
        student_id: req.user.id,
        submission_text
      }
    ])

  if (error) return res.status(400).json(error)

  res.json({ message: "Homework submitted successfully" })
}

// Teacher grade homework
exports.gradeHomework = async (req, res) => {
  const { submission_id } = req.params
  const { grade, feedback } = req.body

  const { data, error } = await supabase
    .from("homework_submissions")
    .update({
      grade,
      feedback
    })
    .eq("id", submission_id)

  if (error) return res.status(400).json(error)

  res.json({ message: "Homework graded successfully" })
}



