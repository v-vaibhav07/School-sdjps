// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function ClassMonthly() {
//   const { class_id } = useParams()
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [selectedMonths, setSelectedMonths] = useState([]) // selected months filter
//   const [filterMode, setFilterMode] = useState("all") // "all" | "custom"

//   const ALL_MONTHS = [
//     "January", "February", "March", "April",
//     "May", "June", "July", "August",
//     "September", "October", "November", "December"
//   ]

//   useEffect(() => {
//     fetchData()
//   }, [class_id])

//   const fetchData = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get(`/fees/admin/class-monthly/${class_id}`)
//       setData(res.data)
//     } catch (err) {
//       setError("Failed to fetch data")
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const sendReminder = async (student_id, student_name) => {
//     try {
//       await API.post("/fees/admin/send-reminder", { student_id })
//       alert(`Reminder sent to ${student_name}`)
//     } catch (err) {
//       alert("Failed to send reminder")
//     }
//   }

//   // Get all available months from data
//   const getAvailableMonths = () => {
//     const monthSet = new Set()
//     data.forEach(student => {
//       if (student.months) {
//         Object.keys(student.months).forEach(month => monthSet.add(month))
//       }
//     })
//     return ALL_MONTHS.filter(m => monthSet.has(m))
//   }

//   const availableMonths = getAvailableMonths()

//   // Filtered months based on selection
//   const displayMonths = filterMode === "all"
//     ? availableMonths
//     : selectedMonths.filter(m => availableMonths.includes(m))

//   // Toggle single month selection
//   const toggleMonth = (month) => {
//     setSelectedMonths(prev =>
//       prev.includes(month)
//         ? prev.filter(m => m !== month)
//         : [...prev, month]
//     )
//   }

//   // Quick select options
//   const selectQuarter = (quarter) => {
//     const quarters = {
//       Q1: ["January", "February", "March"],
//       Q2: ["April", "May", "June"],
//       Q3: ["July", "August", "September"],
//       Q4: ["October", "November", "December"]
//     }
//     setSelectedMonths(quarters[quarter])
//     setFilterMode("custom")
//   }

//   const selectAllMonths = () => {
//     setFilterMode("all")
//     setSelectedMonths([])
//   }

//   // Stats
//   const getStudentPendingCount = (student) => {
//     return displayMonths.filter(m => student.months?.[m] !== "paid").length
//   }

//   const getMonthStats = (month) => {
//     const paid = data.filter(s => s.months?.[month] === "paid").length
//     const total = data.length
//     return { paid, total, pending: total - paid }
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 mt-10">
//         <p className="text-xl">{error}</p>
//         <button onClick={fetchData} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
//           Retry
//         </button>
//       </div>
//     )
//   }

//   if (data.length === 0) {
//     return (
//       <div className="text-center text-gray-500 mt-10">
//         <p className="text-xl">No students found in this class</p>
//       </div>
//     )
//   }

//   return (
//     <div className="p-6">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">
//           📅 Monthly Fees - Class {class_id}
//         </h1>
//         <div className="text-sm text-gray-500">
//           Total Students: <span className="font-bold text-gray-800">{data.length}</span>
//         </div>
//       </div>

//       {/* ✅ Month Filter Section */}
//       <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">

//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold text-gray-700">🗓️ Select Months</h2>

//           {/* Quick Filters */}
//           <div className="flex gap-2 flex-wrap">
//             <button
//               onClick={selectAllMonths}
//               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                 filterMode === "all"
//                   ? "bg-indigo-600 text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               All Months
//             </button>
//             <button
//               onClick={() => selectQuarter("Q1")}
//               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                 filterMode === "custom" && JSON.stringify(selectedMonths) === JSON.stringify(["January", "February", "March"])
//                   ? "bg-indigo-600 text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               Q1 (Jan-Mar)
//             </button>
//             <button
//               onClick={() => selectQuarter("Q2")}
//               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                 filterMode === "custom" && JSON.stringify(selectedMonths) === JSON.stringify(["April", "May", "June"])
//                   ? "bg-indigo-600 text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               Q2 (Apr-Jun)
//             </button>
//             <button
//               onClick={() => selectQuarter("Q3")}
//               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                 filterMode === "custom" && JSON.stringify(selectedMonths) === JSON.stringify(["July", "August", "September"])
//                   ? "bg-indigo-600 text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               Q3 (Jul-Sep)
//             </button>
//             <button
//               onClick={() => selectQuarter("Q4")}
//               className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                 filterMode === "custom" && JSON.stringify(selectedMonths) === JSON.stringify(["October", "November", "December"])
//                   ? "bg-indigo-600 text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               Q4 (Oct-Dec)
//             </button>
//           </div>
//         </div>

//         {/* Individual Month Buttons */}
//         <div className="flex gap-2 flex-wrap">
//           {availableMonths.map(month => {
//             const isSelected = filterMode === "all" || selectedMonths.includes(month)
//             return (
//               <button
//                 key={month}
//                 onClick={() => {
//                   if (filterMode === "all") {
//                     setFilterMode("custom")
//                     setSelectedMonths([month])
//                   } else {
//                     toggleMonth(month)
//                   }
//                 }}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                   isSelected
//                     ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-400 shadow-sm"
//                     : "bg-gray-50 text-gray-500 border-2 border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 {month.slice(0, 3)}
//               </button>
//             )
//           })}
//         </div>

//         {/* Selected info */}
//         {filterMode === "custom" && (
//           <div className="mt-3 text-sm text-gray-500">
//             Showing <span className="font-bold text-indigo-600">{displayMonths.length}</span> month(s)
//             {displayMonths.length === 0 && (
//               <span className="text-red-500 ml-2">⚠️ Please select at least one month</span>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
//           <p className="text-sm text-blue-600">Total Students</p>
//           <p className="text-2xl font-bold text-blue-800">{data.length}</p>
//         </div>
//         <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
//           <p className="text-sm text-green-600">Showing Months</p>
//           <p className="text-2xl font-bold text-green-800">{displayMonths.length}</p>
//         </div>
//         <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
//           <p className="text-sm text-emerald-600">All Clear</p>
//           <p className="text-2xl font-bold text-emerald-800">
//             {data.filter(s => getStudentPendingCount(s) === 0).length}
//           </p>
//         </div>
//         <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
//           <p className="text-sm text-red-600">Pending</p>
//           <p className="text-2xl font-bold text-red-800">
//             {data.filter(s => getStudentPendingCount(s) > 0).length}
//           </p>
//         </div>
//       </div>

//       {/* Table */}
//       {displayMonths.length > 0 ? (
//         <div className="overflow-x-auto rounded-xl shadow">
//           <table className="w-full border-collapse bg-white">
//             <thead>
//               <tr className="bg-gray-800 text-white">
//                 <th className="border border-gray-700 px-4 py-3 text-left">#</th>
//                 <th className="border border-gray-700 px-4 py-3 text-left">Student Name</th>
//                 {displayMonths.map(m => {
//                   const stats = getMonthStats(m)
//                   return (
//                     <th key={m} className="border border-gray-700 px-4 py-3 text-center min-w-[120px]">
//                       <div>{m.slice(0, 3)}</div>
//                       <div className="text-xs font-normal text-gray-300">
//                         {stats.paid}/{stats.total} paid
//                       </div>
//                     </th>
//                   )
//                 })}
//                 <th className="border border-gray-700 px-4 py-3 text-center">Status</th>
//                 <th className="border border-gray-700 px-4 py-3 text-center">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {data.map((s, index) => {
//                 const pendingCount = getStudentPendingCount(s)
//                 const isAllPaid = pendingCount === 0

//                 return (
//                   <tr
//                     key={s.student_id}
//                     className={`${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     } hover:bg-yellow-50 transition-colors`}
//                   >
//                     <td className="border px-4 py-3 text-gray-600">{index + 1}</td>
//                     <td className="border px-4 py-3 font-medium text-gray-800">{s.student_name}</td>

//                     {displayMonths.map(m => (
//                       <td key={m} className="border px-4 py-3 text-center">
//                         {s.months?.[m] === "paid" ? (
//                           <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
//                             ✅ Paid
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
//                             ❌ Pending
//                           </span>
//                         )}
//                       </td>
//                     ))}

//                     <td className="border px-4 py-3 text-center">
//                       {isAllPaid ? (
//                         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
//                           All Clear ✨
//                         </span>
//                       ) : (
//                         <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
//                           {pendingCount} pending
//                         </span>
//                       )}
//                     </td>

//                     <td className="border px-4 py-3 text-center">
//                       {!isAllPaid ? (
//                         <button
//                           onClick={() => sendReminder(s.student_id, s.student_name)}
//                           className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//                         >
//                           📩 Remind
//                         </button>
//                       ) : (
//                         <span className="text-green-600 text-sm">✅ Done</span>
//                       )}
//                     </td>
//                   </tr>
//                 )
//               })}
//             </tbody>

//             {/* Footer */}
//             <tfoot>
//               <tr className="bg-gray-100 font-bold">
//                 <td className="border px-4 py-3" colSpan={2}>Summary</td>
//                 {displayMonths.map(m => {
//                   const stats = getMonthStats(m)
//                   const pct = Math.round((stats.paid / stats.total) * 100)
//                   return (
//                     <td key={m} className="border px-4 py-3 text-center">
//                       <div className="text-green-600 text-sm">{stats.paid} Paid</div>
//                       <div className="text-red-500 text-sm">{stats.pending} Pending</div>
//                       <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
//                         <div
//                           className={`h-2 rounded-full ${
//                             pct === 100 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-500"
//                           }`}
//                           style={{ width: `${pct}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-xs text-gray-500">{pct}%</span>
//                     </td>
//                   )
//                 })}
//                 <td className="border px-4 py-3" colSpan={2}></td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       ) : (
//         <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
//           <p className="text-gray-500 text-lg">⚠️ Please select at least one month to view data</p>
//         </div>
//       )}

//     </div>
//   )
// }

// export default ClassMonthly

















import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

function ClassMonthly() {
  const { class_id } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("all")

  const ALL_MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ]

  const MONTH_LABELS = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec"
  }

  useEffect(() => {
    fetchData()
  }, [class_id])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError("")
      const res = await API.get(`/fees/admin/class-monthly/${class_id}`)
      console.log("monthly data =>", res.data)
      setData(res.data)
    } catch (err) {
      setError("Failed to fetch data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const sendReminder = async (student_id, student_name) => {
    try {
      await API.post("/fees/admin/send-reminder", { student_id })
      alert(`Reminder sent to ${student_name}`)
    } catch (err) {
      alert("Failed to send reminder")
    }
  }

  const displayMonths = selectedMonth === "all" ? ALL_MONTHS : [selectedMonth]

  const getStudentPendingCount = (student) => {
    return displayMonths.filter(month => {
      const monthData = student.months?.[month]
      return monthData?.status === "pending"
    }).length
  }

  const getStudentTotalDue = (student) => {
    return displayMonths.reduce((sum, month) => {
      const monthData = student.months?.[month]
      if (monthData?.status === "pending") {
        return sum + (Number(monthData.amount || 0) - Number(monthData.paid_amount || 0))
      }
      return sum
    }, 0)
  }

  const getMonthStats = (month) => {
    const paid = data.filter(s => s.months?.[month]?.status === "paid").length
    const pending = data.filter(s => s.months?.[month]?.status === "pending").length
    const noFee = data.filter(s => s.months?.[month]?.status === "no_fee").length
    return { paid, pending, noFee, total: data.length }
  }

  const getTotals = () => {
    let expected = 0
    let collected = 0

    data.forEach(student => {
      displayMonths.forEach(month => {
        const md = student.months?.[month]
        if (md && md.status !== "no_fee") {
          expected += Number(md.amount || 0)
          collected += Number(md.paid_amount || 0)
        }
      })
    })

    return {
      expected,
      collected,
      pending: expected - collected
    }
  }

  const totals = getTotals()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p className="text-xl">{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p className="text-xl">No students found in this class</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          📅 Monthly Fees
        </h1>
        <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
          Total Students: <span className="font-bold text-gray-800">{data.length}</span>
        </div>
      </div>

      {/* Month Selector */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">🗓️ Select Month</h2>

        {/* Mobile */}
        <div className="md:hidden">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          >
            <option value="all">All Months</option>
            {ALL_MONTHS.map(month => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedMonth("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              selectedMonth === "all"
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Months
          </button>

          {ALL_MONTHS.map(month => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                selectedMonth === month
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {MONTH_LABELS[month]}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
          <p className="text-sm text-blue-600">Students</p>
          <p className="text-3xl font-bold text-blue-800">{data.length}</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-center">
          <p className="text-sm text-purple-600">Expected</p>
          <p className="text-3xl font-bold text-purple-800">₹{totals.expected}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
          <p className="text-sm text-green-600">Collected</p>
          <p className="text-3xl font-bold text-green-800">₹{totals.collected}</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
          <p className="text-sm text-red-600">Pending</p>
          <p className="text-3xl font-bold text-red-800">₹{totals.pending}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center col-span-2 lg:col-span-1">
          <p className="text-sm text-amber-600">Due Students</p>
          <p className="text-3xl font-bold text-amber-800">
            {data.filter(s => getStudentPendingCount(s) > 0).length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow border border-gray-200">
        <table className="w-full bg-white min-w-[900px]">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-4 text-left">#</th>
              <th className="px-4 py-4 text-left">Student Name</th>

              {displayMonths.map(month => {
                const stats = getMonthStats(month)
                return (
                  <th key={month} className="px-4 py-4 text-center min-w-[160px]">
                    <div>{MONTH_LABELS[month]}</div>
                    <div className="text-xs font-normal text-gray-300">
                      {stats.paid}/{stats.paid + stats.pending} paid
                    </div>
                  </th>
                )
              })}

              <th className="px-4 py-4 text-center">Total Due</th>
              <th className="px-4 py-4 text-center">Status</th>
              <th className="px-4 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((student, index) => {
              const pendingCount = getStudentPendingCount(student)
              const totalDue = getStudentTotalDue(student)
              const isAllPaid = pendingCount === 0

              return (
                <tr
                  key={student.student_id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-indigo-50 transition`}
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4 font-medium text-gray-800">{student.student_name}</td>

                  {displayMonths.map(month => {
                    const monthData = student.months?.[month]

                    return (
                      <td key={month} className="px-4 py-4 text-center">
                        {monthData?.status === "paid" ? (
                          <div>
                            <span className="inline-flex bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                              ✅ Paid
                            </span>
                            <div className="text-xs text-green-600 mt-1">
                              ₹{monthData.paid_amount}
                            </div>
                          </div>
                        ) : monthData?.status === "pending" ? (
                          <div>
                            <span className="inline-flex bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                              ❌ Pending
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              ₹{monthData.paid_amount} / ₹{monthData.amount}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span className="inline-flex bg-gray-100 text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
                              ➖ N/A
                            </span>
                            <div className="text-xs text-gray-400 mt-1">
                              No fee
                            </div>
                          </div>
                        )}
                      </td>
                    )
                  })}

                  <td className="px-4 py-4 text-center font-bold text-red-600">
                    ₹{totalDue}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {isAllPaid ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        ✨ Clear
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                        {pendingCount} due
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {!isAllPaid ? (
                      <button
                        onClick={() => sendReminder(student.student_id, student.student_name)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        📩 Remind
                      </button>
                    ) : (
                      <span className="text-green-600 text-sm">✅ Done</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClassMonthly