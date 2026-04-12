
// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

// function ClassDetails() {

//   const { id } = useParams()

//   const [classInfo, setClassInfo] = useState(null)
//   const [timetable, setTimetable] = useState([])
//   const [teachers, setTeachers] = useState([])

//   const [showModal, setShowModal] = useState(false)

//   const [form, setForm] = useState({
//     subject: "",
//     teacher_id: "",
//     day: "Monday",
//     start_time: "",
//     end_time: ""
//   })


//   // ======================
//   // Fetch Timetable
//   // ======================

//   const fetchTimetable = async () => {

//     try {

//       const res = await API.get(`/timetable/${id}`)

//       setClassInfo(res.data.class)
//       setTimetable(res.data.timetable)

//     } catch (err) {

//       console.log(err)

//     }

//   }


//   // ======================
//   // Fetch Teachers
//   // ======================

//   const fetchTeachers = async () => {

//     const res = await API.get("/teacher")

//     setTeachers(res.data)

//   }


//   useEffect(() => {

//     fetchTimetable()
//     fetchTeachers()

//   }, [])


//   // ======================
//   // Add Subject
//   // ======================

//   const addSubject = async () => {

//     try {

//       await API.post("/timetable", {
//         class_id: id,
//         ...form
//       })

//       setShowModal(false)

//       fetchTimetable()

//     } catch (err) {

//       console.log(err)

//     }

//   }


//   // ======================
//   // Build timetable map
//   // ======================

//   const timetableMap = {}

//   timetable.forEach((row) => {

//     if (!timetableMap[row.start_time]) {
//       timetableMap[row.start_time] = {}
//     }

//     timetableMap[row.start_time][row.day] = row

//   })


//   return (

//     <div className="p-6">

//       {/* HEADER */}

//       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">

//         <div>

//           <h1 className="text-3xl font-bold">

//             Class {classInfo?.class_name}-{classInfo?.section}

//           </h1>

//           <p className="text-gray-500">

//             Academic Year {classInfo?.academic_year}

//           </p>

//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//         >
//           + Add Subject
//         </button>

//       </div>


//       {/* TIMETABLE GRID */}

//       <div className="overflow-x-auto">

//         <table className="min-w-[700px] w-full border rounded-xl overflow-hidden">

//           <thead className="bg-gray-100">

//             <tr>

//               <th className="p-3 text-left">Time</th>

//               {days.map(day => (

//                 <th key={day} className="p-3 text-left">

//                   {day}

//                 </th>

//               ))}

//             </tr>

//           </thead>

//           <tbody>

//             {Object.keys(timetableMap).map(time => (

//               <tr key={time} className="border-t">

//                 <td className="p-3 font-medium">

//                   {time}

//                 </td>

//                 {days.map(day => {

//                   const slot = timetableMap[time][day]

//                   return (

//                     <td key={day} className="p-3">

//                       {slot ? (

//                         <div className="bg-indigo-50 p-3 rounded-lg">

//                           <div className="font-semibold">

//                             {slot.subject}

//                           </div>

//                           <div className="text-sm text-gray-500">

//                             {slot.teacher_name}

//                           </div>

//                           <div className="text-xs text-gray-400">

//                             {slot.start_time} - {slot.end_time}

//                           </div>

//                         </div>

//                       ) : (

//                         <span className="text-gray-300">

//                           Empty

//                         </span>

//                       )}

//                     </td>

//                   )

//                 })}

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>



//       {/* ADD SUBJECT MODAL */}

//       {showModal && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded-xl w-[90%] md:w-[400px]">

//             <h2 className="text-xl font-bold mb-4">

//               Add Subject

//             </h2>


//             <input
//               placeholder="Subject"
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, subject: e.target.value })
//               }
//             />


//             <select
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, teacher_id: e.target.value })
//               }
//             >

//               <option>Select Teacher</option>

//               {teachers.map((t) => (

//                 <option key={t.id} value={t.id}>

//                   {t.full_name}

//                 </option>

//               ))}

//             </select>


//             <select
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, day: e.target.value })
//               }
//             >

//               {days.map(day => (

//                 <option key={day} value={day}>

//                   {day}

//                 </option>

//               ))}

//             </select>


//             <input
//               type="time"
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, start_time: e.target.value })
//               }
//             />


//             <input
//               type="time"
//               className="border p-2 w-full mb-4 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, end_time: e.target.value })
//               }
//             />


//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="border px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={addSubject}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>

//   )

// }

// export default ClassDetails






































// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

// const PERIODS = [
// {p:1,time:"08:00-08:45"},
// {p:2,time:"08:45-09:30"},
// {p:3,time:"09:30-10:15"},
// {p:4,time:"10:15-11:00"},
// {p:5,time:"11:15-12:00"},
// {p:6,time:"12:00-12:45"},
// {p:7,time:"13:30-14:15"},
// {p:8,time:"14:15-15:00"},
// ]

// const subjectColors=[
// "bg-indigo-100 text-indigo-700",
// "bg-green-100 text-green-700",
// "bg-orange-100 text-orange-700",
// "bg-blue-100 text-blue-700",
// "bg-purple-100 text-purple-700"
// ]

// const subjectColorMap={}
// let colorIndex=0

// function getColor(subject){
// if(!subjectColorMap[subject]){
// subjectColorMap[subject]=subjectColors[colorIndex++%subjectColors.length]
// }
// return subjectColorMap[subject]
// }

// function ClassDetails(){

// const {id}=useParams()

// const [classInfo,setClassInfo]=useState(null)
// const [timetable,setTimetable]=useState([])
// const [teachers,setTeachers]=useState([])

// const [showModal,setShowModal]=useState(false)
// const [editing,setEditing]=useState(null)

// // const [form,setForm]=useState({
// // subject:"",
// // teacher_id:"",
// // day:"",
// // start_time:"",
// // end_time:"",
// // room:""
// // })

// const [form,setForm]=useState({
// subject:"",
// teacher_id:"",
// day:"",
// period:"",
// start_time:"",
// end_time:"",
// room:""
// })

// const fetchTimetable=async()=>{
// try{
// const res=await API.get(`/timetable/${id}`)
// setClassInfo(res.data.class)
// setTimetable(res.data.timetable)
// }catch(err){
// console.log(err)
// }
// }

// const fetchTeachers=async()=>{
// const res=await API.get("/teacher")
// setTeachers(res.data)
// }

// // useEffect(()=>{
// // fetchTimetable()
// // fetchTeachers()
// // },[])

// useEffect(()=>{
// fetchTimetable()
// fetchTeachers()
// },[id])

// const addSubject=async()=>{
// try{

// if(editing){
// await API.put(`/timetable/${editing.id}`,form)
// }else{
// await API.post("/timetable",{
// class_id:id,
// ...form
// })
// }

// setShowModal(false)
// setEditing(null)

// setForm({
// subject:"",
// teacher_id:"",
// day:"",
// period:"",
// start_time:"",
// end_time:"",
// room:""
// })

// fetchTimetable()

// }catch(err){
// console.log(err)
// }
// }

// const deleteEntry=async(id)=>{
// if(!confirm("Delete this entry?")) return
// await API.delete(`/timetable/${id}`)
// fetchTimetable()
// }

// const openCreate=(day,time)=>{

// setEditing(null)

// setForm({
// subject:"",
// teacher_id:"",
// day:day,
// period:"",
// start_time:time.split("-")[0],
// end_time:time.split("-")[1],
// room:""
// })

// setShowModal(true)
// }

// const openEdit=(entry)=>{

// setEditing(entry)

// setForm({
// subject:entry.subject,
// teacher_id:entry.teacher_id,
// day:entry.day,
// start_time:entry.start_time,
// end_time:entry.end_time,
// room:entry.room || ""
// })

// setShowModal(true)
// }
// //**** 

// const handlePeriodChange=(period)=>{

// // const slot=PERIODS.find(p=>p.p==period)
// const slot = PERIODS.find(p => p.p === Number(period))

// setForm({
// ...form,
// period:period,
// start_time:slot.time.split("-")[0],
// end_time:slot.time.split("-")[1]
// })

// }

// const grid={}

// DAYS.forEach(d=>grid[d]={})

// // timetable.forEach(t=>{
// // const period=PERIODS.findIndex(
// // p=>p.time===`${t.start_time}-${t.end_time}`
// // )+1

// // if(period>0){
// // grid[t.day][period]=t
// // }
// // })

// timetable.forEach(t => {

//   const start = t.start_time.slice(0,5)
//   const end = t.end_time.slice(0,5)

//   const periodObj = PERIODS.find(p => {
//     const [pStart,pEnd] = p.time.split("-")
//     return pStart === start && pEnd === end
//   })

//   if(periodObj){
//     grid[t.day][periodObj.p] = t
//   }

// })

// return(

// <div className="p-6 space-y-6">

// <div className="flex justify-between items-center">

// <div>
// <h1 className="text-3xl font-bold">
// Class {classInfo?.class_name}-{classInfo?.section}
// </h1>

// <p className="text-gray-500">
// Academic Year {classInfo?.academic_year}
// </p>
// </div>

// <button
// onClick={()=>setShowModal(true)}
// disabled={!classInfo}
// className={`px-4 py-2 rounded-lg text-white ${
// classInfo
// ? "bg-indigo-600 hover:bg-indigo-700"
// : "bg-gray-400 cursor-not-allowed"
// }`}
// >
// + Add Entry
// </button>

// </div>

// <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

// <h2 className="text-xl font-semibold mb-4">
// Class Timetable
// </h2>

// <table className="w-full min-w-[700px] border-collapse">

// <thead>

// <tr className="bg-gray-50">

// <th className="p-3 text-left">Period</th>

// {DAYS.map(day=>(
// <th key={day} className="p-3 text-center">
// {day}
// </th>
// ))}

// </tr>

// </thead>

// <tbody>

// {PERIODS.map(({p,time})=>(

// <tr key={p} className="border-t">

// <td className="p-3">

// <div className="font-semibold">
// P{p}
// </div>

// <div className="text-xs text-gray-500">
// {time}
// </div>

// </td>

// {DAYS.map(day=>{

// const entry=grid[day]?.[p]

// return(

// <td key={day} className="p-2">

// {entry?(

// <div
// className={`rounded-lg px-2 py-2 text-xs relative group ${getColor(entry.subject)}`}
// >

// <p className="font-semibold truncate">
// {entry.subject}
// </p>

// {entry.teacher_name&&(
// <p className="text-[11px] opacity-80 truncate">
// {entry.teacher_name}
// </p>
// )}

// {entry.room&&(
// <p className="text-[10px] opacity-70">
// Room {entry.room}
// </p>
// )}

// <div className="absolute top-1 right-1 hidden group-hover:flex gap-1">

// <button
// onClick={()=>openEdit(entry)}
// className="text-xs bg-white px-1 rounded"
// >
// ✏️
// </button>

// <button
// onClick={()=>deleteEntry(entry.id)}
// className="text-xs bg-white px-1 rounded text-red-500"
// >
// 🗑
// </button>

// </div>

// </div>

// ):(

// <button
// onClick={()=>openCreate(day,time)}
// className="w-full h-12 border-2 border-dashed rounded-lg text-gray-400 hover:text-indigo-500 hover:border-indigo-300"
// >
// +
// </button>

// )}

// </td>

// )

// })}

// </tr>

// ))}

// </tbody>

// </table>

// </div>

// {showModal&&(

// <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

// <div className="bg-white p-6 rounded-xl w-96">

// <h2 className="text-xl font-bold mb-2">
// {editing?"Edit":"Add"} Timetable Entry
// </h2>

// <p className="text-sm text-gray-500 mb-4">
// Class {classInfo?.class_name}-{classInfo?.section}
// </p>

// {/* <div className="grid grid-cols-2 gap-3 mb-3">

// <input
// value={form.day}
// readOnly
// className="border p-2 w-full"
// />

// <input
// value={`${form.start_time}-${form.end_time}`}
// readOnly
// className="border p-2 w-full"
// />

// </div> */}

// <div className="space-y-4 mb-4">

// <div className="grid grid-cols-2 gap-4">

// <div>

// <label className="text-sm font-medium">
// Day
// </label>

// <select
// className="border p-2 w-full rounded"
// value={form.day}
// onChange={(e)=>setForm({...form,day:e.target.value})}
// >

// <option value="">Day</option>

// {DAYS.map(d=>(
// <option key={d} value={d}>
// {d}
// </option>
// ))}

// </select>

// </div>


// <div>

// <label className="text-sm font-medium">
// Period
// </label>

// <select
// className="border p-2 w-full rounded"
// value={form.period}
// onChange={(e)=>handlePeriodChange(e.target.value)}
// >

// <option value="">Period</option>

// {PERIODS.map(p=>(
// <option key={p.p} value={p.p}>
// P{p.p} ({p.time})
// </option>
// ))}

// </select>

// </div>

// </div>

// </div>

// <input
// placeholder="Subject"
// className="border p-2 w-full mb-3"
// value={form.subject}
// onChange={e=>setForm({...form,subject:e.target.value})}
// />

// <select
// className="border p-2 w-full mb-3"
// value={form.teacher_id}
// onChange={e=>setForm({...form,teacher_id:e.target.value})}
// >

// <option>Select Teacher</option>

// {teachers.map(t=>(
// <option key={t.id} value={t.id}>
// {t.full_name}
// </option>
// ))}

// </select>

// <input
// placeholder="Room"
// className="border p-2 w-full mb-4"
// value={form.room}
// onChange={e=>setForm({...form,room:e.target.value})}
// />

// <div className="flex justify-end gap-2">

// <button
// onClick={()=>setShowModal(false)}
// className="border px-4 py-2 rounded"
// >
// Cancel
// </button>

// <button
// onClick={addSubject}
// disabled={!form.day || !form.period || !form.subject}
// className={`px-4 py-2 rounded text-white ${
// form.day && form.period && form.subject
// ? "bg-indigo-600 hover:bg-indigo-700"
// : "bg-gray-400 cursor-not-allowed"
// }`}
// >
// {editing?"Update":"Add"}
// </button>

// </div>

// </div>

// </div>

// )}

// </div>

// )

// }

// export default ClassDetails
























//improved ui
import React, { useEffect, useState, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"
import BookLoader from "../components/BookLoader"
import {
  Calendar,
  Clock,
  Plus,
  Edit3,
  Trash2,
  X,
  BookOpen,
  User,
  MapPin,
  ChevronLeft,
  AlertCircle,
  Check,
  Loader2,
  GraduationCap,
  LayoutGrid
} from "lucide-react"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const PERIODS = [
  { p: 1, time: "08:00-08:45", label: "Period 1" },
  { p: 2, time: "08:45-09:30", label: "Period 2" },
  { p: 3, time: "09:30-10:15", label: "Period 3" },
  { p: 4, time: "10:15-11:00", label: "Period 4" },
  { p: 5, time: "11:15-12:00", label: "Period 5" },
  { p: 6, time: "12:00-12:45", label: "Period 6" },
  { p: 7, time: "13:30-14:15", label: "Period 7" },
  { p: 8, time: "14:15-15:00", label: "Period 8" },
]

const BREAKS = {
  4: { label: "☕ Short Break", time: "11:00 - 11:15" },
  6: { label: "🍽️ Lunch Break", time: "12:45 - 13:30" },
}

const subjectThemes = [
  {
    bg: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    border: "border-indigo-200",
    text: "text-indigo-700",
    badge: "bg-indigo-500",
    hover: "hover:shadow-indigo-200",
    dot: "bg-indigo-400"
  },
  {
    bg: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    border: "border-emerald-200",
    text: "text-emerald-700",
    badge: "bg-emerald-500",
    hover: "hover:shadow-emerald-200",
    dot: "bg-emerald-400"
  },
  {
    bg: "bg-gradient-to-br from-amber-50 to-amber-100",
    border: "border-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-500",
    hover: "hover:shadow-amber-200",
    dot: "bg-amber-400"
  },
  {
    bg: "bg-gradient-to-br from-rose-50 to-rose-100",
    border: "border-rose-200",
    text: "text-rose-700",
    badge: "bg-rose-500",
    hover: "hover:shadow-rose-200",
    dot: "bg-rose-400"
  },
  {
    bg: "bg-gradient-to-br from-violet-50 to-violet-100",
    border: "border-violet-200",
    text: "text-violet-700",
    badge: "bg-violet-500",
    hover: "hover:shadow-violet-200",
    dot: "bg-violet-400"
  },
  {
    bg: "bg-gradient-to-br from-cyan-50 to-cyan-100",
    border: "border-cyan-200",
    text: "text-cyan-700",
    badge: "bg-cyan-500",
    hover: "hover:shadow-cyan-200",
    dot: "bg-cyan-400"
  },
  {
    bg: "bg-gradient-to-br from-pink-50 to-pink-100",
    border: "border-pink-200",
    text: "text-pink-700",
    badge: "bg-pink-500",
    hover: "hover:shadow-pink-200",
    dot: "bg-pink-400"
  },
  {
    bg: "bg-gradient-to-br from-teal-50 to-teal-100",
    border: "border-teal-200",
    text: "text-teal-700",
    badge: "bg-teal-500",
    hover: "hover:shadow-teal-200",
    dot: "bg-teal-400"
  },
]

const subjectColorMap = {}
let colorIndex = 0

function getTheme(subject) {
  if (!subjectColorMap[subject]) {
    subjectColorMap[subject] = subjectThemes[colorIndex++ % subjectThemes.length]
  }
  return subjectColorMap[subject]
}

function ClassDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [classInfo, setClassInfo] = useState(null)
  const [timetable, setTimetable] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [notification, setNotification] = useState(null)

  const [form, setForm] = useState({
    subject: "",
    teacher_id: "",
    day: "",
    period: "",
    start_time: "",
    end_time: "",
    room: ""
  })

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const fetchTimetable = async () => {
    try {
      setLoading(true)
      const res = await API.get(`/timetable/${id}`)
      setClassInfo(res.data.class)
      setTimetable(res.data.timetable)
    } catch (err) {
      console.log(err)
      showNotification("Failed to load timetable", "error")
    } finally {
      setLoading(false)
    }
  }

  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teacher")
      setTeachers(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTimetable()
    fetchTeachers()
  }, [id])

  const stats = useMemo(() => {
    const subjects = [...new Set(timetable.map(t => t.subject))]
    const teacherIds = [...new Set(timetable.map(t => t.teacher_id).filter(Boolean))]
    const totalSlots = DAYS.length * PERIODS.length
    const filledSlots = timetable.length
    return {
      subjects: subjects.length,
      teachers: teacherIds.length,
      filled: filledSlots,
      total: totalSlots,
      percentage: Math.round((filledSlots / totalSlots) * 100)
    }
  }, [timetable])

  const addSubject = async () => {
    try {
      setSaving(true)
      if (editing) {
        await API.put(`/timetable/${editing.id}`, form)
        showNotification("Entry updated successfully!")
      } else {
        await API.post("/timetable", { class_id: id, ...form })
        showNotification("Entry added successfully!")
      }
      closeModal()
      fetchTimetable()
    } catch (err) {
      console.log(err)
      showNotification("Something went wrong!", "error")
    } finally {
      setSaving(false)
    }
  }

  const deleteEntry = async (entryId) => {
    try {
      await API.delete(`/timetable/${entryId}`)
      setDeleteConfirm(null)
      showNotification("Entry deleted successfully!")
      fetchTimetable()
    } catch (err) {
      console.log(err)
      showNotification("Failed to delete entry", "error")
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditing(null)
    setForm({
      subject: "",
      teacher_id: "",
      day: "",
      period: "",
      start_time: "",
      end_time: "",
      room: ""
    })
  }

  const openCreate = (day, time) => {
    setEditing(null)
    const periodObj = PERIODS.find(p => p.time === time)
    setForm({
      subject: "",
      teacher_id: "",
      day: day,
      period: periodObj ? String(periodObj.p) : "",
      start_time: time.split("-")[0],
      end_time: time.split("-")[1],
      room: ""
    })
    setShowModal(true)
  }

  const openEdit = (entry) => {
    setEditing(entry)
    const start = entry.start_time.slice(0, 5)
    const end = entry.end_time.slice(0, 5)
    const periodObj = PERIODS.find(p => {
      const [pStart, pEnd] = p.time.split("-")
      return pStart === start && pEnd === end
    })
    setForm({
      subject: entry.subject,
      teacher_id: entry.teacher_id,
      day: entry.day,
      period: periodObj ? String(periodObj.p) : "",
      start_time: start,
      end_time: end,
      room: entry.room || ""
    })
    setShowModal(true)
  }

  const handlePeriodChange = (period) => {
    const slot = PERIODS.find(p => p.p === Number(period))
    if (slot) {
      setForm({
        ...form,
        period: period,
        start_time: slot.time.split("-")[0],
        end_time: slot.time.split("-")[1]
      })
    }
  }

  const grid = {}
  DAYS.forEach(d => (grid[d] = {}))

  timetable.forEach(t => {
    const start = t.start_time.slice(0, 5)
    const end = t.end_time.slice(0, 5)
    const periodObj = PERIODS.find(p => {
      const [pStart, pEnd] = p.time.split("-")
      return pStart === start && pEnd === end
    })
    if (periodObj) {
      grid[t.day][periodObj.p] = t
    }
  })

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" })

  // ✅ ONLY CHANGE: BookLoader instead of spinner
  if (loading) return <BookLoader />

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3 
          px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl shadow-2xl transition-all duration-500 
          animate-slide-in max-w-[90vw]
          ${notification.type === "error"
            ? "bg-red-500 text-white"
            : "bg-emerald-500 text-white"
          }`}
        >
          {notification.type === "error"
            ? <AlertCircle className="w-5 h-5 flex-shrink-0" />
            : <Check className="w-5 h-5 flex-shrink-0" />
          }
          <span className="font-medium text-sm sm:text-base">{notification.message}</span>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white rounded-xl transition-all duration-200 
                hover:shadow-md group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 
                transition-colors" />
            </button>

            <div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 
                  to-purple-600 rounded-xl flex items-center justify-center shadow-lg 
                  shadow-indigo-200">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    Class {classInfo?.class_name}
                    <span className="text-indigo-600">-{classInfo?.section}</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Academic Year {classInfo?.academic_year}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setEditing(null)
              setForm({
                subject: "", teacher_id: "", day: "", period: "",
                start_time: "", end_time: "", room: ""
              })
              setShowModal(true)
            }}
            disabled={!classInfo}
            className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl 
              font-semibold text-sm transition-all duration-300 shadow-lg w-full sm:w-auto 
              justify-center
              ${classInfo
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0"
                : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
              }`}
          >
            <Plus className="w-4 h-4" />
            Add Entry
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border 
            border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-lg sm:rounded-xl 
                flex items-center justify-center">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.subjects}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Subjects</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border 
            border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-lg sm:rounded-xl 
                flex items-center justify-center">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.teachers}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Teachers</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border 
            border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-lg sm:rounded-xl 
                flex items-center justify-center">
                <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {stats.filled}
                  <span className="text-xs sm:text-sm font-normal text-gray-400">
                    /{stats.total}
                  </span>
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">Slots Filled</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border 
            border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg sm:rounded-xl 
                flex items-center justify-center">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.percentage}%</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Complete</p>
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1 sm:h-1.5">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1 sm:h-1.5 
                  rounded-full transition-all duration-1000"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 
          overflow-hidden">
          <div className="p-3 sm:p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Weekly Timetable</h2>
            </div>
            <span className="text-[10px] sm:text-xs bg-indigo-50 text-indigo-600 px-2 sm:px-3 
              py-1 rounded-full font-medium">
              {PERIODS.length} periods/day
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-50/50">
                  <th className="p-2 sm:p-3 text-left w-24 sm:w-28">
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 
                      uppercase tracking-wider">
                      Time
                    </span>
                  </th>
                  {DAYS.map(day => (
                    <th key={day} className="p-2 sm:p-3 text-center">
                      <div className={`inline-flex flex-col items-center gap-0.5 px-2 sm:px-3 
                        py-1 sm:py-1.5 rounded-lg sm:rounded-xl transition-colors
                        ${day === today
                          ? "bg-indigo-100 text-indigo-700"
                          : "text-gray-600"
                        }`}
                      >
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                          {day.slice(0, 3)}
                        </span>
                        <span className="text-[8px] sm:text-[10px] font-medium opacity-60 
                          hidden md:block">
                          {day}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {PERIODS.map(({ p, time }) => (
                  <React.Fragment key={p}>
                    <tr className="group/row hover:bg-gray-50/50 transition-colors">
                      <td className="p-1.5 sm:p-2 pl-2 sm:pl-4">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-md 
                            sm:rounded-lg flex items-center justify-center text-[10px] 
                            sm:text-xs font-bold text-gray-500 
                            group-hover/row:bg-indigo-100 group-hover/row:text-indigo-600 
                            transition-colors">
                            P{p}
                          </div>
                          <div>
                            <div className="text-[10px] sm:text-[11px] font-semibold text-gray-700">
                              {time.split("-")[0]}
                            </div>
                            <div className="text-[9px] sm:text-[10px] text-gray-400">
                              {time.split("-")[1]}
                            </div>
                          </div>
                        </div>
                      </td>

                      {DAYS.map(day => {
                        const entry = grid[day]?.[p]
                        const isToday = day === today

                        return (
                          <td key={day} className={`p-1 sm:p-1.5 
                            ${isToday ? "bg-indigo-50/30" : ""}`}>
                            {entry ? (
                              <div className={`relative group rounded-lg sm:rounded-xl px-2 
                                sm:px-3 py-2 sm:py-2.5 border cursor-pointer transition-all 
                                duration-200 hover:shadow-lg hover:-translate-y-0.5
                                ${getTheme(entry.subject).bg} 
                                ${getTheme(entry.subject).border}
                                ${getTheme(entry.subject).hover}`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 
                                      sm:mb-1">
                                      <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full 
                                        ${getTheme(entry.subject).dot}`}
                                      />
                                      <p className={`text-[10px] sm:text-xs font-bold truncate 
                                        ${getTheme(entry.subject).text}`}>
                                        {entry.subject}
                                      </p>
                                    </div>

                                    {entry.teacher_name && (
                                      <p className="text-[9px] sm:text-[10px] text-gray-500 
                                        truncate flex items-center gap-1 ml-2 sm:ml-3">
                                        <User className="w-2 h-2 sm:w-2.5 sm:h-2.5 
                                          flex-shrink-0" />
                                        {entry.teacher_name}
                                      </p>
                                    )}

                                    {entry.room && (
                                      <p className="text-[9px] sm:text-[10px] text-gray-400 
                                        truncate flex items-center gap-1 ml-2 sm:ml-3 mt-0.5">
                                        <MapPin className="w-2 h-2 sm:w-2.5 sm:h-2.5 
                                          flex-shrink-0" />
                                        Room {entry.room}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="absolute -top-2 -right-2 hidden 
                                  group-hover:flex items-center gap-1 animate-fade-in">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      openEdit(entry)
                                    }}
                                    className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-md 
                                      sm:rounded-lg shadow-lg border border-gray-200 flex 
                                      items-center justify-center hover:bg-indigo-50 
                                      hover:border-indigo-200 transition-colors"
                                  >
                                    <Edit3 className="w-2.5 h-2.5 sm:w-3 sm:h-3 
                                      text-indigo-600" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setDeleteConfirm(entry.id)
                                    }}
                                    className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-md 
                                      sm:rounded-lg shadow-lg border border-gray-200 flex 
                                      items-center justify-center hover:bg-red-50 
                                      hover:border-red-200 transition-colors"
                                  >
                                    <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 
                                      text-red-500" />
                                  </button>
                                </div>

                                {deleteConfirm === entry.id && (
                                  <div className="absolute inset-0 bg-white/95 rounded-lg 
                                    sm:rounded-xl flex flex-col items-center justify-center 
                                    gap-1.5 sm:gap-2 z-10 backdrop-blur-sm border-2 
                                    border-red-200 animate-fade-in">
                                    <p className="text-[9px] sm:text-[10px] font-semibold 
                                      text-red-600">
                                      Delete?
                                    </p>
                                    <div className="flex gap-1">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          deleteEntry(entry.id)
                                        }}
                                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-500 
                                          text-white text-[9px] sm:text-[10px] rounded-md 
                                          font-medium hover:bg-red-600 transition-colors"
                                      >
                                        Yes
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setDeleteConfirm(null)
                                        }}
                                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 
                                          text-gray-600 text-[9px] sm:text-[10px] rounded-md 
                                          font-medium hover:bg-gray-200 transition-colors"
                                      >
                                        No
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={() => openCreate(day, time)}
                                className={`w-full h-12 sm:h-16 border-2 border-dashed 
                                  rounded-lg sm:rounded-xl transition-all duration-200 flex 
                                  items-center justify-center group/empty hover:-translate-y-0.5
                                  ${isToday
                                    ? "border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50"
                                    : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                                  }`}
                              >
                                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 
                                  group-hover/empty:text-indigo-500 transition-colors" />
                              </button>
                            )}
                          </td>
                        )
                      })}
                    </tr>

                    {BREAKS[p] && (
                      <tr>
                        <td colSpan={DAYS.length + 1}>
                          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 
                            py-1.5 sm:py-2 bg-gradient-to-r from-orange-50 via-yellow-50 
                            to-orange-50">
                            <div className="flex-1 h-px bg-orange-200" />
                            <span className="text-[10px] sm:text-xs font-semibold 
                              text-orange-600 whitespace-nowrap">
                              {BREAKS[p].label} • {BREAKS[p].time}
                            </span>
                            <div className="flex-1 h-px bg-orange-200" />
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subject Legend */}
        {Object.keys(subjectColorMap).length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 
            p-3 sm:p-4">
            <h3 className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase 
              tracking-wider mb-2 sm:mb-3">
              Subject Legend
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {Object.entries(subjectColorMap).map(([subject, theme]) => (
                <div
                  key={subject}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 
                    sm:py-1.5 rounded-md sm:rounded-lg border 
                    ${theme.bg} ${theme.border}`}
                >
                  <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${theme.dot}`} />
                  <span className={`text-[10px] sm:text-xs font-semibold ${theme.text}`}>
                    {subject}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center 
            justify-center z-50 p-0 sm:p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md shadow-2xl 
              animate-slide-up max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-100 sticky top-0 
              bg-white rounded-t-2xl sm:rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex 
                    items-center justify-center
                    ${editing
                      ? "bg-amber-100 text-amber-600"
                      : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    {editing
                      ? <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                      : <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    }
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      {editing ? "Edit" : "Add"} Entry
                    </h2>
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      Class {classInfo?.class_name}-{classInfo?.section}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 flex items-center justify-center rounded-lg 
                    hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="text-[10px] sm:text-xs font-semibold text-gray-600 
                    uppercase tracking-wider mb-1 sm:mb-1.5 block">
                    Day
                  </label>
                  <select
                    className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-2 
                      sm:p-2.5 text-sm focus:ring-2 focus:ring-indigo-200 
                      focus:border-indigo-400 outline-none transition-all bg-gray-50 
                      hover:bg-white"
                    value={form.day}
                    onChange={(e) => setForm({ ...form, day: e.target.value })}
                  >
                    <option value="">Select Day</option>
                    {DAYS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] sm:text-xs font-semibold text-gray-600 
                    uppercase tracking-wider mb-1 sm:mb-1.5 block">
                    Period
                  </label>
                  <select
                    className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-2 
                      sm:p-2.5 text-sm focus:ring-2 focus:ring-indigo-200 
                      focus:border-indigo-400 outline-none transition-all bg-gray-50 
                      hover:bg-white"
                    value={form.period}
                    onChange={(e) => handlePeriodChange(e.target.value)}
                  >
                    <option value="">Select Period</option>
                    {PERIODS.map(p => (
                      <option key={p.p} value={p.p}>
                        P{p.p} ({p.time})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {form.start_time && form.end_time && (
                <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg 
                  sm:rounded-xl">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                  <span className="text-xs sm:text-sm font-medium text-indigo-700">
                    {form.start_time} - {form.end_time}
                  </span>
                </div>
              )}

              <div>
                <label className="text-[10px] sm:text-xs font-semibold text-gray-600 
                  uppercase tracking-wider mb-1 sm:mb-1.5 block">
                  Subject
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 
                    sm:w-4 sm:h-4 text-gray-400" />
                  <input
                    placeholder="e.g. Mathematics"
                    className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-2 
                      sm:p-2.5 pl-9 sm:pl-10 text-sm focus:ring-2 focus:ring-indigo-200 
                      focus:border-indigo-400 outline-none transition-all bg-gray-50 
                      hover:bg-white"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] sm:text-xs font-semibold text-gray-600 
                  uppercase tracking-wider mb-1 sm:mb-1.5 block">
                  Teacher
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 
                    sm:w-4 sm:h-4 text-gray-400" />
                  <select
                    className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-2 
                      sm:p-2.5 pl-9 sm:pl-10 text-sm focus:ring-2 focus:ring-indigo-200 
                      focus:border-indigo-400 outline-none transition-all bg-gray-50 
                      hover:bg-white appearance-none"
                    value={form.teacher_id}
                    onChange={e => setForm({ ...form, teacher_id: e.target.value })}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>{t.full_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] sm:text-xs font-semibold text-gray-600 
                  uppercase tracking-wider mb-1 sm:mb-1.5 block">
                  Room
                  <span className="text-gray-400 font-normal normal-case ml-1">(optional)</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 
                    sm:w-4 sm:h-4 text-gray-400" />
                  <input
                    placeholder="e.g. A-101"
                    className="w-full border border-gray-200 rounded-lg sm:rounded-xl p-2 
                      sm:p-2.5 pl-9 sm:pl-10 text-sm focus:ring-2 focus:ring-indigo-200 
                      focus:border-indigo-400 outline-none transition-all bg-gray-50 
                      hover:bg-white"
                    value={form.room}
                    onChange={e => setForm({ ...form, room: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 pt-2 flex flex-col-reverse sm:flex-row justify-end 
              gap-2 sticky bottom-0 bg-white rounded-b-2xl">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 rounded-lg sm:rounded-xl border border-gray-200 
                  text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors 
                  w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={addSubject}
                disabled={!form.day || !form.period || !form.subject || saving}
                className={`px-5 py-2.5 rounded-lg sm:rounded-xl text-sm font-semibold 
                  text-white transition-all duration-300 flex items-center justify-center 
                  gap-2 w-full sm:w-auto
                  ${form.day && form.period && form.subject && !saving
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5"
                    : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saving
                  ? "Saving..."
                  : editing
                    ? "Update Entry"
                    : "Add Entry"
                }
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default ClassDetails