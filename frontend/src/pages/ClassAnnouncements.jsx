// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function ClassAnnouncements() {

//   const { id } = useParams()

//   const [announcements, setAnnouncements] = useState([])
//   const [message, setMessage] = useState("")
//   const [pin, setPin] = useState(false)

//   const fetchAnnouncements = async () => {

//     try {

//       const res = await API.get(`/classes/${id}/announcements`)
//       setAnnouncements(res.data)

//     } catch (error) {

//       console.log("Error fetching announcements", error)

//     }

//   }

//   useEffect(() => {
//     fetchAnnouncements()
//   }, [])

//   const postAnnouncement = async () => {

//     try {

//       await API.post(`/classes/${id}/announcements`, {
//         message: message,
//         is_pinned: pin
//       })

//       setMessage("")
//       setPin(false)

//       fetchAnnouncements()

//     } catch (error) {

//       console.log("Error posting announcement", error)

//     }

//   }

//   return (

//     <div>

//       <h1 className="text-3xl font-bold mb-6">
//         Class Announcements
//       </h1>

//       {/* Create Announcement */}

//       <div className="bg-white p-4 rounded shadow mb-6">

//         <textarea
//           className="border w-full p-2 mb-3"
//           placeholder="Write announcement..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />

//         <div className="flex justify-between">

//           <label className="flex items-center gap-2">

//             <input
//               type="checkbox"
//               checked={pin}
//               onChange={(e) => setPin(e.target.checked)}
//             />

//             Pin announcement

//           </label>

//           <button
//             onClick={postAnnouncement}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Post
//           </button>

//         </div>

//       </div>

//       {/* Announcements List */}

//       <div className="space-y-4">

//         {announcements.map((a) => (

//           <div
//             key={a.id}
//             className={`p-4 rounded shadow ${
//               a.is_pinned ? "bg-yellow-100" : "bg-white"
//             }`}
//           >

//             {a.is_pinned && (
//               <p className="text-sm text-red-600 font-bold">
//                 📌 Pinned
//               </p>
//             )}

//             <p className="font-semibold">
//               {a.users?.full_name}
//             </p>

//             <p className="mt-2">
//               {a.message}
//             </p>

//             <p className="text-sm text-gray-500 mt-2">
//               {new Date(a.created_at).toLocaleString()}
//             </p>

//           </div>

//         ))}

//       </div>

//     </div>

//   )

// }

// export default ClassAnnouncements















// import { useEffect,useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function ClassAnnouncements(){

//   const [classes,setClasses] = useState([])
//   const [classId,setClassId] = useState("")
//   const [message,setMessage] = useState("")

//   const fetchClasses = async ()=>{

//     const res = await API.get("/classes")
//     setClasses(res.data)

//   }

//   const sendAnnouncement = async ()=>{

//     await API.post("/announcements",{
//       class_id:classId,
//       message,
//       target_type:"class"
//     })

//     alert("Announcement sent")
//     setMessage("")
//   }

//   useEffect(()=>{
//     fetchClasses()
//   },[])

//   return(

//     <AdminLayout>

//       <div className="p-6 max-w-xl space-y-4">

//         <h1 className="text-2xl font-bold">
//           Class Announcement
//         </h1>

//         <select
//           className="border p-2 rounded w-full"
//           value={classId}
//           onChange={(e)=>setClassId(e.target.value)}
//         >

//           <option>Select Class</option>

//           {classes.map(c=>(
//             <option key={c.id} value={c.id}>
//               {c.class_name}-{c.section}
//             </option>
//           ))}

//         </select>

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

// export default ClassAnnouncements


























import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"

function ClassAnnouncements() {

  const [classes, setClasses] = useState([])
  const [classId, setClassId] = useState("")
  const [message, setMessage] = useState("")
  const [announcements, setAnnouncements] = useState([])

  // 🔥 FETCH CLASSES
  const fetchClasses = async () => {
    try {
      const res = await API.get("/classes")
      setClasses(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // 🔥 FETCH ANNOUNCEMENTS
  const fetchAnnouncements = async () => {
    if (!classId) return

    try {
      const res = await API.get(`/announcements?class_id=${classId}`)
      setAnnouncements(res.data || [])
    } catch (err) {
      console.log(err)
    }
  }

  // 🔥 SEND ANNOUNCEMENT
  const sendAnnouncement = async () => {

    if (!classId) {
      alert("Please select a class")
      return
    }

    if (!message.trim()) {
      alert("Write something")
      return
    }

    try {
      await API.post("/announcements", {
        class_id: classId,
        message,
        target_type: "class"   // ✅ IMPORTANT
      })

      setMessage("")
      fetchAnnouncements()    // ✅ refresh UI

    } catch (err) {
      console.log(err)
    }
  }

  // 🔥 DELETE
  const deleteAnnouncement = async (id) => {

    const ok = window.confirm("Delete this announcement?")
    if (!ok) return

    try {
      await API.delete(`/announcements/${id}`)
      fetchAnnouncements()
    } catch (err) {
      console.log(err)
    }
  }

  // 🔥 LOAD CLASSES
  useEffect(() => {
    fetchClasses()
  }, [])

  // 🔥 LOAD ANNOUNCEMENTS ON CLASS CHANGE
  useEffect(() => {
    fetchAnnouncements()
  }, [classId])


  return (
    <AdminLayout>

      <div className="p-6 max-w-xl space-y-6">

        <h1 className="text-2xl font-bold">
          Class Announcement
        </h1>

        {/* SELECT CLASS */}
        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="border p-3 rounded w-full"
        >
          <option value="">Select Class</option>

          {classes.map(c => (
            <option key={c.id} value={c.id}>
              {c.class_name} - {c.section}
            </option>
          ))}
        </select>

        {/* MESSAGE */}
        <textarea
          className="border w-full p-3 rounded"
          rows="4"
          placeholder="Write announcement..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* SEND */}
        <button
          onClick={sendAnnouncement}
          className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
        >
          Send Announcement
        </button>

        {/* HISTORY */}
        <div>
          <h2 className="text-lg font-semibold mt-6 mb-3">
            Announcement History
          </h2>

          {announcements.length === 0 && (
            <p className="text-gray-500">
              No announcements yet
            </p>
          )}

          <div className="space-y-3">

            {announcements.map(a => (

              <div
                key={a.id}
                className="bg-white border rounded-lg p-4 shadow-sm flex justify-between"
              >

                <div>
                  <p className="text-gray-800">
                    {a.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(a.created_at).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => deleteAnnouncement(a.id)}
                  className="text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs hover:bg-red-50"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </AdminLayout>
  )
}

export default ClassAnnouncements



















// improved ui 1
// import { useEffect, useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"
// import BookLoader from "../components/BookLoader"
// import { Send, Trash2, Bell, Clock, Info, School, ChevronDown, MessageSquare } from "lucide-react"

// function ClassAnnouncements() {
//   const [classes, setClasses] = useState([])
//   const [classId, setClassId] = useState("")
//   const [message, setMessage] = useState("")
//   const [announcements, setAnnouncements] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [sending, setSending] = useState(false)

//   const fetchClasses = async () => {
//     try {
//       const res = await API.get("/classes")
//       setClasses(res.data)
//     } catch (err) { console.log(err) }
//   }

//   const fetchAnnouncements = async () => {
//     if (!classId) return
//     try {
//       const res = await API.get(`/announcements?class_id=${classId}`)
//       setAnnouncements(res.data || [])
//     } catch (err) { console.log(err) }
//   }

//   const sendAnnouncement = async () => {
//     if (!classId || !message.trim()) return
//     setSending(true)
//     try {
//       await API.post("/announcements", { class_id: classId, message, target_type: "class" })
//       setMessage("")
//       fetchAnnouncements()
//     } catch (err) { console.log(err) }
//     finally { setSending(false) }
//   }

//   const deleteAnnouncement = async (id) => {
//     if (!window.confirm("Delete this announcement?")) return
//     try {
//       await API.delete(`/announcements/${id}`)
//       fetchAnnouncements()
//     } catch (err) { console.log(err) }
//   }

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true)
//       await fetchClasses()
//       setLoading(false)
//     }
//     loadData()
//   }, [])

//   useEffect(() => {
//     fetchAnnouncements()
//   }, [classId])

//   if (loading) return <BookLoader />

//   return (
//     <AdminLayout>
//       <div className="p-4 md:p-8 max-w-4xl mx-auto font-sans">
        
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//             <div className="p-3 bg-indigo-600 rounded-2xl text-white">
//               <MessageSquare size={24} />
//             </div>
//             Class Announcements
//           </h1>
//           <p className="text-gray-500 mt-2 ml-1">Send specific updates to individual classes.</p>
//         </div>

//         {/* Action Panel */}
//         <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <div className="relative">
//               <label className="block text-sm font-bold text-gray-700 mb-2">Select Class</label>
//               <div className="relative">
//                 <School className="absolute left-4 top-3.5 text-gray-400" size={20} />
//                 <select
//                   value={classId}
//                   onChange={(e) => setClassId(e.target.value)}
//                   className="w-full pl-12 pr-10 py-3.5 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition appearance-none bg-white"
//                 >
//                   <option value="">Choose a class...</option>
//                   {classes.map(c => <option key={c.id} value={c.id}>{c.class_name} - {c.section}</option>)}
//                 </select>
//                 <ChevronDown className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={20} />
//               </div>
//             </div>
//           </div>

//           <textarea
//             className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition resize-none"
//             rows="4"
//             placeholder="Write class-specific announcement..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
          
//           <button
//             onClick={sendAnnouncement}
//             disabled={!message.trim() || !classId || sending}
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
//             <div className="text-center py-10 bg-white rounded-3xl border border-dashed">
//               <Info className="mx-auto text-gray-300 mb-2" size={32} />
//               <p className="text-gray-400">No announcements for this class</p>
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

// export default ClassAnnouncements