// import { useEffect, useMemo, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import API from "../services/api"
// import { io } from "socket.io-client"

// const socket = io("http://localhost:5000")

// function GameBattle() {
//   const { room_code } = useParams()
//   const navigate = useNavigate()

//   const [room, setRoom] = useState(null)
//   const [players, setPlayers] = useState([])
//   const [questions, setQuestions] = useState([])
//   const [questionIndex, setQuestionIndex] = useState(0)
//   const [answer, setAnswer] = useState("")
//   const [feedback, setFeedback] = useState("")
//   const [time, setTime] = useState(0)
//   const [myProgress, setMyProgress] = useState(0)
//   const [myCorrect, setMyCorrect] = useState(0)
//   const [myWrong, setMyWrong] = useState(0)
//   const [finished, setFinished] = useState(false)

//   const fetchRoom = async () => {
//     try {
//       const res = await API.get(`/games/room/${room_code}`)
//       setRoom(res.data.room)
//       setPlayers(res.data.players || [])

//       const safeQuestions = (res.data.room?.questions || []).map((q) => ({
//         id: q.id,
//         text: q.text
//       }))
//       setQuestions(safeQuestions)

//       if (res.data.room?.status === "finished" && !finished) {
//         setFinished(true)
//       }
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   useEffect(() => {
//     fetchRoom()
//     socket.emit("join_game_room", room_code)

//     const roomInterval = setInterval(() => {
//       fetchRoom()
//     }, 1500)

//     const timer = setInterval(() => {
//       setTime((prev) => prev + 1)
//     }, 1000)

//     socket.on("game_progress_update", () => {
//       fetchRoom()
//     })

//     socket.on("game_finished", () => {
//       fetchRoom()
//       setFinished(true)
//     })

//     return () => {
//       socket.emit("leave_game_room", room_code)
//       socket.off("game_progress_update")
//       socket.off("game_finished")
//       clearInterval(roomInterval)
//       clearInterval(timer)
//     }
//   }, [room_code])

//   const currentQuestion = useMemo(() => questions[questionIndex], [questions, questionIndex])

//   const submitAnswer = async () => {
//     if (!answer.trim()) return

//     try {
//       const res = await API.post("/games/submit-answer", {
//         room_code,
//         question_index: questionIndex,
//         answer: Number(answer)
//       })

//       if (res.data.correct) {
//         setFeedback("✅ Correct")
//         setQuestionIndex((prev) => prev + 1)
//       } else {
//         setFeedback("❌ Wrong")
//       }

//       setMyProgress(res.data.progress_index)
//       setMyCorrect(res.data.correct_answers)
//       setMyWrong(res.data.wrong_answers)

//       socket.emit("game_progress_update", {
//         room_code
//       })

//       if (res.data.finished) {
//         setFinished(true)
//         socket.emit("game_finished", {
//           room_code,
//           winner: res.data.winner
//         })
//       }

//       setAnswer("")
//       setTimeout(() => setFeedback(""), 900)
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to submit answer")
//     }
//   }

//   useEffect(() => {
//     if (finished && room?.status === "finished") {
//       setTimeout(() => {
//         navigate(`/student/games/room/${room_code}`)
//       }, 4000)
//     }
//   }, [finished, room])

//   return (
//     <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Top bar */}
//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left battle */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
//                 <div>
//                   <p className="text-slate-400 text-sm">Room</p>
//                   <h1 className="text-2xl font-bold text-indigo-400">{room_code}</h1>
//                 </div>

//                 <div className="flex gap-3">
//                   <div className="bg-slate-800 rounded-2xl px-4 py-3">
//                     <p className="text-xs text-slate-400">Timer</p>
//                     <p className="text-xl font-bold">{time}s</p>
//                   </div>
//                   <div className="bg-slate-800 rounded-2xl px-4 py-3">
//                     <p className="text-xs text-slate-400">Progress</p>
//                     <p className="text-xl font-bold">
//                       {myProgress}/{room?.total_questions || 0}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {!finished ? (
//                 <>
//                   <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-center mb-6">
//                     <p className="text-sm text-indigo-100 mb-2">
//                       Question {questionIndex + 1}
//                     </p>
//                     <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide">
//                       {currentQuestion?.text || "Loading..."}
//                     </h2>
//                   </div>

//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <input
//                       type="number"
//                       value={answer}
//                       onChange={(e) => setAnswer(e.target.value)}
//                       onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
//                       placeholder="Type your answer"
//                       className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500"
//                     />
//                     <button
//                       onClick={submitAnswer}
//                       className="bg-emerald-600 hover:bg-emerald-700 px-6 py-4 rounded-2xl font-bold"
//                     >
//                       Submit
//                     </button>
//                   </div>

//                   {feedback && (
//                     <div className="mt-4 text-lg font-semibold">{feedback}</div>
//                   )}

//                   <div className="mt-6">
//                     <div className="w-full bg-slate-800 rounded-full h-4">
//                       <div
//                         className="bg-indigo-500 h-4 rounded-full transition-all"
//                         style={{
//                           width: `${room?.total_questions ? (myProgress / room.total_questions) * 100 : 0}%`
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="bg-emerald-600/20 border border-emerald-500 rounded-3xl p-8 text-center">
//                   <h2 className="text-3xl font-bold text-emerald-400 mb-2">
//                     🎉 Game Finished
//                   </h2>
//                   <p className="text-slate-300">
//                     Correct: {myCorrect} | Wrong: {myWrong} | Time: {time}s
//                   </p>
//                   <p className="text-slate-400 mt-3">
//                     Returning to room...
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right live players */}
//           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
//             <h2 className="text-2xl font-bold text-amber-400 mb-5">
//               ⚡ Live Race
//             </h2>

//             <div className="space-y-4">
//               {players.map((player) => {
//                 const percent = room?.total_questions
//                   ? (player.progress_index / room.total_questions) * 100
//                   : 0

//                 return (
//                   <div
//                     key={player.id}
//                     className="bg-slate-800 rounded-2xl p-4"
//                   >
//                     <div className="flex justify-between items-center mb-2">
//                       <p className="font-semibold text-white">
//                         {player.is_winner ? "👑 " : "🧑 "} {player.student_name}
//                       </p>
//                       <p className="text-sm text-slate-300">
//                         {player.progress_index}/{room?.total_questions || 0}
//                       </p>
//                     </div>

//                     <div className="w-full bg-slate-700 rounded-full h-3">
//                       <div
//                         className={`h-3 rounded-full ${
//                           player.is_winner ? "bg-amber-400" : "bg-indigo-500"
//                         }`}
//                         style={{ width: `${percent}%` }}
//                       ></div>
//                     </div>

//                     <div className="flex justify-between mt-2 text-xs text-slate-400">
//                       <span>✅ {player.correct_answers}</span>
//                       <span>❌ {player.wrong_answers}</span>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GameBattle













import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "../services/api"
import { io } from "socket.io-client"

const DIFFICULTY_LABELS = [
  { threshold: 0.3,  label: "Easy",    color: "text-emerald-400 bg-emerald-900/30" },
  { threshold: 0.6,  label: "Medium",  color: "text-amber-400 bg-amber-900/30"    },
  { threshold: 0.85, label: "Hard",    color: "text-orange-400 bg-orange-900/30"  },
  { threshold: 1,    label: "Extreme", color: "text-red-400 bg-red-900/30"        },
]

const getDifficultyLabel = (index, total) => {
  if (!total) return DIFFICULTY_LABELS[0]
  const progress = index / total
  return DIFFICULTY_LABELS.find(d => progress < d.threshold) || DIFFICULTY_LABELS[3]
}

function GameBattle() {
  const { room_code } = useParams()
  const navigate = useNavigate()
  const socketRef = useRef(null)

  const [room, setRoom] = useState(null)
  const [players, setPlayers] = useState([])
  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState("")
  const [feedback, setFeedback] = useState(null) // { correct: bool }
  const [time, setTime] = useState(0)
  const [myProgress, setMyProgress] = useState(0)
  const [myCorrect, setMyCorrect] = useState(0)
  const [myWrong, setMyWrong] = useState(0)
  const [finished, setFinished] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const fetchRoom = async () => {
    try {
      const res = await API.get(`/games/room/${room_code}`)
      const fetchedRoom = res.data.room
      setRoom(fetchedRoom)
      setPlayers(res.data.players || [])

      const safeQuestions = (fetchedRoom?.questions || []).map((q) => ({
        id: q.id,
        text: q.text
      }))
      setQuestions(safeQuestions)

      if (fetchedRoom?.status === "finished") {
        setFinished(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000")
    const socket = socketRef.current

    fetchRoom()
    socket.emit("join_game_room", room_code)

    const roomInterval = setInterval(fetchRoom, 2000)
    const timer = setInterval(() => setTime((prev) => prev + 1), 1000)

    socket.on("game_progress_update", fetchRoom)
    socket.on("game_finished", () => {
      fetchRoom()
      setFinished(true)
    })

    return () => {
      socket.emit("leave_game_room", room_code)
      socket.off("game_progress_update")
      socket.off("game_finished")
      socket.disconnect()
      clearInterval(roomInterval)
      clearInterval(timer)
    }
  }, [room_code])

  // Redirect after game ends
  useEffect(() => {
    if (finished && room?.status === "finished") {
      const t = setTimeout(() => navigate(`/student/games/room/${room_code}`), 4000)
      return () => clearTimeout(t)
    }
  }, [finished, room?.status])

  const currentQuestion = useMemo(() => questions[questionIndex], [questions, questionIndex])

  const difficultyInfo = useMemo(
    () => getDifficultyLabel(questionIndex, room?.total_questions),
    [questionIndex, room?.total_questions]
  )

  const submitAnswer = async () => {
    if (!answer.trim() || submitting || finished) return

    try {
      setSubmitting(true)
      const res = await API.post("/games/submit-answer", {
        room_code,
        question_index: questionIndex,
        answer: Number(answer)
      })

      const { correct, progress_index, correct_answers, wrong_answers } = res.data

      setFeedback({ correct })
      setMyProgress(progress_index)
      setMyCorrect(correct_answers)
      setMyWrong(wrong_answers)

      // Always move to next question
      setQuestionIndex((prev) => prev + 1)

      socketRef.current?.emit("game_progress_update", { room_code })

      if (res.data.finished) {
        setFinished(true)
        socketRef.current?.emit("game_finished", {
          room_code,
          winner: res.data.winner
        })
      }

      setAnswer("")
      setTimeout(() => setFeedback(null), 800)
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to submit answer")
    } finally {
      setSubmitting(false)
    }
  }

  const progressPercent = room?.total_questions
    ? Math.round((myProgress / room.total_questions) * 100)
    : 0

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left — battle area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

              {/* Top bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <div>
                  <p className="text-slate-500 text-xs">Room</p>
                  <h1 className="text-2xl font-bold text-indigo-400 tracking-widest">{room_code}</h1>
                </div>

                <div className="flex gap-3">
                  <div className="bg-slate-800 rounded-2xl px-4 py-3 text-center min-w-[72px]">
                    <p className="text-xs text-slate-500">Timer</p>
                    <p className="text-xl font-bold tabular-nums">{time}s</p>
                  </div>
                  <div className="bg-slate-800 rounded-2xl px-4 py-3 text-center min-w-[96px]">
                    <p className="text-xs text-slate-500">Progress</p>
                    <p className="text-xl font-bold tabular-nums">
                      {myProgress}/{room?.total_questions || 0}
                    </p>
                  </div>
                </div>
              </div>

              {!finished ? (
                <>
                  {/* Question card */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-center mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-indigo-200">
                        Question {questionIndex + 1} of {room?.total_questions || "?"}
                      </p>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyInfo.color}`}>
                        {difficultyInfo.label}
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide">
                      {currentQuestion?.text || "Loading..."}
                    </h2>
                  </div>

                  {/* Answer input */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <input
                      type="number"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
                      placeholder="Your answer"
                      disabled={submitting}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                    />
                    <button
                      onClick={submitAnswer}
                      disabled={submitting || !answer.trim()}
                      className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-4 rounded-2xl font-bold transition-colors"
                    >
                      {submitting ? "..." : "Submit"}
                    </button>
                  </div>

                  {/* Feedback */}
                  {feedback !== null && (
                    <div className={`text-lg font-semibold mb-4 ${feedback.correct ? "text-emerald-400" : "text-red-400"}`}>
                      {feedback.correct ? "✅ Correct!" : "❌ Wrong answer"}
                    </div>
                  )}

                  {/* Score row */}
                  <div className="flex gap-4 text-sm mb-4">
                    <span className="text-emerald-400">✅ {myCorrect} correct</span>
                    <span className="text-red-400">❌ {myWrong} wrong</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 rounded-full h-3">
                    <div
                      className="bg-indigo-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </>
              ) : (
                <div className="bg-emerald-600/20 border border-emerald-500 rounded-3xl p-8 text-center">
                  <h2 className="text-3xl font-bold text-emerald-400 mb-3">🎉 Game Finished!</h2>
                  <div className="flex justify-center gap-6 text-slate-300 mb-4">
                    <span>✅ {myCorrect} correct</span>
                    <span>❌ {myWrong} wrong</span>
                    <span>⏱ {time}s</span>
                  </div>
                  <p className="text-slate-400 text-sm">Returning to room in a moment...</p>
                </div>
              )}
            </div>
          </div>

          {/* Right — live players */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit">
            <h2 className="text-xl font-bold text-amber-400 mb-5">⚡ Live Race</h2>

            <div className="space-y-4">
              {[...players]
                .sort((a, b) => b.progress_index - a.progress_index)
                .map((player) => {
                  const percent = room?.total_questions
                    ? Math.round((player.progress_index / room.total_questions) * 100)
                    : 0

                  return (
                    <div key={player.id} className="bg-slate-800 rounded-2xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold text-white text-sm">
                          {player.is_winner ? "👑 " : "🧑 "}{player.student_name}
                        </p>
                        <p className="text-xs text-slate-400 tabular-nums">
                          {player.progress_index}/{room?.total_questions || 0}
                        </p>
                      </div>

                      <div className="w-full bg-slate-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-500 ${
                            player.is_winner ? "bg-amber-400" : "bg-indigo-500"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex justify-between mt-2 text-xs text-slate-500">
                        <span className="text-emerald-500">✅ {player.correct_answers}</span>
                        <span className="text-red-500">❌ {player.wrong_answers}</span>
                        {player.finished_at && (
                          <span className="text-amber-400">Done</span>
                        )}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default GameBattle