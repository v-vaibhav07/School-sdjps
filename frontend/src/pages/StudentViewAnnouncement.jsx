// import { useEffect, useState } from "react"
// import API from "../services/api"
// import supabase from "../services/supabase"

// function StudentViewAnnouncement() {

//   const [school, setSchool] = useState([])
//   const [classAnn, setClassAnn] = useState([])
//   const [studentClassId, setStudentClassId] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchData()

//     // 🔥 REALTIME
//     const channel = supabase
//       .channel("announcements-channel")
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "class_announcements"
//         },
//         (payload) => {
//           const newAnn = payload.new

//           // ✅ SCHOOL
//           if (newAnn.target_type === "all") {
//             setSchool(prev => [newAnn, ...prev])
//           }

//           // ✅ CLASS (FILTERED)
//           else if (
//             newAnn.target_type === "class" &&
//             newAnn.class_id === studentClassId
//           ) {
//             setClassAnn(prev => [newAnn, ...prev])
//           }
//         }
//       )
//       .subscribe()

//     return () => {
//       supabase.removeChannel(channel)
//     }

//   }, [studentClassId]) // 🔥 important dependency


//   // 🔥 FETCH DATA
//   const fetchData = async () => {
//     try {
//       const res = await API.get("/student/announcements")

//       const all = res.data || []

//       const schoolData = all.filter(a => a.target_type === "all")
//       const classData = all.filter(a => a.target_type === "class")

//       setSchool(schoolData)
//       setClassAnn(classData)

//       // ✅ SET CLASS ID (VERY IMPORTANT)
//       if (classData.length > 0) {
//         setStudentClassId(classData[0].class_id)
//       }

//     } catch (err) {
//       console.log("Fetch error:", err)
//     }

//     setLoading(false)
//   }

//   return (
//     <div className="p-4 md:p-6 max-w-5xl mx-auto">

//       <h1 className="text-2xl font-bold mb-6">
//         📢 Announcements
//       </h1>

//       {loading && <p>Loading...</p>}

//       {/* 🔵 SCHOOL */}
//       <div className="mb-6">
//         <h2 className="font-semibold text-blue-600 mb-3">
//           School Announcements
//         </h2>

//         <div className="space-y-3">
//           {school.length === 0 && (
//             <p className="text-gray-400">No announcements</p>
//           )}

//           {school.map(a => (
//             <div
//               key={a.id}
//               className="bg-blue-50 p-3 rounded-xl shadow-sm max-w-[85%]"
//             >
//               <p className="text-sm">{a.message}</p>

//               <div className="text-xs text-gray-500 mt-1 flex justify-between">
//                 <span>{a.users?.full_name || "Admin"}</span>
//                 <span>{new Date(a.created_at).toLocaleTimeString()}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🟢 CLASS */}
//       <div>
//         <h2 className="font-semibold text-green-600 mb-3">
//           Class Announcements
//         </h2>

//         <div className="space-y-3">
//           {classAnn.length === 0 && (
//             <p className="text-gray-400">No announcements</p>
//           )}

//           {classAnn.map(a => (
//             <div
//               key={a.id}
//               className="bg-green-50 p-3 rounded-xl shadow-sm max-w-[85%] ml-auto"
//             >
//               <p className="text-sm">{a.message}</p>

//               <div className="text-xs text-gray-500 mt-1 flex justify-between">
//                 <span>{a.users?.full_name || "Teacher"}</span>
//                 <span>{new Date(a.created_at).toLocaleTimeString()}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   )
// }

// export default StudentViewAnnouncement



































// import { useEffect, useState } from "react"
// import API from "../services/api"
// import supabase from "../services/supabase"

// function StudentViewAnnouncement() {
//   const [school, setSchool] = useState([])
//   const [classAnn, setClassAnn] = useState([])
//   const [studentClassId, setStudentClassId] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState("school")

//   useEffect(() => {
//     fetchData()

//     const channel = supabase
//       .channel("announcements-channel")
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "class_announcements",
//         },
//         (payload) => {
//           const newAnn = payload.new
//           if (newAnn.target_type === "all") {
//             setSchool((prev) => [newAnn, ...prev])
//           } else if (
//             newAnn.target_type === "class" &&
//             newAnn.class_id === studentClassId
//           ) {
//             setClassAnn((prev) => [newAnn, ...prev])
//           }
//         }
//       )
//       .subscribe()

//     return () => {
//       supabase.removeChannel(channel)
//     }
//   }, [studentClassId])

//   const fetchData = async () => {
//     try {
//       const res = await API.get("/student/announcements")
//       const all = res.data || []
//       const schoolData = all.filter((a) => a.target_type === "all")
//       const classData = all.filter((a) => a.target_type === "class")
//       setSchool(schoolData)
//       setClassAnn(classData)
//       if (classData.length > 0) {
//         setStudentClassId(classData[0].class_id)
//       }
//     } catch (err) {
//       console.log("Fetch error:", err)
//     }
//     setLoading(false)
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
//     return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
//   }

//   const activeList = activeTab === "school" ? school : classAnn

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');

//         .ann-root {
//           font-family: 'DM Sans', sans-serif;
//           background: #f0f4ff;
//           min-height: 100vh;
//           padding: 0;
//         }

//         .ann-header {
//           background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%);
//           padding: 28px 20px 72px;
//           position: relative;
//           overflow: hidden;
//         }

//         .ann-header::before {
//           content: '';
//           position: absolute;
//           top: -40px; right: -40px;
//           width: 200px; height: 200px;
//           background: rgba(255,255,255,0.06);
//           border-radius: 50%;
//         }

//         .ann-header::after {
//           content: '';
//           position: absolute;
//           bottom: -60px; left: -20px;
//           width: 160px; height: 160px;
//           background: rgba(255,255,255,0.04);
//           border-radius: 50%;
//         }

//         .ann-header-inner {
//           max-width: 640px;
//           margin: 0 auto;
//           position: relative;
//           z-index: 1;
//         }

//         .ann-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           background: rgba(255,255,255,0.15);
//           color: #bfdbfe;
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.08em;
//           text-transform: uppercase;
//           padding: 4px 10px;
//           border-radius: 20px;
//           margin-bottom: 10px;
//           backdrop-filter: blur(4px);
//         }

//         .ann-title {
//           font-family: 'Sora', sans-serif;
//           font-size: 26px;
//           font-weight: 700;
//           color: #fff;
//           margin: 0 0 4px;
//           letter-spacing: -0.3px;
//         }

//         .ann-subtitle {
//           color: #93c5fd;
//           font-size: 13px;
//           margin: 0;
//         }

//         .ann-body {
//           max-width: 640px;
//           margin: 0 auto;
//           padding: 0 16px 32px;
//           margin-top: -48px;
//           position: relative;
//           z-index: 2;
//         }

//         /* Tab Card */
//         .tab-card {
//           background: #fff;
//           border-radius: 20px;
//           box-shadow: 0 4px 24px rgba(30,58,138,0.10);
//           overflow: hidden;
//           margin-bottom: 16px;
//         }

//         .tab-bar {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//         }

//         .tab-btn {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           padding: 15px 12px;
//           font-family: 'Sora', sans-serif;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//           border: none;
//           background: transparent;
//           color: #94a3b8;
//           transition: all 0.2s;
//           position: relative;
//           letter-spacing: -0.1px;
//         }

//         .tab-btn.active-school {
//           color: #1d4ed8;
//           background: #eff6ff;
//         }

//         .tab-btn.active-class {
//           color: #059669;
//           background: #f0fdf4;
//         }

//         .tab-btn .tab-count {
//           font-size: 11px;
//           font-weight: 700;
//           padding: 2px 7px;
//           border-radius: 20px;
//           min-width: 20px;
//           text-align: center;
//         }

//         .tab-btn.active-school .tab-count {
//           background: #dbeafe;
//           color: #1d4ed8;
//         }

//         .tab-btn.active-class .tab-count {
//           background: #d1fae5;
//           color: #059669;
//         }

//         .tab-btn:not(.active-school):not(.active-class) .tab-count {
//           background: #f1f5f9;
//           color: #94a3b8;
//         }

//         .tab-indicator {
//           height: 3px;
//           background: transparent;
//           transition: background 0.2s;
//         }

//         .tab-btn.active-school .tab-indicator { background: #1d4ed8; }
//         .tab-btn.active-class .tab-indicator { background: #059669; }

//         /* Announcement Cards */
//         .ann-list {
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//         }

//         .ann-card {
//           background: #fff;
//           border-radius: 16px;
//           padding: 16px;
//           box-shadow: 0 2px 12px rgba(30,58,138,0.07);
//           border-left: 4px solid transparent;
//           animation: slideIn 0.3s ease both;
//           transition: transform 0.15s, box-shadow 0.15s;
//         }

//         .ann-card:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(30,58,138,0.12);
//         }

//         .ann-card.school-card { border-left-color: #3b82f6; }
//         .ann-card.class-card { border-left-color: #10b981; }

//         @keyframes slideIn {
//           from { opacity: 0; transform: translateY(12px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .ann-card-top {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-bottom: 10px;
//         }

//         .ann-avatar {
//           width: 34px; height: 34px;
//           border-radius: 50%;
//           display: flex; align-items: center; justify-content: center;
//           font-family: 'Sora', sans-serif;
//           font-size: 13px;
//           font-weight: 700;
//           flex-shrink: 0;
//         }

//         .ann-avatar.school-av { background: #dbeafe; color: #1d4ed8; }
//         .ann-avatar.class-av { background: #d1fae5; color: #059669; }

//         .ann-sender-info {
//           flex: 1;
//           margin-left: 10px;
//         }

//         .ann-sender-name {
//           font-family: 'Sora', sans-serif;
//           font-size: 13px;
//           font-weight: 600;
//           color: #1e293b;
//           line-height: 1.2;
//         }

//         .ann-sender-role {
//           font-size: 11px;
//           color: #94a3b8;
//           margin-top: 1px;
//         }

//         .ann-time {
//           font-size: 11px;
//           color: #94a3b8;
//           white-space: nowrap;
//           font-weight: 500;
//         }

//         .ann-message {
//           font-size: 14px;
//           color: #334155;
//           line-height: 1.6;
//           margin: 0;
//         }

//         .ann-divider {
//           height: 1px;
//           background: #f1f5f9;
//           margin: 10px 0;
//         }

//         /* NEW badge */
//         .new-dot {
//           display: inline-block;
//           width: 7px; height: 7px;
//           background: #ef4444;
//           border-radius: 50%;
//           margin-left: 4px;
//           vertical-align: middle;
//           animation: pulse 1.5s infinite;
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.6; transform: scale(0.8); }
//         }

//         /* Empty State */
//         .empty-state {
//           text-align: center;
//           padding: 40px 20px;
//           color: #94a3b8;
//         }

//         .empty-icon {
//           font-size: 44px;
//           margin-bottom: 10px;
//           display: block;
//           opacity: 0.5;
//         }

//         .empty-text {
//           font-family: 'Sora', sans-serif;
//           font-size: 14px;
//           font-weight: 500;
//         }

//         /* Skeleton */
//         .skeleton {
//           background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
//           background-size: 200% 100%;
//           animation: shimmer 1.4s infinite;
//           border-radius: 10px;
//         }

//         @keyframes shimmer {
//           0% { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }

//         .sk-card {
//           background: #fff;
//           border-radius: 16px;
//           padding: 16px;
//           box-shadow: 0 2px 12px rgba(30,58,138,0.07);
//           margin-bottom: 12px;
//         }
//       `}</style>

//       <div className="ann-root">
//         {/* Header */}
//         <div className="ann-header">
//           <div className="ann-header-inner">
//             <div className="ann-badge">
//               <span>📡</span> Live Updates
//             </div>
//             <h1 className="ann-title">Announcements</h1>
//             <p className="ann-subtitle">Stay updated with school & class news</p>
//           </div>
//         </div>

//         <div className="ann-body">

//           {/* Tabs */}
//           <div className="tab-card">
//             <div className="tab-bar">
//               <button
//                 className={`tab-btn ${activeTab === "school" ? "active-school" : ""}`}
//                 onClick={() => setActiveTab("school")}
//               >
//                 🏫 School
//                 <span className="tab-count">{school.length}</span>
//                 <div className="tab-indicator" />
//               </button>
//               <button
//                 className={`tab-btn ${activeTab === "class" ? "active-class" : ""}`}
//                 onClick={() => setActiveTab("class")}
//               >
//                 📚 My Class
//                 <span className="tab-count">{classAnn.length}</span>
//                 <div className="tab-indicator" />
//               </button>
//             </div>
//           </div>

//           {/* Loading Skeletons */}
//           {loading && (
//             <div>
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="sk-card">
//                   <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
//                     <div className="skeleton" style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0 }} />
//                     <div style={{ flex: 1 }}>
//                       <div className="skeleton" style={{ height: 12, width: "40%", marginBottom: 6 }} />
//                       <div className="skeleton" style={{ height: 10, width: "25%" }} />
//                     </div>
//                   </div>
//                   <div className="skeleton" style={{ height: 12, width: "95%", marginBottom: 6 }} />
//                   <div className="skeleton" style={{ height: 12, width: "70%" }} />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Cards */}
//           {!loading && (
//             <div className="ann-list">
//               {activeList.length === 0 ? (
//                 <div className="empty-state">
//                   <span className="empty-icon">{activeTab === "school" ? "🏫" : "📚"}</span>
//                   <p className="empty-text">No announcements yet</p>
//                 </div>
//               ) : (
//                 activeList.map((a, idx) => {
//                   const isSchool = a.target_type === "all"
//                   const name = a.users?.full_name || (isSchool ? "Admin" : "Teacher")
//                   const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
//                   const isNew = (new Date() - new Date(a.created_at)) < 3600000

//                   return (
//                     <div
//                       key={a.id}
//                       className={`ann-card ${isSchool ? "school-card" : "class-card"}`}
//                       style={{ animationDelay: `${idx * 0.06}s` }}
//                     >
//                       <div className="ann-card-top">
//                         <div className={`ann-avatar ${isSchool ? "school-av" : "class-av"}`}>
//                           {initials}
//                         </div>
//                         <div className="ann-sender-info">
//                           <div className="ann-sender-name">
//                             {name}
//                             {isNew && <span className="new-dot" />}
//                           </div>
//                           <div className="ann-sender-role">
//                             {isSchool ? "School Administration" : "Class Teacher"}
//                           </div>
//                         </div>
//                         <div className="ann-time">{formatTime(a.created_at)}</div>
//                       </div>
//                       <div className="ann-divider" />
//                       <p className="ann-message">{a.message}</p>
//                     </div>
//                   )
//                 })
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default StudentViewAnnouncement






















import { useEffect, useState } from "react"
import API from "../services/api"
import supabase from "../services/supabase"
import BookLoader from "../components/BookLoader"

function StudentViewAnnouncement() {
  const [school, setSchool] = useState([])
  const [classAnn, setClassAnn] = useState([])
  const [studentClassId, setStudentClassId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("school")

  useEffect(() => {
    fetchData()

    const channel = supabase
      .channel("announcements-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "class_announcements",
        },
        (payload) => {
          const newAnn = payload.new
          if (newAnn.target_type === "all") {
            setSchool((prev) => [newAnn, ...prev])
          } else if (
            newAnn.target_type === "class" &&
            newAnn.class_id === studentClassId
          ) {
            setClassAnn((prev) => [newAnn, ...prev])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [studentClassId])

  const fetchData = async () => {
    try {
      const res = await API.get("/student/announcements")
      const all = res.data || []
      const schoolData = all.filter((a) => a.target_type === "all")
      const classData = all.filter((a) => a.target_type === "class")
      setSchool(schoolData)
      setClassAnn(classData)
      if (classData.length > 0) {
        setStudentClassId(classData[0].class_id)
      }
    } catch (err) {
      console.log("Fetch error:", err)
    }
    setLoading(false)
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
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  }

  const activeList = activeTab === "school" ? school : classAnn

  if (loading) return <BookLoader />

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');

        .ann-root {
          font-family: 'DM Sans', sans-serif;
          background: #f0f4ff;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ✅ STICKY HEADER */
        .ann-sticky-top {
          flex-shrink: 0;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .ann-header {
          background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #2563eb 100%);
          padding: 24px 20px 60px;
          position: relative;
          overflow: hidden;
        }

        .ann-header::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 200px; height: 200px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
        }

        .ann-header::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -20px;
          width: 160px; height: 160px;
          background: rgba(255,255,255,0.04);
          border-radius: 50%;
        }

        .ann-header-inner {
          max-width: 640px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .ann-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.15);
          color: #bfdbfe;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 8px;
          backdrop-filter: blur(4px);
        }

        .ann-title {
          font-family: 'Sora', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 2px;
          letter-spacing: -0.3px;
        }

        .ann-subtitle {
          color: #93c5fd;
          font-size: 13px;
          margin: 0;
        }

        /* ✅ TAB CARD - STICKY OVERLAPPING HEADER */
        .tab-wrapper {
          max-width: 640px;
          margin: -36px auto 0;
          padding: 0 16px;
          position: relative;
          z-index: 11;
        }

        .tab-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 24px rgba(30,58,138,0.10);
          overflow: hidden;
        }

        .tab-bar {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 12px;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #94a3b8;
          transition: all 0.2s;
          position: relative;
          letter-spacing: -0.1px;
        }

        .tab-btn.active-school {
          color: #1d4ed8;
          background: #eff6ff;
        }

        .tab-btn.active-class {
          color: #059669;
          background: #f0fdf4;
        }

        .tab-btn .tab-count {
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 20px;
          min-width: 20px;
          text-align: center;
        }

        .tab-btn.active-school .tab-count {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .tab-btn.active-class .tab-count {
          background: #d1fae5;
          color: #059669;
        }

        .tab-btn:not(.active-school):not(.active-class) .tab-count {
          background: #f1f5f9;
          color: #94a3b8;
        }

        .tab-indicator {
          height: 3px;
          background: transparent;
          transition: background 0.2s;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .tab-btn.active-school .tab-indicator { background: #1d4ed8; }
        .tab-btn.active-class .tab-indicator { background: #059669; }

        /* ✅ SCROLLABLE BODY */
        .ann-scroll-area {
          flex: 1;
          overflow-y: auto;
          padding: 16px 16px 32px;
        }

        .ann-scroll-area::-webkit-scrollbar {
          width: 6px;
        }
        .ann-scroll-area::-webkit-scrollbar-track {
          background: transparent;
        }
        .ann-scroll-area::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .ann-scroll-area::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .ann-list-inner {
          max-width: 640px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Announcement Cards */
        .ann-card {
          background: #fff;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 2px 12px rgba(30,58,138,0.07);
          border-left: 4px solid transparent;
          animation: slideIn 0.3s ease both;
          transition: transform 0.15s, box-shadow 0.15s;
        }

        .ann-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(30,58,138,0.12);
        }

        .ann-card.school-card { border-left-color: #3b82f6; }
        .ann-card.class-card { border-left-color: #10b981; }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ann-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .ann-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .ann-avatar.school-av { background: #dbeafe; color: #1d4ed8; }
        .ann-avatar.class-av { background: #d1fae5; color: #059669; }

        .ann-sender-info {
          flex: 1;
          margin-left: 10px;
        }

        .ann-sender-name {
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.2;
        }

        .ann-sender-role {
          font-size: 11px;
          color: #94a3b8;
          margin-top: 1px;
        }

        .ann-time {
          font-size: 11px;
          color: #94a3b8;
          white-space: nowrap;
          font-weight: 500;
        }

        .ann-message {
          font-size: 14px;
          color: #334155;
          line-height: 1.6;
          margin: 0;
        }

        .ann-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 10px 0;
        }

        .new-dot {
          display: inline-block;
          width: 7px; height: 7px;
          background: #ef4444;
          border-radius: 50%;
          margin-left: 4px;
          vertical-align: middle;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #94a3b8;
        }

        .empty-icon {
          font-size: 44px;
          margin-bottom: 10px;
          display: block;
          opacity: 0.5;
        }

        .empty-text {
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>

      <div className="ann-root">

        {/* ✅ STICKY TOP SECTION */}
        <div className="ann-sticky-top">

          {/* Header */}
          <div className="ann-header">
            <div className="ann-header-inner">
              <div className="ann-badge">
                <span>📡</span> Live Updates
              </div>
              <h1 className="ann-title">Announcements</h1>
              <p className="ann-subtitle">Stay updated with school & class news</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="tab-wrapper">
            <div className="tab-card">
              <div className="tab-bar">
                <button
                  className={`tab-btn ${activeTab === "school" ? "active-school" : ""}`}
                  onClick={() => setActiveTab("school")}
                >
                  🏫 School
                  <span className="tab-count">{school.length}</span>
                  <div className="tab-indicator" />
                </button>
                <button
                  className={`tab-btn ${activeTab === "class" ? "active-class" : ""}`}
                  onClick={() => setActiveTab("class")}
                >
                  📚 My Class
                  <span className="tab-count">{classAnn.length}</span>
                  <div className="tab-indicator" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ✅ SCROLLABLE CARDS AREA */}
        <div className="ann-scroll-area">
          <div className="ann-list-inner">

            {activeList.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">
                  {activeTab === "school" ? "🏫" : "📚"}
                </span>
                <p className="empty-text">No announcements yet</p>
              </div>
            ) : (
              activeList.map((a, idx) => {
                const isSchool = a.target_type === "all"
                const name = a.users?.full_name || (isSchool ? "Admin" : "Teacher")
                const initials = name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
                const isNew = new Date() - new Date(a.created_at) < 3600000

                return (
                  <div
                    key={a.id}
                    className={`ann-card ${isSchool ? "school-card" : "class-card"}`}
                    style={{ animationDelay: `${idx * 0.06}s` }}
                  >
                    <div className="ann-card-top">
                      <div className={`ann-avatar ${isSchool ? "school-av" : "class-av"}`}>
                        {initials}
                      </div>
                      <div className="ann-sender-info">
                        <div className="ann-sender-name">
                          {name}
                          {isNew && <span className="new-dot" />}
                        </div>
                        <div className="ann-sender-role">
                          {isSchool ? "School Administration" : "Class Teacher"}
                        </div>
                      </div>
                      <div className="ann-time">{formatTime(a.created_at)}</div>
                    </div>
                    <div className="ann-divider" />
                    <p className="ann-message">{a.message}</p>
                  </div>
                )
              })
            )}

          </div>
        </div>

      </div>
    </>
  )
}

export default StudentViewAnnouncement