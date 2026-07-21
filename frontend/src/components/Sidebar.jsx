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