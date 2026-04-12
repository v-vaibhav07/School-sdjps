// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function ClassStudents() {

//     const { id } = useParams()

//     const [students, setStudents] = useState([])
//     const [classInfo, setClassInfo] = useState(null)
//     const [teacher, setTeacher] = useState(null)

//     const fetchStudents = async () => {

//         try {

//             const res = await API.get(`/classes/${id}/students`)
//             setStudents(res.data.students)
//             setClassInfo(res.data.class)
//             setTeacher(res.data.teacher)
//         } catch (error) {

//             console.log("Error fetching class students", error)

//         }

//     }

//     useEffect(() => {
//         fetchStudents()
//     }, [])

//     return (
//         <div>

//             <h1 className="text-3xl font-bold">
//                 Class {classInfo?.class_name} {classInfo?.section}
//             </h1>

//             <p className="mb-6 text-gray-600">
//                 Teacher: {teacher || "Not Assigned"}
//             </p>

//             <div className="bg-white rounded shadow">

//                 <table className="w-full">

//                     <thead className="bg-gray-200">

//                         <tr>
//                             <th className="p-3 text-left">Roll</th>
//                             <th className="p-3 text-left">Name</th>
//                         </tr>

//                     </thead>

//                     <tbody>

//                         {students.map((student) => (

//                             <tr key={student.id} className="border-b">

//                                 <td className="p-3">
//                                     {student.roll_number}
//                                 </td>

//                                 <td className="p-3">
//                                     {student.full_name}
//                                 </td>

//                             </tr>

//                         ))}

//                     </tbody>

//                 </table>

//             </div>

//         </div>
//     )
// }

// export default ClassStudents

// import { useEffect, useState } from "react"
// import { useParams, Link } from "react-router-dom"
// import API from "../services/api"

// function ClassStudents() {

//     const { id } = useParams()

//     const [students, setStudents] = useState([])
//     const [classInfo, setClassInfo] = useState(null)
//     const [teacher, setTeacher] = useState(null)

//     const fetchStudents = async () => {

//         try {

//             const res = await API.get(`/classes/${id}/students`)

//             setStudents(res.data.students)
//             setClassInfo(res.data.class)
//             setTeacher(res.data.teacher)

//         } catch (error) {

//             console.log("Error fetching class students", error)

//         }

//     }

//     useEffect(() => {
//         fetchStudents()
//     }, [])

//     return (
//         <div>

//             {/* HEADER */}

//             {/* <div className="flex justify-between items-center mb-6">

//                 <div>

//                     <h1 className="text-3xl font-bold">
//                         Class {classInfo?.class_name} {classInfo?.section}
//                     </h1>

//                     <p className="text-gray-600">
//                         Teacher: {teacher || "Not Assigned"}
//                     </p>

//                 </div>

//                 <Link
//                     to={`/classes/${id}/announcements`}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Announcements
//                 </Link>

//             </div> */}
//             <div className="flex justify-between items-center mb-6">

//                 <div>

//                     <h1 className="text-3xl font-bold">
//                         Class {classInfo?.class_name} {classInfo?.section}
//                     </h1>

//                     <p className="text-gray-600">
//                         Teacher: {teacher || "Not Assigned"}
//                     </p>

//                 </div>

//                 <div className="flex gap-3">

//                     <Link
//                         to={`/classes/${id}/announcements`}
//                         className="bg-blue-600 text-white px-4 py-2 rounded"
//                     >
//                         Announcements
//                     </Link>

//                     <Link
//                         to={`/classes/${id}/chat`}
//                         className="bg-green-600 text-white px-4 py-2 rounded"
//                     >
//                         Class Chat
//                     </Link>

//                 </div>

//             </div>


//             {/* STUDENTS TABLE */}

//             <div className="bg-white rounded shadow">

//                 <table className="w-full">

//                     <thead className="bg-gray-200">

//                         <tr>
//                             <th className="p-3 text-left">Roll</th>
//                             <th className="p-3 text-left">Name</th>
//                         </tr>

//                     </thead>

//                     <tbody>

//                         {students.map((student) => (

//                             <tr key={student.id} className="border-b">

//                                 <td className="p-3">
//                                     {student.roll_number}
//                                 </td>

//                                 <td className="p-3">
//                                     {student.full_name}
//                                 </td>

//                             </tr>

//                         ))}

//                     </tbody>

//                 </table>

//             </div>

//         </div>
//     )
// }

// export default ClassStudents





























// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { useParams, useNavigate } from "react-router-dom"

// function ClassStudents() {

//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [students, setStudents] = useState([])
//   const [loading, setLoading] = useState(true)

//   const [showForm, setShowForm] = useState(false)

//   const [form, setForm] = useState({
//     name: "",
//     roll_number: ""
//   })

//   const fetchStudents = async () => {

//     try {

//       const res = await API.get(`/classes/${id}/students`)

//       if (Array.isArray(res.data)) {
//         setStudents(res.data)
//       } 
//       else if (Array.isArray(res.data.students)) {
//         setStudents(res.data.students)
//       } 
//       else {
//         setStudents([])
//       }

//     } catch (err) {

//       console.log(err)
//       setStudents([])

//     } finally {

//       setLoading(false)

//     }

//   }

// // const addStudent = async () => {

// //   try {

// // await API.post(`/student`, {
// //   full_name: form.name,
// //   roll_number: form.roll_number,
// //   class_id: id,
// //   email: `${form.name}@test.com`,
// //   password_hash: "123"
// // })

// //     setShowForm(false)

// //     setForm({
// //       name: "",
// //       roll_number: ""
// //     })

// //     fetchStudents()

// //   } catch (err) {

// //     console.log(err)

// //   }

// // }
// const addStudent = async () => {

//   try {

//     const safeName = form.name.trim().toLowerCase().replace(/\s+/g, "")

//     await API.post(`/student`, {
//       full_name: form.name,
//       roll_number: form.roll_number,
//       class_id: id,

//       //AUTO GENERATED
//       email: `${safeName}${form.roll_number}@school.com`,
//       password_hash: "123456"
//     })

//     setShowForm(false)

//     setForm({
//       name: "",
//       roll_number: ""
//     })

//     fetchStudents()

//   } catch (err) {
//     console.log(err)
//   }

// }


// const deleteStudent = async (studentId) => {

//   if (!window.confirm("Are you sure you want to delete this student?")) return

//   try {

//     await API.delete(`/student/${studentId}`)

//     fetchStudents()

//   } catch (err) {
//     console.log(err)
//   }

// }

// // password_hash: bcrypt.hashSync("123456", 10) in future


//   useEffect(() => {

//     fetchStudents()

//   }, [id])

//   if (loading) {
//     return <div className="p-6">Loading students...</div>
//   }

//   return (

//     <div className="p-6">

//       <button
//         onClick={() => navigate("/students")}
//         className="mb-4 text-blue-600"
//       >
//         ← Back
//       </button>

//       <div className="flex justify-between items-center mb-4">

//         <h1 className="text-2xl font-bold">
//           Class Students
//         </h1>

//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           + Add Student
//         </button>

//       </div>

//       <div className="bg-white rounded shadow overflow-x-auto">

//         <table className="w-full">

//           <thead className="bg-gray-200">

//             <tr>
//               <th className="p-3 text-left">Photo</th>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Roll</th>
//               <th className="p-3 text-left">Profile</th>
//               <th className="p-3 text-left">Action</th>
//             </tr>

//           </thead>

//           <tbody>

//             {students.length === 0 ? (

//               <tr>
//                 <td colSpan="4" className="p-4 text-center text-gray-500">
//                   No students found
//                 </td>
//               </tr>

//             ) : (

//               students.map((s) => (

//                 <tr key={s.id} className="border-b hover:bg-gray-50">

//                   <td className="p-3">
//                     <img
//                       src={s.photo || "/avatar.png"}
//                       alt="student"
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   </td>

//                   <td className="p-3">
//                     {s.users?.full_name || s.full_name || s.name || "N/A"}
//                   </td>

//                   <td className="p-3">
//                     {s.roll_number || "-"}
//                   </td>

// <td className="p-3">
//   <button
//     onClick={() => navigate(`/students/profile/${s.id}`)}
//     className="text-blue-600 hover:underline"
//   >
//     View
//   </button>
// </td>

// <td className="p-3">
//   <button
//     onClick={() => deleteStudent(s.id)}
//     className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//   >
//     Delete
//   </button>
// </td>

//                 </tr>

//               ))

//             )}

//           </tbody>

//         </table>

//       </div>

//       {/* ADD STUDENT MODAL */}

//       {showForm && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded w-96">

//             <h2 className="text-xl font-bold mb-4">
//               Add Student
//             </h2>

//             <input
//               type="text"
//               placeholder="Student Name"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//               className="border p-2 w-full mb-3"
//             />

//             <input
//               type="number"
//               placeholder="Roll Number"
//               value={form.roll_number}
//               onChange={(e) =>
//                 setForm({ ...form, roll_number: e.target.value })
//               }
//               className="border p-2 w-full mb-3"
//             />

//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => setShowForm(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={addStudent}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
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

// export default ClassStudents
































// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { useParams, useNavigate } from "react-router-dom"

// function ClassStudents() {

//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [students, setStudents] = useState([])
//   const [loading, setLoading] = useState(true)

//   const [showForm, setShowForm] = useState(false)
//   const [editId, setEditId] = useState(null)

//   const [form, setForm] = useState({
//     name: "",
//     roll_number: ""
//   })

//   // ================= FETCH =================
//   const fetchStudents = async () => {
//     try {
//       const res = await API.get(`/classes/${id}/students`)

//       if (Array.isArray(res.data)) setStudents(res.data)
//       else if (Array.isArray(res.data.students)) setStudents(res.data.students)
//       else setStudents([])

//     } catch (err) {
//       console.log(err)
//       setStudents([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ================= ADD =================
//   const addStudent = async () => {
//     try {
//       const safeName = form.name.trim().toLowerCase().replace(/\s+/g, "")

//       await API.post(`/student`, {
//         full_name: form.name,
//         roll_number: form.roll_number,
//         class_id: id,
//         email: `${safeName}${form.roll_number}@school.com`,
//         password_hash: "123456"
//       })

//       resetForm()

//     } catch (err) {
//       console.log(err)
//     }
//   }

//   // ================= EDIT =================
//   const handleEdit = (student) => {
//     setForm({
//       name: student.users?.full_name || student.full_name || "",
//       roll_number: student.roll_number || ""
//     })

//     setEditId(student.id)
//     setShowForm(true)
//   }

//   const updateStudent = async () => {
//     try {

//       await API.put(`/student/${editId}`, {
//         full_name: form.name
//       })

//       resetForm()

//     } catch (err) {
//       console.log(err)
//     }
//   }

//   // ================= DELETE =================
//   const deleteStudent = async (studentId) => {
//     if (!window.confirm("Delete this student?")) return

//     try {
//       await API.delete(`/student/${studentId}`)
//       fetchStudents()
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   // ================= RESET =================
//   const resetForm = () => {
//     setShowForm(false)
//     setEditId(null)
//     setForm({ name: "", roll_number: "" })
//     fetchStudents()
//   }

//   useEffect(() => {
//     fetchStudents()
//   }, [id])

//   if (loading) return <div className="p-6">Loading...</div>

//   return (

//     <div className="p-4 md:p-6">

//       <button
//         onClick={() => navigate("/students")}
//         className="mb-4 text-blue-600"
//       >
//         ← Back
//       </button>

//       <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">

//         <h1 className="text-xl md:text-2xl font-bold">
//           Class Students
//         </h1>

//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           + Add Student
//         </button>

//       </div>

//       {/* ================= TABLE ================= */}

//       <div className="bg-white rounded shadow overflow-x-auto">

//         <table className="w-full min-w-[600px]">

//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3 text-left">Photo</th>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Roll</th>
//               <th className="p-3 text-left">Profile</th>
//               <th className="p-3 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>

//             {students.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="p-4 text-center text-gray-500">
//                   No students found
//                 </td>
//               </tr>
//             ) : (

//               students.map((s) => (

//                 <tr key={s.id} className="border-b hover:bg-gray-50">

//                   <td className="p-3">
//                     <img
//                       src={s.photo || "/avatar.png"}
//                       className="w-10 h-10 rounded-full"
//                     />
//                   </td>

//                   <td className="p-3">
//                     {s.users?.full_name || s.full_name || "N/A"}
//                   </td>

//                   <td className="p-3">
//                     {s.roll_number || "-"}
//                   </td>

//                   <td className="p-3">
//                     <button
//                       onClick={() => navigate(`/students/profile/${s.id}`)}
//                       className="text-blue-600"
//                     >
//                       View
//                     </button>
//                   </td>

//                   <td className="p-3 flex gap-2 flex-wrap">

//                     <button
//                       onClick={() => handleEdit(s)}
//                       className="px-2 py-1 bg-green-500 text-white rounded"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => deleteStudent(s.id)}
//                       className="px-2 py-1 bg-red-500 text-white rounded"
//                     >
//                       Delete
//                     </button>

//                   </td>

//                 </tr>

//               ))

//             )}

//           </tbody>

//         </table>

//       </div>

//       {/* ================= MODAL ================= */}

//       {showForm && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded w-90 max-w-[90%]">

//             <h2 className="text-xl font-bold mb-4">
//               {editId ? "Edit Student" : "Add Student"}
//             </h2>

//             <input
//               type="text"
//               placeholder="Student Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="border p-2 w-full mb-3"
//             />

//             <input
//               type="number"
//               placeholder="Roll Number"
//               value={form.roll_number}
//               onChange={(e) => setForm({ ...form, roll_number: e.target.value })}
//               className="border p-2 w-full mb-3"
//             />

//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => setShowForm(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={editId ? updateStudent : addStudent}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
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

// export default ClassStudents





























//improved ui 1st
// import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import API from "../services/api"
// import BookLoader from "../components/BookLoader"
// import {
//   ArrowLeft,
//   Plus,
//   Edit2,
//   Trash2,
//   User,
//   Hash,
//   ShieldUser,
//   X,
//   Save,
//   GraduationCap
// } from "lucide-react"

// function ClassStudents() {
//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [students, setStudents] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showForm, setShowForm] = useState(false)
//   const [editId, setEditId] = useState(null)
//   const [form, setForm] = useState({ name: "", roll_number: "" })

//   const fetchStudents = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get(`/classes/${id}/students`)
//       setStudents(Array.isArray(res.data) ? res.data : (res.data.students || []))
//     } catch (err) {
//       console.log(err)
//       setStudents([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const addStudent = async () => {
//     try {
//       const safeName = form.name.trim().toLowerCase().replace(/\s+/g, "")
//       await API.post(`/student`, {
//         full_name: form.name,
//         roll_number: form.roll_number,
//         class_id: id,
//         email: `${safeName}${form.roll_number}@school.com`,
//         password_hash: "123456"
//       })
//       resetForm()
//     } catch (err) { console.log(err) }
//   }

//   const updateStudent = async () => {
//     try {
//       await API.put(`/student/${editId}`, { full_name: form.name })
//       resetForm()
//     } catch (err) { console.log(err) }
//   }

//   const deleteStudent = async (studentId) => {
//     if (!window.confirm("Delete this student?")) return
//     try {
//       await API.delete(`/student/${studentId}`)
//       fetchStudents()
//     } catch (err) { console.log(err) }
//   }

//   const resetForm = () => {
//     setShowForm(false)
//     setEditId(null)
//     setForm({ name: "", roll_number: "" })
//     fetchStudents()
//   }

//   useEffect(() => { fetchStudents() }, [id])

//   if (loading) return <BookLoader />

//   return (
//     <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); .font-dm { font-family: 'DM Sans', sans-serif; }`}</style>
      
//       {/* Header */}
//       <div className="max-w-6xl mx-auto mb-6">
//         <button onClick={() => navigate("/students")} className="flex items-center gap-2 text-indigo-600 font-semibold mb-4 hover:underline">
//           <ArrowLeft size={18} /> Back to Classes
//         </button>

//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <h1 className="text-3xl font-bold text-gray-900 font-dm">Class Students</h1>
//           <button onClick={() => setShowForm(true)} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition">
//             <Plus size={20} /> Add Student
//           </button>
//         </div>
//       </div>

//       {/* Table Container */}
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-gray-50 text-gray-400 uppercase text-xs tracking-wider">
//                 <th className="p-5 font-bold">Photo</th>
//                 <th className="p-5 font-bold">Name</th>
//                 <th className="p-5 font-bold">Roll Number</th>
//                 <th className="p-5 font-bold">Profile</th>
//                 <th className="p-5 font-bold text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {students.length === 0 ? (
//                 <tr><td colSpan="5" className="p-10 text-center text-gray-400">No students found</td></tr>
//               ) : (
//                 students.map((s) => (
//                   <tr key={s.id} className="hover:bg-indigo-50/30 transition-colors">
//                     <td className="p-5">
//                       <img src={s.photo || "/avatar.png"} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow" />
//                     </td>
//                     <td className="p-5 font-semibold text-gray-900">{s.users?.full_name || s.full_name}</td>
//                     <td className="p-5 text-gray-600"><span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">{s.roll_number}</span></td>
//                     <td className="p-5">
//                       <button onClick={() => navigate(`/students/profile/${s.id}`)} className="text-indigo-600 font-medium hover:underline text-sm">View Profile</button>
//                     </td>
//                     <td className="p-5 text-right">
//                       <div className="flex justify-end gap-2">
//                         <button onClick={() => { setForm({ name: s.full_name, roll_number: s.roll_number }); setEditId(s.id); setShowForm(true); }} className="p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"><Edit2 size={18} /></button>
//                         <button onClick={() => deleteStudent(s.id)} className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"><Trash2 size={18} /></button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* MODAL */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//           <div className="bg-white p-8 rounded-3xl w-full max-w-sm shadow-2xl">
//             <h2 className="text-2xl font-bold mb-6">{editId ? "Edit Student" : "Add New Student"}</h2>
//             <div className="space-y-4">
//               <div className="relative">
//                 <User className="absolute left-3 top-3 text-gray-400" size={20} />
//                 <input placeholder="Student Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value })} className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
//               </div>
//               <div className="relative">
//                 <Hash className="absolute left-3 top-3 text-gray-400" size={20} />
//                 <input type="number" placeholder="Roll Number" value={form.roll_number} onChange={(e) => setForm({...form, roll_number: e.target.value })} className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
//               </div>
//               <div className="flex gap-3 mt-6">
//                 <button onClick={resetForm} className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50">Cancel</button>
//                 <button onClick={editId ? updateStudent : addStudent} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2">
//                   <Save size={18} /> Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ClassStudents






















//2nd ui 

// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { useParams, useNavigate } from "react-router-dom"
// import BookLoader from "../components/BookLoader"
// import {
//   Users,
//   Plus,
//   Pencil,
//   Trash2,
//   Eye,
//   X,
//   ArrowLeft,
//   UserPlus,
//   Hash,
//   User,
//   Save,
//   GraduationCap,
//   Search
// } from "lucide-react"

// function ClassStudents() {

//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [students, setStudents] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")

//   const [showForm, setShowForm] = useState(false)
//   const [editId, setEditId] = useState(null)

//   const [form, setForm] = useState({
//     name: "",
//     roll_number: ""
//   })

//   const fetchStudents = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get(`/classes/${id}/students`)
//       if (Array.isArray(res.data)) setStudents(res.data)
//       else if (Array.isArray(res.data.students)) setStudents(res.data.students)
//       else setStudents([])
//     } catch (err) {
//       console.log(err)
//       setStudents([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const addStudent = async () => {
//     try {
//       const safeName = form.name.trim().toLowerCase().replace(/\s+/g, "")
//       await API.post(`/student`, {
//         full_name: form.name,
//         roll_number: form.roll_number,
//         class_id: id,
//         email: `${safeName}${form.roll_number}@school.com`,
//         password_hash: "123456"
//       })
//       resetForm()
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const handleEdit = (student) => {
//     setForm({
//       name: student.users?.full_name || student.full_name || "",
//       roll_number: student.roll_number || ""
//     })
//     setEditId(student.id)
//     setShowForm(true)
//   }

//   const updateStudent = async () => {
//     try {
//       await API.put(`/student/${editId}`, { full_name: form.name })
//       resetForm()
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const deleteStudent = async (studentId) => {
//     if (!window.confirm("Delete this student?")) return
//     try {
//       await API.delete(`/student/${studentId}`)
//       fetchStudents()
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const resetForm = () => {
//     setShowForm(false)
//     setEditId(null)
//     setForm({ name: "", roll_number: "" })
//     fetchStudents()
//   }

//   useEffect(() => {
//     fetchStudents()
//   }, [id])

//   const filteredStudents = students.filter(s => {
//     const name = (s.users?.full_name || s.full_name || "").toLowerCase()
//     const roll = (s.roll_number || "").toString().toLowerCase()
//     return name.includes(searchQuery.toLowerCase()) || roll.includes(searchQuery.toLowerCase())
//   })

//   if (loading) return <BookLoader />

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
//         .dm-sans { font-family: 'DM Sans', sans-serif; }
//       `}</style>

//       <div className="p-4 md:p-6 dm-sans min-h-screen">

//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/students")}
//           className="mb-4 flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition text-sm font-medium group"
//         >
//           <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
//           Back to Classes
//         </button>

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
//               <Users className="text-indigo-600" size={28} />
//               Class Students
//             </h1>
//             <p className="text-gray-400 text-sm mt-1">
//               {filteredStudents.length} student{filteredStudents.length !== 1 ? "s" : ""} found
//             </p>
//           </div>

//           <button
//             onClick={() => { setEditId(null); setForm({ name: "", roll_number: "" }); setShowForm(true) }}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition shadow-lg shadow-indigo-500/20"
//           >
//             <UserPlus size={18} /> Add Student
//           </button>
//         </div>

//         {/* Search */}
//         <div className="mb-5">
//           <div className="relative max-w-md">
//             <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name or roll number..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pl-10 outline-none focus:ring-2 focus:ring-indigo-400 text-sm bg-white"
//             />
//           </div>
//         </div>

//         {/* Desktop Table */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hidden md:block">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-100">
//                 <th className="p-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Student</th>
//                 <th className="p-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Roll No</th>
//                 <th className="p-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Profile</th>
//                 <th className="p-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredStudents.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="p-10 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//                         <GraduationCap className="text-gray-400" size={28} />
//                       </div>
//                       <p className="text-gray-500 font-medium">No students found</p>
//                       <p className="text-gray-400 text-sm">Add students to this class</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredStudents.map((s, index) => {
//                   const name = s.users?.full_name || s.full_name || "N/A"
//                   const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

//                   return (
//                     <tr
//                       key={s.id}
//                       className="border-b border-gray-50 hover:bg-indigo-50/30 transition group"
//                     >
//                       {/* Student */}
//                       <td className="p-4">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md shadow-indigo-500/10 shrink-0">
//                             {initials}
//                           </div>
//                           <div>
//                             <p className="font-semibold text-gray-800 text-sm">{name}</p>
//                             <p className="text-xs text-gray-400">Student</p>
//                           </div>
//                         </div>
//                       </td>

//                       {/* Roll */}
//                       <td className="p-4">
//                         <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm font-medium">
//                           #{s.roll_number || "-"}
//                         </span>
//                       </td>

//                       {/* Profile */}
//                       <td className="p-4 text-center">
//                         <button
//                           onClick={() => navigate(`/students/profile/${s.id}`)}
//                           className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1.5 mx-auto transition"
//                         >
//                           <Eye size={15} /> View
//                         </button>
//                       </td>

//                       {/* Actions */}
//                       <td className="p-4">
//                         <div className="flex items-center justify-center gap-2">
//                           <button
//                             onClick={() => handleEdit(s)}
//                             className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
//                           >
//                             <Pencil size={14} />
//                           </button>
//                           <button
//                             onClick={() => deleteStudent(s.id)}
//                             className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   )
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Cards */}
//         <div className="md:hidden space-y-3">
//           {filteredStudents.length === 0 ? (
//             <div className="flex flex-col items-center gap-3 py-10">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//                 <GraduationCap className="text-gray-400" size={28} />
//               </div>
//               <p className="text-gray-500 font-medium">No students found</p>
//             </div>
//           ) : (
//             filteredStudents.map((s) => {
//               const name = s.users?.full_name || s.full_name || "N/A"
//               const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

//               return (
//                 <div
//                   key={s.id}
//                   className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
//                 >
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/10 shrink-0">
//                       {initials}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-bold text-gray-800 truncate">{name}</p>
//                       <p className="text-xs text-gray-400">Roll: #{s.roll_number || "-"}</p>
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => navigate(`/students/profile/${s.id}`)}
//                       className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-indigo-100 transition"
//                     >
//                       <Eye size={14} /> Profile
//                     </button>
//                     <button
//                       onClick={() => handleEdit(s)}
//                       className="w-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition"
//                     >
//                       <Pencil size={14} />
//                     </button>
//                     <button
//                       onClick={() => deleteStudent(s.id)}
//                       className="w-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition"
//                     >
//                       <Trash2 size={14} />
//                     </button>
//                   </div>
//                 </div>
//               )
//             })
//           )}
//         </div>

//         {/* Modal */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">

//               <button
//                 onClick={() => setShowForm(false)}
//                 className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition"
//               >
//                 <X size={16} className="text-gray-500" />
//               </button>

//               <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
//                 {editId
//                   ? <><Pencil size={20} className="text-emerald-600" /> Edit Student</>
//                   : <><UserPlus size={20} className="text-indigo-600" /> Add Student</>
//                 }
//               </h2>
//               <p className="text-sm text-gray-400 mb-5">
//                 {editId ? "Update student information" : "Add a new student to this class"}
//               </p>

//               <div className="space-y-4">
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block flex items-center gap-1">
//                     <User size={12} /> Student Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g. Rahul Sharma"
//                     value={form.name}
//                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block flex items-center gap-1">
//                     <Hash size={12} /> Roll Number
//                   </label>
//                   <input
//                     type="number"
//                     placeholder="e.g. 1"
//                     value={form.roll_number}
//                     onChange={(e) => setForm({ ...form, roll_number: e.target.value })}
//                     className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
//                     disabled={!!editId}
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-3 pt-5">
//                 <button
//                   onClick={() => setShowForm(false)}
//                   className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={editId ? updateStudent : addStudent}
//                   disabled={!form.name.trim()}
//                   className={`flex-1 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
//                     form.name.trim()
//                       ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
//                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   <Save size={16} /> {editId ? "Update" : "Save"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default ClassStudents

import { useEffect, useState } from "react"
import API from "../services/api"
import { useParams, useNavigate } from "react-router-dom"
import BookLoader from "../components/BookLoader"
import {
  Users,
  Pencil,
  Trash2,
  Eye,
  X,
  ArrowLeft,
  UserPlus,
  Hash,
  User,
  Save,
  GraduationCap,
  Search,
  Mail,
  Phone
} from "lucide-react"

function ClassStudents() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    name: "",
    roll_number: "",
    email: "",
    phone: ""
  })

  const fetchStudents = async () => {
    try {
      setLoading(true)
      const res = await API.get(`/classes/${id}/students`)
      if (Array.isArray(res.data)) setStudents(res.data)
      else if (Array.isArray(res.data.students)) setStudents(res.data.students)
      else setStudents([])
    } catch (err) {
      console.log(err)
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  const addStudent = async () => {
    try {
      await API.post(`/student`, {
        full_name: form.name,
        roll_number: form.roll_number,
        class_id: id,
        email: form.email,
        phone: form.phone,
        password_hash: "123456"
      })
      resetForm()
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = (student) => {
    setForm({
      name: student.users?.full_name || student.full_name || "",
      roll_number: student.roll_number || "",
      email: student.users?.email || "",
      phone: student.users?.phone || student.phone || ""
    })
    setEditId(student.id)
    setShowForm(true)
  }

  const updateStudent = async () => {
    try {
      await API.put(`/student/${editId}`, {
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        roll_number: form.roll_number
      })
      resetForm()
    } catch (err) {
      console.log(err)
    }
  }

  const deleteStudent = async (studentId) => {
    if (!window.confirm("Delete this student?")) return
    try {
      await API.delete(`/student/${studentId}`)
      fetchStudents()
    } catch (err) {
      console.log(err)
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditId(null)
    setForm({
      name: "",
      roll_number: "",
      email: "",
      phone: ""
    })
    fetchStudents()
  }

  useEffect(() => {
    fetchStudents()
  }, [id])

  const filteredStudents = students.filter((s) => {
    const name = (s.users?.full_name || s.full_name || "").toLowerCase()
    const roll = (s.roll_number || "").toString().toLowerCase()
    return (
      name.includes(searchQuery.toLowerCase()) ||
      roll.includes(searchQuery.toLowerCase())
    )
  })

  if (loading) return <BookLoader />

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .dm-sans { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="p-4 md:p-6 dm-sans min-h-screen">
        {/* Back Button */}
        <button
          onClick={() => navigate("/students")}
          className="mb-4 flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition text-sm font-medium group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Classes
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Users className="text-indigo-600" size={28} />
              Class Students
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {filteredStudents.length} student
              {filteredStudents.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <button
            onClick={() => {
              setEditId(null)
              setForm({
                name: "",
                roll_number: "",
                email: "",
                phone: ""
              })
              setShowForm(true)
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition shadow-lg shadow-indigo-500/20"
          >
            <UserPlus size={18} /> Add Student
          </button>
        </div>

        {/* Search */}
        <div className="mb-5">
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pl-10 outline-none focus:ring-2 focus:ring-indigo-400 text-sm bg-white"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Profile
                </th>
                <th className="p-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-10 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="text-gray-400" size={28} />
                      </div>
                      <p className="text-gray-500 font-medium">
                        No students found
                      </p>
                      <p className="text-gray-400 text-sm">
                        Add students to this class
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => {
                  const name = s.users?.full_name || s.full_name || "N/A"
                  const initials = name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()

                  return (
                    <tr
                      key={s.id}
                      className="border-b border-gray-50 hover:bg-indigo-50/30 transition group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md shadow-indigo-500/10 shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">
                              {name}
                            </p>
                            <p className="text-xs text-gray-400">Student</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm font-medium">
                          #{s.roll_number || "-"}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => navigate(`/students/profile/${s.id}`)}
                          className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1.5 mx-auto transition"
                        >
                          <Eye size={15} /> View
                        </button>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(s)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => deleteStudent(s.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {filteredStudents.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <GraduationCap className="text-gray-400" size={28} />
              </div>
              <p className="text-gray-500 font-medium">No students found</p>
            </div>
          ) : (
            filteredStudents.map((s) => {
              const name = s.users?.full_name || s.full_name || "N/A"
              const initials = name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()

              return (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/10 shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 truncate">{name}</p>
                      <p className="text-xs text-gray-400">
                        Roll: #{s.roll_number || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/students/profile/${s.id}`)}
                      className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-indigo-100 transition"
                    >
                      <Eye size={14} /> Profile
                    </button>
                    <button
                      onClick={() => handleEdit(s)}
                      className="w-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteStudent(s.id)}
                      className="w-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              >
                <X size={16} className="text-gray-500" />
              </button>

              <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                {editId ? (
                  <>
                    <Pencil size={20} className="text-emerald-600" /> Edit Student
                  </>
                ) : (
                  <>
                    <UserPlus size={20} className="text-indigo-600" /> Add Student
                  </>
                )}
              </h2>
              <p className="text-sm text-gray-400 mb-5">
                {editId
                  ? "Update student information"
                  : "Add a new student to this class"}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block flex items-center gap-1">
                    <User size={12} /> Student Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block flex items-center gap-1">
                    <Hash size={12} /> Roll Number
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 1"
                    value={form.roll_number}
                    onChange={(e) =>
                      setForm({ ...form, roll_number: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                    // disabled={!!editId}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block flex items-center gap-1">
                    <Mail size={12} /> Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. student@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block flex items-center gap-1">
                    <Phone size={12} /> Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-5">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={editId ? updateStudent : addStudent}
                  disabled={
                    !form.name.trim() ||
                    !form.roll_number.toString().trim() ||
                    !form.email.trim() ||
                    !form.phone.trim()
                  }
                  className={`flex-1 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
                    form.name.trim() &&
                    form.roll_number.toString().trim() &&
                    form.email.trim() &&
                    form.phone.trim()
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Save size={16} /> {editId ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ClassStudents