// import { useState } from "react"
// import StudentMarksModal from "./StudentMarksModal"

// function LeaderboardTable({students}){

// const [student,setStudent] = useState(null)

// return(

// <div className="bg-white shadow rounded-xl">

// <table className="w-full">

// <thead className="bg-gray-100">

// <tr>
// <th className="p-3">Rank</th>
// <th>Student</th>
// <th>Score</th>
// <th></th>
// </tr>

// </thead>

// <tbody>

// {students.map((s,i)=>(

// <tr key={s.student_id} className="border-b">

// <td className="p-3 font-bold">
// {i+1}
// </td>

// <td>{s.full_name}</td>

// <td>{s.final_score}%</td>

// <td>

// <button
// onClick={()=>setStudent(s)}
// className="text-blue-600"
// >

// View

// </button>

// </td>

// </tr>

// ))}

// </tbody>

// </table>

// {student && (
// <StudentMarksModal
// student={student}
// close={()=>setStudent(null)}
// />
// )}

// </div>

// )

// }

// export default LeaderboardTable















// improved ui 1
import { useState } from "react"
import StudentMarksModal from "./StudentMarksModal"
import { Trophy, Medal, ChevronRight, UserCircle } from "lucide-react"

function LeaderboardTable({ students }) {
  const [student, setStudent] = useState(null)

  // Rank-based styling helper
  const getRankStyle = (index) => {
    switch (index) {
      case 0: return "bg-amber-50 border-amber-200 text-amber-700" // Gold
      case 1: return "bg-slate-50 border-slate-200 text-slate-600"   // Silver
      case 2: return "bg-orange-50 border-orange-200 text-orange-700" // Bronze
      default: return "bg-white"
    }
  }

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy className="text-amber-500" size={20} />
    if (index === 1 || index === 2) return <Medal className="text-gray-400" size={20} />
    return <span className="font-bold text-gray-400 font-mono">#{index + 1}</span>
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .dm-sans { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden dm-sans">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Final Score</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((s, i) => (
                <tr 
                  key={s.student_id} 
                  className={`transition-colors ${getRankStyle(i)}`}
                >
                  <td className="px-6 py-4 font-bold">
                    <div className="flex items-center gap-2">
                      {getRankIcon(i)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                        {s.full_name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-800">{s.full_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-indigo-600 text-lg">
                    {s.final_score}%
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setStudent(s)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
                    >
                      View Report <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {students.length === 0 && (
          <div className="p-10 text-center text-gray-400">
            No rankings available yet.
          </div>
        )}

        {student && (
          <StudentMarksModal
            student={student}
            close={() => setStudent(null)}
          />
        )}
      </div>
    </>
  )
}

export default LeaderboardTable













// ui 2
// import { useState } from "react"
// import StudentMarksModal from "./StudentMarksModal"
// import {
//   Trophy,
//   Medal,
//   Eye,
//   Crown,
//   TrendingUp,
//   Star
// } from "lucide-react"

// function LeaderboardTable({ students }) {

//   const [student, setStudent] = useState(null)

//   const getRankStyle = (rank) => {
//     if (rank === 1) return {
//       bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
//       border: "border-amber-200",
//       badge: "bg-gradient-to-r from-amber-500 to-yellow-500",
//       text: "text-amber-700",
//       icon: <Crown size={14} className="text-amber-500" />
//     }
//     if (rank === 2) return {
//       bg: "bg-gradient-to-r from-gray-50 to-slate-50",
//       border: "border-gray-200",
//       badge: "bg-gradient-to-r from-gray-400 to-slate-500",
//       text: "text-gray-600",
//       icon: <Medal size={14} className="text-gray-400" />
//     }
//     if (rank === 3) return {
//       bg: "bg-gradient-to-r from-orange-50 to-amber-50",
//       border: "border-orange-200",
//       badge: "bg-gradient-to-r from-orange-400 to-amber-500",
//       text: "text-orange-700",
//       icon: <Medal size={14} className="text-orange-400" />
//     }
//     return {
//       bg: "bg-white",
//       border: "border-gray-100",
//       badge: "bg-gray-200",
//       text: "text-gray-500",
//       icon: null
//     }
//   }

//   const getScoreColor = (score) => {
//     if (score >= 90) return "text-emerald-600"
//     if (score >= 75) return "text-blue-600"
//     if (score >= 60) return "text-amber-600"
//     return "text-red-500"
//   }

//   const getScoreBg = (score) => {
//     if (score >= 90) return "bg-emerald-50 border-emerald-200"
//     if (score >= 75) return "bg-blue-50 border-blue-200"
//     if (score >= 60) return "bg-amber-50 border-amber-200"
//     return "bg-red-50 border-red-200"
//   }

//   if (!students || students.length === 0) {
//     return (
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
//         <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <Trophy className="text-amber-500" size={28} />
//         </div>
//         <p className="font-bold text-gray-700">No Rankings Yet</p>
//         <p className="text-gray-400 text-sm mt-1">No student data available for leaderboard</p>
//       </div>
//     )
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
//         .dm-sans { font-family: 'DM Sans', sans-serif; }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-up { animation: fadeUp 0.3s ease both; }
//       `}</style>

//       <div className="dm-sans">

//         {/* ✅ Top 3 Podium - Desktop */}
//         {students.length >= 3 && (
//           <div className="hidden md:grid grid-cols-3 gap-4 mb-6">
//             {[1, 0, 2].map((idx) => {
//               const s = students[idx]
//               const rank = idx + 1
//               const style = getRankStyle(rank)
//               const initials = s.full_name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

//               return (
//                 <div
//                   key={s.student_id}
//                   className={`rounded-2xl border ${style.border} ${style.bg} p-5 text-center shadow-sm hover:shadow-md transition-all animate-fade-up ${
//                     rank === 1 ? "md:-mt-4 md:pb-7" : ""
//                   }`}
//                   style={{ animationDelay: `${idx * 0.1}s` }}
//                 >
//                   {/* Rank Badge */}
//                   <div className={`w-10 h-10 ${style.badge} rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
//                     {rank === 1 ? <Crown size={18} /> : rank}
//                   </div>

//                   {/* Avatar */}
//                   <div className={`w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-xl font-bold shadow-md ${
//                     rank === 1
//                       ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-white"
//                       : rank === 2
//                       ? "bg-gradient-to-br from-gray-300 to-slate-400 text-white"
//                       : "bg-gradient-to-br from-orange-300 to-amber-400 text-white"
//                   }`}>
//                     {initials}
//                   </div>

//                   <p className="font-bold text-gray-800 text-sm truncate">{s.full_name}</p>

//                   <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full border ${getScoreBg(s.final_score)}`}>
//                     <Star size={12} className={getScoreColor(s.final_score)} />
//                     <span className={`text-sm font-bold ${getScoreColor(s.final_score)}`}>
//                       {s.final_score}%
//                     </span>
//                   </div>

//                   <button
//                     onClick={() => setStudent(s)}
//                     className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 mx-auto transition"
//                   >
//                     <Eye size={12} /> View Details
//                   </button>
//                 </div>
//               )
//             })}
//           </div>
//         )}

//         {/* ✅ Desktop Table */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hidden md:block">

//           <div className="p-4 border-b border-gray-100 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <TrendingUp size={18} className="text-indigo-600" />
//               <h3 className="text-sm font-bold text-gray-800">
//                 {students.length >= 3 ? "Full Rankings" : "Student Rankings"}
//               </h3>
//             </div>
//             <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">
//               {students.length} students
//             </span>
//           </div>

//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-100">
//                 <th className="p-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-16">Rank</th>
//                 <th className="p-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Student</th>
//                 <th className="p-3 text-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-28">Score</th>
//                 <th className="p-3 text-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-24">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {students.map((s, i) => {
//                 const rank = i + 1
//                 const style = getRankStyle(rank)
//                 const initials = s.full_name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

//                 return (
//                   <tr
//                     key={s.student_id}
//                     className={`border-b border-gray-50 hover:bg-indigo-50/30 transition group animate-fade-up ${style.bg}`}
//                     style={{ animationDelay: `${i * 0.03}s` }}
//                   >
//                     {/* Rank */}
//                     <td className="p-3">
//                       <div className="flex items-center gap-2">
//                         {rank <= 3 ? (
//                           <div className={`w-8 h-8 ${style.badge} rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
//                             {rank === 1 ? <Crown size={14} /> : rank}
//                           </div>
//                         ) : (
//                           <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-xs font-bold">
//                             {rank}
//                           </div>
//                         )}
//                       </div>
//                     </td>

//                     {/* Student */}
//                     <td className="p-3">
//                       <div className="flex items-center gap-3">
//                         <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ${
//                           rank <= 3
//                             ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white"
//                             : "bg-indigo-100 text-indigo-600"
//                         }`}>
//                           {initials}
//                         </div>
//                         <div>
//                           <p className="font-semibold text-gray-800 text-sm">{s.full_name}</p>
//                           {style.icon && (
//                             <div className="flex items-center gap-1 mt-0.5">
//                               {style.icon}
//                               <span className={`text-[10px] font-semibold ${style.text}`}>
//                                 {rank === 1 ? "1st Place" : rank === 2 ? "2nd Place" : "3rd Place"}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </td>

//                     {/* Score */}
//                     <td className="p-3 text-center">
//                       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-bold ${getScoreBg(s.final_score)} ${getScoreColor(s.final_score)}`}>
//                         {s.final_score}%
//                       </span>
//                     </td>

//                     {/* Action */}
//                     <td className="p-3 text-center">
//                       <button
//                         onClick={() => setStudent(s)}
//                         className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
//                       >
//                         <Eye size={13} /> View
//                       </button>
//                     </td>
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* ✅ Mobile Card View */}
//         <div className="md:hidden space-y-3">
//           {students.map((s, i) => {
//             const rank = i + 1
//             const style = getRankStyle(rank)
//             const initials = s.full_name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

//             return (
//               <div
//                 key={s.student_id}
//                 className={`rounded-2xl border ${style.border} ${style.bg} p-4 shadow-sm animate-fade-up`}
//                 style={{ animationDelay: `${i * 0.05}s` }}
//               >
//                 <div className="flex items-center gap-3">

//                   {/* Rank */}
//                   {rank <= 3 ? (
//                     <div className={`w-10 h-10 ${style.badge} rounded-xl flex items-center justify-center text-white font-bold shadow-md shrink-0`}>
//                       {rank === 1 ? <Crown size={16} /> : rank}
//                     </div>
//                   ) : (
//                     <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 font-bold shrink-0">
//                       {rank}
//                     </div>
//                   )}

//                   {/* Avatar */}
//                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 shadow-sm ${
//                     rank <= 3
//                       ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white"
//                       : "bg-indigo-100 text-indigo-600"
//                   }`}>
//                     {initials}
//                   </div>

//                   {/* Info */}
//                   <div className="flex-1 min-w-0">
//                     <p className="font-bold text-gray-800 text-sm truncate">{s.full_name}</p>
//                     {style.icon && (
//                       <div className="flex items-center gap-1 mt-0.5">
//                         {style.icon}
//                         <span className={`text-[10px] font-semibold ${style.text}`}>
//                           {rank === 1 ? "1st Place" : rank === 2 ? "2nd Place" : "3rd Place"}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Score */}
//                   <div className="text-right shrink-0">
//                     <span className={`text-lg font-extrabold ${getScoreColor(s.final_score)}`}>
//                       {s.final_score}%
//                     </span>
//                   </div>
//                 </div>

//                 {/* View Button */}
//                 <button
//                   onClick={() => setStudent(s)}
//                   className="w-full mt-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
//                 >
//                   <Eye size={13} /> View Details
//                 </button>
//               </div>
//             )
//           })}
//         </div>

//         {/* ✅ Modal */}
//         {student && (
//           <StudentMarksModal
//             student={student}
//             close={() => setStudent(null)}
//           />
//         )}
//       </div>
//     </>
//   )
// }

// export default LeaderboardTable