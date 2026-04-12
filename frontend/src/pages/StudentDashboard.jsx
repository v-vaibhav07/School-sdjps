// import { useEffect, useState } from "react"
// import API from "../services/api"

// function StudentDashboard() {

//   const [profile, setProfile] = useState(null)

//   const fetchProfile = async () => {

//     const res = await API.get("/student/profile")

//     setProfile(res.data)

//   }

//   useEffect(() => {

//     fetchProfile()

//   }, [])

//   if (!profile) return <p>Loading...</p>

//   return (

//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         Welcome {profile.full_name}
//       </h1>

//       <div className="grid grid-cols-3 gap-6">

//         <div className="bg-white p-6 shadow rounded">
//           <p className="text-gray-500">Class</p>
//           <h2 className="text-xl font-bold">
//             {profile.class_name}
//           </h2>
//         </div>

//         <div className="bg-white p-6 shadow rounded">
//           <p className="text-gray-500">Section</p>
//           <h2 className="text-xl font-bold">
//             {profile.section}
//           </h2>
//         </div>

//         <div className="bg-white p-6 shadow rounded">
//           <p className="text-gray-500">Roll Number</p>
//           <h2 className="text-xl font-bold">
//             {profile.roll_number}
//           </h2>
//         </div>

//       </div>

//     </div>

//   )

// }

// export default StudentDashboard







// import { useEffect, useState } from "react"
// import API from "../services/api"
// import {
//   Calendar,
//   BookOpen,
//   ClipboardList,
//   Plus,
//   Check
// } from "lucide-react"

// function StudentDashboard() {

//   const [data, setData] = useState(null)
//   const [taskInput, setTaskInput] = useState("")
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchDashboard()
//   }, [])

//   const fetchDashboard = async () => {
//     try {
//       const res = await API.get("/student/dashboard")
//       setData(res.data)
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ✅ ADD TASK (DB)
//   const addTask = async () => {
//     if (!taskInput.trim()) return

//     try {
//       await API.post("/student/task", { task: taskInput })
//       setTaskInput("")
//       fetchDashboard()
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   // ✅ TOGGLE TASK (tick)
//   const toggleTask = async (id) => {
//     try {
//       await API.patch(`/student/task/${id}`)
//       fetchDashboard()
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   if (loading) return <div className="p-6">Loading...</div>

//   return (
//     <div className="p-6 space-y-6">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <p className="text-gray-500">Today's Overview 📅</p>
//       </div>

//       {/* TODAY CLASSES */}
//       <div>
//         <h2 className="text-lg font-semibold mb-3">Today's Classes</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

//           {data?.classes?.length > 0 ? (
//             data.classes.map((cls, i) => (
//               <div key={i} className="bg-white shadow rounded-2xl p-5">

//                 <div className="flex items-center gap-3 mb-3">
//                   <Calendar className="text-blue-600"/>
//                   <h3 className="font-semibold">{cls.subject}</h3>
//                 </div>

//                 <p className="text-sm text-gray-500">
//                   Teacher: {cls.teacher}
//                 </p>

//                 <p className="text-sm text-gray-500">
//                   Time: {cls.time}
//                 </p>

//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No classes today</p>
//           )}

//         </div>
//       </div>

//       {/* TASKS + HOMEWORK */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* ✅ TASK SECTION (FINAL) */}
//         <div className="bg-white p-5 rounded-2xl shadow">

//           <h2 className="font-semibold mb-3 flex items-center gap-2">
//             <ClipboardList size={18}/> My Tasks
//           </h2>

//           {/* INPUT */}
//           <div className="flex gap-2 mb-4">
//             <input
//               value={taskInput}
//               onChange={(e) => setTaskInput(e.target.value)}
//               placeholder="Write note..."
//               className="flex-1 border p-2 rounded-lg"
//             />
//             <button
//               onClick={addTask}
//               className="bg-blue-600 text-white px-4 rounded-lg"
//             >
//               <Plus size={18}/>
//             </button>
//           </div>

//           {/* TASK LIST */}
//           <div className="space-y-3">

//             {data?.tasks?.length > 0 ? (
//               data.tasks.map((task) => (
//                 <div
//                   key={task.id}
//                   className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
//                 >
//                   <p className={task.is_done ? "line-through text-gray-400" : ""}>
//                     {task.task}
//                   </p>

//                   <button
//                     onClick={() => toggleTask(task.id)}
//                     className={`p-2 rounded ${
//                       task.is_done ? "bg-green-500" : "bg-gray-300"
//                     }`}
//                   >
//                     <Check size={16} className="text-white"/>
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-sm">No tasks</p>
//             )}

//           </div>

//         </div>

//         {/* HOMEWORK */}
//         <div className="bg-white p-5 rounded-2xl shadow">

//           <h2 className="font-semibold mb-3 flex items-center gap-2">
//             <BookOpen size={18}/> Homework
//           </h2>

//           {data?.homework?.length > 0 ? (
//             data.homework.map((hw, i) => (
//               <div key={i} className="mb-3 p-3 bg-gray-100 rounded-lg">
//                 <p className="font-medium">{hw.title}</p>
//                 <p className="text-sm text-gray-500">
//                   Due: {hw.due_date}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No homework</p>
//           )}

//         </div>

//       </div>

//     </div>
//   )
// }

// export default StudentDashboard

















// import { useEffect, useState } from "react"
// import API from "../services/api"
// import {
//   Calendar,
//   BookOpen,
//   ClipboardList,
//   Plus,
//   Check
// } from "lucide-react"

// function StudentDashboard() {

//   const [data, setData] = useState(null)
//   const [taskInput, setTaskInput] = useState("")
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchDashboard()
//   }, [])

//   const fetchDashboard = async () => {
//     try {
//       const res = await API.get("/student/dashboard")
//       setData(res.data)
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ✅ ADD TASK (instant)
//   const addTask = async () => {
//     if (!taskInput.trim()) return

//     const newTask = {
//       id: Date.now(),
//       task: taskInput,
//       is_done: false
//     }

//     setData((prev) => ({
//       ...prev,
//       tasks: [newTask, ...(prev.tasks || [])]
//     }))

//     setTaskInput("")

//     try {
//       await API.post("/student/task", { task: taskInput })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   // ✅ TOGGLE TASK
//   const toggleTask = async (id) => {
//     setData((prev) => ({
//       ...prev,
//       tasks: prev.tasks.map((t) =>
//         t.id === id ? { ...t, is_done: !t.is_done } : t
//       )
//     }))

//     try {
//       await API.patch(`/student/task/${id}`)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   // ✅ DELETE TASK
//   const deleteTask = async (id) => {

//     if (!window.confirm("Delete this task?")) return

//     setData((prev) => ({
//       ...prev,
//       tasks: prev.tasks.filter((t) => t.id !== id)
//     }))

//     try {
//       await API.delete(`/student/task/${id}`)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   if (loading) return <div className="p-6">Loading...</div>

//   return (
//     <div className="p-6 space-y-6">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <p className="text-gray-500">Today's Overview 📅</p>
//       </div>

//       {/* TODAY CLASSES */}
//       <div>
//         <h2 className="text-lg font-semibold mb-3">Today's Classes</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

//           {data?.classes?.length > 0 ? (
//             data.classes.map((cls, i) => (
//               <div key={i} className="bg-white shadow rounded-2xl p-5">

//                 <div className="flex items-center gap-3 mb-3">
//                   <Calendar className="text-blue-600"/>
//                   <h3 className="font-semibold">{cls.subject}</h3>
//                 </div>

//                 <p className="text-sm text-gray-500">
//                   Teacher: {cls.teacher || "N/A"}
//                 </p>

//                 <p className="text-sm text-gray-500">
//                   Time: {cls.time}
//                 </p>

//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No classes today</p>
//           )}

//         </div>
//       </div>

//       {/* TASKS + HOMEWORK */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* TASKS */}
//         <div className="bg-white p-5 rounded-2xl shadow">

//           <h2 className="font-semibold mb-3 flex items-center gap-2">
//             <ClipboardList size={18}/> My Tasks
//           </h2>

//           {/* INPUT */}
//           <div className="flex gap-2 mb-4">
//             <input
//               value={taskInput}
//               onChange={(e) => setTaskInput(e.target.value)}
//               placeholder="Write note..."
//               className="flex-1 border p-2 rounded-lg"
//             />
//             <button
//               onClick={addTask}
//               className="bg-blue-600 text-white px-4 rounded-lg"
//             >
//               <Plus size={18}/>
//             </button>
//           </div>

//           {/* TASK LIST */}
//           <div className="space-y-3">

//             {data?.tasks?.length > 0 ? (
//               data.tasks.map((task) => (
//                 <div
//                   key={task.id}
//                   className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
//                 >
//                   <p className={task.is_done ? "line-through text-gray-400" : ""}>
//                     {task.task}
//                   </p>

//                   <div className="flex gap-2">

//                     {/* Toggle */}
//                     <button
//                       onClick={() => toggleTask(task.id)}
//                       className={`p-2 rounded ${
//                         task.is_done ? "bg-green-500" : "bg-gray-300"
//                       }`}
//                     >
//                       <Check size={16} className="text-white"/>
//                     </button>

//                     {/* Delete */}
//                     <button
//                       onClick={() => deleteTask(task.id)}
//                       className="p-2 bg-red-500 text-white rounded"
//                     >
//                       ✕
//                     </button>

//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-sm">No tasks</p>
//             )}

//           </div>

//         </div>

//         {/* HOMEWORK */}
//         <div className="bg-white p-5 rounded-2xl shadow">

//           <h2 className="font-semibold mb-3 flex items-center gap-2">
//             <BookOpen size={18}/> Homework
//           </h2>

//           {data?.homework?.length > 0 ? (
//             data.homework.map((hw, i) => (
//               <div key={i} className="mb-3 p-3 bg-gray-100 rounded-lg">
//                 <p className="font-medium">{hw.title}</p>
//                 <p className="text-sm text-gray-500">
//                   Due: {hw.due_date}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No homework</p>
//           )}

//         </div>

//       </div>

//     </div>
//   )
// }

// export default StudentDashboard




















// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { Calendar, ClipboardList, Plus, Check, Trash2 } from "lucide-react"
// // import AIChat from "../components/AIChat"

// function StudentDashboard() {

//   const [data, setData] = useState(null)
//   const [taskInput, setTaskInput] = useState("")
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchDashboard()
//   }, [])

//   const fetchDashboard = async () => {
//     try {
//       const res = await API.get("/student/dashboard")
//       setData(res.data)
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const addTask = async () => {
//     if (!taskInput.trim()) return

//     const newTask = {
//       id: Date.now(),
//       task: taskInput,
//       is_done: false
//     }

//     setData((prev) => ({
//       ...prev,
//       tasks: [newTask, ...(prev.tasks || [])]
//     }))

//     setTaskInput("")

//     try {
//       await API.post("/student/task", { task: taskInput })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const toggleTask = async (id) => {
//     setData((prev) => ({
//       ...prev,
//       tasks: prev.tasks.map((t) =>
//         t.id === id ? { ...t, is_done: !t.is_done } : t
//       )
//     }))

//     try {
//       await API.patch(`/student/task/${id}`)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const deleteTask = async (id) => {
//     if (!window.confirm("Delete this task?")) return

//     setData((prev) => ({
//       ...prev,
//       tasks: prev.tasks.filter((t) => t.id !== id)
//     }))

//     try {
//       await API.delete(`/student/task/${id}`)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") addTask()
//   }

//   const today = new Date().toLocaleDateString("en-IN", {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//   })

//   const doneCount = data?.tasks?.filter((t) => t.is_done).length || 0
//   const totalTasks = data?.tasks?.length || 0

//   if (loading) return <div className="p-6">Loading...</div>

//   return (

//     <div className="p-4 md:p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <p className="text-gray-500 text-sm">{today}</p>
//         </div>
//         <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//           Today's Overview
//         </span>
//       </div>

//       {/* TASK STATS */}
//       <div className="bg-white p-5 rounded-xl shadow mb-6">

//         <p className="text-sm text-gray-500 mb-1">
//           Tasks Done
//         </p>

//         <p className="text-3xl font-bold">
//           {doneCount}/{totalTasks}
//         </p>

//         <p className="text-xs text-gray-500">
//           completed today
//         </p>

//       </div>

//       {/* TASK PANEL */}
//       <div className="bg-white p-5 rounded-xl shadow">

//         <h2 className="font-semibold mb-4 flex items-center gap-2">
//           <ClipboardList size={18} />
//           My Tasks
//         </h2>

//         {/* INPUT */}
//         <div className="flex gap-2 mb-4">

//           <input
//             value={taskInput}
//             onChange={(e) => setTaskInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Add a new task..."
//             className="flex-1 border p-2 rounded-lg"
//           />

//           <button
//             onClick={addTask}
//             className="bg-blue-600 text-white px-3 rounded-lg"
//           >
//             <Plus size={18} />
//           </button>

//         </div>

//         {/* TASK LIST */}
//         <div className="space-y-2">

//           {data?.tasks?.length > 0 ? (
//             data.tasks.map((task) => (

//               <div
//                 key={task.id}
//                 className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
//               >

//                 <p className={task.is_done ? "line-through text-gray-400" : ""}>
//                   {task.task}
//                 </p>

//                 <div className="flex gap-2">

//                   <button
//                     onClick={() => toggleTask(task.id)}
//                     className={`p-2 rounded ${
//                       task.is_done
//                         ? "bg-green-500 text-white"
//                         : "bg-gray-200"
//                     }`}
//                   >
//                     <Check size={14} />
//                   </button>

//                   <button
//                     onClick={() => deleteTask(task.id)}
//                     className="bg-red-100 text-red-600 p-2 rounded"
//                   >
//                     <Trash2 size={14} />
//                   </button>

//                 </div>

//               </div>

//             ))
//           ) : (
//             <p className="text-gray-400 text-sm">
//               No tasks yet — add one above!
//             </p>
//           )}

//         </div>

//       </div>
          
//     </div>
//   )
// }

// export default StudentDashboard










































// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { Calendar, ClipboardList, Plus, Check, Trash2 } from "lucide-react"
// import AIChat from "../pages/AIChat"

// function StudentDashboard() {

//   const [data, setData] = useState(null)
//   const [taskInput, setTaskInput] = useState("")
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchDashboard()
//   }, [])

//   const fetchDashboard = async () => {
//     try {
//       const res = await API.get("/student/dashboard")
//       setData(res.data)
//     } catch (err) {
//       console.log(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const addTask = async () => {
//     if (!taskInput.trim()) return

//     const newTask = {
//       id: Date.now(),
//       task: taskInput,
//       is_done: false
//     }

//     setData((prev) => ({
//       ...prev,
//       tasks: [newTask, ...(prev.tasks || [])]
//     }))

//     setTaskInput("")

//     try {
//       await API.post("/student/task", { task: taskInput })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const toggleTask = async (id) => {
//     setData((prev) => ({
//       ...prev,
//       tasks: prev.tasks.map((t) =>
//         t.id === id ? { ...t, is_done: !t.is_done } : t
//       )
//     }))

//     try {
//       await API.patch(`/student/task/${id}`)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const deleteTask = async (id) => {
//     if (!window.confirm("Delete this task?")) return

//     setData((prev) => ({
//       ...prev,
//       tasks: prev.tasks.filter((t) => t.id !== id)
//     }))

//     try {
//       await API.delete(`/student/task/${id}`)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") addTask()
//   }

//   const today = new Date().toLocaleDateString("en-IN", {
//     weekday: "long",
//     day: "numeric",
//     month: "long"
//   })

//   const doneCount = data?.tasks?.filter((t) => t.is_done).length || 0
//   const totalTasks = data?.tasks?.length || 0

//   if (loading) return <div className="p-6">Loading...</div>

//   return (

//     <div className="p-4 md:p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <p className="text-gray-500 text-sm">{today}</p>
//         </div>
//         <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
//           Today's Overview
//         </span>
//       </div>

//       {/* TASK STATS */}
//       <div className="bg-white p-5 rounded-xl shadow mb-6">
//         <p className="text-sm text-gray-500 mb-1">Tasks Done</p>
//         <p className="text-3xl font-bold">
//           {doneCount}/{totalTasks}
//         </p>
//         <p className="text-xs text-gray-500">completed today</p>
//       </div>

//       {/* TASK PANEL */}
//       <div className="bg-white p-5 rounded-xl shadow mb-6">

//         <h2 className="font-semibold mb-4 flex items-center gap-2">
//           <ClipboardList size={18} />
//           My Tasks
//         </h2>

//         {/* INPUT */}
//         <div className="flex gap-2 mb-4">

//           <input
//             value={taskInput}
//             onChange={(e) => setTaskInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Add a new task..."
//             className="flex-1 border p-2 rounded-lg"
//           />

//           <button
//             onClick={addTask}
//             className="bg-blue-600 text-white px-3 rounded-lg"
//           >
//             <Plus size={18} />
//           </button>

//         </div>

//         {/* TASK LIST */}
//         <div className="space-y-2">

//           {data?.tasks?.length > 0 ? (
//             data.tasks.map((task) => (

//               <div
//                 key={task.id}
//                 className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
//               >

//                 <p className={task.is_done ? "line-through text-gray-400" : ""}>
//                   {task.task}
//                 </p>

//                 <div className="flex gap-2">

//                   <button
//                     onClick={() => toggleTask(task.id)}
//                     className={`p-2 rounded ${
//                       task.is_done
//                         ? "bg-green-500 text-white"
//                         : "bg-gray-200"
//                     }`}
//                   >
//                     <Check size={14} />
//                   </button>

//                   <button
//                     onClick={() => deleteTask(task.id)}
//                     className="bg-red-100 text-red-600 p-2 rounded"
//                   >
//                     <Trash2 size={14} />
//                   </button>

//                 </div>

//               </div>

//             ))
//           ) : (
//             <p className="text-gray-400 text-sm">
//               No tasks yet — add one above!
//             </p>
//           )}

//         </div>

//       </div>

//       {/* 🤖 AI CHAT SECTION */}
//       <div className="mt-6">
//         <AIChat />
//       </div>

//     </div>
//   )
// }

// export default StudentDashboard

















import { useEffect, useState } from "react"
import API from "../services/api"
import { Calendar, ClipboardList, Plus, Check, Trash2, Sparkles } from "lucide-react"
// import AIChat from "../pages/AIChat"
import BookLoader from "../components/BookLoader"

const dmSansStyle = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap');

  * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

  .dash-root {
    min-height: 100vh;
    background: #f0f2f7;
    padding: 0;
  }

  .dash-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 28px 20px 60px;
  }

  /* HEADER */
  .dash-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .dash-title {
    font-size: 28px;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.5px;
    margin: 0 0 4px;
  }

  .dash-date {
    font-size: 13px;
    color: #6b7280;
    font-weight: 500;
  }

  .dash-badge {
    background: linear-gradient(135deg, #3b5bdb, #4dabf7);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 16px;
    border-radius: 999px;
    letter-spacing: 0.3px;
    white-space: nowrap;
    box-shadow: 0 4px 14px rgba(59,91,219,0.3);
  }

  /* STATS GRID */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }

  @media (max-width: 500px) {
    .stats-grid { grid-template-columns: 1fr; }
  }

  .stat-card {
    background: #fff;
    border-radius: 20px;
    padding: 22px 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b5bdb, #4dabf7);
    border-radius: 20px 20px 0 0;
  }

  .stat-card.green::before { background: linear-gradient(90deg, #12b886, #38d9a9); }

  .stat-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #9ca3af;
    margin-bottom: 8px;
  }

  .stat-number {
    font-size: 42px;
    font-weight: 800;
    color: #111827;
    line-height: 1;
    letter-spacing: -1.5px;
  }

  .stat-sub {
    font-size: 12px;
    color: #9ca3af;
    margin-top: 6px;
    font-weight: 500;
  }

  .stat-fraction {
    font-size: 20px;
    font-weight: 800;
    color: #6b7280;
    letter-spacing: -0.5px;
  }

  /* TASK PANEL */
  .panel {
    background: #fff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    margin-bottom: 20px;
  }

  .panel-title {
    font-size: 15px;
    font-weight: 800;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    letter-spacing: -0.2px;
  }

  .panel-title svg { color: #3b5bdb; }

  /* INPUT ROW */
  .task-input-row {
    display: flex;
    gap: 10px;
    margin-bottom: 18px;
  }

  .task-input {
    flex: 1;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 11px 16px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    color: #111827;
    outline: none;
    transition: border-color 0.2s;
    background: #f9fafb;
  }

  .task-input:focus {
    border-color: #3b5bdb;
    background: #fff;
  }

  .task-input::placeholder { color: #9ca3af; }

  .add-btn {
    background: linear-gradient(135deg, #3b5bdb, #4dabf7);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 0 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 14px rgba(59,91,219,0.35);
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .add-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(59,91,219,0.4);
  }

  .add-btn:active { transform: translateY(0); }

  /* TASK LIST */
  .task-list { display: flex; flex-direction: column; gap: 10px; }

  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8f9fc;
    border: 1.5px solid #e5e7eb;
    border-radius: 14px;
    padding: 14px 16px;
    transition: border-color 0.2s, background 0.2s;
    gap: 10px;
  }

  .task-item:hover { border-color: #d1d5db; background: #f3f4f8; }
  .task-item.done { opacity: 0.7; }

  .task-text {
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
    flex: 1;
    line-height: 1.4;
  }

  .task-text.crossed {
    text-decoration: line-through;
    color: #9ca3af;
  }

  .task-actions { display: flex; gap: 8px; flex-shrink: 0; }

  .btn-check {
    width: 34px; height: 34px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }

  .btn-check.unchecked { background: #e5e7eb; color: #6b7280; }
  .btn-check.unchecked:hover { background: #d1fae5; color: #059669; }
  .btn-check.checked { background: linear-gradient(135deg, #12b886, #38d9a9); color: #fff; }

  .btn-del {
    width: 34px; height: 34px;
    border-radius: 10px;
    border: none;
    background: #fee2e2;
    color: #ef4444;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }

  .btn-del:hover { background: #ef4444; color: #fff; }

  .empty-msg {
    text-align: center;
    color: #9ca3af;
    font-size: 13px;
    font-weight: 500;
    padding: 30px 0;
  }

  /* LOADING */
  .loading-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #f0f2f7;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #3b5bdb;
    gap: 10px;
  }

  .spinner {
    width: 22px; height: 22px;
    border: 3px solid #e5e7eb;
    border-top-color: #3b5bdb;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`

function StudentDashboard() {
  const [data, setData] = useState(null)
  const [taskInput, setTaskInput] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchDashboard() }, [])

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/student/dashboard")
      setData(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async () => {
    if (!taskInput.trim()) return
    const newTask = { id: Date.now(), task: taskInput, is_done: false }
    setData((prev) => ({ ...prev, tasks: [newTask, ...(prev.tasks || [])] }))
    setTaskInput("")
    try { await API.post("/student/task", { task: taskInput }) }
    catch (err) { console.log(err) }
  }

  const toggleTask = async (id) => {
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => t.id === id ? { ...t, is_done: !t.is_done } : t)
    }))
    try { await API.patch(`/student/task/${id}`) }
    catch (err) { console.log(err) }
  }

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return
    setData((prev) => ({ ...prev, tasks: prev.tasks.filter((t) => t.id !== id) }))
    try { await API.delete(`/student/task/${id}`) }
    catch (err) { console.log(err) }
  }

  const handleKeyDown = (e) => { if (e.key === "Enter") addTask() }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long"
  })

  const doneCount = data?.tasks?.filter((t) => t.is_done).length || 0
  const totalTasks = data?.tasks?.length || 0
  const percent = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0

  // if (loading) return (
  //   <div className="loading-screen">
  //     <style>{dmSansStyle}</style>
  //     <div className="spinner" />
  //     Loading your dashboard...
  //   </div>
  // )
  if (loading) return <BookLoader />
  
  return (
    <div className="dash-root">
      <style>{dmSansStyle}</style>
      <div className="dash-inner">

        {/* HEADER */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Good Morning 👋</h1>
            <p className="dash-date">{today}</p>
          </div>
          <span className="dash-badge">Today's Overview</span>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Tasks Done</div>
            <div>
              <span className="stat-number">{doneCount}</span>
              <span className="stat-fraction"> / {totalTasks}</span>
            </div>
            <div className="stat-sub">completed today</div>
          </div>
          <div className="stat-card green">
            <div className="stat-label">Progress</div>
            <div className="stat-number">{percent}<span style={{fontSize:20,fontWeight:800}}>%</span></div>
            <div className="stat-sub">of today's tasks</div>
          </div>
        </div>

        {/* TASK PANEL */}
        <div className="panel">
          <div className="panel-title">
            <ClipboardList size={18} />
            My Tasks
          </div>

          <div className="task-input-row">
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
              className="task-input"
            />
            <button onClick={addTask} className="add-btn">
              <Plus size={20} />
            </button>
          </div>

          <div className="task-list">
            {data?.tasks?.length > 0 ? (
              data.tasks.map((task) => (
                <div key={task.id} className={`task-item ${task.is_done ? "done" : ""}`}>
                  <p className={`task-text ${task.is_done ? "crossed" : ""}`}>{task.task}</p>
                  <div className="task-actions">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`btn-check ${task.is_done ? "checked" : "unchecked"}`}
                    >
                      <Check size={15} />
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="btn-del">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-msg">✅ No tasks yet — add one above!</div>
            )}
          </div>
        </div>

        {/* AI CHAT */}
        {/* <AIChat /> */}

      </div>
    </div>
  )
}

export default StudentDashboard