import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function AdminLayout({ children }) {
  const [open, setOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        open={open}
        setOpen={setOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`
          transition-all duration-300 min-h-screen
          ${open ? "md:ml-[260px]" : "md:ml-[72px]"}
        `}
      >
        <Navbar toggleSidebar={() => setMobileOpen(true)} />

        <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout