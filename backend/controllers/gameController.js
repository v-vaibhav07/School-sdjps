// const supabase = require("../config/supabase")

// const generateRoomCode = () => {
//   return Math.random().toString(36).substring(2, 8).toUpperCase()
// }

// const generateQuestion = (operations) => {
//   const ops = operations.split(",")
//   const op = ops[Math.floor(Math.random() * ops.length)]

//   let a, b, answer, text

//   if (op === "+") {
//     a = Math.floor(Math.random() * 50) + 1
//     b = Math.floor(Math.random() * 50) + 1
//     answer = a + b
//     text = `${a} + ${b}`
//   }

//   if (op === "-") {
//     a = Math.floor(Math.random() * 50) + 20
//     b = Math.floor(Math.random() * 20) + 1
//     if (b > a) [a, b] = [b, a]
//     answer = a - b
//     text = `${a} - ${b}`
//   }

//   if (op === "*") {
//     a = Math.floor(Math.random() * 12) + 1
//     b = Math.floor(Math.random() * 12) + 1
//     answer = a * b
//     text = `${a} × ${b}`
//   }

//   if (op === "/") {
//     b = Math.floor(Math.random() * 12) + 1
//     answer = Math.floor(Math.random() * 12) + 1
//     a = b * answer
//     text = `${a} ÷ ${b}`
//   }

//   return { text, answer }
// }

// const generateQuestions = (operations, totalQuestions) => {
//   let questions = []

//   for (let i = 0; i < totalQuestions; i++) {
//     questions.push({
//       id: i + 1,
//       ...generateQuestion(operations)
//     })
//   }

//   return questions
// }

// // ==============================
// // Create Room
// // ==============================
// exports.createRoom = async (req, res) => {
//   try {
//     const { operations, total_questions } = req.body

//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id, name")
//       .eq("user_id", req.user.id)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({ message: "Student not found" })
//     }

//     const roomCode = generateRoomCode()

//     const { data: room, error: roomError } = await supabase
//       .from("game_rooms")
//       .insert([{
//         room_code: roomCode,
//         host_student_id: student.id,
//         operations: operations.join(","),
//         total_questions: total_questions || 10,
//         status: "waiting"
//       }])
//       .select()
//       .single()

//     if (roomError) return res.status(400).json(roomError)

//     const { error: playerError } = await supabase
//       .from("game_room_players")
//       .insert([{
//         room_id: room.id,
//         student_id: student.id,
//         student_name: student.name
//       }])

//     if (playerError) return res.status(400).json(playerError)

//     res.json({
//       message: "Room created successfully",
//       room_code: room.room_code,
//       room_id: room.id
//     })

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: "Server error" })
//   }
// }

// // ==============================
// // Join Room
// // ==============================
// exports.joinRoom = async (req, res) => {
//   try {
//     const { room_code } = req.body

//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id, name")
//       .eq("user_id", req.user.id)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({ message: "Student not found" })
//     }

//     const { data: room, error: roomError } = await supabase
//       .from("game_rooms")
//       .select("*")
//       .eq("room_code", room_code)
//       .single()

//     if (roomError || !room) {
//       return res.status(404).json({ message: "Room not found" })
//     }

//     if (room.status !== "waiting") {
//       return res.status(400).json({ message: "Game already started" })
//     }

//     const { data: existingPlayer } = await supabase
//       .from("game_room_players")
//       .select("*")
//       .eq("room_id", room.id)
//       .eq("student_id", student.id)
//       .single()

//     if (!existingPlayer) {
//       const { error: joinError } = await supabase
//         .from("game_room_players")
//         .insert([{
//           room_id: room.id,
//           student_id: student.id,
//           student_name: student.name
//         }])

//       if (joinError) return res.status(400).json(joinError)
//     }

//     res.json({
//       message: "Joined room successfully",
//       room_code: room.room_code,
//       room_id: room.id
//     })

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: "Server error" })
//   }
// }

// // ==============================
// // Room Details
// // ==============================
// exports.getRoomDetails = async (req, res) => {
//   try {
//     const { room_code } = req.params

//     const { data: room, error: roomError } = await supabase
//       .from("game_rooms")
//       .select("*")
//       .eq("room_code", room_code)
//       .single()

//     if (roomError || !room) {
//       return res.status(404).json({ message: "Room not found" })
//     }

//     const { data: players, error: playerError } = await supabase
//       .from("game_room_players")
//       .select("*")
//       .eq("room_id", room.id)
//       .order("joined_at", { ascending: true })

//     if (playerError) return res.status(400).json(playerError)

//     res.json({
//       room,
//       players
//     })

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: "Server error" })
//   }
// }

// // ==============================
// // Start Game
// // ==============================
// exports.startGame = async (req, res) => {
//   try {
//     const { room_code } = req.body

//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id")
//       .eq("user_id", req.user.id)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({ message: "Student not found" })
//     }

//     const { data: room, error: roomError } = await supabase
//       .from("game_rooms")
//       .select("*")
//       .eq("room_code", room_code)
//       .single()

//     if (roomError || !room) {
//       return res.status(404).json({ message: "Room not found" })
//     }

//     if (room.host_student_id !== student.id) {
//       return res.status(403).json({ message: "Only host can start the game" })
//     }

//     const questions = generateQuestions(room.operations, room.total_questions)

//     const { error: updateError } = await supabase
//       .from("game_rooms")
//       .update({
//         status: "active",
//         started_at: new Date().toISOString(),
//         questions
//       })
//       .eq("id", room.id)

//     if (updateError) return res.status(400).json(updateError)

//     const safeQuestions = questions.map(q => ({
//       id: q.id,
//       text: q.text
//     }))

//     res.json({
//       message: "Game started",
//       room_code,
//       questions: safeQuestions
//     })

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: "Server error" })
//   }
// }

// // ==============================
// // Submit Answer
// // ==============================
// exports.submitAnswer = async (req, res) => {
//   try {
//     const { room_code, question_index, answer } = req.body

//     const { data: student, error: studentError } = await supabase
//       .from("students")
//       .select("id, name")
//       .eq("user_id", req.user.id)
//       .single()

//     if (studentError || !student) {
//       return res.status(404).json({ message: "Student not found" })
//     }

//     const { data: room, error: roomError } = await supabase
//       .from("game_rooms")
//       .select("*")
//       .eq("room_code", room_code)
//       .single()

//     if (roomError || !room) {
//       return res.status(404).json({ message: "Room not found" })
//     }

//     const questions = room.questions || []
//     const currentQuestion = questions[question_index]

//     if (!currentQuestion) {
//       return res.status(400).json({ message: "Invalid question index" })
//     }

//     const isCorrect = Number(answer) === Number(currentQuestion.answer)

//     const { data: player, error: playerError } = await supabase
//       .from("game_room_players")
//       .select("*")
//       .eq("room_id", room.id)
//       .eq("student_id", student.id)
//       .single()

//     if (playerError || !player) {
//       return res.status(404).json({ message: "Player not found in room" })
//     }

//     let newProgress = player.progress_index
//     let newCorrect = player.correct_answers
//     let newWrong = player.wrong_answers

//     if (isCorrect) {
//       newProgress += 1
//       newCorrect += 1
//     } else {
//       newWrong += 1
//     }

//     let finishedAt = player.finished_at
//     let isWinner = false
//     let roomFinished = false

//     if (newProgress >= room.total_questions) {
//       finishedAt = new Date().toISOString()

//       // check if winner already exists
//       if (!room.winner_student_id) {
//         isWinner = true
//         roomFinished = true
//       }
//     }

//     const { error: updatePlayerError } = await supabase
//       .from("game_room_players")
//       .update({
//         progress_index: newProgress,
//         correct_answers: newCorrect,
//         wrong_answers: newWrong,
//         finished_at: finishedAt,
//         is_winner: isWinner
//       })
//       .eq("id", player.id)

//     if (updatePlayerError) return res.status(400).json(updatePlayerError)

//     if (roomFinished) {
//       await supabase
//         .from("game_rooms")
//         .update({
//           status: "finished",
//           winner_student_id: student.id,
//           finished_at: new Date().toISOString()
//         })
//         .eq("id", room.id)
//     }

//     res.json({
//       correct: isCorrect,
//       progress_index: newProgress,
//       correct_answers: newCorrect,
//       wrong_answers: newWrong,
//       finished: newProgress >= room.total_questions,
//       winner: isWinner
//     })

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: "Server error" })
//   }
// }

// // ==============================
// // Leaderboard
// // ==============================
// exports.getGameLeaderboard = async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from("game_results")
//       .select("*")
//       .order("score", { ascending: false })
//       .order("total_time_seconds", { ascending: true })
//       .limit(20)

//     if (error) return res.status(400).json(error)

//     res.json(data)

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }

const supabase = require("../config/supabase")

const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

// Difficulty tiers based on question index progress (0-100%)
const getDifficultyTier = (index, total) => {
  const progress = index / total
  if (progress < 0.3) return "easy"
  if (progress < 0.6) return "medium"
  if (progress < 0.85) return "hard"
  return "extreme"
}

const generateQuestion = (operations, index, total) => {
  const ops = operations.split(",")
  const op = ops[Math.floor(Math.random() * ops.length)]
  const tier = getDifficultyTier(index, total)

  let a, b, answer, text

  const ranges = {
    easy:    { add: [1, 20],   sub: [10, 20], mul: [1, 5],   div: [1, 5]  },
    medium:  { add: [10, 50],  sub: [20, 50], mul: [2, 9],   div: [2, 9]  },
    hard:    { add: [25, 100], sub: [30, 80], mul: [6, 12],  div: [3, 12] },
    extreme: { add: [50, 200], sub: [50, 150], mul: [9, 15], div: [6, 15] },
  }

  const r = ranges[tier]

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  if (op === "+") {
    a = rand(...r.add)
    b = rand(...r.add)
    answer = a + b
    text = `${a} + ${b}`
  }

  if (op === "-") {
    a = rand(...r.sub) + rand(...r.sub)
    b = rand(...r.sub)
    if (b > a) [a, b] = [b, a]
    answer = a - b
    text = `${a} - ${b}`
  }

  if (op === "*") {
    a = rand(...r.mul)
    b = rand(...r.mul)
    answer = a * b
    text = `${a} × ${b}`
  }

  if (op === "/") {
    b = rand(...r.div)
    answer = rand(...r.div)
    a = b * answer
    text = `${a} ÷ ${b}`
  }

  return { text, answer }
}

const generateQuestions = (operations, totalQuestions) => {
  const questions = []
  for (let i = 0; i < totalQuestions; i++) {
    questions.push({
      id: i + 1,
      ...generateQuestion(operations, i, totalQuestions)
    })
  }
  return questions
}

// ==============================
// Create Room
// ==============================
exports.createRoom = async (req, res) => {
  try {
    const { operations, total_questions } = req.body

    if (!operations || !Array.isArray(operations) || operations.length === 0) {
      return res.status(400).json({ message: "At least one operation is required" })
    }

    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, name")
      .eq("user_id", req.user.id)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ message: "Student not found" })
    }

    const roomCode = generateRoomCode()

    const { data: room, error: roomError } = await supabase
      .from("game_rooms")
      .insert([{
        room_code: roomCode,
        host_student_id: student.id,
        operations: operations.join(","),
        total_questions: total_questions || 10,
        status: "waiting"
      }])
      .select()
      .single()

    if (roomError) return res.status(400).json(roomError)

    const { error: playerError } = await supabase
      .from("game_room_players")
      .insert([{
        room_id: room.id,
        student_id: student.id,
        student_name: student.name
      }])

    if (playerError) return res.status(400).json(playerError)

    res.json({
      message: "Room created successfully",
      room_code: room.room_code,
      room_id: room.id
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ==============================
// Join Room
// ==============================
exports.joinRoom = async (req, res) => {
  try {
    const { room_code } = req.body

    if (!room_code) {
      return res.status(400).json({ message: "Room code is required" })
    }

    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, name")
      .eq("user_id", req.user.id)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ message: "Student not found" })
    }

    const { data: room, error: roomError } = await supabase
      .from("game_rooms")
      .select("*")
      .eq("room_code", room_code.toUpperCase())
      .single()

    if (roomError || !room) {
      return res.status(404).json({ message: "Room not found" })
    }

    if (room.status !== "waiting") {
      return res.status(400).json({ message: "Game already started or finished" })
    }

    const { data: existingPlayer } = await supabase
      .from("game_room_players")
      .select("*")
      .eq("room_id", room.id)
      .eq("student_id", student.id)
      .single()

    if (!existingPlayer) {
      const { error: joinError } = await supabase
        .from("game_room_players")
        .insert([{
          room_id: room.id,
          student_id: student.id,
          student_name: student.name
        }])

      if (joinError) return res.status(400).json(joinError)
    }

    res.json({
      message: "Joined room successfully",
      room_code: room.room_code,
      room_id: room.id
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ==============================
// Room Details
// ==============================
exports.getRoomDetails = async (req, res) => {
  try {
    const { room_code } = req.params

    const { data: room, error: roomError } = await supabase
      .from("game_rooms")
      .select("*")
      .eq("room_code", room_code.toUpperCase())
      .single()

    if (roomError || !room) {
      return res.status(404).json({ message: "Room not found" })
    }

    const { data: players, error: playerError } = await supabase
      .from("game_room_players")
      .select("*")
      .eq("room_id", room.id)
      .order("joined_at", { ascending: true })

    if (playerError) return res.status(400).json(playerError)

    // Never expose question answers to the client
    const safeRoom = { ...room }
    if (safeRoom.questions) {
      safeRoom.questions = safeRoom.questions.map(q => ({ id: q.id, text: q.text }))
    }

    res.json({ room: safeRoom, players })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ==============================
// Start Game
// ==============================
exports.startGame = async (req, res) => {
  try {
    const { room_code } = req.body

    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", req.user.id)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ message: "Student not found" })
    }

    const { data: room, error: roomError } = await supabase
      .from("game_rooms")
      .select("*")
      .eq("room_code", room_code)
      .single()

    if (roomError || !room) {
      return res.status(404).json({ message: "Room not found" })
    }

    if (room.host_student_id !== student.id) {
      return res.status(403).json({ message: "Only the host can start the game" })
    }

    if (room.status !== "waiting") {
      return res.status(400).json({ message: "Game already started" })
    }

    // Check minimum players
    const { data: players, error: playersError } = await supabase
      .from("game_room_players")
      .select("id")
      .eq("room_id", room.id)

    if (playersError) return res.status(400).json(playersError)

    if (players.length < 2) {
      return res.status(400).json({ message: "At least 2 players are required to start" })
    }

    const questions = generateQuestions(room.operations, room.total_questions)

    const { error: updateError } = await supabase
      .from("game_rooms")
      .update({
        status: "active",
        started_at: new Date().toISOString(),
        questions
      })
      .eq("id", room.id)

    if (updateError) return res.status(400).json(updateError)

    const safeQuestions = questions.map(q => ({ id: q.id, text: q.text }))

    res.json({
      message: "Game started",
      room_code,
      questions: safeQuestions
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ==============================
// Submit Answer
// ==============================
exports.submitAnswer = async (req, res) => {
  try {
    const { room_code, question_index, answer } = req.body

    if (answer === undefined || answer === null || answer === "") {
      return res.status(400).json({ message: "Answer is required" })
    }

    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, name")
      .eq("user_id", req.user.id)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ message: "Student not found" })
    }

    const { data: room, error: roomError } = await supabase
      .from("game_rooms")
      .select("*")
      .eq("room_code", room_code)
      .single()

    if (roomError || !room) {
      return res.status(404).json({ message: "Room not found" })
    }

    if (room.status === "finished") {
      return res.status(400).json({ message: "Game is already finished" })
    }

    if (room.status !== "active") {
      return res.status(400).json({ message: "Game is not active" })
    }

    const questions = room.questions || []
    const currentQuestion = questions[question_index]

    if (!currentQuestion) {
      return res.status(400).json({ message: "Invalid question index" })
    }

    const isCorrect = Number(answer) === Number(currentQuestion.answer)

    const { data: player, error: playerError } = await supabase
      .from("game_room_players")
      .select("*")
      .eq("room_id", room.id)
      .eq("student_id", student.id)
      .single()

    if (playerError || !player) {
      return res.status(404).json({ message: "Player not found in room" })
    }

    // Prevent duplicate submissions for already-answered questions
    if (question_index < player.progress_index) {
      return res.status(400).json({ message: "Question already answered" })
    }

    let newProgress = player.progress_index + 1  // always advance
    let newCorrect = player.correct_answers + (isCorrect ? 1 : 0)
    let newWrong = player.wrong_answers + (isCorrect ? 0 : 1)

    let finishedAt = player.finished_at
    let isWinner = false
    let roomFinished = false

    if (newProgress >= room.total_questions) {
      finishedAt = new Date().toISOString()

      if (!room.winner_student_id) {
        isWinner = true
        roomFinished = true
      }
    }

    const { error: updatePlayerError } = await supabase
      .from("game_room_players")
      .update({
        progress_index: newProgress,
        correct_answers: newCorrect,
        wrong_answers: newWrong,
        finished_at: finishedAt,
        is_winner: isWinner
      })
      .eq("id", player.id)

    if (updatePlayerError) return res.status(400).json(updatePlayerError)

    if (roomFinished) {
      await supabase
        .from("game_rooms")
        .update({
          status: "finished",
          winner_student_id: student.id,
          finished_at: new Date().toISOString()
        })
        .eq("id", room.id)
    }

    res.json({
      correct: isCorrect,
      progress_index: newProgress,
      correct_answers: newCorrect,
      wrong_answers: newWrong,
      finished: newProgress >= room.total_questions,
      winner: isWinner
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ==============================
// Leaderboard
// ==============================
exports.getGameLeaderboard = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("game_results")
      .select("*")
      .order("score", { ascending: false })
      .order("total_time_seconds", { ascending: true })
      .limit(20)

    if (error) return res.status(400).json(error)

    res.json(data)

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ==============================
// Match History (for current student)
// ==============================
exports.getMatchHistory = async (req, res) => {
  try {
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id")
      .eq("user_id", req.user.id)
      .single()

    if (studentError || !student) {
      return res.status(404).json({ message: "Student not found" })
    }

    // Step 1: get all player rows for this student
    const { data: playerRows, error: playerError } = await supabase
      .from("game_room_players")
      .select("room_id, correct_answers, wrong_answers, is_winner, finished_at, progress_index, joined_at")
      .eq("student_id", student.id)
      .order("joined_at", { ascending: false })
      .limit(20)

    if (playerError) return res.status(400).json(playerError)
    if (!playerRows || playerRows.length === 0) {
      return res.json({ history: [], wins: 0, losses: 0, total: 0 })
    }

    // Step 2: get room details for those room_ids
    const roomIds = playerRows.map(r => r.room_id)

    const { data: rooms, error: roomsError } = await supabase
      .from("game_rooms")
      .select("id, room_code, operations, total_questions, status, started_at, finished_at")
      .in("id", roomIds)

    if (roomsError) return res.status(400).json(roomsError)

    // Step 3: merge player rows with room data
    const roomMap = {}
    rooms.forEach(r => { roomMap[r.id] = r })

    const history = playerRows
      .map(row => {
        const room = roomMap[row.room_id]
        if (!room) return null
        return {
          room_code: room.room_code,
          operations: room.operations,
          total_questions: room.total_questions,
          status: room.status,
          started_at: room.started_at,
          finished_at: room.finished_at,
          correct_answers: row.correct_answers,
          wrong_answers: row.wrong_answers,
          questions_answered: row.progress_index,
          won: row.is_winner === true,
        }
      })
      .filter(row => row && (row.status === "finished" || row.status === "active"))

    const wins = history.filter(h => h.won).length
    const losses = history.filter(h => !h.won && h.status === "finished").length

    res.json({ history, wins, losses, total: history.length })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}