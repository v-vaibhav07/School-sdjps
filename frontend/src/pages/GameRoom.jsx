// import { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import API from "../services/api"
// import { io } from "socket.io-client"

// const socket = io("http://localhost:5000")

// function GameRoom() {
//   const { room_code } = useParams()
//   const navigate = useNavigate()

//   const [room, setRoom] = useState(null)
//   const [players, setPlayers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [starting, setStarting] = useState(false)

//   const fetchRoom = async () => {
//     try {
//       const res = await API.get(`/games/room/${room_code}`)
//       setRoom(res.data.room)
//       setPlayers(res.data.players || [])

//       if (res.data.room?.status === "active") {
//         navigate(`/student/games/battle/${room_code}`)
//       }
//     } catch (err) {
//       console.error(err)
//       alert(err?.response?.data?.message || "Failed to load room")
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchRoom()

//     socket.emit("join_game_room", room_code)

//     const interval = setInterval(() => {
//       fetchRoom()
//     }, 2000)

//     socket.on("game_started", (data) => {
//       if (data.room_code === room_code) {
//         navigate(`/student/games/battle/${room_code}`)
//       }
//     })

//     return () => {
//       socket.emit("leave_game_room", room_code)
//       socket.off("game_started")
//       clearInterval(interval)
//     }
//   }, [room_code])

//   const startGame = async () => {
//     try {
//       setStarting(true)
//       const res = await API.post("/games/start", {
//         room_code
//       })

//       socket.emit("game_started", {
//         room_code,
//         questions: res.data.questions
//       })

//       navigate(`/student/games/battle/${room_code}`)
//     } catch (err) {
//       alert(err?.response?.data?.message || "Failed to start game")
//     } finally {
//       setStarting(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-slate-600">
//         Loading room...
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="max-w-5xl mx-auto">
//         <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-indigo-700">
//                 🎮 Game Room
//               </h1>
//               <p className="text-slate-500 mt-2">
//                 Share this code with friends to join
//               </p>
//             </div>

//             <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-5 py-4 text-center">
//               <p className="text-xs text-slate-500">Room Code</p>
//               <p className="text-2xl font-extrabold tracking-widest text-indigo-700">
//                 {room?.room_code}
//               </p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6 mb-8">
//             <div className="bg-slate-50 rounded-2xl p-5">
//               <p className="text-sm text-slate-500 mb-2">Status</p>
//               <p className="text-lg font-semibold text-slate-800 capitalize">
//                 {room?.status}
//               </p>
//             </div>

//             <div className="bg-slate-50 rounded-2xl p-5">
//               <p className="text-sm text-slate-500 mb-2">Settings</p>
//               <p className="text-lg font-semibold text-slate-800">
//                 {room?.operations} • {room?.total_questions} questions
//               </p>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h2 className="text-xl font-bold text-slate-800 mb-4">
//               Players Joined ({players.length})
//             </h2>

//             <div className="grid sm:grid-cols-2 gap-4">
//               {players.map((player, index) => (
//                 <div
//                   key={player.id}
//                   className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4"
//                 >
//                   <p className="font-semibold text-slate-800">
//                     {index === 0 ? "👑 " : "🧑 "} {player.student_name}
//                   </p>
//                   <p className="text-xs text-slate-500 mt-1">
//                     Joined: {new Date(player.joined_at).toLocaleTimeString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={fetchRoom}
//               className="border border-slate-300 text-slate-700 px-5 py-3 rounded-2xl font-semibold"
//             >
//               Refresh Players
//             </button>

//             <button
//               onClick={startGame}
//               disabled={starting || players.length < 2}
//               className={`px-5 py-3 rounded-2xl font-semibold text-white ${
//                 players.length < 2
//                   ? "bg-slate-400 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700"
//               }`}
//             >
//               {starting ? "Starting..." : "🚀 Start Game"}
//             </button>
//           </div>

//           {players.length < 2 && (
//             <p className="text-sm text-amber-600 mt-4">
//               At least 2 players are required to start the game.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GameRoom










import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import API from "../services/api"
import { io } from "socket.io-client"

function GameRoom() {
  const { room_code } = useParams()
  const navigate = useNavigate()
  const socketRef = useRef(null)

  const [room, setRoom] = useState(null)
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [starting, setStarting] = useState(false)

  const fetchRoom = async () => {
    try {
      const res = await API.get(`/games/room/${room_code}`)
      setRoom(res.data.room)
      setPlayers(res.data.players || [])

      if (res.data.room?.status === "active") {
        navigate(`/student/games/battle/${room_code}`)
      }
    } catch (err) {
      console.error(err)
      alert(err?.response?.data?.message || "Failed to load room")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000")
    const socket = socketRef.current

    fetchRoom()
    socket.emit("join_game_room", room_code)

    const interval = setInterval(fetchRoom, 2000)

    socket.on("game_started", (data) => {
      if (data.room_code === room_code) {
        navigate(`/student/games/battle/${room_code}`)
      }
    })

    return () => {
      socket.emit("leave_game_room", room_code)
      socket.off("game_started")
      socket.disconnect()
      clearInterval(interval)
    }
  }, [room_code])

  const startGame = async () => {
    try {
      setStarting(true)
      const res = await API.post("/games/start", { room_code })

      socketRef.current?.emit("game_started", {
        room_code,
        questions: res.data.questions
      })

      navigate(`/student/games/battle/${room_code}`)
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to start game")
    } finally {
      setStarting(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(room?.room_code || "")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading room...
      </div>
    )
  }

  const canStart = players.length >= 2

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700">🎮 Game Room</h1>
              <p className="text-slate-500 mt-1">Share the code below to invite friends</p>
            </div>

            <button
              onClick={copyCode}
              className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-2xl px-5 py-4 text-center transition-colors"
            >
              <p className="text-xs text-slate-500">Room Code (click to copy)</p>
              <p className="text-2xl font-extrabold tracking-widest text-indigo-700">
                {room?.room_code}
              </p>
            </button>
          </div>

          {/* Room info */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 rounded-2xl p-5">
              <p className="text-xs text-slate-500 mb-1">Status</p>
              <p className="text-base font-semibold text-slate-800 capitalize">{room?.status}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-5">
              <p className="text-xs text-slate-500 mb-1">Operations</p>
              <p className="text-base font-semibold text-slate-800">{room?.operations}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-5">
              <p className="text-xs text-slate-500 mb-1">Questions</p>
              <p className="text-base font-semibold text-slate-800">{room?.total_questions} questions</p>
            </div>
          </div>

          {/* Players */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">
                Players ({players.length})
              </h2>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                canStart
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {canStart ? "Ready to start" : `Need ${2 - players.length} more player${2 - players.length !== 1 ? "s" : ""}`}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4"
                >
                  <span className="text-lg">{index === 0 ? "👑" : "🧑"}</span>
                  <div>
                    <p className="font-semibold text-slate-800">{player.student_name}</p>
                    <p className="text-xs text-slate-400">
                      Joined {new Date(player.joined_at).toLocaleTimeString()}
                    </p>
                  </div>
                  {index === 0 && (
                    <span className="ml-auto text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                      Host
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty legend */}
          <div className="bg-slate-50 rounded-2xl p-4 mb-6">
            <p className="text-xs font-semibold text-slate-500 mb-2">DIFFICULTY PROGRESSION</p>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "Easy", range: "Q1–30%", color: "text-emerald-700 bg-emerald-100" },
                { label: "Medium", range: "30–60%", color: "text-amber-700 bg-amber-100" },
                { label: "Hard", range: "60–85%", color: "text-orange-700 bg-orange-100" },
                { label: "Extreme", range: "85–100%", color: "text-red-700 bg-red-100" },
              ].map(d => (
                <span key={d.label} className={`text-xs px-3 py-1 rounded-full font-medium ${d.color}`}>
                  {d.label} <span className="opacity-60">({d.range})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={fetchRoom}
              className="border border-slate-300 text-slate-700 px-5 py-3 rounded-2xl font-semibold hover:bg-slate-50 transition-colors"
            >
              Refresh
            </button>

            <button
              onClick={startGame}
              disabled={starting || !canStart}
              className={`px-6 py-3 rounded-2xl font-semibold text-white transition-colors ${
                !canStart
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {starting ? "Starting..." : "🚀 Start Game"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default GameRoom