

// import { Link, useLocation } from "react-router-dom"
// import {
//   LayoutDashboard,
//   Users,
//   GraduationCap,
//   School,
//   ClipboardCheck,
//   FileText,
//   Bell,
//   Trophy,
//   CreditCard,
//   Bus,
//   BarChart3,
//   Settings
// } from "lucide-react"

// function Sidebar() {

//   const location = useLocation()

//   const menu = [
//     { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
//     { name: "Students", icon: Users, path: "/students" },
//     { name: "Teachers", icon: GraduationCap, path: "/teachers" },
//     { name: "Classes", icon: School, path: "/classes" },
//     { name: "Attendance", icon: ClipboardCheck, path: "/attendance" },
//     { name: "Exams", icon: FileText, path: "/exams" },
//     { name: "Announcements", icon: Bell, path: "/announcements" },
//     { name: "Leaderboard", icon: Trophy, path: "/leaderboard" },
//     { name: "Fees", icon: CreditCard, path: "/fees" },
//     { name: "Transport", icon: Bus, path: "/transport" },
//     { name: "Reports", icon: BarChart3, path: "/reports" },
//     { name: "Settings", icon: Settings, path: "/settings" }
//   ]

//   return (

//     <div className="w-64 min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col">

//       {/* Logo */}

//       <div className="p-6 border-b border-blue-800">

//         <h2 className="text-xl font-bold">
//           SDJPS
//         </h2>

//         <p className="text-sm text-blue-300">
//           School Management
//         </p>

//       </div>

//       {/* Profile */}

//       <div className="flex items-center gap-3 p-4 border-b border-blue-800">

//         <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold">
//           DR
//         </div>

//         <div>
//           <p className="text-sm font-semibold">
//             Dr. Rajesh Kumar
//           </p>
//           <p className="text-xs text-blue-300">
//             Admin
//           </p>
//         </div>

//       </div>

//       {/* Menu */}

//       <nav className="flex-1 p-4 space-y-1 overflow-y-auto">

//         {menu.map((item) => {

//           const Icon = item.icon

//           return (

//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
//               ${
//                 location.pathname === item.path
//                   ? "bg-indigo-600"
//                   : "hover:bg-blue-800"
//               }`}
//             >

//               <Icon size={18} />

//               {item.name}

//             </Link>

//           )

//         })}

//       </nav>

//       {/* Footer */}

//       <div className="p-4 border-t border-blue-800">

//         <button className="flex items-center gap-2 text-sm hover:text-gray-300">

//           🌙 Dark Mode

//         </button>

//       </div>

//     </div>

//   )

// }

// export default Sidebar



// import { Link, useLocation } from "react-router-dom"
// import {
//   LayoutDashboard,
//   Users,
//   GraduationCap,
//   School,
//   ClipboardCheck,
//   FileText,
//   Bell,
//   Trophy,
//   CreditCard,
//   Bus,
//   BarChart3,
//   Settings,
//   MessageCircle
// } from "lucide-react"

// function Sidebar({ open }) {

//   const location = useLocation()

//   const menu = [
//     { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" }, // FIX
//     { name: "Students", icon: Users, path: "/students" },
//     { name: "Teachers", icon: GraduationCap, path: "/teachers" },
//     { name: "Classes", icon: School, path: "/classes" },
//     { name: "Attendance", icon: ClipboardCheck, path: "/admin/attendance" },
//     { name: "Exams", icon: FileText, path: "/exams" },

//     // 🔔 FIXED ANNOUNCEMENT PATH
//     { name: "Announcements", icon: Bell, path: "/admin/announcements" },

//     { name: "Leaderboard", icon: Trophy, path: "/leaderboard" },
//     { name: "Fees", icon: CreditCard, path: "/fees" },
//     { name: "Transport", icon: Bus, path: "/transport" },
//     { name: "Reports", icon: BarChart3, path: "/reports" },
//     { name: "Chats", icon: MessageCircle, path: "/chats" },
//     { name: "Settings", icon: Settings, path: "/settings" }
//   ]

//   return (

//     <div
//       className={`fixed md:static top-0 left-0 h-screen w-64 bg-blue-900 text-white transform transition-transform duration-300 z-50
//       ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//       `}
//     >

//       {/* Logo */}

//       <div className="p-6 border-b border-blue-800">

//         <h2 className="text-xl font-bold">
//           SDJPS
//         </h2>

//         <p className="text-sm text-blue-300">
//           School Management
//         </p>

//       </div>

//       {/* Menu */}

//       <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-120px)]">

//         {menu.map((item) => {

//           const Icon = item.icon

//           return (

//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
//               ${
//                 location.pathname === item.path
//                   ? "bg-indigo-600"
//                   : "hover:bg-blue-800"
//               }`}
//             >

//               <Icon size={18} />

//               {item.name}

//             </Link>

//           )

//         })}

//       </nav>

//     </div>

//   )

// }

// export default Sidebar




// import { Link, useLocation } from "react-router-dom"
// import {
//   LayoutDashboard,
//   Users,
//   GraduationCap,
//   School,
//   ClipboardCheck,
//   FileText,
//   Bell,
//   Trophy,
//   CreditCard,
//   Bus,
//   BarChart3,
//   Settings,
//   MessageCircle,
//   X
// } from "lucide-react"

// function Sidebar({ open, setOpen }) {

//   const location = useLocation()

//   const menu = [
//     { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
//     { name: "Students", icon: Users, path: "/students" },
//     { name: "Teachers", icon: GraduationCap, path: "/teachers" },
//     { name: "Classes", icon: School, path: "/classes" },
//     { name: "Attendance", icon: ClipboardCheck, path: "/admin/attendance" },
//     { name: "Exams", icon: FileText, path: "/exams" },
//     { name: "Announcements", icon: Bell, path: "/admin/announcements" },
//     { name: "Leaderboard", icon: Trophy, path: "/leaderboard" },
//     { name: "Fees", icon: CreditCard, path: "/fees" },
//     { name: "Transport", icon: Bus, path: "/transport" },
//     { name: "Reports", icon: BarChart3, path: "/reports" },
//     { name: "Chats", icon: MessageCircle, path: "/chats" },
//     { name: "Settings", icon: Settings, path: "/settings" }
//   ]

//   return (

//     <div
//       className={`fixed md:static top-0 left-0 h-screen w-64 bg-blue-900 text-white transform transition-transform duration-300 z-50 flex flex-col
//       ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//       `}
//     >

//       {/* Header */}

//       <div className="p-6 border-b border-blue-800 flex justify-between items-center">

//         <div>
//           <h2 className="text-xl font-bold">
//             SDJPS
//           </h2>

//           <p className="text-sm text-blue-300">
//             School Management
//           </p>
//         </div>

//         {/* Close Button (mobile) */}
//         <button
//           className="md:hidden"
//           onClick={() => setOpen(false)}
//         >
//           <X size={22}/>
//         </button>

//       </div>


//       {/* Menu */}

//       <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

//         {menu.map((item) => {

//           const Icon = item.icon

//           return (

//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
//               ${
//                 location.pathname === item.path
//                   ? "bg-indigo-600"
//                   : "hover:bg-blue-800"
//               }`}
//             >

//               <Icon size={18} />

//               {item.name}

//             </Link>

//           )

//         })}

//       </nav>


//       {/* Admin Profile Bottom */}

//       <div className="border-t border-blue-800 p-4 flex items-center gap-3">

//         <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold">
//           V
//         </div>

//         <div>
//           <p className="font-medium">
//             Vaibhav Yadav
//           </p>

//           <p className="text-xs text-blue-300">
//             Admin
//           </p>
//         </div>

//       </div>

//     </div>

//   )

// }

// export default Sidebar







//           uper wala niche se replace h ***************************************************************************************************

















// import { Link, useLocation } from "react-router-dom"
// import {
//   LayoutDashboard,
//   Users,
//   GraduationCap,
//   School,
//   ClipboardCheck,
//   FileText,
//   Bell,
//   Trophy,
//   CreditCard,
//   Bus,
//   BarChart3,
//   Settings,
//   MessageCircle,
//   X,
//   ChevronRight
// } from "lucide-react"

// const menu = [
//   { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard", badge: null },
//   { name: "Students", icon: Users, path: "/students", badge: "54" },
//   { name: "Teachers", icon: GraduationCap, path: "/teachers", badge: "14" },
//   { name: "Classes", icon: School, path: "/classes", badge: null },
//   { name: "Attendance", icon: ClipboardCheck, path: "/admin/attendance", badge: null },
//     { name: "Create Exam", icon: FileText, path: "/admin/create-exam", badge: null },
//     { name: "Teacher Salary", icon: CreditCard, path: "/admin/teacher-salary", badge: null },
//   { name: "Announcements", icon: Bell, path: "/admin/announcements", badge: "3" },
//   { name: "Leaderboard", icon: Trophy, path: "/leaderboard", badge: null },
//   { name: "Fees", icon: CreditCard, path: "/fees", badge: null },
//   { name: "Transport", icon: Bus, path: "/transport", badge: null },
//   { name: "Reports", icon: BarChart3, path: "/reports", badge: null },
//   { name: "Chats", icon: MessageCircle, path: "/chats", badge: "5" },
// ]

// const bottomMenu = [
//   { name: "Settings", icon: Settings, path: "/settings" },
// ]

// function Sidebar({ open, setOpen }) {
//   const location = useLocation()

//   return (
//     <>
//       {/* Backdrop */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       <div
//         className={`fixed md:static top-0 left-0 h-screen w-[260px] z-50 flex flex-col
//         transform transition-transform duration-300 ease-in-out
//         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//         style={{
//           background: "linear-gradient(160deg, #0f1c3f 0%, #0d1730 60%, #09122a 100%)",
//           borderRight: "1px solid rgba(99, 140, 255, 0.1)",
//         }}
//       >
//         {/* Decorative top glow */}
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             height: "200px",
//             background: "radial-gradient(ellipse at 50% -20%, rgba(99,102,241,0.25) 0%, transparent 70%)",
//             pointerEvents: "none",
//           }}
//         />

//         {/* Header */}
//         <div className="relative px-6 py-5 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div
//               className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
//               style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)" }}
//             >
//               S
//             </div>
//             <div>
//               <h2 className="text-white font-bold text-base tracking-wide leading-none">SDJPS</h2>
//               <p className="text-xs mt-0.5" style={{ color: "rgba(148,163,184,0.7)" }}>
//                 School Management
//               </p>
//             </div>
//           </div>
//           <button
//             className="md:hidden w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
//             style={{ background: "rgba(255,255,255,0.07)", color: "rgba(148,163,184,0.8)" }}
//             onClick={() => setOpen(false)}
//           >
//             <X size={15} />
//           </button>
//         </div>

//         {/* Section Label */}
//         <div className="px-6 pb-2">
//           <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(99,102,241,0.6)" }}>
//             Main Menu
//           </p>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-2" style={{ scrollbarWidth: "none" }}>
//           {menu.map((item) => {
//             const Icon = item.icon
//             const isActive = location.pathname === item.path

//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative"
//                 style={{
//                   background: isActive
//                     ? "linear-gradient(90deg, rgba(99,102,241,0.25), rgba(99,102,241,0.1))"
//                     : "transparent",
//                   color: isActive ? "#a5b4fc" : "rgba(148,163,184,0.8)",
//                   borderLeft: isActive ? "2px solid #6366f1" : "2px solid transparent",
//                 }}
//                 onMouseEnter={e => {
//                   if (!isActive) {
//                     e.currentTarget.style.background = "rgba(255,255,255,0.05)"
//                     e.currentTarget.style.color = "rgba(255,255,255,0.9)"
//                   }
//                 }}
//                 onMouseLeave={e => {
//                   if (!isActive) {
//                     e.currentTarget.style.background = "transparent"
//                     e.currentTarget.style.color = "rgba(148,163,184,0.8)"
//                   }
//                 }}
//               >
//                 <div
//                   className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
//                   style={{
//                     background: isActive
//                       ? "rgba(99,102,241,0.3)"
//                       : "rgba(255,255,255,0.05)",
//                   }}
//                 >
//                   <Icon size={15} />
//                 </div>

//                 <span className="text-sm font-medium flex-1">{item.name}</span>

//                 {item.badge && (
//                   <span
//                     className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
//                     style={{
//                       background: isActive ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)",
//                       color: isActive ? "#c7d2fe" : "rgba(148,163,184,0.7)",
//                       minWidth: "20px",
//                       textAlign: "center",
//                     }}
//                   >
//                     {item.badge}
//                   </span>
//                 )}

//                 {isActive && (
//                   <ChevronRight size={13} style={{ color: "#6366f1", flexShrink: 0 }} />
//                 )}
//               </Link>
//             )
//           })}

//           {/* Divider */}
//           <div
//             className="my-3 mx-3"
//             style={{ height: "1px", background: "rgba(99,140,255,0.1)" }}
//           />

//           {/* Bottom Menu Items */}
//           {bottomMenu.map((item) => {
//             const Icon = item.icon
//             const isActive = location.pathname === item.path
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
//                 style={{
//                   background: isActive ? "rgba(99,102,241,0.2)" : "transparent",
//                   color: isActive ? "#a5b4fc" : "rgba(148,163,184,0.7)",
//                   borderLeft: isActive ? "2px solid #6366f1" : "2px solid transparent",
//                 }}
//                 onMouseEnter={e => {
//                   if (!isActive) {
//                     e.currentTarget.style.background = "rgba(255,255,255,0.05)"
//                     e.currentTarget.style.color = "rgba(255,255,255,0.9)"
//                   }
//                 }}
//                 onMouseLeave={e => {
//                   if (!isActive) {
//                     e.currentTarget.style.background = "transparent"
//                     e.currentTarget.style.color = "rgba(148,163,184,0.7)"
//                   }
//                 }}
//               >
//                 <div
//                   className="w-8 h-8 rounded-lg flex items-center justify-center"
//                   style={{ background: "rgba(255,255,255,0.05)" }}
//                 >
//                   <Icon size={15} />
//                 </div>
//                 <span className="text-sm font-medium">{item.name}</span>
//               </Link>
//             )
//           })}
//         </nav>

//         {/* Admin Profile */}
//         <div
//           className="mx-3 mb-4 p-3 rounded-2xl flex items-center gap-3"
//           style={{
//             background: "rgba(255,255,255,0.04)",
//             border: "1px solid rgba(99,140,255,0.12)",
//           }}
//         >
//           <div
//             className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 text-white"
//             style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)" }}
//           >
//             V
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-semibold text-white truncate">Vaibhav Yadav</p>
//             <p className="text-xs truncate" style={{ color: "rgba(148,163,184,0.6)" }}>
//               Administrator
//             </p>
//           </div>
//           <div
//             className="w-2 h-2 rounded-full flex-shrink-0"
//             style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
//           />
//         </div>
//       </div>
//     </>
//   )
// }

// export default Sidebar




































import {
  LayoutDashboard,
  Users,
  GraduationCap,
  School,
  ClipboardCheck,
  FileText,
  Bell,
  Trophy,
  CreditCard,
  Bus,
  BarChart3,
  Settings,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react"

import { NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { Calendar } from "lucide-react"

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard", badge: null },
  { name: "Students", icon: Users, path: "/students", badge: "54" },
  { name: "Teachers", icon: GraduationCap, path: "/teachers", badge: "14" },
  { name: "Classes", icon: School, path: "/classes", badge: null },
  { name: "Attendance", icon: ClipboardCheck, path: "/admin/attendance", badge: null },
  { name: "Create Exam", icon: FileText, path: "/admin/create-exam", badge: null },
  { name: "Teacher Salary", icon: CreditCard, path: "/admin/teacher-salary", badge: null },
  { name: "Announcements", icon: Bell, path: "/admin/announcements", badge: "3" },
  { name: "Leaderboard", icon: Trophy, path: "/leaderboard", badge: null },
  { name: "Fees", icon: CreditCard, path: "/fees", badge: null },
  { name: "Transport", icon: Bus, path: "/transport", badge: null },
  { name: "Reports", icon: BarChart3, path: "/reports", badge: null },
  { name: "Chats", icon: MessageCircle, path: "/chats", badge: "5" },
  { name: "Calendar", icon: Calendar, path: "/admin/calendar", badge: null },
  { name: "Settings", icon: Settings, path: "/settings", badge: null },
]

function Sidebar({ open, setOpen, mobileOpen, setMobileOpen }) {
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname, setMobileOpen])

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "A"

  return (
    <>
      <style>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 10px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.25);
        }

        .nav-item {
          position: relative;
          transition: all 0.2s ease;
        }

        .nav-item .active-bar {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 4px;
          height: 60%;
          background: #818cf8;
          border-radius: 0 4px 4px 0;
          transition: transform 0.25s ease;
        }

        .nav-item.active .active-bar {
          transform: translateY(-50%) scaleY(1);
        }

        .tooltip-text {
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%) scale(0.9);
          background: #1e293b;
          color: #fff;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: all 0.2s ease;
          z-index: 100;
        }

        .tooltip-text::before {
          content: '';
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-right-color: #1e293b;
        }

        .nav-item:hover .tooltip-text {
          opacity: 1;
          transform: translateY(-50%) scale(1);
        }
      `}</style>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen z-50
          bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900
          text-white flex flex-col
          transition-all duration-300 ease-in-out
          ${open ? "w-[260px]" : "w-[72px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          shadow-2xl shadow-black/20
        `}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between shrink-0">
          <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${open ? "opacity-100" : "opacity-0 w-0"}`}>
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wide">Admin Panel</h1>
              <p className="text-[10px] text-indigo-300/70 font-medium">SDJPS School</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="hidden md:flex w-8 h-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors shrink-0"
          >
            {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mx-4 h-[1px] bg-white/10 mb-2 shrink-0" />

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 py-2 space-y-1">
          {menu.map((item, i) => {
            const Icon = item.icon
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(item.path + "/")

            return (
              <NavLink
                key={i}
                to={item.path}
                className={`
                  nav-item group flex items-center gap-3 px-3 py-2.5 rounded-xl
                  transition-all duration-200
                  ${isActive
                    ? "active bg-gradient-to-r from-indigo-600/40 to-violet-500/20 text-white"
                    : "text-indigo-200/70 hover:bg-white/5 hover:text-white"
                  }
                  ${!open ? "justify-center px-0" : ""}
                `}
              >
                <span className="active-bar" />

                <div className={`
                  shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200
                  ${isActive
                    ? "bg-indigo-500 shadow-lg shadow-indigo-500/30 text-white"
                    : "bg-white/5 text-indigo-300/70 group-hover:bg-white/10 group-hover:text-white"
                  }
                `}>
                  <Icon size={18} />
                </div>

                {open && (
                  <div className="flex items-center justify-between flex-1 min-w-0">
                    <span className="text-[13px] font-semibold tracking-wide truncate">
                      {item.name}
                    </span>

                    {item.badge && (
                      <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 bg-white/10 text-indigo-200/80">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {!open && <span className="tooltip-text">{item.name}</span>}
              </NavLink>
            )
          })}
        </nav>

        <div className="mx-4 h-[1px] bg-white/10 mt-2 shrink-0" />

        {/* Profile */}
        <div className="p-3 shrink-0">
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 ${open ? "" : "justify-center"}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/20 shrink-0">
              {initials}
            </div>

            {open && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">
                  {user?.full_name || "Administrator"}
                </p>
                <p className="text-[11px] text-indigo-300/60 font-medium capitalize">
                  {user?.role || "admin"}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar