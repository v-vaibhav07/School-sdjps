  import {
    LayoutDashboard,
    BookOpen,
    BarChart3,
    Calendar,
    Clock,
    Bell,
    Wallet,
    Gamepad2,
    User,
    Menu,
    X,
    MessageCircle,
    LifeBuoy,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    Sparkles
  } from "lucide-react"

  import { NavLink, useLocation } from "react-router-dom"
  import { useState, useEffect } from "react"

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
    { name: "Academics", icon: BookOpen, path: "/student/academics" },
    { name: "AI Chat", icon: Sparkles, path: "/student/ai-chat" },
    { name: "Results", icon: BarChart3, path: "/student/marks" },
    { name: "Attendance", icon: Calendar, path: "/student/attendance" },
    { name: "Timetable", icon: Clock, path: "/student/timetable" },
    { name: "Announcements", icon: Bell, path: "/student/announcements" },
    { name: "Class Chat", icon: MessageCircle, path: "/student/class-chat" },
    { name: "Fees", icon: Wallet, path: "/student/fees" },
    { name: "Calendar", icon: Calendar, path: "/student/calendar" },
    { name: "Games", icon: Gamepad2, path: "/student/games" },
    { name: "Profile", icon: User, path: "/student/profile" },
    { name: "Help & Contact", icon: LifeBuoy, path: "/student/help-contact" },
  ]

  function StudentSidebar() {
    const [open, setOpen] = useState(true)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [user, setUser] = useState(null)
    const location = useLocation()

    useEffect(() => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }, [])

    // close mobile sidebar on route change
    useEffect(() => {
      setMobileOpen(false)
    }, [location.pathname])

    const initials = user?.full_name
      ? user.full_name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "S"

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
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .nav-item:active {
            transform: scale(0.97);
          }

          .nav-item .active-bar {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%) scaleY(0);
            width: 4px;
            height: 60%;
            background: #60a5fa;
            border-radius: 0 4px 4px 0;
            transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
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
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 100;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
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

          .mobile-overlay {
            animation: fadeIn 0.25s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .sidebar-enter {
            animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2.5 bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-700/30 active:scale-95 transition-transform"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden mobile-overlay"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed md:static top-0 left-0 h-screen z-50
            bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900
            text-white flex flex-col
            transition-all duration-300 ease-in-out
            ${open ? "w-[260px]" : "w-[72px]"}
            ${mobileOpen ? "translate-x-0 sidebar-enter" : "-translate-x-full md:translate-x-0"}
            shadow-2xl shadow-black/20
          `}
        >
          {/* Header */}
          <div className="p-4 flex items-center justify-between shrink-0">
            <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${open ? "opacity-100" : "opacity-0 w-0"}`}>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
                <GraduationCap size={20} />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-wide">Student Panel</h1>
                <p className="text-[10px] text-blue-300/70 font-medium">SDJPS School</p>
              </div>
            </div>

            {/* Collapse button - desktop */}
            <button
              onClick={() => setOpen(!open)}
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors shrink-0"
            >
              {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Close button - mobile */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Divider */}
          <div className="mx-4 h-[1px] bg-white/10 mb-2 shrink-0" />

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 py-2 space-y-1">
            {menu.map((item, i) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/")

              return (
                <NavLink
                  key={i}
                  to={item.path}
                  className={`
                    nav-item group flex items-center gap-3 px-3 py-2.5 rounded-xl
                    transition-all duration-200
                    ${isActive
                      ? "active bg-gradient-to-r from-blue-600/40 to-blue-500/20 text-white"
                      : "text-blue-200/70 hover:bg-white/8 hover:text-white"
                    }
                    ${!open ? "justify-center px-0" : ""}
                  `}
                >
                  <span className="active-bar" />

                  <div className={`
                    shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200
                    ${isActive
                      ? "bg-blue-500 shadow-lg shadow-blue-500/30 text-white"
                      : "bg-white/5 text-blue-300/70 group-hover:bg-white/10 group-hover:text-white"
                    }
                  `}>
                    <Icon size={18} />
                  </div>

                  {open && (
                    <span className={`text-[13px] font-semibold tracking-wide truncate transition-all duration-200 ${isActive ? "text-white" : ""}`}>
                      {item.name}
                    </span>
                  )}

                  {/* Tooltip on collapsed */}
                  {!open && <span className="tooltip-text">{item.name}</span>}
                </NavLink>
              )
            })}
          </nav>

          {/* Divider */}
          <div className="mx-4 h-[1px] bg-white/10 mt-2 shrink-0" />

          {/* Profile */}
          <div className="p-3 shrink-0">
            <NavLink
              to="/student/profile"
              className={`
                flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                ${open ? "" : "justify-center"}
                ${location.pathname === "/student/profile"
                  ? "bg-gradient-to-r from-blue-600/30 to-indigo-600/20"
                  : "bg-white/5 hover:bg-white/10"
                }
              `}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/20 shrink-0">
                {initials}
              </div>

              {open && (
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate">
                    {user?.full_name || "Student"}
                  </p>
                  <p className="text-[11px] text-blue-300/60 font-medium capitalize">
                    {user?.role || "student"}
                  </p>
                </div>
              )}
            </NavLink>
          </div>
        </aside>
      </>
    )
  }

  export default StudentSidebar