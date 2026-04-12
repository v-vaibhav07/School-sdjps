// import { useState } from "react"
// import { Outlet } from "react-router-dom"
// import StudentSidebar from "../components/StudentSidebar"

// function StudentLayout() {

//   const [open, setOpen] = useState(true)

//   return (
//     <div className="flex h-screen overflow-hidden">

//       {/* Sidebar */}
//       <StudentSidebar open={open} setOpen={setOpen} />

//       {/* Right Side */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
//           <Outlet />
//         </div>

//       </div>

//     </div>
//   )
// }

// export default StudentLayout




import { useState } from "react"
import { Outlet } from "react-router-dom"
import StudentSidebar from "../components/StudentSidebar"
import StudentNavbar from "../components/StudentNavbar" // ✅ ADD

function StudentLayout() {

  const [open, setOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden">

      {/* SIDEBAR */}
      <StudentSidebar open={open} setOpen={setOpen} />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* ✅ NAVBAR */}
        <div className="shrink-0">
          <StudentNavbar toggleSidebar={() => setOpen(!open)} />
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default StudentLayout