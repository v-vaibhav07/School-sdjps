// import { useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function StudentAnnouncements(){

//   const [message,setMessage] = useState("")

//   const sendAnnouncement = async () => {

//     await API.post("/announcements",{
//       message,
//       target_type:"students"
//     })

//     alert("Announcement sent")
//     setMessage("")
//   }

//   return(

//     <AdminLayout>

//       <div className="p-6 max-w-xl space-y-4">

//         <h1 className="text-2xl font-bold">
//           Student Announcement
//         </h1>

//         <textarea
//           className="border w-full p-3 rounded"
//           rows="4"
//           placeholder="Write announcement..."
//           value={message}
//           onChange={(e)=>setMessage(e.target.value)}
//         />

//         <button
//           onClick={sendAnnouncement}
//           className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
//         >
//           Send Announcement
//         </button>

//       </div>

//     </AdminLayout>

//   )

// }

// export default StudentAnnouncements


















// import { useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function StudentAnnouncements(){

//   const [message,setMessage] = useState("")

//   const sendAnnouncement = async () => {

//     await API.post("/announcements",{
//       message,
//       target_type:"students"
//     })

//     alert("Announcement sent")
//     setMessage("")
//   }

//   return(

//     <AdminLayout>

//       <div className="p-6 max-w-xl space-y-4">

//         <h1 className="text-2xl font-bold">
//           Student Announcement
//         </h1>

//         <textarea
//           className="border w-full p-3 rounded"
//           rows="4"
//           placeholder="Write announcement..."
//           value={message}
//           onChange={(e)=>setMessage(e.target.value)}
//         />

//         <button
//           onClick={sendAnnouncement}
//           className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
//         >
//           Send Announcement
//         </button>

//       </div>

//     </AdminLayout>

//   )

// }

// export default StudentAnnouncements

















// import { useState, useEffect } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function StudentAnnouncements(){

//   const [message,setMessage] = useState("")
//   const [announcements,setAnnouncements] = useState([])

//   // fetch history
// const fetchAnnouncements = async () => {

//   try{

//     const res = await API.get("/announcements")
//     setAnnouncements(res.data)

//   }catch(err){

//     console.log(err)

//   }

// }

//   useEffect(()=>{
//     fetchAnnouncements()
//   },[])


// const sendAnnouncement = async () => {

//   if(!message.trim()){
//     alert("Please write an announcement first")
//     return
//   }

//   try{

//     await API.post("/announcements",{
//       message,
//       target_type:"all"
//     })

//     setMessage("")
//     fetchAnnouncements()

//   }catch(err){

//     console.log(err)

//   }

// }


//   const deleteAnnouncement = async (id) => {

//   const confirmDelete = window.confirm("Delete this announcement?")

//   if(!confirmDelete) return

//   try{

//     await API.delete(`/announcements/${id}`)

//     alert("Announcement deleted")

//     fetchAnnouncements()

//   }catch(err){

//     console.log(err)

//   }

// }

//   return(

//     <AdminLayout>

//       <div className="p-6 max-w-2xl space-y-6">

//         <h1 className="text-2xl font-bold">
//           Student Announcement
//         </h1>

//         {/* Send box */}

//         <div className="bg-white p-5 rounded-xl border space-y-3">

//           <textarea
//             className="border w-full p-3 rounded"
//             rows="4"
//             placeholder="Write announcement..."
//             value={message}
//             onChange={(e)=>setMessage(e.target.value)}
//           />

// <button
//   onClick={sendAnnouncement}
//   disabled={!message.trim()}
//   className={`px-5 py-2 rounded text-white transition 
//   ${message.trim() 
//     ? "bg-indigo-600 hover:bg-indigo-700" 
//     : "bg-gray-400 cursor-not-allowed"}
//   `}
// >
//   Send Announcement
// </button>

//         </div>


//         {/* History */}

//         <div className="space-y-4">

//           <h2 className="text-lg font-semibold">
//             Announcement History
//           </h2>

//           {announcements.length === 0 && (
//             <p className="text-gray-500">
//               No announcements yet
//             </p>
//           )}

//           {/* {announcements.map((a)=>(
//             <div
//               key={a.id}
//               className="bg-white border rounded-xl p-4 shadow-sm"
//             >

//               <p className="text-gray-800">
//                 {a.message}
//               </p>

//               <p className="text-xs text-gray-400 mt-2">
//                 {new Date(a.created_at).toLocaleString()}
//               </p>

//             </div>
//           ))} */}





//           {announcements.map((a)=>(
//   <div
//     key={a.id}
//     className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-start"
//   >

//     <div>

//       <p className="text-gray-800">
//         {a.message}
//       </p>

//       <p className="text-xs text-gray-400 mt-2">
//         {new Date(a.created_at).toLocaleString()}
//       </p>

//     </div>

//     <button
//       onClick={()=>deleteAnnouncement(a.id)}
//       className="text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs hover:bg-red-50 transition"
//     >
//       Delete
//     </button>

//   </div>
// ))}

//         </div>

//       </div>

//     </AdminLayout>

//   )

// }

// export default StudentAnnouncements



















// improved ui 1
import { useState, useEffect } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import BookLoader from "../components/BookLoader"
import { Send, Trash2, Bell, Clock, Info } from "lucide-react"

function StudentAnnouncements() {
  const [message, setMessage] = useState("")
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  const fetchAnnouncements = async () => {
    try {
      const res = await API.get("/announcements")
      setAnnouncements(res.data || [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const sendAnnouncement = async () => {
    if (!message.trim()) return
    setSending(true)
    try {
      await API.post("/announcements", { message, target_type: "all" })
      setMessage("")
      fetchAnnouncements()
    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }
  }

  const deleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement?")) return
    try {
      await API.delete(`/announcements/${id}`)
      fetchAnnouncements()
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) return <BookLoader />

  return (
    <AdminLayout>
      <div className="p-3 sm:p-6 md:p-8 max-w-4xl mx-auto font-sans">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 bg-indigo-600 rounded-xl sm:rounded-2xl text-white shrink-0">
              <Bell size={20} className="sm:w-6 sm:h-6" />
            </div>
            Announcements
          </h1>
          <p className="text-gray-500 mt-2 ml-1 text-sm sm:text-base">
            Broadcast important news to all students.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <textarea
            className="w-full p-3 sm:p-4 border border-gray-200 rounded-xl sm:rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition resize-none text-sm sm:text-base"
            rows="4"
            placeholder="Write an announcement for all students..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendAnnouncement}
            disabled={!message.trim() || sending}
            className="mt-3 sm:mt-4 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {sending ? (
              "Sending..."
            ) : (
              <>
                <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                Send Announcement
              </>
            )}
          </button>
        </div>

        {/* History */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
            <Clock className="text-indigo-600 shrink-0" size={18} />
            Recent History
          </h2>

          {announcements.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl sm:rounded-3xl border border-dashed">
              <Info className="mx-auto text-gray-300 mb-2" size={28} />
              <p className="text-gray-400 text-sm sm:text-base">No announcements yet</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-3 sm:gap-4 transition hover:shadow-md"
                >
                  {/* Message */}
                  <p className="text-gray-800 leading-relaxed font-medium text-base sm:text-lg">
                    {a.message}
                  </p>

                  {/* Footer: timestamp + delete */}
                  <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      <Clock size={13} />
                      {new Date(a.created_at).toLocaleDateString()} •{" "}
                      {new Date(a.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>

                    <button
                      onClick={() => deleteAnnouncement(a.id)}
                      className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-rose-100 active:bg-rose-200 transition shrink-0"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default StudentAnnouncements














// improved ui 2
// import { useState, useEffect } from "react"
// import API from "../services/api"
// import BookLoader from "../components/BookLoader"
// import {
//   Bell,
//   Send,
//   Trash2,
//   Megaphone,
//   Clock,
//   MessageSquarePlus,
//   AlertCircle,
//   CheckCircle,
//   History,
//   X
// } from "lucide-react"

// function StudentAnnouncements() {

//   const [message, setMessage] = useState("")
//   const [announcements, setAnnouncements] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [sending, setSending] = useState(false)
//   const [deleteId, setDeleteId] = useState(null)
//   const [notification, setNotification] = useState(null)

//   const showNotif = (msg, type = "success") => {
//     setNotification({ msg, type })
//     setTimeout(() => setNotification(null), 3000)
//   }

//   const fetchAnnouncements = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get("/announcements")
//       setAnnouncements(res.data)
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchAnnouncements()
//   }, [])

//   const sendAnnouncement = async () => {
//     if (!message.trim()) {
//       showNotif("Please write an announcement first", "error")
//       return
//     }

//     try {
//       setSending(true)
//       await API.post("/announcements", {
//         message,
//         target_type: "all"
//       })
//       setMessage("")
//       showNotif("Announcement sent successfully!")
//       fetchAnnouncements()
//     } catch (err) {
//       console.log(err)
//       showNotif("Failed to send announcement", "error")
//     } finally {
//       setSending(false)
//     }
//   }

//   const deleteAnnouncement = async (id) => {
//     try {
//       await API.delete(`/announcements/${id}`)
//       setDeleteId(null)
//       showNotif("Announcement deleted!")
//       fetchAnnouncements()
//     } catch (err) {
//       console.log(err)
//       showNotif("Failed to delete", "error")
//     }
//   }

//   const formatTime = (dateStr) => {
//     const date = new Date(dateStr)
//     const now = new Date()
//     const diff = now - date
//     const mins = Math.floor(diff / 60000)
//     const hrs = Math.floor(diff / 3600000)
//     const days = Math.floor(diff / 86400000)
//     if (mins < 1) return "Just now"
//     if (mins < 60) return `${mins}m ago`
//     if (hrs < 24) return `${hrs}h ago`
//     if (days < 7) return `${days}d ago`
//     return date.toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric"
//     })
//   }

//   if (loading) return <BookLoader />

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
//         .dm-sans { font-family: 'DM Sans', sans-serif; }

//         @keyframes slideIn {
//           from { opacity: 0; transform: translateX(100px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(12px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slide-in { animation: slideIn 0.4s ease-out; }
//         .animate-fade-up { animation: fadeUp 0.35s ease both; }
//       `}</style>

//       <div className="p-4 md:p-6 dm-sans min-h-screen">

//         {/* Toast */}
//         {notification && (
//           <div className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3
//             px-4 py-3 rounded-xl shadow-2xl animate-slide-in max-w-[90vw]
//             ${notification.type === "error" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}
//           >
//             {notification.type === "error"
//               ? <AlertCircle className="w-5 h-5 shrink-0" />
//               : <CheckCircle className="w-5 h-5 shrink-0" />
//             }
//             <span className="font-medium text-sm">{notification.msg}</span>
//           </div>
//         )}

//         <div className="max-w-3xl mx-auto">

//           {/* Header */}
//           <div className="mb-6 md:mb-8 animate-fade-up">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
//                   <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
//                     <Megaphone className="text-white" size={22} />
//                   </div>
//                   Announcements
//                 </h1>
//                 <p className="text-gray-400 text-sm mt-1 ml-14">
//                   Broadcast messages to all students
//                 </p>
//               </div>

//               <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full ml-14 sm:ml-0 w-fit">
//                 <Bell size={14} className="text-indigo-500" />
//                 <span className="text-xs font-semibold text-indigo-600">
//                   {announcements.length} Sent
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* ✅ Compose Card */}
//           <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>

//             <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

//             <div className="p-5 sm:p-6">

//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
//                   <MessageSquarePlus className="text-indigo-600" size={20} />
//                 </div>
//                 <div>
//                   <h2 className="text-base font-bold text-gray-800">New Announcement</h2>
//                   <p className="text-xs text-gray-400">This will be sent to all students</p>
//                 </div>
//               </div>

//               <textarea
//                 className="w-full border-2 border-gray-200 rounded-2xl p-4 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 text-sm font-medium transition-all resize-none"
//                 rows="4"
//                 placeholder="Write your announcement here..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               />

//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">

//                 <p className="text-xs text-gray-400">
//                   {message.length > 0 && (
//                     <span className={message.length > 500 ? "text-red-500" : "text-gray-400"}>
//                       {message.length}/500 characters
//                     </span>
//                   )}
//                 </p>

//                 <button
//                   onClick={sendAnnouncement}
//                   disabled={sending || !message.trim()}
//                   className={`px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto ${
//                     sending || !message.trim()
//                       ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
//                   }`}
//                 >
//                   {sending ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Sending...
//                     </>
//                   ) : (
//                     <>
//                       <Send size={16} /> Send Announcement
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* ✅ History Section */}
//           <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>

//             <div className="flex items-center gap-2 mb-4">
//               <History size={18} className="text-gray-500" />
//               <h2 className="text-base font-bold text-gray-800">Announcement History</h2>
//               <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">
//                 {announcements.length}
//               </span>
//             </div>

//             {announcements.length === 0 ? (
//               <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Megaphone className="text-gray-400" size={28} />
//                 </div>
//                 <p className="font-bold text-gray-700">No Announcements Yet</p>
//                 <p className="text-gray-400 text-sm mt-1">Start by sending your first announcement</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {announcements.map((a, idx) => (
//                   <div
//                     key={a.id}
//                     className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-all group animate-fade-up relative"
//                     style={{ animationDelay: `${idx * 0.05}s` }}
//                   >
//                     {/* Delete Confirm Overlay */}
//                     {deleteId === a.id && (
//                       <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3 z-10">
//                         <p className="text-sm font-bold text-red-600">Delete this announcement?</p>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => deleteAnnouncement(a.id)}
//                             className="px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-xl hover:bg-red-600 transition"
//                           >
//                             Yes, Delete
//                           </button>
//                           <button
//                             onClick={() => setDeleteId(null)}
//                             className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-200 transition"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     <div className="flex items-start gap-3">

//                       {/* Avatar */}
//                       <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
//                         <Bell className="text-indigo-600" size={16} />
//                       </div>

//                       {/* Content */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between gap-2">
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="text-xs font-bold text-indigo-600">School Announcement</span>
//                               <span className="bg-indigo-100 text-indigo-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
//                                 All Students
//                               </span>
//                             </div>
//                             <p className="text-sm text-gray-700 leading-relaxed break-words">
//                               {a.message}
//                             </p>
//                           </div>

//                           {/* Delete Button */}
//                           <button
//                             onClick={() => setDeleteId(a.id)}
//                             className="w-8 h-8 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 bg-red-50 text-red-500 hover:bg-red-100 transition-all shrink-0"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>

//                         {/* Time */}
//                         <div className="flex items-center gap-1.5 mt-2.5">
//                           <Clock size={11} className="text-gray-400" />
//                           <span className="text-[11px] text-gray-400 font-medium">
//                             {formatTime(a.created_at)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Bottom Tip */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
//             <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
//               <h3 className="text-sm font-bold text-indigo-800 flex items-center gap-2">
//                 <Megaphone size={14} /> Broadcast
//               </h3>
//               <p className="text-xs text-indigo-700 mt-1.5 leading-5">
//                 Announcements are sent to all students in real-time. They can view them in their dashboard.
//               </p>
//             </div>

//             <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
//               <h3 className="text-sm font-bold text-violet-800 flex items-center gap-2">
//                 <Bell size={14} /> Notifications
//               </h3>
//               <p className="text-xs text-violet-700 mt-1.5 leading-5">
//                 Students receive instant notifications. Important announcements stay pinned at the top.
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }

// export default StudentAnnouncements