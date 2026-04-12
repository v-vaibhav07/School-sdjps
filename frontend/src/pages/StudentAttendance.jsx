// import { useEffect, useState } from "react"
// import API from "../services/api"
// import BookLoader from "../components/BookLoader"

// function StudentAttendance() {

//   const [attendance, setAttendance] = useState([])
//   const [month, setMonth] = useState("2026-03")

//   // 🔥 FETCH
//   const fetchAttendance = async () => {
//     try {
//       const res = await API.get(`/student/attendance?month=${month}`)
//       setAttendance(res.data || [])
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   useEffect(() => {
//     fetchAttendance()
//   }, [month])

//   // 📊 STATS
//   const total = attendance.length
//   const present = attendance.filter(a => a.status === "present").length
//   const absent = total - present
//   const percentage = total ? Math.round((present / total) * 100) : 0

//   // 🔥 DAYS IN MONTH
//   const daysInMonth = new Date(
//     month.split("-")[0],
//     month.split("-")[1],
//     0
//   ).getDate()

//   // 🔥 MAP DATE → STATUS
//   const attendanceMap = {}

//   attendance.forEach(a => {
//     const day = new Date(a.date).getDate()
//     attendanceMap[day] = a.status
//   })

//   return (

//     <div className="p-4 md:p-6">

//       {/* HEADER */}
//       <h1 className="text-2xl font-bold mb-4">
//         📅 My Attendance
//       </h1>

//       {/* MONTH */}
//       <input
//         type="month"
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//         className="mb-4 p-2 border rounded-lg"
//       />

//       {/* SUMMARY */}
//       <div className="bg-white p-4 rounded-xl shadow mb-6">

//         <p>✅ Present: {present}</p>
//         <p>❌ Absent: {absent}</p>
//         <p>📊 Total: {total}</p>

//         <div className="mt-2 h-3 bg-gray-200 rounded">
//           <div
//             className="h-3 bg-green-500 rounded"
//             style={{ width: `${percentage}%` }}
//           />
//         </div>

//         <p className="mt-2 font-bold">{percentage}%</p>

//       </div>

//       {/* 🔥 GRID (TEACHER STYLE) */}
//       <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">

//         <div className="flex gap-2 min-w-max">

//           {Array.from({ length: daysInMonth }, (_, i) => {
//             const day = i + 1
//             const status = attendanceMap[day]

//             return (
//               <div key={day} className="flex flex-col items-center">

//                 {/* DAY */}
//                 <span className="text-xs text-gray-500 mb-1">
//                   {day}
//                 </span>

//                 {/* BOX */}
//                 <div
//                   className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold
//                     ${
//                       status === "present"
//                         ? "bg-green-100 text-green-700"
//                         : status === "absent"
//                         ? "bg-red-100 text-red-700"
//                         : "bg-gray-100 text-gray-400"
//                     }`}
//                 >
//                   {status === "present"
//                     ? "P"
//                     : status === "absent"
//                     ? "A"
//                     : "-"}
//                 </div>

//               </div>
//             )
//           })}

//         </div>

//       </div>

//     </div>
//   )
// }

// export default StudentAttendance











import { useEffect, useState } from "react"
import API from "../services/api"
import BookLoader from "../components/BookLoader"
import {
  CheckCircle,
  XCircle,
  BarChart3,
  CalendarDays
} from "lucide-react"

function StudentAttendance() {

  const [attendance, setAttendance] = useState([])
  const [month, setMonth] = useState("2026-03")
  const [loading, setLoading] = useState(false)

  const fetchAttendance = async () => {
    try {
      setLoading(true)
      const res = await API.get(`/student/attendance?month=${month}`)
      setAttendance(res.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAttendance()
  }, [month])

  if (loading) return <BookLoader />

  const total = attendance.length
  const present = attendance.filter(a => a.status === "present").length
  const absent = total - present
  const percentage = total ? Math.round((present / total) * 100) : 0

  const [year, monthNum] = month.split("-")
  const daysInMonth = new Date(year, monthNum, 0).getDate()

  const attendanceMap = {}
  attendance.forEach(a => {
    const day = new Date(a.date).getDate()
    attendanceMap[day] = a.status
  })

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-3">
          <CalendarDays className="text-blue-700" size={32} />
          My Attendance
        </h1>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="p-2 px-4 border border-blue-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        />
      </div>

      {/* ✅ SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">

        {/* Present */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-5 flex items-center gap-4 border border-blue-100">
          <div className="bg-green-100 p-3 rounded-xl">
            <CheckCircle className="text-green-600" size={26} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Present</p>
            <p className="text-2xl font-bold text-green-600">{present}</p>
          </div>
        </div>

        {/* Absent */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-5 flex items-center gap-4 border border-blue-100">
          <div className="bg-red-100 p-3 rounded-xl">
            <XCircle className="text-red-600" size={26} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Absent</p>
            <p className="text-2xl font-bold text-red-600">{absent}</p>
          </div>
        </div>

        {/* Percentage */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-5 flex items-center gap-4 border border-blue-100">
          <div className="bg-blue-100 p-3 rounded-xl">
            <BarChart3 className="text-blue-700" size={26} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Attendance</p>
            <p className="text-2xl font-bold text-blue-700">{percentage}%</p>
          </div>
        </div>

      </div>

      {/* ✅ PROGRESS BAR (Sidebar Blue Style) */}
      <div className="bg-white/80 backdrop-blur p-4 rounded-2xl shadow-lg mb-6 border border-blue-100">
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* ✅ GRID (Same Style Just Themed) */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-4 overflow-x-auto border border-blue-100">

        <div className="flex gap-3 min-w-max">

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const status = attendanceMap[day]

            return (
              <div key={day} className="flex flex-col items-center">

                <span className="text-xs text-gray-500 mb-1">
                  {day}
                </span>

                <div
                  className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200
                    ${
                      status === "present"
                        ? "bg-green-100 text-green-700"
                        : status === "absent"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-400"
                    }`}
                >
                  {status === "present"
                    ? "P"
                    : status === "absent"
                    ? "A"
                    : "-"}
                </div>

              </div>
            )
          })}

        </div>

      </div>

    </div>
  )
}

export default StudentAttendance