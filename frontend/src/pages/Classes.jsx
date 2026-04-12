// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { Link } from "react-router-dom"

// function Classes() {

//   const [classes, setClasses] = useState([])
//   const [teachers, setTeachers] = useState([])

//   const [selectedClass, setSelectedClass] = useState(null)
//   const [teacherModal, setTeacherModal] = useState(false)
//   const [selectedTeacher, setSelectedTeacher] = useState("")

//   const [createModal, setCreateModal] = useState(false)

//   const [form, setForm] = useState({
//     class_name: "",
//     section: "",
//     academic_year: ""
//   })


//   // =========================
//   // FETCH CLASSES
//   // =========================
//   const fetchClasses = async () => {

//     try {

//       const res = await API.get("/classes")

//       setClasses(res.data)

//     } catch (error) {

//       console.log("Error fetching classes", error)

//     }

//   }


//   // =========================
//   // FETCH TEACHERS
//   // =========================
//   const fetchTeachers = async () => {

//     try {

//       const res = await API.get("/teacher")

//       setTeachers(res.data)

//     } catch (error) {

//       console.log(error)

//     }

//   }


//   useEffect(() => {

//     fetchClasses()
//     fetchTeachers()

//   }, [])


//   // =========================
//   // ASSIGN TEACHER
//   // =========================
//   const assignTeacher = async () => {

//     try {

//       await API.put(`/classes/${selectedClass}/assign-teacher`, {
//         teacher_id: selectedTeacher
//       })

//       setTeacherModal(false)
//       setSelectedTeacher("")

//       fetchClasses()

//     } catch (error) {

//       console.log(error)

//     }

//   }


//   // =========================
//   // CREATE CLASS
//   // =========================
//   const createClass = async () => {

//     try {

//       await API.post("/classes", form)

//       setCreateModal(false)

//       setForm({
//         class_name: "",
//         section: "",
//         academic_year: ""
//       })

//       fetchClasses()

//     } catch (error) {

//       console.log(error)

//     }

//   }


//   return (

//     <div className="p-6">

//       {/* HEADER */}

//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

//         <h1 className="text-3xl font-bold">
//           Classes
//         </h1>

//         <button
//           onClick={() => setCreateModal(true)}
//           className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
//         >
//           + Create Class
//         </button>

//       </div>


//       {/* CLASSES GRID */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

//         {classes.map((cls) => (

//           <div
//             key={cls.id}
//             className="bg-white border rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
//           >

//             {/* CLASS TITLE */}

//             <div>

//               <h2 className="text-xl font-semibold mb-1">
//                 Class {cls.class_name}-{cls.section}
//               </h2>

//               <p className="text-gray-500 text-sm mb-5">
//                 Academic Year: {cls.academic_year || "—"}
//               </p>


//               {/* CLASS INFO */}

//               <div className="space-y-3 text-sm">

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">👨‍🏫 Teacher</span>
//                   <span className="font-medium">
//                     {cls.teacher_name || "Not Assigned"}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">👨‍🎓 Students</span>
//                   <span className="font-medium">
//                     {cls.students?.[0]?.count || 0}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span className="text-gray-600">⭐ Class Monitor</span>
//                   <span className="font-medium text-gray-400">
//                     Not Assigned
//                   </span>
//                 </div>

//               </div>

//             </div>


//             {/* ACTION BUTTONS */}

//             <div className="flex gap-3 mt-6">

//               <Link
//                 to={`/classes/${cls.id}`}
//                 className="flex-1 text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//               >
//                 Open Class
//               </Link>

//               <button
//                 onClick={() => {

//                   setSelectedClass(cls.id)
//                   setTeacherModal(true)

//                 }}
//                 className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
//               >
//                 Assign Teacher
//               </button>

//             </div>

//           </div>

//         ))}

//       </div>



//       {/* =========================
//           CREATE CLASS MODAL
//       ========================= */}

//       {createModal && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

//           <div className="bg-white rounded-xl p-6 w-[90%] md:w-[400px]">

//             <h2 className="text-xl font-semibold mb-4">
//               Create Class
//             </h2>

//             <input
//               type="text"
//               placeholder="Class Name"
//               className="border p-2 rounded w-full mb-3"
//               value={form.class_name}
//               onChange={(e) =>
//                 setForm({ ...form, class_name: e.target.value })
//               }
//             />

//             <input
//               type="text"
//               placeholder="Section"
//               className="border p-2 rounded w-full mb-3"
//               value={form.section}
//               onChange={(e) =>
//                 setForm({ ...form, section: e.target.value })
//               }
//             />

//             <input
//               type="text"
//               placeholder="Academic Year"
//               className="border p-2 rounded w-full mb-4"
//               value={form.academic_year}
//               onChange={(e) =>
//                 setForm({ ...form, academic_year: e.target.value })
//               }
//             />

//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => setCreateModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={createClass}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded"
//               >
//                 Create
//               </button>

//             </div>

//           </div>

//         </div>

//       )}



//       {/* =========================
//           ASSIGN TEACHER MODAL
//       ========================= */}

//       {teacherModal && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

//           <div className="bg-white rounded-xl p-6 w-[90%] md:w-[400px]">

//             <h2 className="text-xl font-semibold mb-4">
//               Assign Teacher
//             </h2>

//             <select
//               className="border p-2 rounded w-full mb-4"
//               value={selectedTeacher}
//               onChange={(e) => setSelectedTeacher(e.target.value)}
//             >

//               <option value="">
//                 Select Teacher
//               </option>

//               {teachers.map((teacher) => (

//                 <option key={teacher.id} value={teacher.id}>
//                   {teacher.full_name}
//                 </option>

//               ))}

//             </select>

//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => setTeacherModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={assignTeacher}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded"
//               >
//                 Assign
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>

//   )

// }

// export default Classes
























//improved ui 
import { useEffect, useState } from "react"
import API from "../services/api"
import { Link } from "react-router-dom"
import BookLoader from "../components/BookLoader"
import {
  School,
  Plus,
  UserCheck,
  Users,
  Star,
  ExternalLink,
  X
} from "lucide-react"

function Classes() {

  const [classes, setClasses] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedClass, setSelectedClass] = useState(null)
  const [teacherModal, setTeacherModal] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState("")

  const [createModal, setCreateModal] = useState(false)

  const [form, setForm] = useState({
    class_name: "",
    section: "",
    academic_year: ""
  })

  const fetchClasses = async () => {
    try {
      const res = await API.get("/classes")
      setClasses(res.data)
    } catch (error) {
      console.log("Error fetching classes", error)
    }
  }

  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teacher")
      setTeachers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchClasses(), fetchTeachers()])
      setLoading(false)
    }
    loadData()
  }, [])

  const assignTeacher = async () => {
    try {
      await API.put(`/classes/${selectedClass}/assign-teacher`, {
        teacher_id: selectedTeacher
      })
      setTeacherModal(false)
      setSelectedTeacher("")
      fetchClasses()
    } catch (error) {
      console.log(error)
    }
  }

  const createClass = async () => {
    try {
      await API.post("/classes", form)
      setCreateModal(false)
      setForm({ class_name: "", section: "", academic_year: "" })
      fetchClasses()
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <BookLoader />

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .dm-sans { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="p-4 md:p-6 dm-sans">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
              <School className="text-indigo-600" size={30} />
              Classes
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage all classes, assign teachers & view students
            </p>
          </div>

          <button
            onClick={() => setCreateModal(true)}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 font-semibold text-sm"
          >
            <Plus size={18} /> Create Class
          </button>
        </div>

        {/* CLASSES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {classes.map((cls, index) => (
            <div
              key={cls.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-6 flex flex-col justify-between"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* CLASS TITLE */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                    <School className="text-indigo-600" size={22} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Class {cls.class_name}-{cls.section}
                    </h2>
                    <p className="text-gray-400 text-xs">
                      {cls.academic_year || "No Year"}
                    </p>
                  </div>
                </div>

                {/* CLASS INFO */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 flex items-center gap-2">
                      <UserCheck size={14} className="text-blue-500" /> Teacher
                    </span>
                    <span className="font-semibold text-gray-700">
                      {cls.teacher_name || "Not Assigned"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Users size={14} className="text-emerald-500" /> Students
                    </span>
                    <span className="font-semibold text-gray-700" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {cls.students?.[0]?.count || 0}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 flex items-center gap-2">
                      <Star size={14} className="text-amber-500" /> Monitor
                    </span>
                    <span className="font-semibold text-gray-400">
                      Not Assigned
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-6">
                <Link
                  to={`/classes/${cls.id}`}
                  className="flex-1 text-center bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <ExternalLink size={15} /> Open
                </Link>

                <button
                  onClick={() => {
                    setSelectedClass(cls.id)
                    setTeacherModal(true)
                  }}
                  className="flex-1 border border-gray-200 py-2.5 rounded-xl hover:bg-gray-50 transition font-semibold text-sm text-gray-600 flex items-center justify-center gap-2"
                >
                  <UserCheck size={15} /> Assign
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CREATE CLASS MODAL */}
        {createModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">

              <button
                onClick={() => setCreateModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                <X size={16} className="text-gray-500" />
              </button>

              <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                <School size={20} className="text-indigo-600" />
                Create Class
              </h2>
              <p className="text-sm text-gray-500 mb-5">Add a new class to the school</p>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Class Name</label>
                  <input
                    type="text"
                    placeholder="e.g. 10"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400"
                    value={form.class_name}
                    onChange={(e) => setForm({ ...form, class_name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Section</label>
                  <input
                    type="text"
                    placeholder="e.g. A"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400"
                    value={form.section}
                    onChange={(e) => setForm({ ...form, section: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Academic Year</label>
                  <input
                    type="text"
                    placeholder="e.g. 2025-26"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400"
                    value={form.academic_year}
                    onChange={(e) => setForm({ ...form, academic_year: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-5">
                <button
                  onClick={() => setCreateModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={createClass}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ASSIGN TEACHER MODAL */}
        {teacherModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">

              <button
                onClick={() => setTeacherModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                <X size={16} className="text-gray-500" />
              </button>

              <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                <UserCheck size={20} className="text-indigo-600" />
                Assign Teacher
              </h2>
              <p className="text-sm text-gray-500 mb-5">Select a teacher for this class</p>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Teacher</label>
                <select
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-400"
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-5">
                <button
                  onClick={() => setTeacherModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={assignTeacher}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-medium transition flex items-center justify-center gap-2"
                >
                  <UserCheck size={16} /> Assign
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default Classes