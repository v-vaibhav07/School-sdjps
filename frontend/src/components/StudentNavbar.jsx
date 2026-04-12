import { Bell, LogOut, Moon, Sun } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function StudentNavbar({ toggleSidebar }) {

  const navigate = useNavigate()

  // ✅ DARK MODE STATE
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      document.documentElement.classList.add("dark")
      setDark(true)
    }
  }, [])

  const toggleDark = () => {
    if (dark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
    setDark(!dark)
  }

  // ✅ Date
  const today = new Date()
  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long"
  })

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 dark:text-white shadow px-4 py-3">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-blue-600 text-white rounded-lg"
        >
          ☰
        </button>

        <p className="font-semibold text-sm">{date}</p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* 🌙 DARK MODE */}
        <button
          onClick={toggleDark}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
        >
          {dark ? <Sun size={18}/> : <Moon size={18}/>}
        </button>

        {/* 🔔 Notification */}
        <div className="relative cursor-pointer">
          <Bell />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            2
          </span>
        </div>

        {/* 🚪 Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  )
}

export default StudentNavbar

















// import { Bell, LogOut, Moon, Sun, User } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import { useEffect, useState, useRef } from "react"

// function StudentNavbar() {
//   const navigate = useNavigate()

//   const [dark, setDark] = useState(false)
//   const [showLogout, setShowLogout] = useState(false)
//   const [user, setUser] = useState(null)
//   const logoutRef = useRef(null)

//   useEffect(() => {
//     const saved = localStorage.getItem("theme")
//     if (saved === "dark") {
//       document.documentElement.classList.add("dark")
//       setDark(true)
//     }

//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//   }, [])

//   useEffect(() => {
//     const handleClick = (e) => {
//       if (logoutRef.current && !logoutRef.current.contains(e.target)) {
//         setShowLogout(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClick)
//     return () => document.removeEventListener("mousedown", handleClick)
//   }, [])

//   const toggleDark = () => {
//     if (dark) {
//       document.documentElement.classList.remove("dark")
//       localStorage.setItem("theme", "light")
//     } else {
//       document.documentElement.classList.add("dark")
//       localStorage.setItem("theme", "dark")
//     }
//     setDark(!dark)
//   }

//   const today = new Date()
//   const hour = today.getHours()

//   const greetText =
//     hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : hour < 21 ? "Good Evening" : "Good Night"

//   const greetEmoji =
//     hour < 12 ? "☀️" : hour < 17 ? "🌤️" : hour < 21 ? "🌆" : "🌙"

//   const dayName = today.toLocaleDateString("en-IN", { weekday: "long" })
//   const dateStr = today.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric"
//   })

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     navigate("/")
//   }

//   const firstName = user?.full_name ? user.full_name.split(" ")[0] : "Student"

//   const initials = user?.full_name
//     ? user.full_name
//         .split(" ")
//         .map((w) => w[0])
//         .join("")
//         .slice(0, 2)
//         .toUpperCase()
//     : "S"

//   return (
//     <>
//       <style>{`
//         .sn-glass {
//           background: rgba(255, 255, 255, 0.88);
//           backdrop-filter: blur(16px);
//           -webkit-backdrop-filter: blur(16px);
//           border-bottom: 1px solid rgba(0, 0, 0, 0.06);
//         }
//         .dark .sn-glass {
//           background: rgba(15, 23, 42, 0.92);
//           border-bottom: 1px solid rgba(255, 255, 255, 0.06);
//         }

//         .sn-btn {
//           width: 38px;
//           height: 38px;
//           border-radius: 11px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border: none;
//           cursor: pointer;
//           transition: all 0.2s;
//           flex-shrink: 0;
//           position: relative;
//           background: #f1f5f9;
//           color: #475569;
//         }
//         .sn-btn:hover { background: #e2e8f0; color: #1e293b; }
//         .sn-btn:active { transform: scale(0.93); }
//         .dark .sn-btn { background: rgba(255,255,255,0.08); color: #94a3b8; }
//         .dark .sn-btn:hover { background: rgba(255,255,255,0.14); color: #e2e8f0; }

//         .sn-badge {
//           position: absolute;
//           top: -3px; right: -3px;
//           min-width: 17px; height: 17px;
//           background: linear-gradient(135deg, #ef4444, #f87171);
//           color: #fff;
//           font-size: 9px;
//           font-weight: 700;
//           border-radius: 999px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 0 4px;
//           box-shadow: 0 2px 8px rgba(239,68,68,0.4);
//           animation: snPop 0.3s ease;
//         }
//         @keyframes snPop {
//           0% { transform: scale(0); }
//           60% { transform: scale(1.2); }
//           100% { transform: scale(1); }
//         }

//         .sn-popup {
//           position: absolute;
//           top: calc(100% + 8px);
//           right: 0;
//           background: #fff;
//           border-radius: 16px;
//           padding: 14px;
//           box-shadow: 0 8px 30px rgba(0,0,0,0.12);
//           border: 1px solid #f1f5f9;
//           width: 210px;
//           z-index: 100;
//           animation: snSlide 0.2s ease;
//         }
//         .dark .sn-popup {
//           background: #1e293b;
//           border-color: rgba(255,255,255,0.08);
//           box-shadow: 0 8px 30px rgba(0,0,0,0.4);
//         }
//         @keyframes snSlide {
//           from { opacity: 0; transform: translateY(-6px) scale(0.96); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         .sn-popup-btn {
//           width: 100%;
//           padding: 9px 14px;
//           border-radius: 10px;
//           border: none;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 7px;
//           transition: all 0.15s;
//         }
//         .sn-popup-btn:active { transform: scale(0.97); }
//       `}</style>

//       <header className="sn-glass sticky top-0 z-30 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3">
//         <div className="flex items-center justify-between gap-2">

//           {/* ========== LEFT ========== */}
//           <div className="min-w-0 flex-1">

//             {/* Greeting + Name */}
//             <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white truncate leading-tight">
//               {greetText}, {firstName}! {greetEmoji}
//             </h2>

//             {/* Day + Date */}
//             <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5 truncate">
//               {dayName}, {dateStr}
//             </p>
//           </div>

//           {/* ========== RIGHT ========== */}
//           <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

//             {/* Dark mode */}
//             <button
//               onClick={toggleDark}
//               className="sn-btn"
//               title={dark ? "Light mode" : "Dark mode"}
//             >
//               {dark ? (
//                 <Sun size={17} className="text-amber-400" />
//               ) : (
//                 <Moon size={17} />
//               )}
//             </button>

//             {/* Notifications */}
//             <button
//               className="sn-btn"
//               title="Notifications"
//               onClick={() => navigate("/student/announcements")}
//             >
//               <Bell size={17} />
//               <span className="sn-badge">2</span>
//             </button>

//             {/* Profile avatar */}
//             <div className="relative" ref={logoutRef}>
//               <button
//                 onClick={() => setShowLogout(!showLogout)}
//                 className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/25 active:scale-93 transition-transform cursor-pointer"
//               >
//                 {initials}
//               </button>

//               {/* Popup */}
//               {showLogout && (
//                 <div className="sn-popup">

//                   {/* User info */}
//                   <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
//                     <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow shrink-0">
//                       {initials}
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
//                         {user?.full_name || "Student"}
//                       </p>
//                       <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium truncate">
//                         {user?.email || "student"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* View Profile */}
//                   <button
//                     onClick={() => {
//                       setShowLogout(false)
//                       navigate("/student/profile")
//                     }}
//                     className="sn-popup-btn bg-gray-100 dark:bg-white/8 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/12 mb-2"
//                   >
//                     <User size={14} />
//                     View Profile
//                   </button>

//                   {/* Logout */}
//                   <button
//                     onClick={handleLogout}
//                     className="sn-popup-btn bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20"
//                   >
//                     <LogOut size={14} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   )
// }

// export default StudentNavbar

