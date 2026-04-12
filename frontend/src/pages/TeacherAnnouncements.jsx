// import { useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function TeacherAnnouncements(){

//   const [message,setMessage] = useState("")

//   const sendAnnouncement = async ()=>{

//     await API.post("/announcements",{
//       message,
//       target_type:"teachers"
//     })

//     alert("Announcement sent")
//     setMessage("")
//   }

//   return(

//     <AdminLayout>

//       <div className="p-6 max-w-xl space-y-4">

//         <h1 className="text-2xl font-bold">
//           Teacher Announcement
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

// export default TeacherAnnouncements


















// import { useState, useEffect } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function TeacherAnnouncements(){

//   const [message,setMessage] = useState("")
//   const [announcements,setAnnouncements] = useState([])

// const sendAnnouncement = async () => {

//   if(!message.trim()){
//     alert("Please write an announcement first")
//     return
//   }

//   try{

//     await API.post("/announcements",{
//       message,
//       target_type: "teacher"
//     })

//     setMessage("")
//     fetchAnnouncements()

//   }catch(err){

//     console.log(err)

//   }

// }

//   const fetchAnnouncements = async () => {

//     try{

//       const res = await API.get("/announcements")

//       setAnnouncements(res.data)

//     }catch(err){

//       console.log(err)

//     }

//   }

//   useEffect(()=>{
//     fetchAnnouncements()
//   },[])



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

//       <div className="p-6 max-w-xl space-y-6">

//         <h1 className="text-2xl font-bold">
//           Teacher Announcement
//         </h1>

//         {/* SEND BOX */}

//         <div className="bg-white border rounded-xl p-5 shadow-sm space-y-4">

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


//         {/* HISTORY */}

//         <div>

//           <h2 className="text-lg font-semibold mb-3">
//             Announcement History
//           </h2>

//           {announcements.length === 0 && (
//             <p className="text-gray-500">
//               No announcements yet
//             </p>
//           )}

//           <div className="space-y-3">

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

//           </div>

//         </div>

//       </div>

//     </AdminLayout>

//   )

// }

// export default TeacherAnnouncements














//improved ui 1
// import { useState, useEffect } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"
// import BookLoader from "../components/BookLoader"
// import { Send, Trash2, Bell, Clock, Info, MessageSquare } from "lucide-react"

// function TeacherAnnouncements() {
//   const [message, setMessage] = useState("")
//   const [announcements, setAnnouncements] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [sending, setSending] = useState(false)

//   const fetchAnnouncements = async () => {
//     try {
//       const res = await API.get("/announcements")
//       // Filter sirf 'teacher' target type wale announcements
//       setAnnouncements(res.data.filter(a => a.target_type === "teacher") || [])
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
//     if (!message.trim()) return
//     setSending(true)
//     try {
//       await API.post("/announcements", { message, target_type: "teacher" })
//       setMessage("")
//       fetchAnnouncements()
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setSending(false)
//     }
//   }

//   const deleteAnnouncement = async (id) => {
//     if (!window.confirm("Delete this announcement?")) return
//     try {
//       await API.delete(`/announcements/${id}`)
//       fetchAnnouncements()
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   if (loading) return <BookLoader />

//   return (
//     <AdminLayout>
//       <div className="p-4 md:p-8 max-w-4xl mx-auto font-sans">
        
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//             <div className="p-3 bg-indigo-600 rounded-2xl text-white">
//               <Bell size={24} />
//             </div>
//             Teacher Announcements
//           </h1>
//           <p className="text-gray-500 mt-2 ml-1">Send broadcast messages to all teaching staff.</p>
//         </div>

//         {/* Send box */}
//         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
//           <textarea
//             className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition resize-none"
//             rows="4"
//             placeholder="Write a message for teachers..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button
//             onClick={sendAnnouncement}
//             disabled={!message.trim() || sending}
//             className="mt-4 w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
//           >
//             {sending ? "Sending..." : <><Send size={18} /> Send Announcement</>}
//           </button>
//         </div>

//         {/* History */}
//         <div className="space-y-6">
//           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
//             <Clock className="text-indigo-600" size={20} />
//             Announcement History
//           </h2>

//           {announcements.length === 0 ? (
//             <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-gray-200">
//               <Info className="mx-auto text-gray-300 mb-2" size={32} />
//               <p className="text-gray-400 font-medium">No teacher announcements yet</p>
//             </div>
//           ) : (
//             <div className="grid gap-4">
//               {announcements.map((a) => (
//                 <div
//                   key={a.id}
//                   className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition hover:shadow-md"
//                 >
//                   <div className="flex-1">
//                     <p className="text-gray-800 leading-relaxed font-medium text-lg">{a.message}</p>
//                     <div className="flex items-center gap-2 mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
//                       <Clock size={14} />
//                       {new Date(a.created_at).toLocaleDateString()} • {new Date(a.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => deleteAnnouncement(a.id)}
//                     className="flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-rose-100 transition shrink-0"
//                   >
//                     <Trash2 size={16} /> Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </AdminLayout>
//   )
// }

// export default TeacherAnnouncements




















// ui 2
import { useState, useEffect } from "react"
import API from "../services/api"
import BookLoader from "../components/BookLoader"
import {
  Bell,
  Send,
  Trash2,
  Megaphone,
  Clock,
  MessageSquarePlus,
  AlertCircle,
  CheckCircle,
  History,
  GraduationCap,
  BookOpen,
  Sparkles
} from "lucide-react"

function TeacherAnnouncements() {

  const [message, setMessage] = useState("")
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [notification, setNotification] = useState(null)

  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      const res = await API.get("/announcements")
      setAnnouncements(res.data)
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
    if (!message.trim()) {
      showNotif("Please write an announcement first", "error")
      return
    }

    try {
      setSending(true)
      await API.post("/announcements", {
        message,
        target_type: "teacher"
      })
      setMessage("")
      showNotif("Announcement sent to all teachers!")
      fetchAnnouncements()
    } catch (err) {
      console.log(err)
      showNotif("Failed to send announcement", "error")
    } finally {
      setSending(false)
    }
  }

  const deleteAnnouncement = async (id) => {
    try {
      await API.delete(`/announcements/${id}`)
      setDeleteId(null)
      showNotif("Announcement deleted!")
      fetchAnnouncements()
    } catch (err) {
      console.log(err)
      showNotif("Failed to delete", "error")
    }
  }

  const formatTime = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now - date
    const mins = Math.floor(diff / 60000)
    const hrs = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (mins < 1) return "Just now"
    if (mins < 60) return `${mins}m ago`
    if (hrs < 24) return `${hrs}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  }

  if (loading) return <BookLoader />

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .dm-sans { font-family: 'DM Sans', sans-serif; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slideIn 0.4s ease-out; }
        .animate-fade-up { animation: fadeUp 0.35s ease both; }
      `}</style>

      <div className="p-4 md:p-6 dm-sans min-h-screen">

        {/* Toast */}
        {notification && (
          <div className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3
            px-4 py-3 rounded-xl shadow-2xl animate-slide-in max-w-[90vw]
            ${notification.type === "error" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}
          >
            {notification.type === "error"
              ? <AlertCircle className="w-5 h-5 shrink-0" />
              : <CheckCircle className="w-5 h-5 shrink-0" />
            }
            <span className="font-medium text-sm">{notification.msg}</span>
          </div>
        )}

        <div className="max-w-3xl mx-auto">

          {/* ✅ Header */}
          <div className="mb-6 md:mb-8 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <GraduationCap className="text-white" size={22} />
                  </div>
                  Teacher Announcements
                </h1>
                <p className="text-gray-400 text-sm mt-1 ml-14">
                  Broadcast important messages to all teachers
                </p>
              </div>

              <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full ml-14 sm:ml-0 w-fit">
                <Bell size={14} className="text-amber-500" />
                <span className="text-xs font-semibold text-amber-600">
                  {announcements.length} Sent
                </span>
              </div>
            </div>
          </div>

          {/* ✅ Target Info Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-4 mb-6 flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
              <GraduationCap className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-800">Teacher Only Broadcast</p>
              <p className="text-xs text-amber-700 mt-0.5">
                These announcements will only be visible to all teachers in the school
              </p>
            </div>
          </div>

          {/* ✅ Compose Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>

            <div className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

            <div className="p-5 sm:p-6 md:p-7">

              {/* Card Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <MessageSquarePlus className="text-amber-600" size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-800">Compose Message</h2>
                  <p className="text-xs text-gray-400">Write announcement for all teachers</p>
                </div>
              </div>

              {/* Message Label */}
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block flex items-center gap-1.5">
                <BookOpen size={13} className="text-amber-500" />
                Announcement Message <span className="text-red-400">*</span>
              </label>

              {/* Textarea */}
              <textarea
                className="w-full border-2 border-gray-200 rounded-2xl p-4 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 text-sm font-medium transition-all resize-none mb-4"
                rows="5"
                placeholder="e.g. Staff meeting at 3 PM in conference hall tomorrow..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {/* Preview */}
              {message.trim() && (
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={13} className="text-amber-500" />
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Preview</p>
                  </div>
                  <div className="bg-white rounded-xl p-3.5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-amber-100 text-amber-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        All Teachers
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs text-gray-400">
                  {message.length > 0 && (
                    <span className={message.length > 500 ? "text-red-500 font-semibold" : ""}>
                      {message.length}/500 characters
                    </span>
                  )}
                </p>

                <button
                  onClick={sendAnnouncement}
                  disabled={sending || !message.trim()}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto ${
                    sending || !message.trim()
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send to Teachers
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ✅ History */}
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>

            <div className="flex items-center gap-2 mb-4">
              <History size={18} className="text-gray-500" />
              <h2 className="text-base font-bold text-gray-800">Announcement History</h2>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">
                {announcements.length}
              </span>
            </div>

            {announcements.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="text-amber-500" size={28} />
                </div>
                <p className="font-bold text-gray-700">No Announcements Yet</p>
                <p className="text-gray-400 text-sm mt-1">Send the first announcement to your teachers</p>
              </div>
            ) : (
              <div className="space-y-3">
                {announcements.map((a, idx) => (
                  <div
                    key={a.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-all group animate-fade-up relative"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    {/* Delete Overlay */}
                    {deleteId === a.id && (
                      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3 z-10">
                        <p className="text-sm font-bold text-red-600">Delete this announcement?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteAnnouncement(a.id)}
                            className="px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-xl hover:bg-red-600 transition"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={() => setDeleteId(null)}
                            className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-200 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap className="text-amber-600" size={16} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs font-bold text-amber-600">Teacher Announcement</span>
                              <span className="bg-amber-100 text-amber-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                All Teachers
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed break-words">
                              {a.message}
                            </p>
                          </div>

                          <button
                            onClick={() => setDeleteId(a.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 bg-red-50 text-red-500 hover:bg-red-100 transition-all shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5 mt-2.5">
                          <Clock size={11} className="text-gray-400" />
                          <span className="text-[11px] text-gray-400 font-medium">
                            {formatTime(a.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2">
                <GraduationCap size={14} /> Staff Only
              </h3>
              <p className="text-xs text-amber-700 mt-1.5 leading-5">
                These announcements are only visible to teachers. Students and parents cannot see them.
              </p>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <h3 className="text-sm font-bold text-orange-800 flex items-center gap-2">
                <Bell size={14} /> Instant Delivery
              </h3>
              <p className="text-xs text-orange-700 mt-1.5 leading-5">
                All teachers receive real-time notifications. Use this for meetings, updates & important notices.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default TeacherAnnouncements