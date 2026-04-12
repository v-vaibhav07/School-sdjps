// import { useEffect, useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"
// import { useNavigate } from "react-router-dom"

// function ClassChats(){

// const [classes,setClasses] = useState([])
// const [students,setStudents] = useState({})
// const navigate = useNavigate()

// useEffect(()=>{

// loadClasses()

// },[])

// const loadClasses = async()=>{

// const res = await API.get("/chat/classes")
// setClasses(res.data)

// }

// // load students of class
// const loadStudents = async(class_id)=>{

// if(students[class_id]) return

// const res = await API.get(`/chat/students/${class_id}`)

// setStudents(prev=>({
// ...prev,
// [class_id]:res.data
// }))

// }

// // assign monitor
// const assignMonitor = async(class_id,student_id)=>{

// await API.post("/chat/assign-monitor",{
// class_id,
// student_id
// })

// loadClasses()

// }

// return(

// <AdminLayout>

// <h1 className="text-2xl font-bold mb-6">
// Class Chats
// </h1>

// <div className="grid md:grid-cols-3 gap-6">

// {classes.map((c)=>(

// <div
// key={c.id}
// className="bg-white rounded-xl shadow p-5"
// >

// <h2 className="text-lg font-bold mb-2">

// 🏫 Class {c.class_name}

// </h2>

// <p className="text-gray-600">

// 👨‍🏫 Teacher: {c.teacher}

// </p>

// <p className="text-gray-600 mb-3">

// 👨‍🎓 Monitor: {c.monitor}

// </p>

// <select
// className="w-full border p-2 rounded mb-3"
// onClick={()=>loadStudents(c.id)}
// onChange={(e)=>assignMonitor(c.id,e.target.value)}
// >

// <option>Select Monitor</option>

// {students[c.id]?.map((s)=>(

// <option key={s.id} value={s.id}>
// {s.name}
// </option>

// ))}

// </select>

// <button
// onClick={()=>navigate(`/class-chat/${c.id}`)}
// className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
// >

// Open Chat

// </button>

// </div>

// ))}

// </div>

// </AdminLayout>

// )

// }

// export default ClassChats

















// improved ui 1
// import { useState, useEffect } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"
// import BookLoader from "../components/BookLoader"
// import { useNavigate } from "react-router-dom"
// import { MessageSquare, User, GraduationCap, Crown, ChevronRight, Users } from "lucide-react"

// function ClassChats() {
//   const [classes, setClasses] = useState([])
//   const [students, setStudents] = useState({})
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()

//   useEffect(() => {
//     loadClasses()
//   }, [])

//   const loadClasses = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get("/chat/classes")
//       setClasses(res.data)
//     } catch (err) { console.log(err) }
//     finally { setLoading(false) }
//   }

//   const loadStudents = async (class_id) => {
//     if (students[class_id]) return
//     try {
//       const res = await API.get(`/chat/students/${class_id}`)
//       setStudents(prev => ({ ...prev, [class_id]: res.data }))
//     } catch (err) { console.log(err) }
//   }

//   const assignMonitor = async (class_id, student_id) => {
//     if(!student_id) return
//     await API.post("/chat/assign-monitor", { class_id, student_id })
//     loadClasses()
//   }

//   if (loading) return <BookLoader />

//   return (
//     <AdminLayout>
//       <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans">
        
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//             <div className="p-3 bg-indigo-600 rounded-2xl text-white">
//               <MessageSquare size={24} />
//             </div>
//             Class Chat Management
//           </h1>
//           <p className="text-gray-500 mt-2 ml-1">Assign monitors and manage class discussions.</p>
//         </div>

//         {/* Classes Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {classes.map((c) => (
//             <div key={c.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              
//               {/* Header Info */}
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-lg">
//                   {c.class_name}
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900">Class {c.class_name}</h2>
//                   <p className="text-sm text-gray-500 font-medium">Section {c.section}</p>
//                 </div>
//               </div>

//               {/* Details */}
//               <div className="space-y-4 mb-6">
//                 <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
//                   <GraduationCap size={18} className="text-indigo-500" />
//                   <span className="font-semibold">Teacher:</span> {c.teacher}
//                 </div>
                
//                 <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
//                   <Crown size={18} className="text-amber-500" />
//                   <span className="font-semibold">Monitor:</span> {c.monitor || "Not Assigned"}
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="space-y-3">
//                 <select
//                   onClick={() => loadStudents(c.id)}
//                   onChange={(e) => assignMonitor(c.id, e.target.value)}
//                   className="w-full bg-white border border-gray-200 p-3 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 cursor-pointer font-medium"
//                 >
//                   <option value="">Assign Monitor</option>
//                   {students[c.id]?.map((s) => (
//                     <option key={s.id} value={s.id}>{s.name}</option>
//                   ))}
//                 </select>

//                 <button
//                   onClick={() => navigate(`/class-chat/${c.id}`)}
//                   className="w-full bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
//                 >
//                   <MessageSquare size={18} /> Open Chat <ChevronRight size={18} />
//                 </button>
//               </div>

//             </div>
//           ))}
//         </div>
//       </div>
//     </AdminLayout>
//   )
// }

// export default ClassChats



















// ui 2
import { useEffect, useState } from "react"
import API from "../services/api"
import BookLoader from "../components/BookLoader"
import { useNavigate } from "react-router-dom"
import {
  MessageCircle,
  School,
  GraduationCap,
  Shield,
  ChevronDown,
  ExternalLink,
  Users,
  Crown,
  Sparkles
} from "lucide-react"

const cardColors = [
  "from-indigo-500 to-violet-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-purple-500 to-fuchsia-600",
  "from-lime-500 to-green-600",
  "from-red-500 to-rose-600",
]

function ClassChats() {

  const [classes, setClasses] = useState([])
  const [students, setStudents] = useState({})
  const [loading, setLoading] = useState(true)
  const [assigning, setAssigning] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadClasses()
  }, [])

  const loadClasses = async () => {
    try {
      setLoading(true)
      const res = await API.get("/chat/classes")
      setClasses(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const loadStudents = async (class_id) => {
    if (students[class_id]) return
    try {
      const res = await API.get(`/chat/students/${class_id}`)
      setStudents(prev => ({
        ...prev,
        [class_id]: res.data
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const assignMonitor = async (class_id, student_id) => {
    if (!student_id) return
    try {
      setAssigning(class_id)
      await API.post("/chat/assign-monitor", {
        class_id,
        student_id
      })
      loadClasses()
    } catch (err) {
      console.log(err)
    } finally {
      setAssigning(null)
    }
  }

  if (loading) return <BookLoader />

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .dm-sans { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.35s ease both; }
      `}</style>

      <div className="p-4 md:p-6 dm-sans min-h-screen">

        {/* ✅ Header */}
        <div className="mb-6 md:mb-8 animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <MessageCircle className="text-white" size={22} />
                </div>
                Class Chats
              </h1>
              <p className="text-gray-400 text-sm mt-1 ml-14">
                Manage class chatrooms, monitors & conversations
              </p>
            </div>

            <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full ml-14 sm:ml-0 w-fit">
              <Sparkles size={14} className="text-indigo-500" />
              <span className="text-xs font-semibold text-indigo-600">
                {classes.length} Chatrooms
              </span>
            </div>
          </div>
        </div>

        {/* ✅ Classes Grid */}
        {classes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center animate-fade-up">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="text-indigo-500" size={28} />
            </div>
            <p className="font-bold text-gray-700">No Class Chats</p>
            <p className="text-gray-400 text-sm mt-1">Create classes to enable chat rooms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {classes.map((c, idx) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-up group"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                {/* Top Gradient */}
                <div className={`h-1.5 bg-gradient-to-r ${cardColors[idx % cardColors.length]}`} />

                <div className="p-5">

                  {/* Class Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cardColors[idx % cardColors.length]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <School className="text-white" size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors truncate">
                        Class {c.class_name}
                      </h2>
                      <p className="text-xs text-gray-400">Chat Room</p>
                    </div>
                  </div>

                  {/* Info Rows */}
                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                      <span className="text-xs text-gray-500 flex items-center gap-1.5">
                        <GraduationCap size={13} className="text-blue-500" />
                        Teacher
                      </span>
                      <span className="text-xs font-semibold text-gray-700 truncate max-w-[120px]">
                        {c.teacher || "Not Assigned"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                      <span className="text-xs text-gray-500 flex items-center gap-1.5">
                        <Crown size={13} className="text-amber-500" />
                        Monitor
                      </span>
                      <span className={`text-xs font-semibold truncate max-w-[120px] ${
                        c.monitor ? "text-amber-600" : "text-gray-400"
                      }`}>
                        {c.monitor || "Not Assigned"}
                      </span>
                    </div>
                  </div>

                  {/* Monitor Selector */}
                  <div className="mb-4">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block flex items-center gap-1">
                      <Shield size={10} className="text-indigo-500" />
                      Assign Monitor
                    </label>
                    <div className="relative">
                      <select
                        className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 pl-9 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 text-xs font-medium transition-all bg-white appearance-none"
                        onClick={() => loadStudents(c.id)}
                        onChange={(e) => assignMonitor(c.id, e.target.value)}
                        disabled={assigning === c.id}
                      >
                        <option value="">
                          {assigning === c.id ? "Assigning..." : "Select Monitor"}
                        </option>
                        {students[c.id]?.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                      <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Open Chat Button */}
                  <button
                    onClick={() => navigate(`/class-chat/${c.id}`)}
                    className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300
                      bg-gradient-to-r ${cardColors[idx % cardColors.length]} text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0`}
                  >
                    <MessageCircle size={16} /> Open Chat
                    <ExternalLink size={13} className="opacity-70" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Bottom Tips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-sm font-bold text-indigo-800 flex items-center gap-2">
              <Crown size={14} /> Class Monitor
            </h3>
            <p className="text-xs text-indigo-700 mt-1.5 leading-5">
              Monitors can help manage the chat by pinning messages and keeping discussions on track.
            </p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-sm font-bold text-violet-800 flex items-center gap-2">
              <MessageCircle size={14} /> Real-time Chat
            </h3>
            <p className="text-xs text-violet-700 mt-1.5 leading-5">
              Class chats are real-time. Students, teachers & monitors can communicate instantly.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}

export default ClassChats