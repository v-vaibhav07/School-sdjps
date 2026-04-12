// import { useEffect, useState } from "react"
// import API from "../services/api"

// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// function StudentTimetable() {

//   const [data, setData] = useState([])

//   const fetchData = async () => {
//     const res = await API.get("/student/timetable")
//     setData(res.data)
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   // 🔥 group by time (period)
//   const grouped = {}

//   data.forEach(item => {
//     const key = item.start_time + "-" + item.end_time

//     if (!grouped[key]) {
//       grouped[key] = {
//         time: key,
//         slots: {}
//       }
//     }

//     grouped[key].slots[item.day] = item
//   })

//   const periods = Object.values(grouped)

//   return (

//     <div className="p-4 md:p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         📚 My Timetable
//       </h1>

//       <div className="bg-white rounded-xl shadow overflow-x-auto">

//         <table className="min-w-full text-sm">

//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3">Period</th>
//               {days.map(d => (
//                 <th key={d} className="p-3">{d}</th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>

//             {periods.map((p, i) => (

//               <tr key={i} className="border-b">

//                 {/* TIME */}
//                 <td className="p-3 font-medium">
//                   P{i + 1}
//                   <br />
//                   <span className="text-xs text-gray-500">
//                     {p.time}
//                   </span>
//                 </td>

//                 {/* DAYS */}
//                 {days.map(d => {

//                   const slot = p.slots[d]

//                   return (
//                     <td key={d} className="p-3">

//                       {slot ? (
//                         <div className="bg-indigo-100 p-2 rounded-lg">

//                           <p className="font-semibold">
//                             {slot.subject}
//                           </p>

//                           <p className="text-xs">
//                             {slot.teacher_name}
//                           </p>

//                           <p className="text-xs text-gray-500">
//                             Room {slot.room}
//                           </p>

//                         </div>
//                       ) : (
//                         <div className="text-gray-300 text-center">
//                           -
//                         </div>
//                       )}

//                     </td>
//                   )
//                 })}

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   )
// }

// export default StudentTimetable








import { useEffect, useState } from "react"
import API from "../services/api"
import BookLoader from "../components/BookLoader"
import { Clock } from "lucide-react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function StudentTimetable() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await API.get("/student/timetable")
      setData(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <BookLoader />

  // 🔥 group by time (period)
  const grouped = {}

  data.forEach(item => {
    const key = item.start_time + "-" + item.end_time

    if (!grouped[key]) {
      grouped[key] = {
        time: key,
        slots: {}
      }
    }

    grouped[key].slots[item.day] = item
  })

  const periods = Object.values(grouped)

  return (

    <div className="p-4 md:p-6">

      <h1 className="text-2xl font-bold mb-6 flex items-center gap-3 text-blue-800">
        <Clock className="text-blue-700" size={28} />
        My Timetable
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Period</th>
              {days.map(d => (
                <th key={d} className="p-3">{d}</th>
              ))}
            </tr>
          </thead>

          <tbody>

            {periods.map((p, i) => (

              <tr key={i} className="border-b">

                {/* TIME */}
                <td className="p-3 font-medium">
                  P{i + 1}
                  <br />
                  <span className="text-xs text-gray-500">
                    {p.time}
                  </span>
                </td>

                {/* DAYS */}
                {days.map(d => {

                  const slot = p.slots[d]

                  return (
                    <td key={d} className="p-3">

                      {slot ? (
                        <div className="bg-indigo-100 p-2 rounded-lg">

                          <p className="font-semibold">
                            {slot.subject}
                          </p>

                          <p className="text-xs">
                            {slot.teacher_name}
                          </p>

                          <p className="text-xs text-gray-500">
                            Room {slot.room}
                          </p>

                        </div>
                      ) : (
                        <div className="text-gray-300 text-center">
                          -
                        </div>
                      )}

                    </td>
                  )
                })}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default StudentTimetable