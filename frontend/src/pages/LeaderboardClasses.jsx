// import { useEffect, useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"
// import ClassLeaderboardCard from "../components/ClassLeaderboardCard"

// function LeaderboardClasses() {

//     const [classes, setClasses] = useState([])

//     useEffect(() => {

//         fetchClasses()

//     }, [])

//     const fetchClasses = async () => {

//         const res = await API.get("/classes")
//         // const res = await API.get("/classes_with_teacher")
//         setClasses(res.data)

//     }

//     return (

//         <AdminLayout>

//             <h1 className="text-2xl font-bold mb-6">
//                 Leaderboard
//             </h1>

//             <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">

//                 {classes.map(c => (
//                     <ClassLeaderboardCard key={c.id} data={c} />
//                 ))}

//             </div>

//         </AdminLayout>

//     )

// }

// export default LeaderboardClasses















//improved ui design
import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import BookLoader from "../components/BookLoader"
import ClassLeaderboardCard from "../components/ClassLeaderboardCard"
import { Trophy, Users } from "lucide-react"

function LeaderboardClasses() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      setLoading(true)
      const res = await API.get("/classes")
      setClasses(res.data || [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <BookLoader />

  return (
    <AdminLayout>
      <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-3 bg-amber-500 rounded-2xl text-white shadow-lg shadow-amber-500/20">
              <Trophy size={24} />
            </div>
            Class Leaderboard
          </h1>
          <p className="text-gray-500 mt-2 ml-1">Rankings based on student performance across all classes.</p>
        </div>

        {/* Classes Grid */}
        {classes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <Users className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-400 font-medium">No classes found to display leaderboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div 
                key={cls.id} 
                className="transform transition-all duration-300 hover:-translate-y-2"
              >
                <ClassLeaderboardCard data={cls} />
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default LeaderboardClasses














// ui 2
// import { useEffect, useState } from "react"
// import API from "../services/api"
// import BookLoader from "../components/BookLoader"
// import ClassLeaderboardCard from "../components/ClassLeaderboardCard"
// import {
//   Trophy,
//   Medal,
//   Sparkles
// } from "lucide-react"

// function LeaderboardClasses() {

//   const [classes, setClasses] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchClasses()
//   }, [])

//   const fetchClasses = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get("/classes")
//       setClasses(res.data)
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) return <BookLoader />

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
//         .dm-sans { font-family: 'DM Sans', sans-serif; }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(12px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-up { animation: fadeUp 0.35s ease both; }
//       `}</style>

//       <div className="p-4 md:p-6 dm-sans min-h-screen">

//         {/* ✅ Header */}
//         <div className="mb-6 md:mb-8 animate-fade-up">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
//                 <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
//                   <Trophy className="text-white" size={22} />
//                 </div>
//                 Leaderboard
//               </h1>
//               <p className="text-gray-400 text-sm mt-1 ml-14">
//                 View class-wise student rankings & performance
//               </p>
//             </div>

//             <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full ml-14 sm:ml-0 w-fit">
//               <Sparkles size={14} className="text-amber-500" />
//               <span className="text-xs font-semibold text-amber-600">
//                 {classes.length} Classes
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ✅ Stats Banner */}
//         <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl border border-amber-200 p-4 sm:p-5 mb-6 animate-fade-up" style={{ animationDelay: "0.05s" }}>
//           <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
//                 <Trophy className="text-amber-600" size={20} />
//               </div>
//               <div>
//                 <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider">Total Classes</p>
//                 <p className="text-2xl font-extrabold text-amber-700">{classes.length}</p>
//               </div>
//             </div>

//             <div className="hidden sm:block w-px h-10 bg-amber-200" />

//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
//                 <Medal className="text-yellow-600" size={20} />
//               </div>
//               <div>
//                 <p className="text-xs text-yellow-600 font-semibold uppercase tracking-wider">Rankings</p>
//                 <p className="text-sm font-semibold text-gray-600">Based on exam performance</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ✅ Classes Grid */}
//         {classes.length === 0 ? (
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center animate-fade-up">
//             <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Trophy className="text-amber-500" size={28} />
//             </div>
//             <p className="font-bold text-gray-700">No Classes Found</p>
//             <p className="text-gray-400 text-sm mt-1">Create classes to view leaderboard</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
//             {classes.map((c, idx) => (
//               <div
//                 key={c.id}
//                 className="animate-fade-up"
//                 style={{ animationDelay: `${idx * 0.06}s` }}
//               >
//                 <ClassLeaderboardCard data={c} />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ✅ Bottom Tip */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
//           <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
//             <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2">
//               <Trophy size={14} /> Rankings
//             </h3>
//             <p className="text-xs text-amber-700 mt-1.5 leading-5">
//               Students are ranked based on their total marks across all exams in the class.
//             </p>
//           </div>
//           <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
//             <h3 className="text-sm font-bold text-yellow-800 flex items-center gap-2">
//               <Medal size={14} /> Performance
//             </h3>
//             <p className="text-xs text-yellow-700 mt-1.5 leading-5">
//               Click on any class to view detailed student rankings, top performers & subject-wise analysis.
//             </p>
//           </div>
//         </div>

//       </div>
//     </>
//   )
// }

// export default LeaderboardClasses