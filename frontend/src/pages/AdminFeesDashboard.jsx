// import { useEffect, useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"
// import { useNavigate } from "react-router-dom"

// function AdminFeesDashboard(){

//   const [stats,setStats] = useState({})
//   const [recentPayments,setRecentPayments] = useState([])
//   const [classes,setClasses] = useState([])

//   const navigate = useNavigate()
//   useEffect(()=>{
//     fetchFinance()
//     fetchRecentPayments()
//     fetchClassSummary()
//   },[])

//   const fetchFinance = async()=>{
//     const res = await API.get("/fees/admin/finance")
//     setStats(res.data)
//   }

//   const fetchRecentPayments = async()=>{
//     const res = await API.get("/fees/admin/recent-payments")
//     setRecentPayments(res.data)
//   }

//   const fetchClassSummary = async()=>{
//     const res = await API.get("/fees/admin/class-summary")
//     setClasses(res.data)
//   }

//   return(

//   <AdminLayout>

//   <h1 className="text-2xl font-bold mb-6">
//   Fees Dashboard
//   </h1>

//   {/* Top Stats */}

//   <div className="grid md:grid-cols-3 gap-6 mb-8">

//   <div className="bg-white shadow rounded-xl p-5">
//   <p className="text-gray-500">Total Collected</p>
//   <h2 className="text-2xl font-bold text-indigo-600">
//   ₹{stats.total_collected}
//   </h2>
//   </div>

//   <div className="bg-white shadow rounded-xl p-5">
//   <p className="text-gray-500">Pending Fees</p>
//   <h2 className="text-2xl font-bold text-red-500">
//   ₹{stats.pending_fees}
//   </h2>
//   </div>

//   <div className="bg-white shadow rounded-xl p-5">
//   <p className="text-gray-500">Students Due</p>
//   <h2 className="text-2xl font-bold">
//   {stats.students_due}
//   </h2>
//   </div>

//   </div>

//   {/* Recent Payments */}

//   <div className="bg-white shadow rounded-xl p-5 mb-8">

//   <h2 className="font-semibold mb-4">
//   Recent Payments
//   </h2>

//   <div className="max-h-48 overflow-y-auto">

//   {recentPayments.map((p,i)=>(
//     <div key={i} className="flex justify-between border-b py-2">

//     <span>{p.student_name}</span>

//     <span className="text-green-600 font-medium">
//     ₹{p.amount}
//     </span>

//     </div>
//   ))}

//   </div>

//   </div>

//   {/* Class Cards */}

//   <div className="grid md:grid-cols-3 gap-6">

//   {classes.map(c=>(

//   <div key={c.class_id} className="bg-white shadow rounded-xl p-5">

//   <h2 className="text-lg font-bold text-indigo-600">
//   Class {c.class_name}{c.section}
//   </h2>

//   <p className="text-sm text-gray-500">
//   Total ₹{c.total_fee}
//   </p>

//   <p className="text-sm text-green-600">
//   Paid ₹{c.paid_fee}
//   </p>

//   <p className="text-sm text-red-500">
//   Remaining ₹{c.remaining_fee}
//   </p>

// <button
// onClick={()=>navigate(`/fees/class/${c.class_id}`)}
// className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded"
// >
// View
// </button>

//   <button
//     onClick={()=>navigate(`/fees/class-monthly/${c.class_id}`)}
//     className="bg-green-600 text-white px-3 py-1 rounded"
//   >
//     Open
//   </button>

//   </div>

//   ))}

//   </div>

//   </AdminLayout>

//   )

// }

// export default AdminFeesDashboard















import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import { useNavigate } from "react-router-dom"
import BookLoader from "../components/BookLoader"
function AdminFeesDashboard() {
  const [stats, setStats] = useState({})
  const [recentPayments, setRecentPayments] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      await Promise.all([
        fetchFinance(),
        fetchRecentPayments(),
        fetchClassSummary()
      ])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchFinance = async () => {
    const res = await API.get("/fees/admin/finance")
    setStats(res.data)
  }

  const fetchRecentPayments = async () => {
    const res = await API.get("/fees/admin/recent-payments")
    setRecentPayments(res.data)
  }

  const fetchClassSummary = async () => {
    const res = await API.get("/fees/admin/class-summary")
    setClasses(res.data)
  }

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`
  }

  // if (loading) {
  //   return (
  //     <AdminLayout>
  //       <div className="flex items-center justify-center min-h-[60vh]">
  //         <div className="flex flex-col items-center gap-3">
  //           <div className="h-12 w-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
  //           <p className="text-gray-500 font-medium">Loading fees dashboard...</p>
  //         </div>
  //       </div>
  //     </AdminLayout>
  //   )
  // }
  if (loading) return <BookLoader />

  return (
    <AdminLayout>
      <div className="space-y-6 md:space-y-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Fees Dashboard
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              Track collections, pending dues, and class-wise fee performance
            </p>
          </div>

          <button
            onClick={loadDashboard}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-sm"
          >
            Refresh Dashboard
          </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-2xl p-5 md:p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-indigo-100 text-sm">Total Collected</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                  {formatCurrency(stats.total_collected)}
                </h2>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl p-5 md:p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-red-100 text-sm">Pending Fees</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                  {formatCurrency(stats.pending_fees)}
                </h2>
              </div>
              <div className="text-3xl">📉</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl p-5 md:p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-amber-50 text-sm">Students Due</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                  {stats.students_due || 0}
                </h2>
              </div>
              <div className="text-3xl">👨‍🎓</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl p-5 md:p-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Today Collection</p>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                  {formatCurrency(stats.today_collection)}
                </h2>
              </div>
              <div className="text-3xl">📅</div>
            </div>
          </div>

        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Recent Payments */}
          <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Payments
                </h2>
                <p className="text-sm text-gray-500">
                  Latest fee transactions
                </p>
              </div>
              <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
                {recentPayments.length} records
              </span>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
              {recentPayments.length > 0 ? (
                recentPayments.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {p.student_name || "Student"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {p.created_at
                          ? new Date(p.created_at).toLocaleString()
                          : "No date"}
                      </p>
                    </div>

                    <span className="shrink-0 bg-green-50 text-green-600 font-semibold px-3 py-1 rounded-full text-sm">
                      {formatCurrency(p.amount)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <div className="text-4xl mb-2">📭</div>
                  <p>No recent payments found</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Overview */}
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Collection Overview
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Collected</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(stats.total_collected)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{
                        width: `${
                          stats.total_collected && stats.pending_fees
                            ? (stats.total_collected /
                                (stats.total_collected + stats.pending_fees)) *
                              100
                            : 0
                        }%`
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-semibold text-red-500">
                      {formatCurrency(stats.pending_fees)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{
                        width: `${
                          stats.total_collected && stats.pending_fees
                            ? (stats.pending_fees /
                                (stats.total_collected + stats.pending_fees)) *
                              100
                            : 0
                        }%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/fees/reports")}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl p-4 text-left transition"
                >
                  <div className="text-xl mb-1">📊</div>
                  <p className="font-semibold">Reports</p>
                  <p className="text-xs text-indigo-500">View analytics</p>
                </button>

                <button
                  onClick={() => navigate("/fees/structure")}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl p-4 text-left transition"
                >
                  <div className="text-xl mb-1">🧾</div>
                  <p className="font-semibold">Fee Structure</p>
                  <p className="text-xs text-emerald-500">Manage classes</p>
                </button>

                <button
                  onClick={() => navigate("/fees/reminders")}
                  className="bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl p-4 text-left transition"
                >
                  <div className="text-xl mb-1">🔔</div>
                  <p className="font-semibold">Reminders</p>
                  <p className="text-xs text-amber-500">Send alerts</p>
                </button>

                <button
                  onClick={() => navigate("/fees/history")}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl p-4 text-left transition"
                >
                  <div className="text-xl mb-1">🕘</div>
                  <p className="font-semibold">History</p>
                  <p className="text-xs text-rose-500">Check payments</p>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Class Cards */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Class Fee Summary
              </h2>
              <p className="text-sm text-gray-500">
                View class-wise collection and pending amounts
              </p>
            </div>

            <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full w-fit">
              {classes.length} Classes
            </span>
          </div>

          <div className="p-5">
            {classes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                {classes.map((c) => {
                  const paidPercent =
                    c.total_fee > 0 ? Math.round((c.paid_fee / c.total_fee) * 100) : 0

                  return (
                    <div
                      key={c.class_id}
                      className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition bg-gradient-to-b from-white to-gray-50"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-indigo-700">
                            Class {c.class_name} {c.section}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Fee performance overview
                          </p>
                        </div>

                        <div className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">
                          {paidPercent}%
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Total</span>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(c.total_fee)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Paid</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(c.paid_fee)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Remaining</span>
                          <span className="font-semibold text-red-500">
                            {formatCurrency(c.remaining_fee)}
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-5">
                        <div
                          className="h-2.5 rounded-full bg-indigo-600"
                          style={{ width: `${paidPercent}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => navigate(`/fees/class/${c.class_id}`)}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-medium transition"
                        >
                          View Class
                        </button>

                        <button
                          onClick={() => navigate(`/fees/class-monthly/${c.class_id}`)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-medium transition"
                        >
                          Monthly View
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500">
                <div className="text-5xl mb-3">🏫</div>
                <p className="text-lg font-medium">No class summary found</p>
                <p className="text-sm">Fee data will appear here once available</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}

export default AdminFeesDashboard