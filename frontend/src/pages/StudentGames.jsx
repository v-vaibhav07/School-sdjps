// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import API from "../services/api"

// function StudentGames() {
//   const navigate = useNavigate()

//   const [operations, setOperations] = useState(["+", "-", "*", "/"])
//   const [totalQuestions, setTotalQuestions] = useState(10)
//   const [roomCode, setRoomCode] = useState("")
//   const [leaderboard, setLeaderboard] = useState([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     fetchLeaderboard()
//   }, [])

//   const fetchLeaderboard = async () => {
//     try {
//       const res = await API.get("/games/leaderboard")
//       setLeaderboard(res.data || [])
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const toggleOperation = (op) => {
//     setOperations((prev) =>
//       prev.includes(op) ? prev.filter((x) => x !== op) : [...prev, op]
//     )
//   }

//   const createRoom = async () => {
//     if (operations.length === 0) {
//       alert("Select at least one operation")
//       return
//     }

//     try {
//       setLoading(true)
//       const res = await API.post("/games/create-room", {
//         operations,
//         total_questions: totalQuestions
//       })

//       navigate(`/student/games/room/${res.data.room_code}`)
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to create room")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const joinRoom = async () => {
//     if (!roomCode.trim()) {
//       alert("Enter room code")
//       return
//     }

//     try {
//       setLoading(true)
//       await API.post("/games/join-room", {
//         room_code: roomCode.toUpperCase()
//       })

//       navigate(`/student/games/room/${roomCode.toUpperCase()}`)
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to join room")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
//             🧠 Math Battle Arena
//           </h1>
//           <p className="text-slate-500 mt-2">
//             Create a room, challenge friends, solve faster, win the race.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Left */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Create Room */}
//             <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
//               <h2 className="text-2xl font-bold text-indigo-700 mb-4">
//                 Create Game Room
//               </h2>

//               <div className="mb-5">
//                 <p className="text-sm font-medium text-slate-600 mb-3">
//                   Choose Operations
//                 </p>

//                 <div className="flex flex-wrap gap-3">
//                   {["+", "-", "*", "/"].map((op) => {
//                     const active = operations.includes(op)
//                     return (
//                       <button
//                         key={op}
//                         onClick={() => toggleOperation(op)}
//                         className={`px-5 py-3 rounded-2xl font-bold text-lg transition ${
//                           active
//                             ? "bg-indigo-600 text-white shadow"
//                             : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                         }`}
//                       >
//                         {op}
//                       </button>
//                     )
//                   })}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-slate-600 mb-2">
//                   Total Questions
//                 </label>
//                 <select
//                   value={totalQuestions}
//                   onChange={(e) => setTotalQuestions(Number(e.target.value))}
//                   className="w-full md:w-60 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value={5}>5 Questions</option>
//                   <option value={10}>10 Questions</option>
//                   <option value={15}>15 Questions</option>
//                   <option value={20}>20 Questions</option>
//                 </select>
//               </div>

//               <button
//                 onClick={createRoom}
//                 disabled={loading}
//                 className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
//               >
//                 {loading ? "Creating..." : "🚀 Create Room"}
//               </button>
//             </div>

//             {/* Join Room */}
//             <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
//               <h2 className="text-2xl font-bold text-emerald-700 mb-4">
//                 Join Existing Room
//               </h2>

//               <div className="flex flex-col md:flex-row gap-3">
//                 <input
//                   type="text"
//                   value={roomCode}
//                   onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
//                   placeholder="Enter Room Code"
//                   className="flex-1 border border-slate-300 rounded-2xl px-4 py-3 uppercase tracking-widest outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//                 <button
//                   onClick={joinRoom}
//                   disabled={loading}
//                   className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transition"
//                 >
//                   Join Room
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right leaderboard */}
//           <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-fit">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-bold text-amber-600">
//                 🏆 Leaderboard
//               </h2>
//               <button
//                 onClick={fetchLeaderboard}
//                 className="text-sm text-indigo-600 font-medium"
//               >
//                 Refresh
//               </button>
//             </div>

//             <div className="space-y-3 max-h-[500px] overflow-y-auto">
//               {leaderboard.length > 0 ? (
//                 leaderboard.map((player, index) => (
//                   <div
//                     key={player.id}
//                     className="flex items-center justify-between bg-slate-50 rounded-2xl px-4 py-3"
//                   >
//                     <div>
//                       <p className="font-semibold text-slate-800">
//                         #{index + 1} {player.student_name}
//                       </p>
//                       <p className="text-xs text-slate-500">
//                         Questions: {player.total_questions}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-bold text-indigo-700">{player.score}</p>
//                       <p className="text-xs text-slate-500">
//                         {player.total_time_seconds}s
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-slate-500">No leaderboard data yet</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default StudentGames














// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import API from "../services/api"
// import BookLoader from "../components/BookLoader"
// import {
//   Gamepad2,
//   Swords,
//   DoorOpen,
//   Trophy,
//   Rocket,
//   RefreshCw,
//   Hash,
//   Settings2
// } from "lucide-react"

// function StudentGames() {
//   const navigate = useNavigate()

//   const [operations, setOperations] = useState(["+", "-", "*", "/"])
//   const [totalQuestions, setTotalQuestions] = useState(10)
//   const [roomCode, setRoomCode] = useState("")
//   const [leaderboard, setLeaderboard] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [pageLoading, setPageLoading] = useState(true)

//   useEffect(() => {
//     fetchLeaderboard()
//   }, [])

//   const fetchLeaderboard = async () => {
//     try {
//       setPageLoading(true)
//       const res = await API.get("/games/leaderboard")
//       setLeaderboard(res.data || [])
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setPageLoading(false)
//     }
//   }

//   const toggleOperation = (op) => {
//     setOperations((prev) =>
//       prev.includes(op) ? prev.filter((x) => x !== op) : [...prev, op]
//     )
//   }

//   const createRoom = async () => {
//     if (operations.length === 0) {
//       alert("Select at least one operation")
//       return
//     }

//     try {
//       setLoading(true)
//       const res = await API.post("/games/create-room", {
//         operations,
//         total_questions: totalQuestions
//       })

//       navigate(`/student/games/room/${res.data.room_code}`)
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to create room")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const joinRoom = async () => {
//     if (!roomCode.trim()) {
//       alert("Enter room code")
//       return
//     }

//     try {
//       setLoading(true)
//       await API.post("/games/join-room", {
//         room_code: roomCode.toUpperCase()
//       })

//       navigate(`/student/games/room/${roomCode.toUpperCase()}`)
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to join room")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ✅ LOADER
//   if (pageLoading) return <BookLoader />

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center gap-3">
//             <Gamepad2 className="text-indigo-600" size={34} />
//             Math Battle Arena
//           </h1>
//           <p className="text-slate-500 mt-2">
//             Create a room, challenge friends, solve faster, win the race.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">

//           {/* Left */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Create Room */}
//             <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
//               <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
//                 <Swords className="text-indigo-600" size={24} />
//                 Create Game Room
//               </h2>

//               <div className="mb-5">
//                 <p className="text-sm font-medium text-slate-600 mb-3 flex items-center gap-2">
//                   <Settings2 size={14} className="text-slate-400" />
//                   Choose Operations
//                 </p>

//                 <div className="flex flex-wrap gap-3">
//                   {["+", "-", "*", "/"].map((op) => {
//                     const active = operations.includes(op)
//                     return (
//                       <button
//                         key={op}
//                         onClick={() => toggleOperation(op)}
//                         className={`px-5 py-3 rounded-2xl font-bold text-lg transition ${
//                           active
//                             ? "bg-indigo-600 text-white shadow"
//                             : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                         }`}
//                       >
//                         {op}
//                       </button>
//                     )
//                   })}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
//                   <Hash size={14} className="text-slate-400" />
//                   Total Questions
//                 </label>
//                 <select
//                   value={totalQuestions}
//                   onChange={(e) => setTotalQuestions(Number(e.target.value))}
//                   className="w-full md:w-60 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value={5}>5 Questions</option>
//                   <option value={10}>10 Questions</option>
//                   <option value={15}>15 Questions</option>
//                   <option value={20}>20 Questions</option>
//                 </select>
//               </div>

//               <button
//                 onClick={createRoom}
//                 disabled={loading}
//                 className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   "Creating..."
//                 ) : (
//                   <>
//                     <Rocket size={18} /> Create Room
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Join Room */}
//             <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
//               <h2 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
//                 <DoorOpen className="text-emerald-600" size={24} />
//                 Join Existing Room
//               </h2>

//               <div className="flex flex-col md:flex-row gap-3">
//                 <input
//                   type="text"
//                   value={roomCode}
//                   onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
//                   placeholder="Enter Room Code"
//                   className="flex-1 border border-slate-300 rounded-2xl px-4 py-3 uppercase tracking-widest outline-none focus:ring-2 focus:ring-emerald-500"
//                 />
//                 <button
//                   onClick={joinRoom}
//                   disabled={loading}
//                   className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transition flex items-center justify-center gap-2"
//                 >
//                   <DoorOpen size={18} /> Join Room
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Right Leaderboard */}
//           <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-fit">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-bold text-amber-600 flex items-center gap-2">
//                 <Trophy className="text-amber-500" size={24} />
//                 Leaderboard
//               </h2>
//               <button
//                 onClick={fetchLeaderboard}
//                 className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-700 transition"
//               >
//                 <RefreshCw size={14} /> Refresh
//               </button>
//             </div>

//             <div className="space-y-3 max-h-[500px] overflow-y-auto">
//               {leaderboard.length > 0 ? (
//                 leaderboard.map((player, index) => (
//                   <div
//                     key={player.id}
//                     className={`flex items-center justify-between rounded-2xl px-4 py-3 ${
//                       index === 0
//                         ? "bg-amber-50 border border-amber-200"
//                         : index === 1
//                         ? "bg-gray-50 border border-gray-200"
//                         : index === 2
//                         ? "bg-orange-50 border border-orange-200"
//                         : "bg-slate-50"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <span className={`text-lg font-bold ${
//                         index === 0
//                           ? "text-amber-500"
//                           : index === 1
//                           ? "text-gray-400"
//                           : index === 2
//                           ? "text-orange-400"
//                           : "text-slate-400"
//                       }`}>
//                         {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
//                       </span>
//                       <div>
//                         <p className="font-semibold text-slate-800">
//                           {player.student_name}
//                         </p>
//                         <p className="text-xs text-slate-500">
//                           Questions: {player.total_questions}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-bold text-indigo-700">{player.score}</p>
//                       <p className="text-xs text-slate-500">
//                         {player.total_time_seconds}s
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-slate-500 text-center py-6">
//                   No leaderboard data yet
//                 </p>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default StudentGames
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import BookLoader from "../components/BookLoader"
import MatchHistory from "../components/MatchHistory"
import {
  Gamepad2,
  Swords,
  DoorOpen,
  Trophy,
  Rocket,
  RefreshCw,
  Hash,
  Settings2
} from "lucide-react"

function StudentGames() {
  const navigate = useNavigate()

  const [operations, setOperations] = useState(["+", "-", "*", "/"])
  const [totalQuestions, setTotalQuestions] = useState(10)
  const [roomCode, setRoomCode] = useState("")
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      setPageLoading(true)
      const res = await API.get("/games/leaderboard")
      setLeaderboard(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setPageLoading(false)
    }
  }

  const toggleOperation = (op) => {
    setOperations((prev) =>
      prev.includes(op) ? prev.filter((x) => x !== op) : [...prev, op]
    )
  }

  const createRoom = async () => {
    if (operations.length === 0) {
      alert("Select at least one operation")
      return
    }

    try {
      setLoading(true)
      const res = await API.post("/games/create-room", {
        operations,
        total_questions: totalQuestions
      })

      navigate(`/student/games/room/${res.data.room_code}`)
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create room")
    } finally {
      setLoading(false)
    }
  }

  const joinRoom = async () => {
    if (!roomCode.trim()) {
      alert("Enter room code")
      return
    }

    try {
      setLoading(true)
      await API.post("/games/join-room", {
        room_code: roomCode.toUpperCase()
      })

      navigate(`/student/games/room/${roomCode.toUpperCase()}`)
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to join room")
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) return <BookLoader />

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center gap-3">
            <Gamepad2 className="text-indigo-600" size={34} />
            Math Battle Arena
          </h1>
          <p className="text-slate-500 mt-2">
            Create a room, challenge friends, solve faster, win the race.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Create Room */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                <Swords className="text-indigo-600" size={24} />
                Create Game Room
              </h2>

              <div className="mb-5">
                <p className="text-sm font-medium text-slate-600 mb-3 flex items-center gap-2">
                  <Settings2 size={14} className="text-slate-400" />
                  Choose Operations
                </p>

                <div className="flex flex-wrap gap-3">
                  {["+", "-", "*", "/"].map((op) => {
                    const active = operations.includes(op)
                    return (
                      <button
                        key={op}
                        onClick={() => toggleOperation(op)}
                        className={`px-5 py-3 rounded-2xl font-bold text-lg transition ${
                          active
                            ? "bg-indigo-600 text-white shadow"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {op}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
                  <Hash size={14} className="text-slate-400" />
                  Total Questions
                </label>
                <select
                  value={totalQuestions}
                  onChange={(e) => setTotalQuestions(Number(e.target.value))}
                  className="w-full md:w-60 border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                  <option value={20}>20 Questions</option>
                </select>
              </div>

              <button
                onClick={createRoom}
                disabled={loading}
                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition flex items-center justify-center gap-2"
              >
                {loading ? "Creating..." : <><Rocket size={18} /> Create Room</>}
              </button>
            </div>

            {/* Join Room */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <DoorOpen className="text-emerald-600" size={24} />
                Join Existing Room
              </h2>

              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="Enter Room Code"
                  className="flex-1 border border-slate-300 rounded-2xl px-4 py-3 uppercase tracking-widest outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={joinRoom}
                  disabled={loading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transition flex items-center justify-center gap-2"
                >
                  <DoorOpen size={18} /> Join Room
                </button>
              </div>
            </div>

            {/* ✅ Match History — sits right below Join Room */}
            <MatchHistory />

          </div>

          {/* Right — Leaderboard */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-amber-600 flex items-center gap-2">
                <Trophy className="text-amber-500" size={24} />
                Leaderboard
              </h2>
              <button
                onClick={fetchLeaderboard}
                className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-700 transition"
              >
                <RefreshCw size={14} /> Refresh
              </button>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {leaderboard.length > 0 ? (
                leaderboard.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 ${
                      index === 0
                        ? "bg-amber-50 border border-amber-200"
                        : index === 1
                        ? "bg-gray-50 border border-gray-200"
                        : index === 2
                        ? "bg-orange-50 border border-orange-200"
                        : "bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-bold ${
                        index === 0 ? "text-amber-500"
                        : index === 1 ? "text-gray-400"
                        : index === 2 ? "text-orange-400"
                        : "text-slate-400"
                      }`}>
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">{player.student_name}</p>
                        <p className="text-xs text-slate-500">Questions: {player.total_questions}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-indigo-700">{player.score}</p>
                      <p className="text-xs text-slate-500">{player.total_time_seconds}s</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-6">No leaderboard data yet</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default StudentGames