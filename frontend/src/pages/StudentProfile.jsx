// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api";

// function StudentProfile() {

//     const { id } = useParams()

//     const [student, setStudent] = useState(null)

//     useEffect(() => {

//         const fetchStudent = async () => {

//             const res = await API.get(`/student/${id}`)
//             setStudent(res.data)

//         }

//         fetchStudent()

//     }, [])

//     if (!student) return <p>Loading...</p>

//     return (

//         <div className="p-6">

//             <div className="bg-white shadow rounded-xl p-6">

//                 <div className="flex gap-6 items-center">

//                     <img
//                         src={student.photo || "/avatar.png"}
//                         className="w-24 h-24 rounded-full"
//                     />

//                     <div>

//                         <h2 className="text-2xl font-bold">
//                             {student.users?.full_name}
//                         </h2>

//                         <p>
//                             Class: {student.classes?.class_name}
//                         </p>

//                         <p>
//                             Roll: {student.roll_number}
//                         </p>

//                     </div>

//                 </div>

//             </div>

//             {/* Parent Info */}

//             <div className="bg-white shadow rounded-xl p-6 mt-6">

//                 <h3 className="text-xl font-bold mb-3">
//                     Parent Info
//                 </h3>

//                 <p>
//                     Father: {student.parent?.father_name}
//                 </p>

//                 <p>
//                     Phone: {student.parent?.phone}
//                 </p>

//             </div>

//             {/* Attendance */}

//             <div className="bg-white shadow rounded-xl p-6 mt-6">

//                 <h3 className="text-xl font-bold mb-3">
//                     Attendance
//                 </h3>

//                 <p>
//                     Present Days: {student.attendance?.present}
//                 </p>

//             </div>

//             {/* Marks */}

//             <div className="bg-white shadow rounded-xl p-6 mt-6">

//                 <h3 className="text-xl font-bold mb-3">
//                     Marks
//                 </h3>

//                 <p>
//                     Maths: {student.marks?.math}
//                 </p>

//             </div>

//             {/* Fee */}

//             <div className="bg-white shadow rounded-xl p-6 mt-6">

//                 <h3 className="text-xl font-bold mb-3">
//                     Fee Status
//                 </h3>

//                 <p>
//                     {student.fee?.paid ? "Paid" : "Pending"}
//                 </p>

//             </div>

//         </div>

//     )

// }

// export default StudentProfile








// import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import API from "../services/api"

// function StudentProfile() {

//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [student, setStudent] = useState(null)

//   useEffect(() => {

//     const fetchStudent = async () => {

//       try {

//         const res = await API.get(`/student/${id}`)
//         setStudent(res.data)

//       } catch (err) {

//         console.log(err)

//       }

//     }

//     fetchStudent()

//   }, [id])

//   if (!student) return <p className="p-6">Loading...</p>

//   return (

//     <div className="p-4 md:p-6 max-w-6xl mx-auto">

//       {/* Back Button */}

//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-blue-600 hover:underline"
//       >
//         ← Back
//       </button>


//       {/* Profile Card */}

//       <div className="bg-white shadow rounded-xl p-6">

//         <div className="flex flex-col md:flex-row items-center gap-6">

//           <img
//             src={student.photo || "/avatar.png"}
//             alt="student"
//             className="w-24 h-24 rounded-full object-cover border"
//           />

//           <div className="text-center md:text-left">

//             <h2 className="text-2xl font-bold">
//               {student.full_name || "Student Name"}
//             </h2>

//             <p className="text-gray-600">
//               Class: {student.class_name || "-"} {student.section || ""}
//             </p>

//             <p className="text-gray-600">
//               Roll Number: {student.roll_number || "-"}
//             </p>

//           </div>

//         </div>

//       </div>


//       {/* Info Grid */}

//       <div className="grid md:grid-cols-2 gap-6 mt-6">


//         {/* Parent Info */}

//         <div className="bg-white shadow rounded-xl p-6">

//           <h3 className="text-xl font-bold mb-4">
//             Parent Info
//           </h3>

//           <p>
//             Father: {student.parent?.father_name || "-"}
//           </p>

//           <p>
//             Phone: {student.parent?.phone || "-"}
//           </p>

//         </div>


//         {/* Attendance */}

//         <div className="bg-white shadow rounded-xl p-6">

//           <h3 className="text-xl font-bold mb-4">
//             Attendance
//           </h3>

//           <p>
//             Present Days: {student.attendance?.present || 0}
//           </p>

//         </div>


//         {/* Marks */}

//         <div className="bg-white shadow rounded-xl p-6">

//           <h3 className="text-xl font-bold mb-4">
//             Marks
//           </h3>

//           <p>
//             Maths: {student.marks?.math || "-"}
//           </p>

//         </div>


//         {/* Fee Status */}

//         <div className="bg-white shadow rounded-xl p-6">

//           <h3 className="text-xl font-bold mb-4">
//             Fee Status
//           </h3>

//           <span
//             className={`px-3 py-1 rounded text-white text-sm ${
//               student.fee?.paid
//                 ? "bg-green-500"
//                 : "bg-red-500"
//             }`}
//           >
//             {student.fee?.paid ? "Paid" : "Pending"}
//           </span>

//         </div>

//       </div>

//     </div>

//   )

// }

// export default StudentProfile


























// import { useEffect, useState } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import API from "../services/api"

// function StudentProfile() {

//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [student, setStudent] = useState(null)

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await API.get(`/student/${id}`)
//         setStudent(res.data)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     fetchStudent()
//   }, [id])

//   if (!student) {
//     return (
//       <div className="p-6 text-center text-gray-500">
//         Loading student profile...
//       </div>
//     )
//   }

//   return (

//     <div className="p-4 md:p-6 max-w-6xl mx-auto">

//       {/* 🔙 Back */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 text-indigo-600 hover:underline"
//       >
//         ← Back
//       </button>

//       {/* ================= PROFILE HEADER ================= */}

//       <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">

//         <img
//           src={student.photo || "/avatar.png"}
//           alt="student"
//           className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200"
//         />

//         <div className="text-center md:text-left">

//           <h2 className="text-2xl font-bold text-gray-800">
//             {student.full_name || "Student Name"}
//           </h2>

//           <p className="text-gray-500 mt-1">
//             Class: {student.class_name || "-"} {student.section || ""}
//           </p>

//           <p className="text-gray-500">
//             Roll No: {student.roll_number || "-"}
//           </p>

//         </div>

//       </div>

//       {/* ================= INFO CARDS ================= */}

//       <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">

//         {/* 👨‍👩‍👦 Parent Info */}
//         <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">

//           <h3 className="text-lg font-semibold mb-4 text-indigo-600">
//             👨‍👩‍👦 Parent Info
//           </h3>

//           <p className="text-gray-700">
//             Father: {student.parent?.father_name || "-"}
//           </p>

//           <p className="text-gray-700 mt-2">
//             Phone: {student.parent?.phone || "-"}
//           </p>

//         </div>

//         {/* 📊 Attendance */}
//         <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">

//           <h3 className="text-lg font-semibold mb-4 text-green-600">
//             📊 Attendance
//           </h3>

//           <p className="text-gray-700">
//             Present Days: {student.attendance?.present || 0}
//           </p>

//         </div>

//         {/* 📝 Marks */}
//         <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">

//           <h3 className="text-lg font-semibold mb-4 text-blue-600">
//             📝 Marks
//           </h3>

//           <p className="text-gray-700">
//             Maths: {student.marks?.math || "-"}
//           </p>

//         </div>

//         {/* 💰 Fee */}
//         <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">

//           <h3 className="text-lg font-semibold mb-4 text-red-600">
//             💰 Fee Status
//           </h3>

//           <span
//             className={`px-4 py-1 rounded-full text-white text-sm font-medium ${
//               student.fee?.paid
//                 ? "bg-green-500"
//                 : "bg-red-500"
//             }`}
//           >
//             {student.fee?.paid ? "Paid" : "Pending"}
//           </span>

//         </div>

//       </div>

//     </div>
//   )
// }

// export default StudentProfile























//improved ui 1st
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"
import BookLoader from "../components/BookLoader"
import { 
  ArrowLeft, User, Mail, Phone, BookOpen, 
  ShieldCheck, AlertCircle, CheckCircle2, 
  CreditCard, Calendar, BarChart3, UserCircle2 
} from "lucide-react"

function StudentProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true)
        const res = await API.get(`/student/${id}`)
        setStudent(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStudent()
  }, [id])

  if (loading) return <BookLoader />

  if (!student) return <div className="p-10 text-center text-gray-500">Student not found</div>

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto font-sans">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap'); .dm-sans { font-family: 'DM Sans', sans-serif; }`}</style>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-indigo-600 font-semibold mb-6 hover:underline">
        <ArrowLeft size={18} /> Back
      </button>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <img src={student.photo || "/avatar.png"} className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-lg" />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">{student.full_name || "N/A"}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2 opacity-90">
              <span className="flex items-center gap-1"><BookOpen size={16} /> Class {student.class_name || "-"}</span>
              <span className="flex items-center gap-1"><ShieldCheck size={16} /> Roll: {student.roll_number || "-"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Parent Info */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
            <UserCircle2 className="text-indigo-500" /> Parent Information
          </h3>
          <div className="space-y-3">
            <p className="flex justify-between border-b pb-2"><span className="text-gray-500">Father Name:</span> <span className="font-semibold">{student.parent?.father_name || "N/A"}</span></p>
            <p className="flex justify-between border-b pb-2"><span className="text-gray-500">Phone:</span> <span className="font-semibold">{student.parent?.phone || "N/A"}</span></p>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
            <Calendar className="text-emerald-500" /> Attendance Overview
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-emerald-600">{student.attendance?.present || 0}</span>
            <span className="text-gray-500 mb-2">Days Present</span>
          </div>
        </div>

        {/* Marks */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
            <BarChart3 className="text-blue-500" /> Academic Progress
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <p className="text-xs text-blue-500 uppercase font-bold">Mathematics</p>
              <p className="text-xl font-bold text-blue-800">{student.marks?.math || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Fee Status */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
            <CreditCard className="text-rose-500" /> Fee Payment
          </h3>
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold ${student.fee?.paid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {student.fee?.paid ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            {student.fee?.paid ? "Fee Paid" : "Pending Payment"}
          </div>
        </div>

      </div>
    </div>
  )
}

export default StudentProfile





















// 2nd ui
