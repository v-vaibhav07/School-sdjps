// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { Link } from "react-router-dom"

// function Teachers() {

//   const [classes, setClasses] = useState([])

//   const fetchClasses = async () => {

//     try {

//       const res = await API.get("/classes")
//       setClasses(res.data)

//     } catch (error) {

//       console.log("Error loading classes", error)

//     }

//   }

//   useEffect(() => {

//     fetchClasses()

//   }, [])

//   return (

//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         Teacher Dashboard
//       </h1>

//       <div className="grid grid-cols-3 gap-6">

//         {classes.map((cls) => (

//           <div
//             key={cls.id}
//             className="bg-white shadow rounded p-5"
//           >

//             <h2 className="text-xl font-bold mb-2">
//               Class {cls.class_name} {cls.section}
//             </h2>

//             <p className="text-gray-500 mb-4">
//               Academic Year: {cls.academic_year}
//             </p>

//             <div className="flex flex-col gap-2">

//               <Link
//                 to={`/teacher/class/${cls.id}/attendance`}
//                 className="text-blue-600 hover:underline"
//               >
//                 Mark Attendance
//               </Link>

//               <Link
//                 to={`/teacher/class/${cls.id}/marks`}
//                 className="text-blue-600 hover:underline"
//               >
//                 Upload Marks
//               </Link>

//               <Link
//                 to={`/classes/${cls.id}/chat`}
//                 className="text-blue-600 hover:underline"
//               >
//                 Class Chat
//               </Link>

//               <Link
//                 to={`/homework/class/${cls.id}`}
//                 className="text-blue-600 hover:underline"
//               >
//                 Post Homework
//               </Link>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>

//   )

// }

// export default Teachers







//************************************************************************************************************** */
  // import { useEffect, useState } from "react"
  // import API from "../services/api"

  // function Teachers() {

  //   const [teachers, setTeachers] = useState([])

  //   const fetchTeachers = async () => {
  //     try {

  //       const res = await API.get("/teacher")
  //       setTeachers(res.data)

  //     } catch (error) {

  //       console.log("Error fetching teachers", error)

  //     }
  //   }

  //   useEffect(() => {
  //     fetchTeachers()
  //   }, [])

  //   return (

  //     <div className="p-6">

  //       <h1 className="text-3xl font-bold mb-6">
  //         Teachers
  //       </h1>

  //       <div className="bg-white shadow rounded">

  //         <table className="w-full">

  //           <thead className="bg-gray-200">
  //             <tr>
  //               <th className="p-3 text-left">Name</th>
  //               <th className="p-3 text-left">Email</th>
  //             </tr>
  //           </thead>

  //           <tbody>

  //             {teachers.map((teacher) => (

  //               <tr key={teacher.id} className="border-b">

  //                 <td className="p-3">
  //                   {teacher.full_name}
  //                 </td>

  //                 <td className="p-3">
  //                   {teacher.email}
  //                 </td>

  //               </tr>

  //             ))}

  //           </tbody>

  //         </table>

  //       </div>

  //     </div>

  //   )

  // }

  // export default Teachers
 // *************************************************************************



// import { useEffect, useState } from "react"
// import API from "../services/api"

// function Teachers() {

//   const [teachers, setTeachers] = useState([])
//   const [search, setSearch] = useState("")
//   const [showModal, setShowModal] = useState(false)
//   const [editingTeacher, setEditingTeacher] = useState(null)

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     subject: "",
//     phone: "",
//     qualification: "",
//     experience: ""
//   })

//   const fetchTeachers = async () => {
//     try {
//       const res = await API.get("/teacher")
//       setTeachers(res.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     fetchTeachers()
//   }, [])

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const openAddModal = () => {
//     setEditingTeacher(null)
//     setForm({
//       full_name: "",
//       email: "",
//       subject: "",
//       phone: "",
//       qualification: "",
//       experience: ""
//     })
//     setShowModal(true)
//   }

//   const openEditModal = (teacher) => {
//     setEditingTeacher(teacher)
//     setForm({
//       full_name: teacher.full_name,
//       email: teacher.email,
//       subject: teacher.subject || "",
//       phone: teacher.phone || "",
//       qualification: teacher.qualification || "",
//       experience: teacher.experience || ""
//     })
//     setShowModal(true)
//   }

// const saveTeacher = async () => {

//   try {

//     // basic validation
//     if (!form.full_name.trim()) {
//       alert("Teacher name is required")
//       return
//     }

//     if (!form.email.trim()) {
//       alert("Email is required")
//       return
//     }

//     const payload = {
//       full_name: form.full_name.trim(),
//       email: form.email.trim(),
//       subject: form.subject || null,
//       phone: form.phone || null,
//       qualification: form.qualification || null,
//       experience: form.experience ? Number(form.experience) : null
//     }

//     if (editingTeacher) {

//       await API.put(`/teacher/${editingTeacher.id}`, payload)

//     } else {

//       await API.post("/teacher", payload)

//     }

//     await fetchTeachers()

//     setShowModal(false)

//   } catch (err) {

//     console.log("FULL ERROR:", err)

//     if (err.response) {
//       console.log("BACKEND ERROR:", err.response.data)
//       alert(err.response.data.error || "Something went wrong")
//     } else {
//       alert("Server error")
//     }

//   }

// }

//   const deleteTeacher = async (id) => {

//     const confirmDelete = window.confirm("Delete this teacher?")

//     if (!confirmDelete) return

//     await API.delete(`/teacher/${id}`)

//     fetchTeachers()

//   }

//   const filteredTeachers = teachers.filter((t) =>
//     t.full_name?.toLowerCase().includes(search.toLowerCase())
//   )

//   return (

//     <div className="p-4 md:p-6">

//       {/* HEADER */}

//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

//         <h1 className="text-3xl font-bold">
//           Teachers
//         </h1>

//         <div className="flex gap-3">

//           <input
//             type="text"
//             placeholder="Search teacher..."
//             className="border rounded px-3 py-2"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <button
//             onClick={openAddModal}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             + Add Teacher
//           </button>

//         </div>

//       </div>


//       {/* TEACHER GRID */}

//       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//         {filteredTeachers.map((teacher) => (

//           <div
//             key={teacher.id}
//             className="bg-white shadow rounded-xl p-5 hover:shadow-lg transition"
//           >

//             <h2 className="text-xl font-bold mb-1">
//               {teacher.full_name}
//             </h2>

//             <p className="text-gray-500 mb-3">
//               {teacher.subject || "Subject not added"}
//             </p>

//             <div className="text-sm space-y-2 text-gray-700">

//               <p>📧 {teacher.email}</p>

//               <p>📱 {teacher.phone || "Not added"}</p>

//               <p>🎓 {teacher.qualification || "Not added"}</p>

//               <p>🧠 Experience: {teacher.experience || 0} years</p>

//             </div>

//             <div className="flex gap-4 mt-4">

//               <button
//                 onClick={() => openEditModal(teacher)}
//                 className="text-blue-600 hover:underline"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteTeacher(teacher.id)}
//                 className="text-red-600 hover:underline"
//               >
//                 Delete
//               </button>

//             </div>

//           </div>

//         ))}

//       </div>


//       {/* ADD / EDIT MODAL */}

//       {showModal && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//           <div className="bg-white rounded-xl p-6 w-[90%] md:w-[400px]">

//             <h2 className="text-xl font-bold mb-4">
//               {editingTeacher ? "Edit Teacher" : "Add Teacher"}
//             </h2>

//             <div className="space-y-3">

//               <input
//                 name="full_name"
//                 placeholder="Full Name"
//                 className="border w-full p-2 rounded"
//                 value={form.full_name}
//                 onChange={handleChange}
//               />

//               <input
//                 name="email"
//                 placeholder="Email"
//                 className="border w-full p-2 rounded"
//                 value={form.email}
//                 onChange={handleChange}
//               />

//               <input
//                 name="subject"
//                 placeholder="Subject"
//                 className="border w-full p-2 rounded"
//                 value={form.subject}
//                 onChange={handleChange}
//               />

//               <input
//                 name="phone"
//                 placeholder="Phone"
//                 className="border w-full p-2 rounded"
//                 value={form.phone}
//                 onChange={handleChange}
//               />

//               <input
//                 name="qualification"
//                 placeholder="Qualification"
//                 className="border w-full p-2 rounded"
//                 value={form.qualification}
//                 onChange={handleChange}
//               />

//               <input
//                 name="experience"
//                 placeholder="Experience (years)"
//                 className="border w-full p-2 rounded"
//                 value={form.experience}
//                 onChange={handleChange}
//               />

//             </div>

//             <div className="flex justify-end gap-3 mt-4">

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-3 py-2 border rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={saveTeacher}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
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

// export default Teachers







import { useEffect, useState } from "react"
import API from "../services/api"

function Teachers() {
  const [teachers, setTeachers] = useState([])
  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    subject: "",
    phone: "",
    qualification: "",
    experience: ""
  })

  const fetchTeachers = async () => {
    try {
      setLoading(true)
      const res = await API.get("/teacher")
      setTeachers(res.data)
    } catch (error) {
      console.log("FETCH TEACHERS ERROR:", error)
      alert("Failed to fetch teachers")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeachers()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const openAddModal = () => {
    setEditingTeacher(null)
    setForm({
      full_name: "",
      email: "",
      subject: "",
      phone: "",
      qualification: "",
      experience: ""
    })
    setShowModal(true)
  }

  const openEditModal = (teacher) => {
    setEditingTeacher(teacher)
    setForm({
      full_name: teacher.full_name || "",
      email: teacher.email || "",
      subject: teacher.subject || "",
      phone: teacher.phone || "",
      qualification: teacher.qualification || "",
      experience: teacher.experience || ""
    })
    setShowModal(true)
  }

  const saveTeacher = async () => {
    if (saveLoading) return

    try {
      if (!form.full_name.trim()) {
        alert("Teacher name is required")
        return
      }

      if (!form.email.trim()) {
        alert("Email is required")
        return
      }

      setSaveLoading(true)

      const payload = {
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        subject: form.subject.trim() || null,
        phone: form.phone.trim() || null,
        qualification: form.qualification.trim() || null,
        experience: form.experience ? Number(form.experience) : null
      }

      if (editingTeacher) {
        await API.put(`/teacher/${editingTeacher.id}`, payload)
      } else {
        await API.post("/teacher", payload)
      }

      await fetchTeachers()
      setShowModal(false)
    } catch (err) {
      console.log("SAVE TEACHER ERROR:", err)
      if (err.response) {
        console.log("BACKEND ERROR:", err.response.data)
        alert(err.response.data.error || "Something went wrong")
      } else {
        alert("Server error")
      }
    } finally {
      setSaveLoading(false)
    }
  }

  const deleteTeacher = async (id) => {
    const confirmDelete = window.confirm("Delete this teacher?")
    if (!confirmDelete) return

    try {
      await API.delete(`/teacher/${id}`)
      await fetchTeachers()
    } catch (err) {
      console.log("DELETE TEACHER ERROR:", err)
      alert(err.response?.data?.error || "Failed to delete teacher")
    }
  }

  const filteredTeachers = teachers.filter((t) =>
    t.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    t.email?.toLowerCase().includes(search.toLowerCase()) ||
    t.subject?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Teachers</h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search teacher..."
            className="border rounded px-3 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Teacher
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-500">Loading teachers...</p>
      ) : (
        <>
          {/* TEACHER GRID */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white shadow rounded-xl p-5 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold mb-1">{teacher.full_name}</h2>

                <p className="text-gray-500 mb-3">
                  {teacher.subject || "Subject not added"}
                </p>

                <div className="text-sm space-y-2 text-gray-700">
                  <p>📧 {teacher.email}</p>
                  <p>📱 {teacher.phone || "Not added"}</p>
                  <p>🎓 {teacher.qualification || "Not added"}</p>
                  <p>🧠 Experience: {teacher.experience || 0} years</p>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => openEditModal(teacher)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTeacher(teacher.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredTeachers.length === 0 && (
            <p className="text-gray-500 mt-6">No teachers found.</p>
          )}
        </>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] md:w-[400px]">
            <h2 className="text-xl font-bold mb-4">
              {editingTeacher ? "Edit Teacher" : "Add Teacher"}
            </h2>

            <div className="space-y-3">
              <input
                name="full_name"
                placeholder="Full Name"
                className="border w-full p-2 rounded"
                value={form.full_name}
                onChange={handleChange}
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                className="border w-full p-2 rounded"
                value={form.email}
                onChange={handleChange}
              />

              <input
                name="subject"
                placeholder="Subject"
                className="border w-full p-2 rounded"
                value={form.subject}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Phone"
                className="border w-full p-2 rounded"
                value={form.phone}
                onChange={handleChange}
              />

              <input
                name="qualification"
                placeholder="Qualification"
                className="border w-full p-2 rounded"
                value={form.qualification}
                onChange={handleChange}
              />

              <input
                name="experience"
                type="number"
                placeholder="Experience (years)"
                className="border w-full p-2 rounded"
                value={form.experience}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                disabled={saveLoading}
                className="px-3 py-2 border rounded"
              >
                Cancel
              </button>

<button
  onClick={() => {
    if (!saveLoading) saveTeacher()
  }}
  disabled={saveLoading}
  className={`bg-blue-600 text-white px-4 py-2 rounded ${
    saveLoading ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
                {saveLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Teachers

















// improved ui 1

// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX } from "react-icons/fi"

// function Teachers() {

//   const [teachers, setTeachers] = useState([])
//   const [search, setSearch] = useState("")
//   const [showModal, setShowModal] = useState(false)
//   const [editingTeacher, setEditingTeacher] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [saveLoading, setSaveLoading] = useState(false)

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     subject: "",
//     phone: "",
//     qualification: "",
//     experience: ""
//   })

//   const fetchTeachers = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get("/teacher")
//       setTeachers(res.data)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchTeachers()
//   }, [])

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const openAddModal = () => {
//     setEditingTeacher(null)
//     setForm({
//       full_name: "",
//       email: "",
//       subject: "",
//       phone: "",
//       qualification: "",
//       experience: ""
//     })
//     setShowModal(true)
//   }

//   const openEditModal = (teacher) => {
//     setEditingTeacher(teacher)
//     setForm({
//       full_name: teacher.full_name,
//       email: teacher.email,
//       subject: teacher.subject || "",
//       phone: teacher.phone || "",
//       qualification: teacher.qualification || "",
//       experience: teacher.experience || ""
//     })
//     setShowModal(true)
//   }

//   const saveTeacher = async () => {
//     try {
//       if (!form.full_name.trim()) {
//         alert("Teacher name is required")
//         return
//       }

//       if (!form.email.trim()) {
//         alert("Email is required")
//         return
//       }

//       setSaveLoading(true)

//       const payload = {
//         full_name: form.full_name.trim(),
//         email: form.email.trim(),
//         subject: form.subject || null,
//         phone: form.phone || null,
//         qualification: form.qualification || null,
//         experience: form.experience ? Number(form.experience) : null
//       }

//       if (editingTeacher) {
//         await API.put(`/teacher/${editingTeacher.id}`, payload)
//       } else {
//         await API.post("/teacher", payload)
//       }

//       await fetchTeachers()
//       setShowModal(false)

//     } catch (err) {
//       console.log("FULL ERROR:", err)
//       if (err.response) {
//         console.log("BACKEND ERROR:", err.response.data)
//         alert(err.response.data.error || "Something went wrong")
//       } else {
//         alert("Server error")
//       }
//     } finally {
//       setSaveLoading(false)
//     }
//   }

//   const deleteTeacher = async (id) => {
//     const confirmDelete = window.confirm("Delete this teacher?")
//     if (!confirmDelete) return

//     try {
//       await API.delete(`/teacher/${id}`)
//       fetchTeachers()
//     } catch (error) {
//       alert("Failed to delete teacher")
//     }
//   }

//   const filteredTeachers = teachers.filter((t) =>
//     t.full_name?.toLowerCase().includes(search.toLowerCase()) ||
//     t.email?.toLowerCase().includes(search.toLowerCase()) ||
//     t.subject?.toLowerCase().includes(search.toLowerCase())
//   )

//   // Book Loader Component
//   const BookLoader = () => (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="relative w-24 h-24">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="animate-spin">
//             <svg className="w-24 h-24 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
//             </svg>
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-xs font-bold text-blue-600 animate-pulse">📚</div>
//           </div>
//         </div>
//       </div>
//       <p className="mt-8 text-gray-600 font-semibold text-center">Loading Teachers...</p>
//     </div>
//   )

//   if (loading) {
//     return <BookLoader />
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-4 md:p-8">

//       {/* HEADER SECTION */}
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            
//             <div>
//               <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
//                 Teachers
//               </h1>
//               <p className="text-gray-600">Manage all your teachers in one place</p>
//             </div>

//             <button
//               onClick={openAddModal}
//               className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
//             >
//               <FiPlus size={20} />
//               Add Teacher
//             </button>
//           </div>
//         </div>

//         {/* SEARCH BAR */}
//         <div className="mb-8">
//           <div className="relative">
//             <FiSearch className="absolute left-4 top-3.5 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search by name, email, or subject..."
//               className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white shadow-sm transition-all"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* TEACHERS GRID */}
//         {filteredTeachers.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-16">
//             <div className="text-6xl mb-4">📚</div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">No Teachers Found</h3>
//             <p className="text-gray-600 mb-6">Add your first teacher to get started</p>
//             <button
//               onClick={openAddModal}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               Add Teacher
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredTeachers.map((teacher) => (
//               <div
//                 key={teacher.id}
//                 className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden group"
//               >
//                 {/* HEADER */}
//                 <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
//                   <h2 className="text-lg font-bold truncate">
//                     {teacher.full_name}
//                   </h2>
//                   <p className="text-blue-100 text-sm mt-1 truncate">
//                     {teacher.subject || "No Subject"}
//                   </p>
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-5">
//                   <div className="space-y-3 mb-5">
//                     <div className="flex items-start gap-3">
//                       <span className="text-lg">📧</span>
//                       <div className="flex-1">
//                         <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
//                         <p className="text-sm text-gray-800 break-all">{teacher.email}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <span className="text-lg">📱</span>
//                       <div className="flex-1">
//                         <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
//                         <p className="text-sm text-gray-800">{teacher.phone || "Not Added"}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <span className="text-lg">🎓</span>
//                       <div className="flex-1">
//                         <p className="text-xs text-gray-500 uppercase tracking-wide">Qualification</p>
//                         <p className="text-sm text-gray-800">{teacher.qualification || "Not Added"}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <span className="text-lg">⏱️</span>
//                       <div className="flex-1">
//                         <p className="text-xs text-gray-500 uppercase tracking-wide">Experience</p>
//                         <p className="text-sm text-gray-800">{teacher.experience || 0} years</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* ACTIONS */}
//                   <div className="flex gap-2 pt-4 border-t border-gray-200">
//                     <button
//                       onClick={() => openEditModal(teacher)}
//                       className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 font-semibold transition-all"
//                     >
//                       <FiEdit2 size={16} />
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => deleteTeacher(teacher.id)}
//                       className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 font-semibold transition-all"
//                     >
//                       <FiTrash2 size={16} />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ADD / EDIT MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            
//             {/* MODAL HEADER */}
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sticky top-0 flex items-center justify-between">
//               <h2 className="text-2xl font-bold">
//                 {editingTeacher ? "✏️ Edit Teacher" : "➕ Add Teacher"}
//               </h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
//               >
//                 <FiX size={24} />
//               </button>
//             </div>

//             {/* MODAL CONTENT */}
//             <div className="p-6 space-y-4">
//               <input
//                 name="full_name"
//                 placeholder="Full Name *"
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
//                 value={form.full_name}
//                 onChange={handleChange}
//               />

//               <input
//                 name="email"
//                 placeholder="Email *"
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
//                 value={form.email}
//                 onChange={handleChange}
//               />

//               <input
//                 name="subject"
//                 placeholder="Subject"
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
//                 value={form.subject}
//                 onChange={handleChange}
//               />

//               <input
//                 name="phone"
//                 placeholder="Phone Number"
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
//                 value={form.phone}
//                 onChange={handleChange}
//               />

//               <input
//                 name="qualification"
//                 placeholder="Qualification"
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
//                 value={form.qualification}
//                 onChange={handleChange}
//               />

//               <input
//                 name="experience"
//                 placeholder="Experience (years)"
//                 type="number"
//                 className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
//                 value={form.experience}
//                 onChange={handleChange}
//               />

//               <p className="text-xs text-gray-500">* Required fields</p>
//             </div>

//             {/* MODAL FOOTER */}
//             <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-semibold transition"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={saveTeacher}
//                 disabled={saveLoading}
//                 className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 font-semibold transition flex items-center justify-center gap-2"
//               >
//                 {saveLoading ? (
//                   <>
//                     <div className="animate-spin">⚙️</div>
//                     Saving...
//                   </>
//                 ) : (
//                   "Save Teacher"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   )
// }

// export default Teachers














// ui 2
// src/pages/Teachers.jsx
// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX, FiUser, FiBookOpen } from "react-icons/fi"

// function Teachers() {

//   const [teachers, setTeachers] = useState([])
//   const [search, setSearch] = useState("")
//   const [showModal, setShowModal] = useState(false)
//   const [editingTeacher, setEditingTeacher] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [saveLoading, setSaveLoading] = useState(false)

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     subject: "",
//     phone: "",
//     qualification: "",
//     experience: ""
//   })

//   const fetchTeachers = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get("/teacher")
//       setTeachers(res.data)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchTeachers()
//   }, [])

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const openAddModal = () => {
//     setEditingTeacher(null)
//     setForm({
//       full_name: "", email: "", subject: "",
//       phone: "", qualification: "", experience: ""
//     })
//     setShowModal(true)
//   }

//   const openEditModal = (teacher) => {
//     setEditingTeacher(teacher)
//     setForm({
//       full_name: teacher.full_name,
//       email: teacher.email,
//       subject: teacher.subject || "",
//       phone: teacher.phone || "",
//       qualification: teacher.qualification || "",
//       experience: teacher.experience || ""
//     })
//     setShowModal(true)
//   }

//   const saveTeacher = async () => {
//     try {
//       if (!form.full_name.trim()) { alert("Teacher name is required"); return }
//       if (!form.email.trim()) { alert("Email is required"); return }

//       setSaveLoading(true)

//       const payload = {
//         full_name: form.full_name.trim(),
//         email: form.email.trim(),
//         subject: form.subject || null,
//         phone: form.phone || null,
//         qualification: form.qualification || null,
//         experience: form.experience ? Number(form.experience) : null
//       }

//       if (editingTeacher) {
//         await API.put(`/teacher/${editingTeacher.id}`, payload)
//       } else {
//         await API.post("/teacher", payload)
//       }

//       await fetchTeachers()
//       setShowModal(false)
//     } catch (err) {
//       if (err.response) {
//         alert(err.response.data.error || "Something went wrong")
//       } else {
//         alert("Server error")
//       }
//     } finally {
//       setSaveLoading(false)
//     }
//   }

//   const deleteTeacher = async (id) => {
//     if (!window.confirm("Delete this teacher?")) return
//     try {
//       await API.delete(`/teacher/${id}`)
//       fetchTeachers()
//     } catch {
//       alert("Failed to delete teacher")
//     }
//   }

//   const filteredTeachers = teachers.filter((t) =>
//     t.full_name?.toLowerCase().includes(search.toLowerCase()) ||
//     t.email?.toLowerCase().includes(search.toLowerCase()) ||
//     t.subject?.toLowerCase().includes(search.toLowerCase())
//   )

//   const getInitials = (name) => {
//     if (!name) return "T"
//     return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
//   }

//   // ─── PREMIUM BOOK LOADER ───
//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        
//         {/* Book Animation */}
//         <div className="relative mb-8">
//           <div className="w-16 h-20 relative">
//             {/* Book spine */}
//             <div className="absolute left-0 top-0 w-3 h-20 bg-gradient-to-b from-amber-500 to-amber-700 rounded-l-sm shadow-lg" />
            
//             {/* Book cover */}
//             <div className="absolute left-3 top-0 w-13 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-r-sm border border-slate-600">
//               <div className="flex items-center justify-center h-full">
//                 <FiBookOpen className="text-amber-400 text-xl" />
//               </div>
//             </div>

//             {/* Animated pages */}
//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="absolute left-3 top-1 w-12 h-[72px] bg-white/90 rounded-r-sm origin-left"
//                 style={{
//                   animation: `flipPage 2s ease-in-out ${i * 0.4}s infinite`,
//                   zIndex: 3 - i,
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         <p className="text-amber-400 font-semibold tracking-widest text-sm uppercase animate-pulse">
//           Loading Teachers
//         </p>
        
//         <div className="flex gap-1 mt-3">
//           {[0, 1, 2].map(i => (
//             <div
//               key={i}
//               className="w-2 h-2 bg-amber-500 rounded-full"
//               style={{
//                 animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
//               }}
//             />
//           ))}
//         </div>

//         <style>{`
//           @keyframes flipPage {
//             0%, 100% { transform: rotateY(0deg); }
//             50% { transform: rotateY(-150deg); }
//           }
//           @keyframes bounce {
//             0%, 100% { transform: translateY(0); opacity: 0.4; }
//             50% { transform: translateY(-8px); opacity: 1; }
//           }
//         `}</style>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">

//         {/* ─── HEADER ─── */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
//                   <FiUser className="text-slate-900 text-lg" />
//                 </div>
//                 <h1 className="text-3xl md:text-4xl font-bold text-white">
//                   Teachers
//                 </h1>
//               </div>
//               <p className="text-slate-400 ml-[52px]">
//                 Manage your teaching staff • {teachers.length} total
//               </p>
//             </div>

//             <button
//               onClick={openAddModal}
//               className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 
//                          text-slate-900 px-6 py-3 rounded-xl hover:from-amber-400 hover:to-amber-500 
//                          shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 
//                          transform hover:-translate-y-0.5 transition-all duration-300 font-bold"
//             >
//               <FiPlus size={18} />
//               Add Teacher
//             </button>
//           </div>
//         </div>

//         {/* ─── SEARCH BAR ─── */}
//         <div className="mb-8">
//           <div className="relative">
//             <FiSearch className="absolute left-4 top-3.5 text-slate-500" size={18} />
//             <input
//               type="text"
//               placeholder="Search by name, email, or subject..."
//               className="w-full pl-12 pr-4 py-3 bg-slate-800/60 border border-slate-700/50 
//                          rounded-xl text-white placeholder-slate-500
//                          focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 
//                          backdrop-blur-sm transition-all"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="absolute right-3 top-3 text-slate-500 hover:text-amber-400 transition-colors"
//               >
//                 <FiX size={18} />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ─── TEACHERS GRID ─── */}
//         {filteredTeachers.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-700">
//               <FiUser className="text-slate-600 text-3xl" />
//             </div>
//             <h3 className="text-2xl font-bold text-white mb-2">No Teachers Found</h3>
//             <p className="text-slate-500 mb-6">
//               {search ? "Try different search keywords" : "Add your first teacher to get started"}
//             </p>
//             {!search && (
//               <button
//                 onClick={openAddModal}
//                 className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 
//                            px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all"
//               >
//                 Add Teacher
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//             {filteredTeachers.map((teacher, index) => (
//               <div
//                 key={teacher.id}
//                 className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 
//                            hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5 
//                            transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
//                 style={{ animationDelay: `${index * 80}ms` }}
//               >
//                 {/* Card Top Accent */}
//                 <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500" />

//                 <div className="p-5">
//                   {/* Avatar + Name */}
//                   <div className="flex items-center gap-3 mb-5">
//                     <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 
//                                     rounded-xl flex items-center justify-center text-slate-900 
//                                     font-bold text-sm shadow-lg shadow-amber-500/20">
//                       {getInitials(teacher.full_name)}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h2 className="text-white font-bold truncate text-[15px]">
//                         {teacher.full_name}
//                       </h2>
//                       <p className="text-amber-400 text-sm font-medium truncate">
//                         {teacher.subject || "No Subject"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Details */}
//                   <div className="space-y-3 mb-5">
//                     <div className="flex items-start gap-3">
//                       <div className="w-7 h-7 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <span className="text-xs">📧</span>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Email</p>
//                         <p className="text-sm text-slate-300 truncate">{teacher.email}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="w-7 h-7 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <span className="text-xs">📱</span>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Phone</p>
//                         <p className="text-sm text-slate-300">{teacher.phone || "Not Added"}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="w-7 h-7 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <span className="text-xs">🎓</span>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Qualification</p>
//                         <p className="text-sm text-slate-300">{teacher.qualification || "Not Added"}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="w-7 h-7 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <span className="text-xs">⏱️</span>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Experience</p>
//                         <p className="text-sm text-slate-300">{teacher.experience || 0} years</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2 pt-4 border-t border-slate-700/50">
//                     <button
//                       onClick={() => openEditModal(teacher)}
//                       className="flex-1 flex items-center justify-center gap-2 
//                                  bg-amber-500/10 text-amber-400 py-2.5 rounded-xl 
//                                  hover:bg-amber-500/20 border border-amber-500/20 
//                                  hover:border-amber-500/40 font-semibold text-sm transition-all"
//                     >
//                       <FiEdit2 size={14} />
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => deleteTeacher(teacher.id)}
//                       className="flex-1 flex items-center justify-center gap-2 
//                                  bg-red-500/10 text-red-400 py-2.5 rounded-xl 
//                                  hover:bg-red-500/20 border border-red-500/20 
//                                  hover:border-red-500/40 font-semibold text-sm transition-all"
//                     >
//                       <FiTrash2 size={14} />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Results count */}
//         {filteredTeachers.length > 0 && (
//           <div className="text-center mt-8">
//             <p className="text-slate-600 text-sm">
//               Showing {filteredTeachers.length} of {teachers.length} teachers
//             </p>
//           </div>
//         )}
//       </div>

//       {/* ─── ADD / EDIT MODAL ─── */}
//       {showModal && (
//         <div 
//           className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//           onClick={() => setShowModal(false)}
//         >
//           <div 
//             className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto 
//                        border border-slate-700/50"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 flex items-center justify-between sticky top-0 z-10">
//               <h2 className="text-xl font-bold text-slate-900">
//                 {editingTeacher ? "✏️ Edit Teacher" : "➕ Add Teacher"}
//               </h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="w-8 h-8 bg-black/10 hover:bg-black/20 rounded-lg 
//                            flex items-center justify-center transition-colors"
//               >
//                 <FiX size={18} className="text-slate-900" />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6 space-y-4">
//               {[
//                 { name: "full_name", placeholder: "Full Name *", type: "text" },
//                 { name: "email", placeholder: "Email Address *", type: "email" },
//                 { name: "subject", placeholder: "Subject", type: "text" },
//                 { name: "phone", placeholder: "Phone Number", type: "tel" },
//                 { name: "qualification", placeholder: "Qualification", type: "text" },
//                 { name: "experience", placeholder: "Experience (years)", type: "number" }
//               ].map((field) => (
//                 <input
//                   key={field.name}
//                   name={field.name}
//                   type={field.type}
//                   placeholder={field.placeholder}
//                   className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-xl 
//                              text-white placeholder-slate-500
//                              focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 
//                              transition-all"
//                   value={form[field.name]}
//                   onChange={handleChange}
//                 />
//               ))}

//               <p className="text-xs text-slate-600">* Required fields</p>
//             </div>

//             {/* Modal Footer */}
//             <div className="flex gap-3 p-6 border-t border-slate-700/50 sticky bottom-0 bg-slate-800">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 py-3 border border-slate-600 text-slate-300 rounded-xl 
//                            hover:bg-slate-700 font-semibold transition-all"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={saveTeacher}
//                 disabled={saveLoading}
//                 className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 
//                            text-slate-900 rounded-xl font-bold
//                            hover:from-amber-400 hover:to-amber-500 
//                            hover:shadow-lg hover:shadow-amber-500/25
//                            disabled:opacity-50 disabled:cursor-not-allowed 
//                            transition-all flex items-center justify-center gap-2"
//               >
//                 {saveLoading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   editingTeacher ? "Update Teacher" : "Save Teacher"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Teachers



































// ui 3
// src/pages/Teachers.jsx

// import { useEffect, useState } from "react"
// import API from "../services/api"
// import {
//   FaChalkboardTeacher,
//   FaSearch,
//   FaPlus,
//   FaEdit,
//   FaTrashAlt,
//   FaEnvelope,
//   FaPhone,
//   FaGraduationCap,
//   FaBrain,
//   FaBook,
//   FaTimes,
//   FaUserTie,
//   FaSave,
//   FaFilter,
//   FaChevronDown
// } from "react-icons/fa"
// import { motion, AnimatePresence } from "framer-motion"

// // ──────────────── BOOK LOADER COMPONENT ────────────────
// function BookLoader() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh]">
//       {/* Book Animation */}
//       <div className="relative w-24 h-20 mb-8">
//         {/* Book Base */}
//         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-sm shadow-lg" />

//         {/* Book Cover */}
//         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-t-sm shadow-md border-l-4 border-indigo-700">
//           <div className="flex items-center justify-center h-full">
//             <FaChalkboardTeacher className="text-white/40 text-lg" />
//           </div>
//         </div>

//         {/* Animated Pages */}
//         {[...Array(3)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute bottom-3 left-1/2 w-[72px] h-[52px] bg-white rounded-tr-sm origin-left shadow-sm"
//             style={{
//               transformStyle: "preserve-3d",
//               zIndex: 3 - i,
//             }}
//             animate={{
//               rotateY: [0, -160, 0],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               delay: i * 0.3,
//               ease: "easeInOut",
//             }}
//           >
//             {/* Page Lines */}
//             <div className="p-2 space-y-1.5">
//               {[...Array(4)].map((_, j) => (
//                 <div
//                   key={j}
//                   className="h-1 bg-gray-200 rounded"
//                   style={{ width: `${70 - j * 10}%` }}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Loading Text */}
//       <motion.div
//         className="flex items-center gap-2"
//         animate={{ opacity: [0.5, 1, 0.5] }}
//         transition={{ duration: 1.5, repeat: Infinity }}
//       >
//         <FaBook className="text-indigo-500" />
//         <span className="text-gray-500 font-medium tracking-wide">
//           Loading Teachers...
//         </span>
//       </motion.div>

//       {/* Dots Animation */}
//       <div className="flex gap-1.5 mt-4">
//         {[0, 1, 2].map((i) => (
//           <motion.div
//             key={i}
//             className="w-2.5 h-2.5 bg-indigo-400 rounded-full"
//             animate={{
//               y: [0, -10, 0],
//               scale: [1, 1.2, 1],
//             }}
//             transition={{
//               duration: 0.8,
//               repeat: Infinity,
//               delay: i * 0.15,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// // ──────────────── TEACHER CARD COMPONENT ────────────────
// function TeacherCard({ teacher, onEdit, onDelete, index }) {
//   const [showActions, setShowActions] = useState(false)

//   const avatarColors = [
//     "from-indigo-500 to-purple-500",
//     "from-blue-500 to-cyan-500",
//     "from-emerald-500 to-teal-500",
//     "from-orange-500 to-red-500",
//     "from-pink-500 to-rose-500",
//     "from-violet-500 to-purple-500",
//   ]

//   const colorClass = avatarColors[index % avatarColors.length]

//   const getInitials = (name) => {
//     if (!name) return "T"
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.4, delay: index * 0.08 }}
//       whileHover={{ y: -4 }}
//       className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl 
//                  border border-gray-100 transition-all duration-300 overflow-hidden"
//     >
//       {/* Top Color Bar */}
//       <div className={`h-1.5 bg-gradient-to-r ${colorClass}`} />

//       {/* Actions Menu */}
//       <div className="absolute top-4 right-4 z-10">
//         <button
//           onClick={() => setShowActions(!showActions)}
//           className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 
//                      flex items-center justify-center transition-colors
//                      opacity-0 group-hover:opacity-100"
//         >
//           <FaChevronDown className="text-gray-400 text-xs" />
//         </button>

//         <AnimatePresence>
//           {showActions && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: -5 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: -5 }}
//               className="absolute right-0 top-10 bg-white rounded-xl shadow-xl 
//                          border border-gray-100 overflow-hidden min-w-[140px] z-20"
//             >
//               <button
//                 onClick={() => {
//                   onEdit(teacher)
//                   setShowActions(false)
//                 }}
//                 className="flex items-center gap-2 w-full px-4 py-2.5 
//                            hover:bg-indigo-50 text-gray-700 text-sm transition-colors"
//               >
//                 <FaEdit className="text-indigo-500" />
//                 Edit
//               </button>
//               <button
//                 onClick={() => {
//                   onDelete(teacher.id)
//                   setShowActions(false)
//                 }}
//                 className="flex items-center gap-2 w-full px-4 py-2.5 
//                            hover:bg-red-50 text-gray-700 text-sm transition-colors"
//               >
//                 <FaTrashAlt className="text-red-500" />
//                 Delete
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       <div className="p-6">
//         {/* Avatar & Name */}
//         <div className="flex items-center gap-4 mb-5">
//           <div
//             className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClass} 
//                         flex items-center justify-center text-white font-bold text-lg
//                         shadow-lg shadow-indigo-100`}
//           >
//             {getInitials(teacher.full_name)}
//           </div>

//           <div className="flex-1 min-w-0">
//             <h3 className="font-bold text-gray-800 text-lg truncate">
//               {teacher.full_name}
//             </h3>
//             <div className="flex items-center gap-1.5">
//               <FaBook className="text-indigo-400 text-xs" />
//               <span className="text-indigo-500 text-sm font-medium">
//                 {teacher.subject || "No Subject"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Info Grid */}
//         <div className="space-y-3">
//           <div className="flex items-center gap-3 text-sm">
//             <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
//               <FaEnvelope className="text-blue-500 text-xs" />
//             </div>
//             <span className="text-gray-600 truncate">{teacher.email}</span>
//           </div>

//           <div className="flex items-center gap-3 text-sm">
//             <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
//               <FaPhone className="text-green-500 text-xs" />
//             </div>
//             <span className="text-gray-600">
//               {teacher.phone || "Not provided"}
//             </span>
//           </div>

//           <div className="flex items-center gap-3 text-sm">
//             <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
//               <FaGraduationCap className="text-purple-500 text-xs" />
//             </div>
//             <span className="text-gray-600">
//               {teacher.qualification || "Not provided"}
//             </span>
//           </div>

//           <div className="flex items-center gap-3 text-sm">
//             <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
//               <FaBrain className="text-orange-500 text-xs" />
//             </div>
//             <span className="text-gray-600">
//               {teacher.experience
//                 ? `${teacher.experience} years experience`
//                 : "Not provided"}
//             </span>
//           </div>
//         </div>

//         {/* Bottom Actions (Mobile Friendly) */}
//         <div className="flex gap-2 mt-5 pt-4 border-t border-gray-50 md:hidden">
//           <button
//             onClick={() => onEdit(teacher)}
//             className="flex-1 flex items-center justify-center gap-2 py-2 
//                        bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium
//                        hover:bg-indigo-100 transition-colors"
//           >
//             <FaEdit className="text-xs" />
//             Edit
//           </button>
//           <button
//             onClick={() => onDelete(teacher.id)}
//             className="flex-1 flex items-center justify-center gap-2 py-2 
//                        bg-red-50 text-red-600 rounded-lg text-sm font-medium
//                        hover:bg-red-100 transition-colors"
//           >
//             <FaTrashAlt className="text-xs" />
//             Delete
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// // ──────────────── MAIN TEACHERS COMPONENT ────────────────
// function Teachers() {
//   const [teachers, setTeachers] = useState([])
//   const [search, setSearch] = useState("")
//   const [showModal, setShowModal] = useState(false)
//   const [editingTeacher, setEditingTeacher] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState(false)
//   const [filterSubject, setFilterSubject] = useState("")
//   const [showFilter, setShowFilter] = useState(false)

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     subject: "",
//     phone: "",
//     qualification: "",
//     experience: "",
//   })

//   const fetchTeachers = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get("/teacher")
//       setTeachers(res.data)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchTeachers()
//   }, [])

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const openAddModal = () => {
//     setEditingTeacher(null)
//     setForm({
//       full_name: "",
//       email: "",
//       subject: "",
//       phone: "",
//       qualification: "",
//       experience: "",
//     })
//     setShowModal(true)
//   }

//   const openEditModal = (teacher) => {
//     setEditingTeacher(teacher)
//     setForm({
//       full_name: teacher.full_name,
//       email: teacher.email,
//       subject: teacher.subject || "",
//       phone: teacher.phone || "",
//       qualification: teacher.qualification || "",
//       experience: teacher.experience || "",
//     })
//     setShowModal(true)
//   }

//   const saveTeacher = async () => {
//     try {
//       if (!form.full_name.trim()) {
//         alert("Teacher name is required")
//         return
//       }
//       if (!form.email.trim()) {
//         alert("Email is required")
//         return
//       }

//       setSaving(true)

//       const payload = {
//         full_name: form.full_name.trim(),
//         email: form.email.trim(),
//         subject: form.subject || null,
//         phone: form.phone || null,
//         qualification: form.qualification || null,
//         experience: form.experience ? Number(form.experience) : null,
//       }

//       if (editingTeacher) {
//         await API.put(`/teacher/${editingTeacher.id}`, payload)
//       } else {
//         await API.post("/teacher", payload)
//       }

//       await fetchTeachers()
//       setShowModal(false)
//     } catch (err) {
//       console.log("FULL ERROR:", err)
//       if (err.response) {
//         alert(err.response.data.error || "Something went wrong")
//       } else {
//         alert("Server error")
//       }
//     } finally {
//       setSaving(false)
//     }
//   }

//   const deleteTeacher = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this teacher?")
//     if (!confirmDelete) return
//     await API.delete(`/teacher/${id}`)
//     fetchTeachers()
//   }

//   // Get unique subjects for filter
//   const subjects = [...new Set(teachers.map((t) => t.subject).filter(Boolean))]

//   const filteredTeachers = teachers.filter((t) => {
//     const matchesSearch = t.full_name?.toLowerCase().includes(search.toLowerCase())
//     const matchesFilter = filterSubject ? t.subject === filterSubject : true
//     return matchesSearch && matchesFilter
//   })

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30">
//       <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">

//         {/* ──── HEADER ──── */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           {/* Title Row */}
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 
//                               flex items-center justify-center shadow-lg shadow-indigo-200">
//                 <FaChalkboardTeacher className="text-white text-xl" />
//               </div>
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//                   Teachers
//                 </h1>
//                 <p className="text-gray-400 text-sm">
//                   {teachers.length} total teachers
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={openAddModal}
//               className="flex items-center justify-center gap-2 bg-gradient-to-r 
//                          from-indigo-500 to-purple-600 text-white px-6 py-3 
//                          rounded-xl hover:shadow-lg hover:shadow-indigo-200 
//                          transition-all duration-300 font-medium
//                          hover:-translate-y-0.5 active:translate-y-0"
//             >
//               <FaPlus className="text-sm" />
//               Add Teacher
//             </button>
//           </div>

//           {/* Search & Filter Bar */}
//           <div className="flex flex-col sm:flex-row gap-3">
//             {/* Search */}
//             <div className="relative flex-1">
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
//               <input
//                 type="text"
//                 placeholder="Search teachers by name..."
//                 className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 
//                            bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 
//                            focus:border-indigo-400 transition-all text-sm"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               {search && (
//                 <button
//                   onClick={() => setSearch("")}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 
//                              w-6 h-6 rounded-full bg-gray-100 flex items-center 
//                              justify-center hover:bg-gray-200 transition-colors"
//                 >
//                   <FaTimes className="text-gray-400 text-xs" />
//                 </button>
//               )}
//             </div>

//             {/* Filter Button */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowFilter(!showFilter)}
//                 className={`flex items-center gap-2 px-4 py-3 rounded-xl border 
//                            transition-all text-sm font-medium
//                            ${filterSubject
//                     ? "border-indigo-300 bg-indigo-50 text-indigo-600"
//                     : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
//                   }`}
//               >
//                 <FaFilter className="text-xs" />
//                 {filterSubject || "All Subjects"}
//                 <FaChevronDown className="text-xs" />
//               </button>

//               <AnimatePresence>
//                 {showFilter && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -5 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -5 }}
//                     className="absolute right-0 top-14 bg-white rounded-xl shadow-xl 
//                                border border-gray-100 overflow-hidden min-w-[180px] z-20"
//                   >
//                     <button
//                       onClick={() => {
//                         setFilterSubject("")
//                         setShowFilter(false)
//                       }}
//                       className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 
//                                  transition-colors ${!filterSubject ? "text-indigo-600 bg-indigo-50" : "text-gray-600"}`}
//                     >
//                       All Subjects
//                     </button>
//                     {subjects.map((subject) => (
//                       <button
//                         key={subject}
//                         onClick={() => {
//                           setFilterSubject(subject)
//                           setShowFilter(false)
//                         }}
//                         className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 
//                                    transition-colors ${filterSubject === subject
//                             ? "text-indigo-600 bg-indigo-50"
//                             : "text-gray-600"
//                           }`}
//                       >
//                         {subject}
//                       </button>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>
//         </motion.div>

//         {/* ──── CONTENT ──── */}
//         {loading ? (
//           <BookLoader />
//         ) : filteredTeachers.length === 0 ? (
//           /* Empty State */
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex flex-col items-center justify-center py-20"
//           >
//             <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center 
//                             justify-center mb-6">
//               <FaUserTie className="text-indigo-300 text-4xl" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-700 mb-2">
//               {search || filterSubject ? "No Teachers Found" : "No Teachers Yet"}
//             </h3>
//             <p className="text-gray-400 mb-6 text-center max-w-sm">
//               {search || filterSubject
//                 ? "Try adjusting your search or filter criteria"
//                 : "Start by adding your first teacher to the system"}
//             </p>
//             {!search && !filterSubject && (
//               <button
//                 onClick={openAddModal}
//                 className="flex items-center gap-2 bg-indigo-500 text-white 
//                            px-6 py-3 rounded-xl hover:bg-indigo-600 transition-colors"
//               >
//                 <FaPlus />
//                 Add First Teacher
//               </button>
//             )}
//           </motion.div>
//         ) : (
//           /* Teacher Grid */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             <AnimatePresence mode="popLayout">
//               {filteredTeachers.map((teacher, index) => (
//                 <TeacherCard
//                   key={teacher.id}
//                   teacher={teacher}
//                   index={index}
//                   onEdit={openEditModal}
//                   onDelete={deleteTeacher}
//                 />
//               ))}
//             </AnimatePresence>
//           </div>
//         )}

//         {/* Results Count */}
//         {!loading && filteredTeachers.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center mt-8 text-sm text-gray-400"
//           >
//             Showing {filteredTeachers.length} of {teachers.length} teachers
//           </motion.div>
//         )}
//       </div>

//       {/* ──── ADD / EDIT MODAL ──── */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center 
//                        justify-center z-50 p-4"
//             onClick={() => setShowModal(false)}
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               transition={{ type: "spring", damping: 25 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md 
//                          max-h-[90vh] overflow-y-auto"
//             >
//               {/* Modal Header */}
//               <div className="flex items-center justify-between p-6 pb-4 
//                               border-b border-gray-100">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`w-10 h-10 rounded-xl flex items-center justify-center
//                     ${editingTeacher
//                         ? "bg-amber-50 text-amber-500"
//                         : "bg-indigo-50 text-indigo-500"
//                       }`}
//                   >
//                     {editingTeacher ? <FaEdit /> : <FaPlus />}
//                   </div>
//                   <div>
//                     <h2 className="text-lg font-bold text-gray-800">
//                       {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
//                     </h2>
//                     <p className="text-xs text-gray-400">
//                       {editingTeacher
//                         ? "Update teacher information"
//                         : "Fill in teacher details"}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 
//                              flex items-center justify-center transition-colors"
//                 >
//                   <FaTimes className="text-gray-400 text-sm" />
//                 </button>
//               </div>

//               {/* Modal Body */}
//               <div className="p-6 space-y-4">
//                 {/* Full Name */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-600 mb-1.5 block">
//                     Full Name <span className="text-red-400">*</span>
//                   </label>
//                   <div className="relative">
//                     <FaUserTie className="absolute left-3 top-1/2 -translate-y-1/2 
//                                          text-gray-300 text-sm" />
//                     <input
//                       name="full_name"
//                       placeholder="Enter full name"
//                       className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 
//                                  focus:outline-none focus:ring-2 focus:ring-indigo-200 
//                                  focus:border-indigo-400 transition-all text-sm"
//                       value={form.full_name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-600 mb-1.5 block">
//                     Email <span className="text-red-400">*</span>
//                   </label>
//                   <div className="relative">
//                     <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 
//                                           text-gray-300 text-sm" />
//                     <input
//                       name="email"
//                       type="email"
//                       placeholder="teacher@school.com"
//                       className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 
//                                  focus:outline-none focus:ring-2 focus:ring-indigo-200 
//                                  focus:border-indigo-400 transition-all text-sm"
//                       value={form.email}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 {/* Subject & Phone Row */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="text-sm font-medium text-gray-600 mb-1.5 block">
//                       Subject
//                     </label>
//                     <div className="relative">
//                       <FaBook className="absolute left-3 top-1/2 -translate-y-1/2 
//                                         text-gray-300 text-xs" />
//                       <input
//                         name="subject"
//                         placeholder="Mathematics"
//                         className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 
//                                    focus:outline-none focus:ring-2 focus:ring-indigo-200 
//                                    focus:border-indigo-400 transition-all text-sm"
//                         value={form.subject}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-600 mb-1.5 block">
//                       Phone
//                     </label>
//                     <div className="relative">
//                       <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 
//                                          text-gray-300 text-xs" />
//                       <input
//                         name="phone"
//                         placeholder="9876543210"
//                         className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 
//                                    focus:outline-none focus:ring-2 focus:ring-indigo-200 
//                                    focus:border-indigo-400 transition-all text-sm"
//                         value={form.phone}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Qualification & Experience Row */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="text-sm font-medium text-gray-600 mb-1.5 block">
//                       Qualification
//                     </label>
//                     <div className="relative">
//                       <FaGraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 
//                                                   text-gray-300 text-xs" />
//                       <input
//                         name="qualification"
//                         placeholder="M.Ed, B.Ed"
//                         className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 
//                                    focus:outline-none focus:ring-2 focus:ring-indigo-200 
//                                    focus:border-indigo-400 transition-all text-sm"
//                         value={form.qualification}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-600 mb-1.5 block">
//                       Experience
//                     </label>
//                     <div className="relative">
//                       <FaBrain className="absolute left-3 top-1/2 -translate-y-1/2 
//                                          text-gray-300 text-xs" />
//                       <input
//                         name="experience"
//                         type="number"
//                         placeholder="Years"
//                         className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 
//                                    focus:outline-none focus:ring-2 focus:ring-indigo-200 
//                                    focus:border-indigo-400 transition-all text-sm"
//                         value={form.experience}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="flex gap-3 p-6 pt-4 border-t border-gray-100">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="flex-1 py-2.5 rounded-xl border border-gray-200 
//                              text-gray-600 font-medium hover:bg-gray-50 
//                              transition-colors text-sm"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={saveTeacher}
//                   disabled={saving}
//                   className="flex-1 flex items-center justify-center gap-2 py-2.5 
//                              rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 
//                              text-white font-medium hover:shadow-lg hover:shadow-indigo-200 
//                              transition-all text-sm disabled:opacity-50"
//                 >
//                   {saving ? (
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                       className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
//                     />
//                   ) : (
//                     <>
//                       <FaSave className="text-xs" />
//                       {editingTeacher ? "Update" : "Save"}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default Teachers























// ui 4
// src/pages/Teachers.jsx

// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX, FiUser, FiBookOpen } from "react-icons/fi"

// function Teachers() {

//   const [teachers, setTeachers] = useState([])
//   const [search, setSearch] = useState("")
//   const [showModal, setShowModal] = useState(false)
//   const [editingTeacher, setEditingTeacher] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [saveLoading, setSaveLoading] = useState(false)

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     subject: "",
//     phone: "",
//     qualification: "",
//     experience: ""
//   })

//   const fetchTeachers = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get("/teacher")
//       setTeachers(res.data)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchTeachers()
//   }, [])

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const openAddModal = () => {
//     setEditingTeacher(null)
//     setForm({
//       full_name: "", email: "", subject: "",
//       phone: "", qualification: "", experience: ""
//     })
//     setShowModal(true)
//   }

//   const openEditModal = (teacher) => {
//     setEditingTeacher(teacher)
//     setForm({
//       full_name: teacher.full_name,
//       email: teacher.email,
//       subject: teacher.subject || "",
//       phone: teacher.phone || "",
//       qualification: teacher.qualification || "",
//       experience: teacher.experience || ""
//     })
//     setShowModal(true)
//   }

//   const saveTeacher = async () => {
//     try {
//       if (!form.full_name.trim()) { alert("Teacher name is required"); return }
//       if (!form.email.trim()) { alert("Email is required"); return }

//       setSaveLoading(true)

//       const payload = {
//         full_name: form.full_name.trim(),
//         email: form.email.trim(),
//         subject: form.subject || null,
//         phone: form.phone || null,
//         qualification: form.qualification || null,
//         experience: form.experience ? Number(form.experience) : null
//       }

//       if (editingTeacher) {
//         await API.put(`/teacher/${editingTeacher.id}`, payload)
//       } else {
//         await API.post("/teacher", payload)
//       }

//       await fetchTeachers()
//       setShowModal(false)
//     } catch (err) {
//       if (err.response) {
//         alert(err.response.data.error || "Something went wrong")
//       } else {
//         alert("Server error")
//       }
//     } finally {
//       setSaveLoading(false)
//     }
//   }

//   const deleteTeacher = async (id) => {
//     if (!window.confirm("Delete this teacher?")) return
//     try {
//       await API.delete(`/teacher/${id}`)
//       fetchTeachers()
//     } catch {
//       alert("Failed to delete teacher")
//     }
//   }

//   const filteredTeachers = teachers.filter((t) =>
//     t.full_name?.toLowerCase().includes(search.toLowerCase()) ||
//     t.email?.toLowerCase().includes(search.toLowerCase()) ||
//     t.subject?.toLowerCase().includes(search.toLowerCase())
//   )

//   const getInitials = (name) => {
//     if (!name) return "T"
//     return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
//   }

//   // ─── PREMIUM BOOK LOADER ───
//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        
//         {/* Book Animation */}
//         <div className="relative mb-8">
//           <div className="w-16 h-20 relative">
//             {/* Book spine */}
//             <div className="absolute left-0 top-0 w-3 h-20 bg-gradient-to-b from-blue-400 to-blue-600 rounded-l-sm shadow-lg shadow-blue-400/30" />
            
//             {/* Book cover */}
//             <div className="absolute left-3 top-0 w-13 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-r-sm border border-blue-300 shadow-lg shadow-blue-400/20">
//               <div className="flex items-center justify-center h-full">
//                 <FiBookOpen className="text-blue-600 text-xl" />
//               </div>
//             </div>

//             {/* Animated pages */}
//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="absolute left-3 top-1 w-12 h-[72px] bg-white/95 rounded-r-sm origin-left"
//                 style={{
//                   animation: `flipPage 2s ease-in-out ${i * 0.4}s infinite`,
//                   zIndex: 3 - i,
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         <p className="text-blue-600 font-semibold tracking-widest text-sm uppercase animate-pulse">
//           Loading Teachers
//         </p>
        
//         <div className="flex gap-1 mt-3">
//           {[0, 1, 2].map(i => (
//             <div
//               key={i}
//               className="w-2 h-2 bg-blue-500 rounded-full"
//               style={{
//                 animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
//               }}
//             />
//           ))}
//         </div>

//         <style>{`
//           @keyframes flipPage {
//             0%, 100% { transform: rotateY(0deg); }
//             50% { transform: rotateY(-150deg); }
//           }
//           @keyframes bounce {
//             0%, 100% { transform: translateY(0); opacity: 0.4; }
//             50% { transform: translateY(-8px); opacity: 1; }
//           }
//         `}</style>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">

//         {/* ─── HEADER ─── */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-400/30">
//                   <FiUser className="text-white text-lg" />
//                 </div>
//                 <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
//                   Teachers
//                 </h1>
//               </div>
//               <p className="text-blue-600/70 ml-[52px]">
//                 Manage your teaching staff • {teachers.length} total
//               </p>
//             </div>

//             <button
//               onClick={openAddModal}
//               className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500
//                          text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 
//                          shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50 
//                          transform hover:-translate-y-0.5 transition-all duration-300 font-bold"
//             >
//               <FiPlus size={18} />
//               Add Teacher
//             </button>
//           </div>
//         </div>

//         {/* ─── SEARCH BAR ─── */}
//         <div className="mb-8">
//           <div className="relative">
//             <FiSearch className="absolute left-4 top-3.5 text-blue-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search by name, email, or subject..."
//               className="w-full pl-12 pr-4 py-3 bg-white/70 border-2 border-blue-200
//                          rounded-xl text-blue-900 placeholder-blue-400
//                          focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 
//                          backdrop-blur-sm transition-all shadow-sm"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="absolute right-3 top-3 text-blue-400 hover:text-blue-600 transition-colors"
//               >
//                 <FiX size={18} />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ─── TEACHERS GRID ─── */}
//         {filteredTeachers.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 border-2 border-blue-200">
//               <FiUser className="text-blue-400 text-3xl" />
//             </div>
//             <h3 className="text-2xl font-bold text-blue-900 mb-2">No Teachers Found</h3>
//             <p className="text-blue-600/70 mb-6">
//               {search ? "Try different search keywords" : "Add your first teacher to get started"}
//             </p>
//             {!search && (
//               <button
//                 onClick={openAddModal}
//                 className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white
//                            px-6 py-2.5 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-400/30 transition-all"
//               >
//                 Add Teacher
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//             {filteredTeachers.map((teacher, index) => (
//               <div
//                 key={teacher.id}
//                 className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-200/60
//                            hover:border-blue-400 hover:shadow-xl hover:shadow-blue-400/20 
//                            transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
//                 style={{ animationDelay: `${index * 80}ms` }}
//               >
//                 {/* Card Top Accent */}
//                 <div className="h-1.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500" />

//                 <div className="p-5">
//                   {/* Avatar + Name */}
//                   <div className="flex items-center gap-3 mb-5">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 
//                                     rounded-xl flex items-center justify-center text-white 
//                                     font-bold text-sm shadow-lg shadow-blue-400/30">
//                       {getInitials(teacher.full_name)}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h2 className="text-blue-900 font-bold truncate text-[15px]">
//                         {teacher.full_name}
//                       </h2>
//                       <p className="text-blue-500 text-sm font-medium truncate">
//                         {teacher.subject || "No Subject"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Details */}
//                   <div className="space-y-3 mb-5">
//                     <div className="flex items-start gap-3">
//                       <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <span className="text-xs">📧</span>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-[10px] text-blue-500 uppercase tracking-wider font-semibold">Email</p>
//                         <p className="text-sm text-blue-900 truncate">{teacher.email}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="w-7 h-7 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <span className="text-xs">📱</span>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-[10px] text-blue-500 uppercase tracking-wider font-semibold">Phone</p>
//                         <p className="text-sm text-blue-900">{teacher.phone || "Not Added"}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <span className="text-xs">🎓</span>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-[10px] text-blue-500 uppercase tracking-wider font-semibold">Qualification</p>
//                         <p className="text-sm text-blue-900">{teacher.qualification || "Not Added"}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="w-7 h-7 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
//                         <span className="text-xs">⏱️</span>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-[10px] text-blue-500 uppercase tracking-wider font-semibold">Experience</p>
//                         <p className="text-sm text-blue-900">{teacher.experience || 0} years</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2 pt-4 border-t border-blue-100">
//                     <button
//                       onClick={() => openEditModal(teacher)}
//                       className="flex-1 flex items-center justify-center gap-2 
//                                  bg-blue-100 text-blue-600 py-2.5 rounded-xl 
//                                  hover:bg-blue-200 border border-blue-200 
//                                  hover:border-blue-400 font-semibold text-sm transition-all"
//                     >
//                       <FiEdit2 size={14} />
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => deleteTeacher(teacher.id)}
//                       className="flex-1 flex items-center justify-center gap-2 
//                                  bg-red-100 text-red-600 py-2.5 rounded-xl 
//                                  hover:bg-red-200 border border-red-200 
//                                  hover:border-red-400 font-semibold text-sm transition-all"
//                     >
//                       <FiTrash2 size={14} />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Results count */}
//         {filteredTeachers.length > 0 && (
//           <div className="text-center mt-8">
//             <p className="text-blue-600/70 text-sm">
//               Showing {filteredTeachers.length} of {teachers.length} teachers
//             </p>
//           </div>
//         )}
//       </div>

//       {/* ─── ADD / EDIT MODAL ─── */}
//       {showModal && (
//         <div 
//           className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//           onClick={() => setShowModal(false)}
//         >
//           <div 
//             className="bg-white rounded-2xl shadow-2xl shadow-blue-400/20 w-full max-w-md max-h-[90vh] overflow-y-auto 
//                        border-2 border-blue-200"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-5 flex items-center justify-between sticky top-0 z-10">
//               <h2 className="text-xl font-bold text-white">
//                 {editingTeacher ? "✏️ Edit Teacher" : "➕ Add Teacher"}
//               </h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg 
//                            flex items-center justify-center transition-colors"
//               >
//                 <FiX size={18} className="text-white" />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6 space-y-4">
//               {[
//                 { name: "full_name", placeholder: "Full Name *", type: "text" },
//                 { name: "email", placeholder: "Email Address *", type: "email" },
//                 { name: "subject", placeholder: "Subject", type: "text" },
//                 { name: "phone", placeholder: "Phone Number", type: "tel" },
//                 { name: "qualification", placeholder: "Qualification", type: "text" },
//                 { name: "experience", placeholder: "Experience (years)", type: "number" }
//               ].map((field) => (
//                 <input
//                   key={field.name}
//                   name={field.name}
//                   type={field.type}
//                   placeholder={field.placeholder}
//                   className="w-full p-3 bg-blue-50 border-2 border-blue-200 rounded-xl 
//                              text-blue-900 placeholder-blue-400
//                              focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 
//                              transition-all"
//                   value={form[field.name]}
//                   onChange={handleChange}
//                 />
//               ))}

//               <p className="text-xs text-blue-600/70">* Required fields</p>
//             </div>

//             {/* Modal Footer */}
//             <div className="flex gap-3 p-6 border-t-2 border-blue-200 sticky bottom-0 bg-blue-50">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 py-3 border-2 border-blue-300 text-blue-600 rounded-xl 
//                            hover:bg-blue-100 font-semibold transition-all"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={saveTeacher}
//                 disabled={saveLoading}
//                 className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 
//                            text-white rounded-xl font-bold
//                            hover:from-blue-600 hover:to-cyan-600 
//                            hover:shadow-lg hover:shadow-blue-400/30
//                            disabled:opacity-50 disabled:cursor-not-allowed 
//                            transition-all flex items-center justify-center gap-2"
//               >
//                 {saveLoading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   editingTeacher ? "Update Teacher" : "Save Teacher"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Teachers

















// ui 5
// src/pages/Teachers.jsx
// src/pages/Teachers.jsx

// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiX, FiUser, FiBookOpen } from "react-icons/fi"

// function Teachers() {

//   const [teachers, setTeachers] = useState([])
//   const [search, setSearch] = useState("")
//   const [showModal, setShowModal] = useState(false)
//   const [editingTeacher, setEditingTeacher] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [saveLoading, setSaveLoading] = useState(false)

//   const [form, setForm] = useState({
//     full_name: "", email: "", subject: "",
//     phone: "", qualification: "", experience: ""
//   })

//   const fetchTeachers = async () => {
//     try {
//       setLoading(true)
//       const res = await API.get("/teacher")
//       setTeachers(res.data)
//     } catch (error) {
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { fetchTeachers() }, [])

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const openAddModal = () => {
//     setEditingTeacher(null)
//     setForm({ full_name: "", email: "", subject: "", phone: "", qualification: "", experience: "" })
//     setShowModal(true)
//   }

//   const openEditModal = (teacher) => {
//     setEditingTeacher(teacher)
//     setForm({
//       full_name: teacher.full_name, email: teacher.email,
//       subject: teacher.subject || "", phone: teacher.phone || "",
//       qualification: teacher.qualification || "", experience: teacher.experience || ""
//     })
//     setShowModal(true)
//   }

//   const saveTeacher = async () => {
//     try {
//       if (!form.full_name.trim()) { alert("Teacher name is required"); return }
//       if (!form.email.trim()) { alert("Email is required"); return }
//       setSaveLoading(true)
//       const payload = {
//         full_name: form.full_name.trim(), email: form.email.trim(),
//         subject: form.subject || null, phone: form.phone || null,
//         qualification: form.qualification || null,
//         experience: form.experience ? Number(form.experience) : null
//       }
//       if (editingTeacher) await API.put(`/teacher/${editingTeacher.id}`, payload)
//       else await API.post("/teacher", payload)
//       await fetchTeachers()
//       setShowModal(false)
//     } catch (err) {
//       if (err.response) alert(err.response.data.error || "Something went wrong")
//       else alert("Server error")
//     } finally { setSaveLoading(false) }
//   }

//   const deleteTeacher = async (id) => {
//     if (!window.confirm("Delete this teacher?")) return
//     try { await API.delete(`/teacher/${id}`); fetchTeachers() }
//     catch { alert("Failed to delete teacher") }
//   }

//   const filteredTeachers = teachers.filter((t) =>
//     t.full_name?.toLowerCase().includes(search.toLowerCase()) ||
//     t.email?.toLowerCase().includes(search.toLowerCase()) ||
//     t.subject?.toLowerCase().includes(search.toLowerCase())
//   )

//   const getInitials = (name) => {
//     if (!name) return "T"
//     return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
//   }

//   // ─── PURPLE BOOK LOADER ───
//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">

//         <div className="relative mb-10">
//           <div className="absolute -top-8 -left-8 w-24 h-24 bg-purple-200/30 rounded-full animate-pulse" />
//           <div className="absolute -bottom-4 -right-6 w-16 h-16 bg-violet-200/40 rounded-full animate-pulse delay-300" />
//           <div className="absolute top-2 right-[-40px] w-10 h-10 bg-fuchsia-200/30 rounded-full animate-pulse delay-500" />

//           <div className="w-20 h-24 relative z-10">
//             <div className="absolute left-0 top-0 w-4 h-24 bg-gradient-to-b from-purple-400 to-purple-600 rounded-l-md shadow-lg shadow-purple-300/40" />

//             <div className="absolute left-4 top-0 w-16 h-24 bg-gradient-to-br from-purple-50 to-white rounded-r-md border border-purple-200 shadow-md">
//               <div className="flex items-center justify-center h-full">
//                 <FiBookOpen className="text-purple-400 text-2xl" />
//               </div>
//             </div>

//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="absolute left-4 top-1 w-[60px] h-[88px] bg-white/90 rounded-r-sm origin-left shadow-sm border-r border-purple-100"
//                 style={{
//                   animation: `flipPage 2.2s ease-in-out ${i * 0.4}s infinite`,
//                   zIndex: 3 - i,
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         <p className="text-purple-500 font-semibold tracking-[0.2em] text-sm uppercase">
//           Loading Teachers
//         </p>

//         <div className="flex gap-1.5 mt-4">
//           {[0, 1, 2].map(i => (
//             <div
//               key={i}
//               className="w-2 h-2 bg-purple-400 rounded-full"
//               style={{ animation: `softBounce 1.4s ease-in-out ${i * 0.2}s infinite` }}
//             />
//           ))}
//         </div>

//         <style>{`
//           @keyframes flipPage {
//             0%, 100% { transform: rotateY(0deg); }
//             50% { transform: rotateY(-150deg); }
//           }
//           @keyframes softBounce {
//             0%, 100% { transform: translateY(0); opacity: 0.3; }
//             50% { transform: translateY(-8px); opacity: 1; }
//           }
//         `}</style>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50/50 to-fuchsia-50/30 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">

//         {/* ─── HEADER ─── */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl 
//                                 flex items-center justify-center shadow-lg shadow-purple-500/25">
//                   <FiUser className="text-white text-lg" />
//                 </div>
//                 <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-700 to-violet-500 
//                                bg-clip-text text-transparent">
//                   Teachers
//                 </h1>
//               </div>
//               <p className="text-purple-400/70 ml-14 text-sm">
//                 Manage your teaching staff • <span className="font-semibold text-purple-500">{teachers.length}</span> total
//               </p>
//             </div>

//             <button
//               onClick={openAddModal}
//               className="flex items-center justify-center gap-2 
//                          bg-gradient-to-r from-purple-500 to-violet-600 
//                          text-white px-6 py-3 rounded-xl 
//                          hover:from-purple-600 hover:to-violet-700
//                          shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 
//                          transform hover:-translate-y-0.5 transition-all duration-300 font-semibold"
//             >
//               <FiPlus size={18} />
//               Add Teacher
//             </button>
//           </div>
//         </div>

//         {/* ─── SEARCH BAR ─── */}
//         <div className="mb-8">
//           <div className="relative">
//             <FiSearch className="absolute left-4 top-3.5 text-purple-300" size={18} />
//             <input
//               type="text"
//               placeholder="Search by name, email, or subject..."
//               className="w-full pl-12 pr-10 py-3.5 
//                          bg-white/70 backdrop-blur-sm 
//                          border border-purple-100 
//                          rounded-xl text-gray-700 placeholder-purple-300
//                          focus:border-purple-400 focus:outline-none focus:ring-3 focus:ring-purple-100 
//                          shadow-sm hover:shadow-md transition-all duration-300"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="absolute right-3 top-3.5 w-7 h-7 bg-purple-50 hover:bg-purple-100 
//                            rounded-full flex items-center justify-center transition-colors"
//               >
//                 <FiX size={14} className="text-purple-400" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* ─── TEACHERS GRID ─── */}
//         {filteredTeachers.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6 
//                             border-2 border-dashed border-purple-200">
//               <FiUser className="text-purple-300 text-4xl" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-700 mb-2">No Teachers Found</h3>
//             <p className="text-purple-400/60 mb-6 text-center">
//               {search ? "Try different search keywords" : "Add your first teacher to get started"}
//             </p>
//             {!search && (
//               <button
//                 onClick={openAddModal}
//                 className="bg-gradient-to-r from-purple-500 to-violet-600 text-white 
//                            px-6 py-2.5 rounded-xl font-semibold 
//                            hover:shadow-lg hover:shadow-purple-500/25 transition-all"
//               >
//                 + Add Teacher
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//             {filteredTeachers.map((teacher, index) => (
//               <div
//                 key={teacher.id}
//                 className="bg-white/80 backdrop-blur-sm rounded-2xl 
//                            border border-purple-100/60
//                            hover:border-purple-300/60 hover:shadow-xl hover:shadow-purple-100/50
//                            transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
//               >
//                 {/* Card Top Accent */}
//                 <div className="h-1 bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400" />

//                 <div className="p-5">
//                   {/* Avatar + Name */}
//                   <div className="flex items-center gap-3 mb-5">
//                     <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-600 
//                                     rounded-xl flex items-center justify-center text-white 
//                                     font-bold text-sm shadow-md shadow-purple-400/25
//                                     group-hover:shadow-lg group-hover:shadow-purple-400/30 transition-shadow">
//                       {getInitials(teacher.full_name)}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h2 className="text-gray-800 font-bold truncate text-[15px]">
//                         {teacher.full_name}
//                       </h2>
//                       <p className="text-purple-500 text-sm font-medium truncate">
//                         {teacher.subject || "No Subject"}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Details */}
//                   <div className="space-y-3 mb-5">
//                     <div className="flex items-start gap-3">
//                       <div className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <span className="text-xs">📧</span>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-[10px] text-purple-400/60 uppercase tracking-wider font-bold">Email</p>
//                         <p className="text-sm text-gray-600 truncate">{teacher.email}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="w-8 h-8 bg-fuchsia-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <span className="text-xs">📱</span>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-[10px] text-purple-400/60 uppercase tracking-wider font-bold">Phone</p>
//                         <p className="text-sm text-gray-600">{teacher.phone || "Not Added"}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <span className="text-xs">🎓</span>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-[10px] text-purple-400/60 uppercase tracking-wider font-bold">Qualification</p>
//                         <p className="text-sm text-gray-600">{teacher.qualification || "Not Added"}</p>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <span className="text-xs">⏱️</span>
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-[10px] text-purple-400/60 uppercase tracking-wider font-bold">Experience</p>
//                         <p className="text-sm text-gray-600">{teacher.experience || 0} years</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2 pt-4 border-t border-purple-50">
//                     <button
//                       onClick={() => openEditModal(teacher)}
//                       className="flex-1 flex items-center justify-center gap-2 
//                                  bg-purple-50 text-purple-600 py-2.5 rounded-xl 
//                                  hover:bg-purple-100 border border-purple-100 
//                                  hover:border-purple-200 font-semibold text-sm transition-all"
//                     >
//                       <FiEdit2 size={14} />
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => deleteTeacher(teacher.id)}
//                       className="flex-1 flex items-center justify-center gap-2 
//                                  bg-red-50 text-red-500 py-2.5 rounded-xl 
//                                  hover:bg-red-100 border border-red-100 
//                                  hover:border-red-200 font-semibold text-sm transition-all"
//                     >
//                       <FiTrash2 size={14} />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Results count */}
//         {filteredTeachers.length > 0 && (
//           <div className="text-center mt-8">
//             <p className="text-purple-300 text-sm font-medium">
//               Showing {filteredTeachers.length} of {teachers.length} teachers
//             </p>
//           </div>
//         )}
//       </div>

//       {/* ─── ADD / EDIT MODAL ─── */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-purple-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             className="bg-white rounded-2xl shadow-2xl shadow-purple-200/50 w-full max-w-md max-h-[90vh] overflow-y-auto 
//                        border border-purple-100"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Modal Header */}
//             <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-5 
//                             flex items-center justify-between sticky top-0 z-10 rounded-t-2xl">
//               <h2 className="text-xl font-bold text-white">
//                 {editingTeacher ? "✏️ Edit Teacher" : "➕ Add Teacher"}
//               </h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="w-8 h-8 bg-white/15 hover:bg-white/25 rounded-lg 
//                            flex items-center justify-center transition-colors"
//               >
//                 <FiX size={18} className="text-white" />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6 space-y-4">
//               {[
//                 { name: "full_name", placeholder: "Full Name *", type: "text" },
//                 { name: "email", placeholder: "Email Address *", type: "email" },
//                 { name: "subject", placeholder: "Subject", type: "text" },
//                 { name: "phone", placeholder: "Phone Number", type: "tel" },
//                 { name: "qualification", placeholder: "Qualification", type: "text" },
//                 { name: "experience", placeholder: "Experience (years)", type: "number" }
//               ].map((field) => (
//                 <input
//                   key={field.name}
//                   name={field.name}
//                   type={field.type}
//                   placeholder={field.placeholder}
//                   className="w-full p-3 bg-purple-50/50 border border-purple-100 rounded-xl 
//                              text-gray-700 placeholder-purple-300
//                              focus:border-purple-400 focus:outline-none focus:ring-3 focus:ring-purple-100 
//                              transition-all"
//                   value={form[field.name]}
//                   onChange={handleChange}
//                 />
//               ))}
//               <p className="text-xs text-purple-300">* Required fields</p>
//             </div>

//             {/* Modal Footer */}
//             <div className="flex gap-3 p-6 border-t border-purple-50 sticky bottom-0 bg-white rounded-b-2xl">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 py-3 border border-purple-200 text-purple-500 rounded-xl 
//                            hover:bg-purple-50 font-semibold transition-all"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={saveTeacher}
//                 disabled={saveLoading}
//                 className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-violet-600 
//                            text-white rounded-xl font-bold
//                            hover:from-purple-600 hover:to-violet-700 
//                            hover:shadow-lg hover:shadow-purple-500/25
//                            disabled:opacity-50 disabled:cursor-not-allowed 
//                            transition-all flex items-center justify-center gap-2"
//               >
//                 {saveLoading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Saving...
//                   </>
//                 ) : (
//                   editingTeacher ? "Update Teacher" : "Save Teacher"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Teachers