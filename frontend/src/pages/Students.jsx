// import { useEffect, useState } from "react"
// import API from "../services/api"

// function Students() {

//     const [students, setStudents] = useState([])

//     const [showModal, setShowModal] = useState(false)
//     const [editModal, setEditModal] = useState(false)

//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const [editStudentId, setEditStudentId] = useState(null)

//     const [search, setSearch] = useState("")

//     const [currentPage, setCurrentPage] = useState(1)
//     const studentsPerPage = 5

//     // Fetch students
//     const fetchStudents = async () => {

//         try {

//             const res = await API.get("/student")
//             setStudents(res.data)

//         } catch (error) {

//             console.log("Error fetching students", error)

//         }

//     }

//     useEffect(() => {
//         fetchStudents()
//     }, [])

//     // Add student
//     const addStudent = async () => {

//         try {

//             await API.post("/student", {
//                 full_name: name,
//                 email: email,
//                 password_hash: password
//             })

//             setShowModal(false)
//             setName("")
//             setEmail("")
//             setPassword("")

//             fetchStudents()

//         } catch (error) {

//             console.log("Error adding student", error)

//         }

//     }

//     // Delete student
//     const deleteStudent = async (id) => {

//         const confirmDelete = window.confirm("Are you sure you want to delete this student?")
//         if (!confirmDelete) return

//         try {

//             await API.delete(`/student/${id}`)
//             fetchStudents()

//         } catch (error) {

//             console.log("Error deleting student", error)

//         }

//     }

//     // Open edit modal
//     const openEditModal = (student) => {

//         setEditStudentId(student.id)
//         setName(student.users?.full_name)
//         setEditModal(true)

//     }

//     // Update student
//     const updateStudent = async () => {

//         try {

//             await API.put(`/student/${editStudentId}`, {
//                 full_name: name
//             })

//             setEditModal(false)
//             setName("")

//             fetchStudents()

//         } catch (error) {

//             console.log("Error updating student", error)

//         }

//     }

//     // Search filter
//     const filteredStudents = students.filter((student) =>
//         student.users?.full_name
//             ?.toLowerCase()
//             .includes(search.toLowerCase())
//     )

//     // Pagination
//     const indexOfLastStudent = currentPage * studentsPerPage
//     const indexOfFirstStudent = indexOfLastStudent - studentsPerPage

//     const currentStudents = filteredStudents.slice(
//         indexOfFirstStudent,
//         indexOfLastStudent
//     )

//     const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

//     return (
//         <div>

//             <div className="flex justify-between mb-6">

//                 <h1 className="text-3xl font-bold">Students</h1>

//                 <div className="flex gap-3">

//                     <input
//                         type="text"
//                         placeholder="Search student..."
//                         className="border px-3 py-2 rounded"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />

//                     <button
//                         onClick={() => setShowModal(true)}
//                         className="bg-blue-600 text-white px-4 py-2 rounded"
//                     >
//                         Add Student
//                     </button>

//                 </div>

//             </div>

//             <div className="bg-white rounded shadow">

//                 <table className="w-full">

//                     <thead className="bg-gray-200">

//                         <tr>
//                             <th className="p-3 text-left">Name</th>
//                             <th className="p-3 text-left">Class</th>
//                             <th className="p-3 text-left">Roll</th>
//                             <th className="p-3 text-left">Actions</th>
//                         </tr>

//                     </thead>

//                     <tbody>

//                         {currentStudents.map((student) => (

//                             <tr key={student.id} className="border-b">

//                                 <td className="p-3">
//                                     {student.users?.full_name}
//                                 </td>

//                                 <td className="p-3">
//                                     {student.classes?.class_name} {student.classes?.section}
//                                 </td>

//                                 <td className="p-3">
//                                     {student.roll_number}
//                                 </td>

//                                 <td className="p-3 flex gap-3">

//                                     <button
//                                         onClick={() => openEditModal(student)}
//                                         className="text-blue-600"
//                                     >
//                                         Edit
//                                     </button>

//                                     <button
//                                         onClick={() => deleteStudent(student.id)}
//                                         className="text-red-600"
//                                     >
//                                         Delete
//                                     </button>

//                                 </td>

//                             </tr>

//                         ))}

//                     </tbody>

//                 </table>

//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center gap-2 mt-6">

//                 {Array.from({ length: totalPages }, (_, index) => (

//                     <button
//                         key={index}
//                         onClick={() => setCurrentPage(index + 1)}
//                         className={`px-3 py-1 border rounded ${currentPage === index + 1
//                                 ? "bg-blue-600 text-white"
//                                 : ""
//                             }`}
//                     >
//                         {index + 1}
//                     </button>

//                 ))}

//             </div>

//             {/* Add Student Modal */}
//             {showModal && (

//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//                     <div className="bg-white p-6 rounded w-96">

//                         <h2 className="text-xl font-bold mb-4">
//                             Add Student
//                         </h2>

//                         <input
//                             placeholder="Name"
//                             className="border p-2 w-full mb-3"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />

//                         <input
//                             placeholder="Email"
//                             className="border p-2 w-full mb-3"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />

//                         <input
//                             placeholder="Password"
//                             className="border p-2 w-full mb-3"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />

//                         <div className="flex justify-end gap-2">

//                             <button
//                                 onClick={() => setShowModal(false)}
//                                 className="px-4 py-2 border rounded"
//                             >
//                                 Cancel
//                             </button>

//                             <button
//                                 onClick={addStudent}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                             >
//                                 Add
//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             )}

//             {/* Edit Student Modal */}
//             {editModal && (

//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//                     <div className="bg-white p-6 rounded w-96">

//                         <h2 className="text-xl font-bold mb-4">
//                             Edit Student
//                         </h2>

//                         <input
//                             className="border p-2 w-full mb-3"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />

//                         <div className="flex justify-end gap-2">

//                             <button
//                                 onClick={() => setEditModal(false)}
//                                 className="px-4 py-2 border rounded"
//                             >
//                                 Cancel
//                             </button>

//                             <button
//                                 onClick={updateStudent}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                             >
//                                 Update
//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             )}

//         </div>
//     )
// }

// export default Students













// import { useEffect, useState } from "react"
// import API from "../services/api"

// function Students() {

//     const [students, setStudents] = useState([])
//     const [classes, setClasses] = useState([])

//     const [selectedClass, setSelectedClass] = useState(null)

//     const [showModal, setShowModal] = useState(false)

//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const [search, setSearch] = useState("")

//     // ================= FETCH DATA =================

//     const fetchStudents = async () => {

//         try {

//             const res = await API.get("/student")
//             setStudents(res.data)

//         } catch (error) {

//             console.log("Error fetching students", error)

//         }

//     }

//     const fetchClasses = async () => {

//         try {

//             const res = await API.get("/classes")
//             setClasses(res.data)

//         } catch (error) {

//             console.log("Error fetching classes", error)

//         }

//     }

//     useEffect(() => {

//         fetchStudents()
//         fetchClasses()

//     }, [])

//     // ================= ADD STUDENT =================

//     const addStudent = async () => {

//         try {

//             await API.post("/student", {

//                 full_name: name,
//                 email: email,
//                 password_hash: password,
//                 class_id: selectedClass

//             })

//             setShowModal(false)

//             setName("")
//             setEmail("")
//             setPassword("")

//             fetchStudents()

//         } catch (error) {

//             console.log("Error adding student", error)

//         }

//     }

//     // ================= DELETE =================

//     const deleteStudent = async (id) => {

//         if (!window.confirm("Delete student?")) return

//         try {

//             await API.delete(`/student/${id}`)
//             fetchStudents()

//         } catch (error) {

//             console.log(error)

//         }

//     }

//     // ================= FILTER =================

//     const filteredStudents = students
//         .filter((s) => s.class_id === selectedClass)
//         .filter((s) =>
//             s.users?.full_name
//                 ?.toLowerCase()
//                 .includes(search.toLowerCase())
//         )

//     return (

//         <div className="p-6">

//             <h1 className="text-3xl font-bold mb-6">
//                 Students
//             </h1>

//             {/* ================= CLASS VIEW ================= */}

//             {!selectedClass && (

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//                     {classes.map((cls) => (

//                         <div
//                             key={cls.id}
//                             onClick={() => setSelectedClass(cls.id)}
//                             className="bg-white shadow rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
//                         >

//                             <h2 className="text-xl font-bold">
//                                 Class {cls.class_name}
//                             </h2>

//                             <p className="text-gray-500">
//                                 Section {cls.section}
//                             </p>

//                         </div>

//                     ))}

//                 </div>

//             )}

//             {/* ================= STUDENT LIST ================= */}

//             {selectedClass && (

//                 <div>

//                     <button
//                         onClick={() => setSelectedClass(null)}
//                         className="mb-4 text-blue-600"
//                     >
//                         ← Back to Classes
//                     </button>

//                     <div className="flex justify-between mb-4">

//                         <input
//                             placeholder="Search student..."
//                             className="border px-3 py-2 rounded"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />

//                         <button
//                             onClick={() => setShowModal(true)}
//                             className="bg-blue-600 text-white px-4 py-2 rounded"
//                         >
//                             Add Student
//                         </button>

//                     </div>

//                     <div className="bg-white rounded shadow">

//                         <table className="w-full">

//                             <thead className="bg-gray-200">

//                                 <tr>

//                                     <th className="p-3 text-left">
//                                         Name
//                                     </th>

//                                     <th className="p-3 text-left">
//                                         Roll
//                                     </th>

//                                     <th className="p-3 text-left">
//                                         Actions
//                                     </th>

//                                 </tr>

//                             </thead>

//                             <tbody>

//                                 {filteredStudents.map((student) => (

//                                     <tr key={student.id} className="border-b">

//                                         <td className="p-3">
//                                             {student.users?.full_name}
//                                         </td>

//                                         <td className="p-3">
//                                             {student.roll_number}
//                                         </td>

//                                         <td className="p-3">

//                                             <button
//                                                 onClick={() => deleteStudent(student.id)}
//                                                 className="text-red-600"
//                                             >
//                                                 Delete
//                                             </button>

//                                         </td>

//                                     </tr>

//                                 ))}

//                             </tbody>

//                         </table>

//                     </div>

//                 </div>

//             )}

//             {/* ================= ADD STUDENT MODAL ================= */}

//             {showModal && (

//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//                     <div className="bg-white p-6 rounded w-96">

//                         <h2 className="text-xl font-bold mb-4">
//                             Add Student
//                         </h2>

//                         <input
//                             placeholder="Name"
//                             className="border p-2 w-full mb-3"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />

//                         <input
//                             placeholder="Email"
//                             className="border p-2 w-full mb-3"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />

//                         <input
//                             placeholder="Password"
//                             className="border p-2 w-full mb-3"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />

//                         <div className="flex justify-end gap-2">

//                             <button
//                                 onClick={() => setShowModal(false)}
//                                 className="border px-4 py-2 rounded"
//                             >
//                                 Cancel
//                             </button>

//                             <button
//                                 onClick={addStudent}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded"
//                             >
//                                 Add
//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             )}

//         </div>
//     )

// }

// export default Students














// import { useEffect, useState } from "react"
// import API from "../services/api";
// import { useNavigate } from "react-router-dom"

// function Students() {

//     const [classes, setClasses] = useState([])
//     const navigate = useNavigate()

//     const fetchClasses = async () => {

//         try {

//             const res = await API.get("/classes")
//             setClasses(res.data)

//         } catch (err) {

//             console.log(err)

//         }

//     }

//     useEffect(() => {

//         fetchClasses()

//     }, [])

//     return (

//         <div className="p-6">

//             <h1 className="text-3xl font-bold mb-6">
//                 Students
//             </h1>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

//                 {classes.map((cls) => (

//                     <div
//                         key={cls.id}
//                         onClick={() => navigate(`/students/class/${cls.id}`)}
//                         className="bg-white shadow rounded-xl p-6 cursor-pointer hover:shadow-lg"
//                     >

//                         <h2 className="text-xl font-bold">
//                             Class {cls.class_name}
//                         </h2>

//                         <p className="text-gray-500">
//                             Section {cls.section}
//                         </p>

//                     </div>

//                 ))}

//             </div>

//         </div>

//     )

// }

// export default Students






























//improved ui
import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"
import BookLoader from "../components/BookLoader"
import { Users, BookOpen, ChevronRight, Hash } from "lucide-react"

function Students() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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

  useEffect(() => {
    fetchClasses()
  }, [])

  if (loading) return <BookLoader />

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .dm-sans { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="p-4 md:p-8 dm-sans bg-gray-50 min-h-screen">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Users className="text-indigo-600" size={32} />
            Students Directory
          </h1>
          <p className="text-gray-500 mt-1">Select a class to view student list</p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              onClick={() => navigate(`/students/class/${cls.id}`)}
              className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Card Icon */}
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="text-indigo-600" size={24} />
              </div>

              {/* Info */}
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Class {cls.class_name}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 font-medium mb-4">
                <Hash size={16} />
                <span>Section {cls.section}</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  View Students
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {classes.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">No classes found.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Students












//2nd ui design 
// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { useNavigate } from "react-router-dom"
// import BookLoader from "../components/BookLoader"
// import {
//   Users,
//   School,
//   ChevronRight,
//   GraduationCap
// } from "lucide-react"

// const cardColors = [
//   "from-indigo-500 to-violet-600",
//   "from-emerald-500 to-teal-600",
//   "from-amber-500 to-orange-600",
//   "from-rose-500 to-pink-600",
//   "from-cyan-500 to-blue-600",
//   "from-purple-500 to-fuchsia-600",
//   "from-lime-500 to-green-600",
//   "from-red-500 to-rose-600",
// ]

// function Students() {

//   const [classes, setClasses] = useState([])
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()

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

//   useEffect(() => {
//     fetchClasses()
//   }, [])

//   if (loading) return <BookLoader />

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
//         .dm-sans { font-family: 'DM Sans', sans-serif; }
//       `}</style>

//       <div className="p-4 md:p-6 dm-sans min-h-screen">

//         {/* Header */}
//         <div className="mb-6 md:mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
//             <Users className="text-indigo-600" size={30} />
//             Students
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Select a class to view and manage students
//           </p>
//         </div>

//         {/* Classes Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">

//           {classes.map((cls, index) => (

//             <div
//               key={cls.id}
//               onClick={() => navigate(`/students/class/${cls.id}`)}
//               className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm 
//                 hover:shadow-xl cursor-pointer transition-all duration-300 
//                 hover:-translate-y-1 overflow-hidden"
//             >
//               {/* Top Gradient Bar */}
//               <div className={`h-2 bg-gradient-to-r ${cardColors[index % cardColors.length]}`} />

//               <div className="p-5">

//                 {/* Icon + Info */}
//                 <div className="flex items-center gap-4">
//                   <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cardColors[index % cardColors.length]} 
//                     flex items-center justify-center shadow-lg shadow-indigo-500/10 
//                     group-hover:scale-110 transition-transform duration-300`}
//                   >
//                     <School className="text-white" size={24} />
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
//                       Class {cls.class_name}
//                     </h2>
//                     <p className="text-gray-400 text-sm">
//                       Section {cls.section}
//                     </p>
//                   </div>

//                   <ChevronRight
//                     size={20}
//                     className="text-gray-300 group-hover:text-indigo-500 
//                       group-hover:translate-x-1 transition-all duration-300 shrink-0"
//                   />
//                 </div>

//                 {/* Stats Row */}
//                 <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
//                   <div className="flex items-center gap-2 text-gray-400 text-xs">
//                     <GraduationCap size={14} />
//                     <span>{cls.students?.[0]?.count || 0} Students</span>
//                   </div>

//                   <div className="flex items-center gap-2 text-gray-400 text-xs">
//                     <Users size={14} />
//                     <span>{cls.teacher_name || "No Teacher"}</span>
//                   </div>
//                 </div>

//               </div>
//             </div>

//           ))}

//         </div>

//         {/* Empty State */}
//         {classes.length === 0 && !loading && (
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//               <School className="text-gray-400" size={32} />
//             </div>
//             <h3 className="text-lg font-bold text-gray-700">No Classes Found</h3>
//             <p className="text-gray-400 text-sm mt-1">
//               Create a class first to manage students
//             </p>
//           </div>
//         )}

//       </div>
//     </>
//   )
// }

// export default Students